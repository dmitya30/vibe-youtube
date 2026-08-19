# VIDEO-004 — Narration record

Updated: 2026-08-19
Status: AUTHORITATIVE INPUT LOCKED / TTS GENERATION NOT YET
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
