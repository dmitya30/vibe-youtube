# VIDEO-003 — Narration Record

Updated: 2026-08-15
Status: NARRATION MASTER PASS / CAPTIONS PASS / TIMING SOURCE ACCEPTED
Script: [VIDEO003_SCRIPT.md](VIDEO003_SCRIPT.md)

## 1. Authoritative inputs

Canonical script:

`docs/VIDEO003_SCRIPT.md`

Tracked TTS blocks:

- `VIDEO-003-proof/audio/video003-narration-input-block-a-v1.txt`;
- `VIDEO-003-proof/audio/video003-narration-input-block-b-v1.txt`.

The blocks are an exact split of the accepted narration. No sentence may be omitted, shortened or paraphrased during generation.

## 2. Voice target

Preferred voice:

`Aoede`

Delivery:

- calm and observant;
- intimate but not theatrical;
- slightly urgent in the cold open;
- no exaggerated sleepiness;
- no whispering;
- no advertisement cadence;
- no artificial pause after every sentence.

Preferred continuity model:

`google/gemini-2-5-pro-tts`

## 3. Local output directory

Generated audio must remain local under:

`VIDEO-003-proof/audio/`

Recommended first-attempt filenames:

- `video003-narration-block-a-attempt-01.wav`;
- `video003-narration-block-b-attempt-01.wav`.

If the provider returns MP3, preserve the real format and use `.mp3`.

## 4. Mandatory completeness QA

Before concatenation:

1. preserve both original generated files;
2. record provider, model, voice, cost and generation time;
3. inspect duration, codec, sample rate and channels;
4. transcribe each block;
5. compare each transcription with its tracked input;
6. verify the first, middle and final sentence of each block;
7. verify all evidence caveats;
8. verify all three experiment steps;
9. reject any omitted passage;
10. sample playback for artifacts and voice drift.

Do not concatenate the blocks before both pass independently.

## 5. TTS generation result

Provider and model:

- provider: Kie.ai;
- model: `google/gemini-2-5-pro-tts`;
- voice: Aoede;
- generated blocks: 2.

| Block | Duration | Generation time | Cost |
|---|---:|---:|---:|
| A | 220.930958 seconds | 164 seconds | 15.61 credits |
| B | 168.410958 seconds | 118 seconds | 11.91 credits |
| Total | 389.341916 seconds before container rounding | 282 seconds | 27.52 credits |

Both generated sources are PCM signed 16-bit little-endian, 24 kHz, mono. Listening QA passed for each source.

## 6. Completeness and continuity QA

CapCut Desktop 9.2.8 generated one acoustic caption timeline from the concatenated candidate:

- cues: 143;
- first cue start: 0.200 seconds;
- final cue end: 389.200 seconds;
- overlaps: 0;
- empty cues: 0;
- raw transcript words: 917;
- authoritative words: 919;
- sequence ratio: 0.982571;
- block A exact-token coverage: 0.983051;
- block B exact-token coverage: 0.979381;
- longest unmatched run: 2 words in each block;
- suspicious sentences: 0;
- first, middle and final anchor checks: PASS.

No omitted passage was detected.

The physical join at 220.930958 seconds passed human playback QA. The two generations have a small audible difference in expression, speed, intonation and loudness. The variation is accepted as non-critical.

```text
VIDEO003_BLOCK_A_COMPLETENESS=PASS
VIDEO003_BLOCK_B_COMPLETENESS=PASS
VIDEO003_JOIN_PLAYBACK_QA=PASS
VIDEO003_VOICE_CONTINUITY=PASS_WITH_ACCEPTED_VARIATION
```

## 7. Accepted narration master

Canonical local master:

`VIDEO-003-proof/audio/video003-narration-master-v1.wav`

Technical parameters:

- duration: 389.341917 seconds / 06:29.342;
- codec: PCM signed 16-bit little-endian;
- sample rate: 24 kHz;
- channels: mono;
- size: 18,688,490 bytes;
- SHA-256: `c402f89f693aa950acb29087d26263c5b3f545b7e24a007567493b01d095a5b7`;
- completeness QA: PASS;
- playback QA: PASS;
- voice continuity: PASS WITH ACCEPTED VARIATION.

The WAV master remains local and is excluded from Git.

## 8. Accepted captions

CapCut supplied acoustic timings. The reviewed authoritative narration supplied caption text.

Tracked caption artifacts:

- `VIDEO-003-proof/captions/video003-en-v1.srt`;
- `VIDEO-003-proof/captions/video003-en-v1.vtt`;
- `VIDEO-003-proof/captions/video003-caption-alignment-v1.txt`.

Caption result:

- cue count: 143;
- first cue start: 0.200 seconds;
- final cue end: 389.200 seconds;
- overlaps: 0;
- empty cues: 0;
- maximum cue length: 56 characters;
- authoritative reconstruction: exact;
- SRT SHA-256: `c0f4fcc34df60f67681df9a2aec3ead039958d12144090e4eea95dcd2f6db437`;
- VTT SHA-256: `6e5dd7ec5f3bd8542deb8e7b5eeb66f09c261dc38314d34fda234fd30a2081d8`.

Raw CapCut captions and completeness diagnostics remain local under:

`VIDEO-003-proof/captions/local/`

## 9. Reusable caption tooling

Tracked deterministic tools:

- `tools/capcut_export_captions.py`;
- `tools/verify_caption_completeness.py`;
- `tools/align_captions_to_script.py`.

The tools read the real CapCut draft schema, export SRT/VTT, compare acoustic transcription with locked TTS inputs and place authoritative text onto acoustic timings. CapCut project files are read-only inputs.

## 10. Current gate

```text
VIDEO003_TTS_INPUT=LOCKED
VIDEO003_AUDIO_MASTER=PASS
VIDEO003_CAPTIONS=PASS
VIDEO003_TIMING_SOURCE=ACCEPTED
VIDEO003_ASSET_PRODUCTION=NOT_YET
NEXT_REQUIRED_GATE=VIDEO003_STORYBOARD_AND_TIMING_MANIFEST
```
