# VIDEO-001 English captions

Updated: 2026-08-04
Status: PASS / LOCKED
Language: English
Master: `remotion/out/video-001-master-v1.mp4`

## Canonical files

- `video001-en-v1.srt`
- `video001-en-v1.vtt`

These files are version-controlled text timing artifacts. The MP4 master,
source WAV, Whisper model and intermediate ASR files remain local-only.

## Generation

Initial timing draft:

- engine: whisper.cpp v1.9.1;
- model: `ggml-small.en.bin`;
- mode: CPU-only;
- source: `audio/video001-narration-v2.wav`;
- cues: 201;
- first cue: 00:00:00.000;
- final cue end: 00:10:31.500.

The CPU transcription took several hours on the current 2010-era laptop.
Do not rerun Whisper unless the approved narration changes. Existing timings
are the canonical alignment source for this master.

## Semantic corrections

The ASR draft was compared with `docs/SCRIPT.md`.

Corrected:

1. `opened` to `open`;
2. split zero-duration `By / toothpaste` cues into
   `Buy toothpaste. Reply to Alex.`;
3. three instances of `return queue` to `return cue`;
4. restored `thing` in
   `Focus is not the same thing as refusing to stop.`

Number-word differences such as `thirty` versus `30` and spoken step headings
were not semantic errors.

## QA

- cue count: 201;
- first cue start: 0.000 seconds;
- final cue end: 631.500 seconds;
- shortest cue: 0.570 seconds;
- longest cue: 5.790 seconds;
- longest line: 42 characters;
- maximum lines per cue: 2;
- zero-duration cues: none;
- overlaps: none;
- semantic comparison: PASS;
- human playback review in Media Player Classic: PASS;
- overall: PASS / LOCKED.

## Checksums

- SRT SHA-256: `6e6c4de85546c1b51867d6ec7c48be5b9162914154b80ea4543370077543ebf0`
- VTT SHA-256: `babc79ad122f2596f60230c6bbc596d4241e32a3ca269b8c3ccf3ac001ed89f5`

## Publication use

Upload the SRT or VTT as reviewed English captions. Do not use the raw
Whisper TXT, JSON, SRT or VTT files from `remotion/out/` as publication
artifacts.

Independent VLM review remains optional and pending an accessible provider.
Google AI Studio is unavailable from the current region; no attempt to bypass
platform restrictions is part of this workflow.
