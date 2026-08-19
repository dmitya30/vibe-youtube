# VIDEO-004 — Narration record

Updated: 2026-08-19
Status: NARRATION MASTER PASS / CAPTIONS PASS / TIMING SOURCE ACCEPTED
Script: [VIDEO004_SCRIPT.md](VIDEO004_SCRIPT.md)

## 1. Authoritative input

Canonical narration is the text between `NARRATION_START` and `NARRATION_END` in `docs/VIDEO004_SCRIPT.md`.

Tracked TTS blocks:

- `VIDEO-004-proof/audio/video004-narration-input-block-a-v1.txt`;
- `VIDEO-004-proof/audio/video004-narration-input-block-b-v1.txt`.

The two blocks reconstruct the authoritative narration exactly with one paragraph boundary between them. No sentence may be omitted, shortened, paraphrased or reordered during generation.

## 2. Input metrics

- authoritative narration: 927 whitespace-delimited words;
- block A: 434 words;
- block B: 493 words;
- split point: immediately before `For one task, identify your first escape.`

## 3. Voice target

Preferred model: `google/gemini-2-5-pro-tts`.

Preferred voice: `Aoede`.

Delivery:

- calm, observant and direct;
- slightly urgent during the cold open;
- compassionate without therapeutic performance;
- no advertisement cadence;
- no exaggerated inspiration;
- no artificial pause after every sentence;
- preserve the contrast between present relief and future cost;
- practical section becomes slightly more concrete and energetic;
- final lines slow down without becoming theatrical.

## 4. Recommended local outputs

Generated audio remains local under `VIDEO-004-proof/audio/`.

Recommended filenames:

- `video004-narration-block-a-attempt-01.wav`;
- `video004-narration-block-b-attempt-01.wav`.

If the provider returns another real format, preserve that format and extension.

## 5. Mandatory block-level QA

Before concatenation:

1. preserve both original generated files;
2. record provider, model, voice, cost and generation time;
3. inspect codec, duration, sample rate and channels;
4. transcribe each block;
5. compare each transcription with its tracked input;
6. verify first, middle and final sentence anchors;
7. verify all causal boundaries and caveats;
8. reject any omitted or paraphrased passage;
9. listen for clipping, artifacts and voice drift;
10. concatenate only after both blocks pass independently.

## 6. Locked anchors

Block A begins:

`There is a task you genuinely care about.`

Block A ends:

`So begin there.`

Block B begins:

`For one task, identify your first escape.`

Block B ends:

`It only needs a first action that can happen before relief steals it again.`

## 7. Current gate

```text
VIDEO004_OWNER_SCRIPT_QA=PASS
VIDEO004_OWNER_STORYBOARD_QA=PASS
VIDEO004_TTS_INPUT=LOCKED
VIDEO004_TTS_GENERATION=NOT_YET
VIDEO004_AUDIO_MASTER=NOT_YET
VIDEO004_TIMING=NOT_YET
VIDEO004_VISUAL_ASSET_GENERATION=BLOCKED_PENDING_AUDIO_AND_TIMING
NEXT_REQUIRED_GATE=VIDEO004_TTS_GENERATION_AND_COMPLETENESS_QA
```

## 8. Generated audio and technical master

Generation provider: `Kie.ai`.

- model: `google/gemini-2-5-pro-tts`;
- voice: `Aoede`;
- block A: 13.33 credits and 140 generation seconds;
- block B: 14.59 credits and 165 generation seconds;
- total: 27.92 credits and 305 generation seconds.

Local generated sources:

- `VIDEO-004-proof/audio/video004-narration-block-a-attempt-01.wav`;
- `VIDEO-004-proof/audio/video004-narration-block-b-attempt-01.wav`.

Technical master:

- `VIDEO-004-proof/audio/video004-narration-master-v1.wav`;
- duration: `395.061917` seconds;
- codec: `pcm_s16le`;
- sample rate: `24000` Hz;
- channels: `1`;
- SHA-256: `cff3ea5ba6dc050b1d329a9e4d41622363fa082a140c87172a1481534207cf40`.

