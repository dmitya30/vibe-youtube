#!/usr/bin/env python3
import argparse
import hashlib
import json
import re
from pathlib import Path

def sha256(path):
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def resolve_input(value):
    path = Path(value).expanduser().resolve()
    if path.is_dir():
        candidates = [path / "draft_content.json", path / "draft_info.json"]
        path = next((p for p in candidates if p.is_file()), None)
        if path is None:
            raise ValueError("Input directory contains neither draft_content.json nor draft_info.json")
    if not path.is_file():
        raise ValueError("Input JSON does not exist: " + str(path))
    return path

def extract_text(material):
    content = material.get("content")
    if isinstance(content, str):
        try:
            parsed = json.loads(content)
            if isinstance(parsed, dict) and isinstance(parsed.get("text"), str):
                return parsed["text"]
        except json.JSONDecodeError:
            pass
        return re.sub(r"<[^>]*>", "", content)
    words = material.get("words")
    if isinstance(words, dict):
        value = words.get("text")
        if isinstance(value, list):
            return "".join(str(item) for item in value)
        if isinstance(value, str):
            return value
    raise ValueError("Text material has no readable content: " + str(material.get("id")))

def normalize_text(text):
    text = text.replace("\r\n", "\n").replace("\r", "\n").strip()
    if not text:
        raise ValueError("Empty caption text")
    return text

def timestamp(microseconds, separator):
    milliseconds = (microseconds + 500) // 1000
    hours, remainder = divmod(milliseconds, 3600000)
    minutes, remainder = divmod(remainder, 60000)
    seconds, millis = divmod(remainder, 1000)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}{separator}{millis:03d}"

def select_track(tracks, text_map):
    candidates = []
    for index, track in enumerate(tracks):
        if not isinstance(track, dict) or track.get("type") != "text":
            continue
        segments = track.get("segments") or []
        resolved = sum(1 for segment in segments if str(segment.get("material_id")) in text_map)
        candidates.append((resolved, len(segments), index, track))
    if not candidates:
        raise ValueError("No text track found")
    candidates.sort(key=lambda item: (item[0], item[1]), reverse=True)
    resolved, segment_count, index, track = candidates[0]
    if resolved == 0 or resolved != segment_count:
        raise ValueError(f"Best text track is incomplete: resolved={resolved}, segments={segment_count}")
    return index, track

def build_cues(data):
    materials = data.get("materials") or {}
    texts = materials.get("texts") or []
    tracks = data.get("tracks") or []
    text_map = {str(item.get("id")): item for item in texts if isinstance(item, dict) and item.get("id") is not None}
    track_index, track = select_track(tracks, text_map)
    cues = []
    for segment in track.get("segments") or []:
        material_id = str(segment.get("material_id"))
        material = text_map.get(material_id)
        if material is None:
            raise ValueError("Unresolved material_id: " + material_id)
        timerange = segment.get("target_timerange") or {}
        start = timerange.get("start")
        duration = timerange.get("duration")
        if not isinstance(start, int) or not isinstance(duration, int):
            raise ValueError("Non-integer target_timerange for material_id: " + material_id)
        if start < 0 or duration <= 0:
            raise ValueError("Invalid target_timerange for material_id: " + material_id)
        cues.append({"start": start, "end": start + duration, "text": normalize_text(extract_text(material)), "material_id": material_id})
    cues.sort(key=lambda cue: (cue["start"], cue["end"]))
    if not cues:
        raise ValueError("Selected text track contains no cues")
    overlaps = []
    for index in range(1, len(cues)):
        if cues[index]["start"] < cues[index - 1]["end"]:
            overlaps.append((index, cues[index - 1]["end"] - cues[index]["start"]))
    if overlaps:
        raise ValueError("Overlapping cues detected: " + str(overlaps[:10]))
    return track_index, cues

def render_srt(cues):
    blocks = []
    for index, cue in enumerate(cues, 1):
        blocks.append(f"{index}\n{timestamp(cue['start'], ',')} --> {timestamp(cue['end'], ',')}\n{cue['text']}")
    return "\n\n".join(blocks) + "\n"

def render_vtt(cues):
    blocks = ["WEBVTT"]
    for cue in cues:
        blocks.append(f"{timestamp(cue['start'], '.')} --> {timestamp(cue['end'], '.')}\n{cue['text']}")
    return "\n\n".join(blocks) + "\n"

def main():
    parser = argparse.ArgumentParser(description="Read-only CapCut caption exporter")
    parser.add_argument("--input", required=True, help="CapCut project directory or draft JSON")
    parser.add_argument("--srt", required=True, help="Output SRT path")
    parser.add_argument("--vtt", required=True, help="Output WebVTT path")
    args = parser.parse_args()
    input_path = resolve_input(args.input)
    with input_path.open("r", encoding="utf-8-sig") as f:
        data = json.load(f)
    track_index, cues = build_cues(data)
    project_duration = data.get("duration")
    if isinstance(project_duration, int) and cues[-1]["end"] > project_duration + 1000000:
        raise ValueError("Final cue exceeds project duration by more than one second")
    srt_path = Path(args.srt).expanduser().resolve()
    vtt_path = Path(args.vtt).expanduser().resolve()
    srt_path.parent.mkdir(parents=True, exist_ok=True)
    vtt_path.parent.mkdir(parents=True, exist_ok=True)
    srt_path.write_text(render_srt(cues), encoding="utf-8", newline="\n")
    vtt_path.write_text(render_vtt(cues), encoding="utf-8", newline="\n")
    print("CAPCUT_EXPORT=PASS")
    print("INPUT_DRAFT=" + str(input_path))
    print("SELECTED_TEXT_TRACK_INDEX=" + str(track_index))
    print("CUE_COUNT=" + str(len(cues)))
    print("FIRST_START_US=" + str(cues[0]["start"]))
    print("FINAL_END_US=" + str(cues[-1]["end"]))
    print("PROJECT_DURATION_US=" + str(project_duration))
    print("END_DELTA_US=" + str(project_duration - cues[-1]["end"]) if isinstance(project_duration, int) else "END_DELTA_US=UNKNOWN")
    print("OVERLAP_COUNT=0")
    print("EMPTY_CUE_COUNT=0")
    print("SRT_FILE=" + str(srt_path))
    print("SRT_SHA256=" + sha256(srt_path))
    print("VTT_FILE=" + str(vtt_path))
    print("VTT_SHA256=" + sha256(vtt_path))

if __name__ == "__main__":
    main()
