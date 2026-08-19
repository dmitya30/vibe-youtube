#!/usr/bin/env python3
import argparse
import json
import math
import re
from pathlib import Path

TIMING_RE = re.compile(r"^(\d+):(\d+):(\d+),(\d+)\s+-->\s+(\d+):(\d+):(\d+),(\d+)$")
WORD_RE = re.compile(r"[a-z0-9]+", re.IGNORECASE)

def milliseconds(parts):
    h, m, s, ms = [int(value) for value in parts]
    return h * 3600000 + m * 60000 + s * 1000 + ms

def normalize(text):
    return " ".join(WORD_RE.findall(text.lower()))

def parse_srt(path):
    raw = path.read_text(encoding="utf-8-sig").replace("\r\n", "\n").replace("\r", "\n").strip()
    cues = []
    for block in re.split(r"\n\s*\n", raw):
        lines = [line.strip() for line in block.splitlines()]
        timing_index = next((i for i, line in enumerate(lines) if "-->" in line), None)
        if timing_index is None:
            continue
        match = TIMING_RE.match(lines[timing_index])
        if match is None:
            raise ValueError("Unsupported SRT timing: " + lines[timing_index])
        values = match.groups()
        cues.append({"index": len(cues) + 1, "startSec": milliseconds(values[:4]) / 1000, "endSec": milliseconds(values[4:]) / 1000, "text": " ".join(lines[timing_index + 1:])})
    return cues

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--plan", required=True)
    parser.add_argument("--srt", required=True)
    parser.add_argument("--json", required=True)
    parser.add_argument("--timing-md", required=True)
    args = parser.parse_args()
    plan = json.loads(Path(args.plan).read_text(encoding="utf-8"))
    cues = parse_srt(Path(args.srt))
    fps = plan["fps"]
    audio_duration = plan["audioDurationSec"]
    composition_frames = math.ceil(audio_duration * fps)
    composition_duration = composition_frames / fps
    scenes = plan["scenes"]
    if len(cues) != plan["captionCueCount"]:
        raise ValueError("Caption cue count mismatch")
    if scenes[0]["cueStart"] != 1 or scenes[-1]["cueEndExclusive"] != len(cues) + 1:
        raise ValueError("Scene plan does not cover the full cue range")
    for index in range(1, len(scenes)):
        if scenes[index]["cueStart"] != scenes[index - 1]["cueEndExclusive"]:
            raise ValueError("Scene cue ownership gap or overlap")
    output_scenes = []
    for index, scene in enumerate(scenes):
        cue_start = scene["cueStart"]
        cue_end = scene["cueEndExclusive"]
        start_sec = 0.0 if index == 0 else cues[cue_start - 1]["startSec"]
        end_sec = composition_duration if index == len(scenes) - 1 else cues[cue_end - 1]["startSec"]
        source_text = " ".join(cue["text"] for cue in cues[cue_start - 1:cue_end - 1])
        anchor_match = normalize(scene["anchor"]) in normalize(source_text)
        if not anchor_match:
            raise ValueError("Anchor mismatch: " + scene["id"])
        start_frame = round(start_sec * fps)
        end_frame = composition_frames if index == len(scenes) - 1 else round(end_sec * fps)
        output_scenes.append({"id": scene["id"], "section": scene["section"], "composition": scene["composition"], "cueStart": cue_start, "cueEndExclusive": None if cue_end == len(cues) + 1 else cue_end, "startSec": round(start_sec, 6), "endSec": round(end_sec, 6), "startFrame": start_frame, "endFrame": end_frame, "durationFrames": end_frame - start_frame, "anchor": scene["anchor"], "visualState": scene["visualState"], "anchorMatch": True})
    for index in range(1, len(output_scenes)):
        if output_scenes[index]["startFrame"] != output_scenes[index - 1]["endFrame"]:
            raise ValueError("Scene frame continuity failure")
    composition_ids = []
    for scene in output_scenes:
        if scene["composition"] not in composition_ids:
            composition_ids.append(scene["composition"])
    compositions = []
    for composition_id in composition_ids:
        owned = [scene for scene in output_scenes if scene["composition"] == composition_id]
        compositions.append({"id": composition_id, "sceneStart": owned[0]["id"], "sceneEnd": owned[-1]["id"], "startSec": owned[0]["startSec"], "endSec": owned[-1]["endSec"], "startFrame": owned[0]["startFrame"], "endFrame": owned[-1]["endFrame"], "durationFrames": owned[-1]["endFrame"] - owned[0]["startFrame"]})
    for index in range(1, len(compositions)):
        if compositions[index]["startFrame"] != compositions[index - 1]["endFrame"]:
            raise ValueError("Composition frame continuity failure")
    manifest = {"video": plan["video"], "version": plan["version"], "status": plan.get("status", "VALIDATED_DRAFT"), "fps": fps, "audioDurationSec": audio_duration, "captionTimelineEndSec": cues[-1]["endSec"], "compositionDurationFrames": composition_frames, "compositionDurationSec": composition_duration, "timingSource": plan["timingSource"], "sceneCount": len(output_scenes), "compositionCount": len(compositions), "scenes": output_scenes, "compositions": compositions}
    Path(args.json).write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    timing_lines = ["# " + plan["video"] + " — Scene Timing Manifest", "", "Status: " + plan.get("status", "VALIDATED_DRAFT") + " / FAST PIPELINE", "", "- FPS: " + str(fps), "- audio duration: " + format(audio_duration, ".6f") + " seconds", "- composition duration: " + format(composition_duration, ".3f") + " seconds / " + str(composition_frames) + " frames", "- caption cues: " + str(len(cues)), "- semantic scenes: " + str(len(output_scenes)), "- production compositions: " + str(len(compositions)), "- timing source: " + plan["timingSource"], "", "## Scene timing", "", "| Scene | Composition | Section | Cues | Start | End | Frames | Anchor |", "|---|---|---|---:|---:|---:|---:|---|"]
    for scene in output_scenes:
        cue_end_display = len(cues) if scene["cueEndExclusive"] is None else scene["cueEndExclusive"] - 1
        timing_lines.append("| {0} | {1} | {2} | {3}–{4} | {5:.3f} | {6:.3f} | {7} | {8} |".format(scene["id"], scene["composition"], scene["section"], scene["cueStart"], cue_end_display, scene["startSec"], scene["endSec"], scene["durationFrames"], scene["anchor"]))
    timing_lines.extend(["", "## Production compositions", "", "| Composition | Scenes | Start | End | Frames |", "|---|---|---:|---:|---:|"])
    for composition in compositions:
        timing_lines.append("| {0} | {1}–{2} | {3:.3f} | {4:.3f} | {5} |".format(composition["id"], composition["sceneStart"], composition["sceneEnd"], composition["startSec"], composition["endSec"], composition["durationFrames"]))
    Path(args.timing_md).write_text("\n".join(timing_lines) + "\n", encoding="utf-8", newline="\n")
    print("SCENE_TIMING_BUILD=PASS")
    print("CAPTION_CUES=" + str(len(cues)))
    print("SCENE_COUNT=" + str(len(output_scenes)))
    print("COMPOSITION_COUNT=" + str(len(compositions)))
    print("COMPOSITION_FRAMES=" + str(composition_frames))
    print("FIRST_SCENE=" + output_scenes[0]["id"] + ":" + str(output_scenes[0]["startFrame"]))
    print("FINAL_SCENE=" + output_scenes[-1]["id"] + ":" + str(output_scenes[-1]["endFrame"]))
    print("ANCHOR_FAILURES=0")
    print("OWNERSHIP_FAILURES=0")
    print("CONTINUITY_FAILURES=0")

if __name__ == "__main__":
    main()