The owner listened to both generated blocks and confirmed that every narration word is present, with no audible omission. Mechanical media validation and lossless-PCM master reconstruction passed.

The concatenated seam occurs at `188.610958` seconds. Master acceptance remains blocked until that transition is heard in the assembled file.

```text
VIDEO004_TTS_GENERATION=COMPLETE
VIDEO004_OWNER_BLOCK_COMPLETENESS_QA=PASS
VIDEO004_BLOCK_ARTIFACT_QA=PASS
VIDEO004_AUDIO_MASTER_TECHNICAL_QA=PASS
VIDEO004_AUDIO_MASTER_SEAM_QA=PASS
VIDEO004_AUDIO_MASTER=PASS
VIDEO004_VISUAL_ASSET_GENERATION=BLOCKED_PENDING_AUDIO_AND_TIMING
NEXT_REQUIRED_GATE=VIDEO004_STORYBOARD_TIMING_MANIFEST
```

## 9. Accepted master and captions

The owner listened to the assembled master around the `188.610958`-second seam and at both edges. The pause, loudness and tempo are consistent. A very small change in intonation between blocks is accepted as non-critical.

Accepted local master:

- path: `VIDEO-004-proof/audio/video004-narration-master-v1.wav`;
- duration: `395.061917` seconds;
- codec: PCM signed 16-bit little-endian;
- sample rate: 24 kHz;
- channels: mono;
- SHA-256: `cff3ea5ba6dc050b1d329a9e4d41622363fa082a140c87172a1481534207cf40`.

CapCut supplied acoustic timings. The accepted TTS inputs supplied authoritative caption text.

Tracked captions:

- `VIDEO-004-proof/captions/video004-en-v1.srt`;
- `VIDEO-004-proof/captions/video004-en-v1.vtt`;
- `VIDEO-004-proof/captions/video004-caption-alignment-v1.txt`.

Caption result:

- cue count: `147`;
- raw transcript words: `930`;
- authoritative words: `935`;
- sequence ratio: `0.983378`;
- block A exact-token coverage: `0.979405`;
- block B exact-token coverage: `0.981928`;
- suspicious sentences: `0`;
- first cue: `200` ms;
- final cue: `395067` ms;
- overlaps: `0`;
- empty cues: `0`;
- authoritative reconstruction: `EXACT`;
- SRT SHA-256: `7df12378f853cafe10e5589d2231fe6a88498b95ea5a36bc907e14d50aa6e8de`;
- VTT SHA-256: `fd8d1eb2b7ca75e96be932dbbd44bc5ed43f80285cb038809cb123be6830f004`.

Raw CapCut captions and completeness diagnostics remain local under `VIDEO-004-proof/captions/local/`.

```text
VIDEO004_BLOCK_A_COMPLETENESS=PASS
VIDEO004_BLOCK_B_COMPLETENESS=PASS
VIDEO004_AUDIO_MASTER_SEAM_QA=PASS
VIDEO004_VOICE_CONTINUITY=PASS_WITH_ACCEPTED_VARIATION
VIDEO004_AUDIO_MASTER=PASS
VIDEO004_CAPTIONS=PASS
VIDEO004_TIMING_SOURCE=ACCEPTED
VIDEO004_VISUAL_ASSET_GENERATION=BLOCKED_PENDING_TIMING_MANIFEST
NEXT_REQUIRED_GATE=VIDEO004_STORYBOARD_TIMING_MANIFEST
```

## 10. Locked storyboard timing — 2026-08-19

The accepted 147-cue caption source has been compiled into continuous ownership for 24 semantic scenes and eight production compositions. The 395.061917-second master occupies 11852 frames at 30 fps. Narration, captions and accepted hashes were not changed.

```text
VIDEO004_SCENE_TIMING_MANIFEST=PASS
VIDEO004_TIMING_STATUS=LOCKED
VIDEO004_COMPOSITION_FRAMES=11852
VIDEO004_VISUAL_ASSET_GENERATION=AUTHORIZED_CONTROLLED
NEXT_REQUIRED_GATE=VIDEO004_ASSET_PLAN_AND_REMOTION_BATCH_IMPLEMENTATION
```
