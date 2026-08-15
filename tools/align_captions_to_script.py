#!/usr/bin/env python3
import argparse
import difflib
import hashlib
import json
import re
from pathlib import Path

WORD_RE = re.compile(r"[a-z0-9]+(?:[\u0027\u2019][a-z0-9]+)?", re.IGNORECASE)
TIMING_RE = re.compile(r"^(\d+):(\d+):(\d+),(\d+)\s+-->\s+(\d+):(\d+):(\d+),(\d+)$")

def sha256(path):
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def normalize_word(word):
    return word.lower().replace("\u2019", "\u0027")

def word_matches(text):
    return list(WORD_RE.finditer(text))

def word_tokens(text):
    return [normalize_word(match.group(0)) for match in word_matches(text)]

def parse_time(parts):
    hours, minutes, seconds, millis = [int(value) for value in parts]
    return hours * 3600000 + minutes * 60000 + seconds * 1000 + millis

def format_time(milliseconds, separator):
    hours, remainder = divmod(milliseconds, 3600000)
    minutes, remainder = divmod(remainder, 60000)
    seconds, millis = divmod(remainder, 1000)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}{separator}{millis:03d}"

def parse_srt(path):
    raw = path.read_text(encoding="utf-8-sig").replace("\r\n", "\n").replace("\r", "\n").strip()
    cues = []
    for block in re.split(r"\n\s*\n", raw):
        lines = [line.strip() for line in block.splitlines()]
        timing_index = next((index for index, line in enumerate(lines) if "-->" in line), None)
        if timing_index is None:
            continue
        match = TIMING_RE.match(lines[timing_index])
        if match is None:
            raise ValueError("Unsupported SRT timing: " + lines[timing_index])
        values = match.groups()
        start = parse_time(values[:4])
        end = parse_time(values[4:])
        text = re.sub(r"<[^>]*>", "", " ".join(lines[timing_index + 1:])).strip()
        if not text or end <= start:
            raise ValueError("Invalid raw cue")
        cues.append({"start": start, "end": end, "raw_text": text})
    if not cues:
        raise ValueError("No SRT cues found")
    for index in range(1, len(cues)):
        if cues[index]["start"] < cues[index - 1]["end"]:
            raise ValueError("Raw SRT contains overlapping cues")
    return cues

def build_boundary_map(source_tokens, observed_tokens):
    matcher = difflib.SequenceMatcher(None, source_tokens, observed_tokens, autojunk=False)
    mapping = [None] * (len(observed_tokens) + 1)
    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if j2 > j1:
            for observed_boundary in range(j1, j2 + 1):
                fraction = (observed_boundary - j1) / (j2 - j1)
                mapping[observed_boundary] = i1 + round(fraction * (i2 - i1))
        else:
            mapping[j1] = i2
    mapping[0] = 0
    mapping[-1] = len(source_tokens)
    previous = 0
    for index, value in enumerate(mapping):
        if value is None:
            value = previous
        value = max(previous, min(len(source_tokens), value))
        mapping[index] = value
        previous = value
    mapping[-1] = len(source_tokens)
    return matcher.ratio(), mapping

def assign_authoritative_text(source, raw_cues):
    source_matches = word_matches(source)
    source_tokens = [normalize_word(match.group(0)) for match in source_matches]
    observed_tokens = []
    observed_boundaries = [0]
    for cue in raw_cues:
        observed_tokens.extend(word_tokens(cue["raw_text"]))
        observed_boundaries.append(len(observed_tokens))
    ratio, mapping = build_boundary_map(source_tokens, observed_tokens)
    source_boundaries = [mapping[value] for value in observed_boundaries]
    source_boundaries[0] = 0
    source_boundaries[-1] = len(source_tokens)
    for index in range(1, len(source_boundaries)):
        if source_boundaries[index] <= source_boundaries[index - 1]:
            raise ValueError("Alignment produced an empty authoritative cue")
    output = []
    raw_slices = []
    for index, raw_cue in enumerate(raw_cues):
        start_word = source_boundaries[index]
        end_word = source_boundaries[index + 1]
        start_char = source_matches[start_word].start()
        end_char = source_matches[end_word].start() if end_word < len(source_matches) else len(source)
        raw_slice = source[start_char:end_char]
        text = re.sub(r"\s+", " ", raw_slice).strip()
        if not text:
            raise ValueError("Authoritative cue is empty")
        raw_slices.append(raw_slice)
        output.append({"start": raw_cue["start"], "end": raw_cue["end"], "text": text})
    if "".join(raw_slices) != source:
        raise ValueError("Authoritative source slices are not exact")
    reconstructed_tokens = word_tokens(" ".join(cue["text"] for cue in output))
    if reconstructed_tokens != source_tokens:
        raise ValueError("Authoritative token reconstruction is not exact")
    return ratio, len(source_tokens), len(observed_tokens), output

