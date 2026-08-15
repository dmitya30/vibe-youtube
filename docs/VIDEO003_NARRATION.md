# VIDEO-003 — Narration Record

Updated: 2026-08-15
Status: TTS INPUT LOCKED / AUDIO GENERATION NEXT
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

## 5. Current gate

```text
VIDEO003_TTS_INPUT=LOCKED
VIDEO003_TTS_BLOCKS=2
VIDEO003_VOICE_TARGET=AOEDE
VIDEO003_AUDIO_MASTER=NOT_CREATED
VIDEO003_CAPTIONS=NOT_CREATED
NEXT_REQUIRED_GATE=VIDEO003_TTS_GENERATION_AND_COMPLETENESS_QA
```
