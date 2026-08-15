#!/usr/bin/env python3
import argparse
import difflib
import re
from pathlib import Path

WORD_RE = re.compile(r"[a-z0-9]+(?:['’][a-z0-9]+)?", re.IGNORECASE)

def tokens(text):
    return [word.lower().replace("’", "'") for word in WORD_RE.findall(text)]

def read_text(path):
    return Path(path).expanduser().resolve().read_text(encoding="utf-8-sig")

def read_srt(path):
    raw = read_text(path).replace("\r\n", "\n").replace("\r", "\n").strip()
    captions = []
    for block in re.split(r"\n\s*\n", raw):
        lines = [line.strip() for line in block.splitlines()]
        timing_index = next((index for index, line in enumerate(lines) if "-->" in line), None)
        if timing_index is None:
            continue
        text = " ".join(lines[timing_index + 1:]).strip()
        text = re.sub(r"<[^>]*>", "", text)
        if text:
            captions.append(text)
    if not captions:
        raise ValueError("No readable SRT cues found")
    return " ".join(captions), len(captions)

def sentence_records(text, block, offset):
    pieces = [piece.strip() for piece in re.split(r"(?<=[.!?])\s+", text.strip()) if piece.strip()]
    records = []
    cursor = offset
    for number, piece in enumerate(pieces, 1):
        count = len(tokens(piece))
        if count:
            records.append({"block": block, "number": number, "start": cursor, "end": cursor + count, "text": piece})
            cursor += count
    return records, cursor

def coverage(matched, start, end):
    size = end - start
    if size <= 0:
        return 1.0
    return sum(1 for index in range(start, end) if index in matched) / size

def longest_unmatched(matched, start, end):
    best = 0
    current = 0
    for index in range(start, end):
        if index in matched:
            current = 0
        else:
            current += 1
            best = max(best, current)
    return best

def anchor_records(records):
    if not records:
        return []
    indexes = sorted(set([0, len(records) // 2, len(records) - 1]))
    labels = {}
    labels[0] = "FIRST"
    labels[len(records) // 2] = "MIDDLE"
    labels[len(records) - 1] = "FINAL"
    return [(labels[index], records[index]) for index in indexes]

def main():
    parser = argparse.ArgumentParser(description="Verify TTS completeness using an acoustic CapCut transcript")
    parser.add_argument("--block-a", required=True)
    parser.add_argument("--block-b", required=True)
    parser.add_argument("--srt", required=True)
    parser.add_argument("--report", required=True)
    args = parser.parse_args()
    text_a = read_text(args.block_a).strip()
    text_b = read_text(args.block_b).strip()
    transcript, cue_count = read_srt(args.srt)
    source_a = tokens(text_a)
    source_b = tokens(text_b)
    source = source_a + source_b
    observed = tokens(transcript)
    matcher = difflib.SequenceMatcher(None, source, observed, autojunk=False)
    opcodes = matcher.get_opcodes()
    matched = set()
    for tag, i1, i2, j1, j2 in opcodes:
        if tag == "equal":
            matched.update(range(i1, i2))
    boundary = len(source_a)
    records_a, end_a = sentence_records(text_a, "A", 0)
    records_b, end_b = sentence_records(text_b, "B", boundary)
    if end_a != boundary or end_b != len(source):
        raise ValueError("Sentence token accounting does not match source token accounting")
    coverage_a = coverage(matched, 0, boundary)
    coverage_b = coverage(matched, boundary, len(source))
    longest_a = longest_unmatched(matched, 0, boundary)
    longest_b = longest_unmatched(matched, boundary, len(source))
    suspicious = []
    for record in records_a + records_b:
        value = coverage(matched, record["start"], record["end"])
        record["coverage"] = value
        if record["end"] - record["start"] >= 6 and value < 0.55:
            suspicious.append(record)
    ratio = matcher.ratio()
    passed = ratio >= 0.90 and coverage_a >= 0.85 and coverage_b >= 0.85 and longest_a <= 8 and longest_b <= 8 and not suspicious
    report_lines = []
    report_lines.append("CAPTION_COMPLETENESS_ANALYSIS")
    report_lines.append("SOURCE_A_WORDS=" + str(len(source_a)))
    report_lines.append("SOURCE_B_WORDS=" + str(len(source_b)))
    report_lines.append("TRANSCRIPT_WORDS=" + str(len(observed)))
    report_lines.append("SEQUENCE_RATIO=" + format(ratio, ".6f"))
    report_lines.append("BLOCK_A_EXACT_TOKEN_COVERAGE=" + format(coverage_a, ".6f"))
    report_lines.append("BLOCK_B_EXACT_TOKEN_COVERAGE=" + format(coverage_b, ".6f"))
    report_lines.append("BLOCK_A_LONGEST_UNMATCHED_RUN=" + str(longest_a))
    report_lines.append("BLOCK_B_LONGEST_UNMATCHED_RUN=" + str(longest_b))
    report_lines.append("SUSPICIOUS_SENTENCE_COUNT=" + str(len(suspicious)))
    for label, record in anchor_records(records_a):
        report_lines.append("ANCHOR_A_" + label + "_COVERAGE=" + format(coverage(matched, record["start"], record["end"]), ".6f"))
    for label, record in anchor_records(records_b):
        report_lines.append("ANCHOR_B_" + label + "_COVERAGE=" + format(coverage(matched, record["start"], record["end"]), ".6f"))
    for index, record in enumerate(suspicious, 1):
        excerpt = re.sub(r"\s+", " ", record["text"])[:180]
        report_lines.append("SUSPICIOUS_%02d=BLOCK_%s_SENTENCE_%d COVERAGE=%.6f TEXT=%s" % (index, record["block"], record["number"], record["coverage"], excerpt))
    report_lines.append("AUTOMATED_COMPLETENESS_GATE=" + ("PASS" if passed else "REVIEW_REQUIRED"))
    report_path = Path(args.report).expanduser().resolve()
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text("\n".join(report_lines) + "\n", encoding="utf-8", newline="\n")
    print("CAPTION_QA_RUN=PASS")
    print("SRT_CUE_COUNT=" + str(cue_count))
    for line in report_lines[1:]:
        print(line)
    print("REPORT_FILE=" + str(report_path))

if __name__ == "__main__":
    main()