def render_srt(cues):
    blocks = []
    for index, cue in enumerate(cues, 1):
        timing = format_time(cue["start"], ",") + " --> " + format_time(cue["end"], ",")
        blocks.append(str(index) + "\n" + timing + "\n" + cue["text"])
    return "\n\n".join(blocks) + "\n"

def render_vtt(cues):
    blocks = ["WEBVTT"]
    for cue in cues:
        timing = format_time(cue["start"], ".") + " --> " + format_time(cue["end"], ".")
        blocks.append(timing + "\n" + cue["text"])
    return "\n\n".join(blocks) + "\n"

def main():
    parser = argparse.ArgumentParser(description="Align authoritative narration text to acoustic SRT timings")
    parser.add_argument("--script", action="append", required=True)
    parser.add_argument("--raw-srt", required=True)
    parser.add_argument("--output-srt", required=True)
    parser.add_argument("--output-vtt", required=True)
    parser.add_argument("--report", required=True)
    args = parser.parse_args()
    script_paths = [Path(value).expanduser().resolve() for value in args.script]
    raw_path = Path(args.raw_srt).expanduser().resolve()
    source = "\n\n".join(path.read_text(encoding="utf-8-sig").strip() for path in script_paths)
    raw_cues = parse_srt(raw_path)
    ratio, source_words, observed_words, cues = assign_authoritative_text(source, raw_cues)
    if ratio < 0.90:
        raise ValueError("Transcript similarity is below the acceptance threshold")
    output_srt = Path(args.output_srt).expanduser().resolve()
    output_vtt = Path(args.output_vtt).expanduser().resolve()
    report = Path(args.report).expanduser().resolve()
    output_srt.parent.mkdir(parents=True, exist_ok=True)
    output_vtt.parent.mkdir(parents=True, exist_ok=True)
    report.parent.mkdir(parents=True, exist_ok=True)
    output_srt.write_text(render_srt(cues), encoding="utf-8", newline="\n")
    output_vtt.write_text(render_vtt(cues), encoding="utf-8", newline="\n")
    max_chars = max(len(cue["text"]) for cue in cues)
    report_lines = [
        "VIDEO003_CAPTION_ALIGNMENT=PASS",
        "ALIGNMENT_METHOD=CAPCUT_ACOUSTIC_TIMINGS_PLUS_AUTHORITATIVE_TEXT",
        "CUE_COUNT=" + str(len(cues)),
        "SOURCE_WORDS=" + str(source_words),
        "RAW_TRANSCRIPT_WORDS=" + str(observed_words),
        "SEQUENCE_RATIO=" + format(ratio, ".6f"),
        "FIRST_START_MS=" + str(cues[0]["start"]),
        "FINAL_END_MS=" + str(cues[-1]["end"]),
        "OVERLAP_COUNT=0",
        "EMPTY_CUE_COUNT=0",
        "AUTHORITATIVE_RECONSTRUCTION=EXACT",
        "MAX_CUE_CHARACTERS=" + str(max_chars),
        "RAW_SRT_SHA256=" + sha256(raw_path),
        "OUTPUT_SRT_SHA256=" + sha256(output_srt),
        "OUTPUT_VTT_SHA256=" + sha256(output_vtt)
    ]
    report.write_text("\n".join(report_lines) + "\n", encoding="utf-8", newline="\n")
    for line in report_lines:
        print(line)
    print("OUTPUT_SRT=" + str(output_srt))
    print("OUTPUT_VTT=" + str(output_vtt))
    print("REPORT_FILE=" + str(report))

if __name__ == "__main__":
    main()
