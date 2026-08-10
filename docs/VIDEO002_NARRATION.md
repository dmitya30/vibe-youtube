# VIDEO-002 — Narration and Caption Record

Updated: 2026-08-10
Status: NARRATION MASTER PASS / CAPTIONS PASS / TIMING SOURCE ACCEPTED

## 1. Accepted narration master

Canonical local master:

`VIDEO-002-proof/audio/video002-narration-combined-repaired-v2.wav`

Technical parameters:

- duration: 617.037042 seconds / 10:17.037;
- codec: PCM signed 16-bit little-endian;
- sample rate: 24 kHz;
- channels: mono;
- SHA-256: `4557d844256756897d803abce538d431670f603353946252cf2ddb70dc435860`;
- voice: Aoede;
- voice consistency: PASS with mild accepted variation;
- playback and join QA: PASS;
- narration completeness after correction: PASS.

Generated audio remains local and is excluded from Git.

## 2. TTS generation result

One-piece generation did not produce a complete acceptable narration after multiple attempts with Gemini 2.5 Pro TTS and Gemini 3.1 through Kie.ai and OpenRouter interfaces.

The accepted primary narration was generated as two large blocks with Kie.ai model `google/gemini-2-5-pro-tts`.

| Block | Duration | Cost | Generation time |
|---|---:|---:|---:|
| Chapter 1 | 286.491 seconds | 20.22 credits | 223 seconds |
| Chapter 2 | 310.051 seconds | 21.90 credits | 195 seconds |
| Corrective generation | 20.730958 seconds source | 1.51 credits | 22 seconds |

Accepted-generation total:

- direct cost: 43.63 Kie.ai credits;
- machine generation time: 440 seconds;
- failed-attempt cost and time: `UNKNOWN`;
- human time: `UNKNOWN`.

The corrective generation was required because Gemini 2.5 Pro TTS omitted a complete paragraph that was present in the supplied input. The missing content was the full `Layer four: schedule the next check` passage. The omission was detected during transcript-to-script comparison and confirmed by human playback review.

The exact audio repair procedure is intentionally not part of the canonical documentation. The operational lesson is the model-level completeness risk and the required QA gate.

## 3. Gemini TTS completeness risk

Observed defect:

`Gemini 2.5 Pro TTS may omit complete sentences or paragraphs even when they are present in the supplied narration input.`

A long generation may finish cleanly, preserve the ending and sound natural while still missing content from the middle. Checking only the first and last phrase is insufficient.

Working hypothesis:

`The omission may be related to generation duration near or above five minutes, input word or token count, provider execution limits, or an internal model tendency to compress long narration.`

This hypothesis is unverified. Do not record a five-minute limit as an established model fact until controlled tests compare duration, word count, token count, provider and repeated attempts.

Mandatory QA for future TTS:

1. preserve the exact input text and its SHA-256;
2. record provider, model, settings, cost, generation time and attempt number;
3. transcribe every accepted candidate;
4. compare the complete transcription with the authoritative script;
5. explicitly verify numbered sequences, repeated structures, protocol steps, warnings and CTA;
6. perform human playback review at the beginning, middle, end and every detected mismatch;
7. reject narration lock when any substantive passage is missing;
8. prefer a small number of large blocks when one-piece generation is unreliable;
9. treat targeted regeneration as an emergency fallback rather than the default production mode.

## 4. Model-input formatting rule

Never insert an artificial line break inside a sentence or spoken phrase in any model-facing text, prompt, instruction or Markdown code block.

A model may interpret separate physical lines as separate phrases, changing pacing, stress, pauses, pronunciation and performance consistency.

Rules:

- keep each sentence or intentional spoken phrase on one physical line;
- use a blank line only for an intentional paragraph or performance break;
- do not wrap prose merely for visual width;
- apply the same rule to TTS text, STT instructions, scene descriptions, sample context and copied configuration text;
- automated prompt builders must preserve semantic paragraph boundaries without adding display-oriented wrapping.

This rule applies to future assistant-generated copy-paste blocks.

## 5. Timestamp and transcription evaluation

Qwen correctly recognized the narration text but did not provide reliable audio-derived timestamps. Its timestamp output drifted by approximately ten seconds by the seventh minute. Follow-up indicated that the timestamps were interpolated from total duration and estimated speaking rate rather than aligned to acoustic events.

Decision:

- Qwen text recognition: useful for completeness QA;
- Qwen generated timestamps: rejected for subtitles and Remotion timing;
- interpolation from reading speed: prohibited as a timing source.

CapCut Windows auto captions processed the narration locally and quickly. Timings were extracted from the local `draft_content.json` without uploading the project JSON to an external service.

Accepted raw timing result:

- cue count: 210;
- first cue start: 0.167 seconds;
- last cue end: 617.067 seconds;
- master duration: 617.037042 seconds;
- ending delta: 0.030 seconds;
- overlapping cues: zero;
- invalid-duration cues: zero.

The raw CapCut transcript was aligned with the authoritative narration text while preserving CapCut timestamps.

Alignment result:

- raw words: 1,402;
- canonical words: 1,403;
- lexical similarity: 0.993226;
- non-equal alignment blocks: 9;
- empty corrected cues: zero;
- cues over 84 characters: zero;
- human review: PASS.

## 6. Canonical caption artifacts

Version-controlled artifacts:

- `VIDEO-002-proof/captions/video002-en-v1.srt`;
- `VIDEO-002-proof/captions/video002-en-v1.vtt`;
- `VIDEO-002-proof/captions/video002-caption-alignment-v1.txt`;
- `VIDEO-002-proof/audio/video002-narration-input-v1.txt`.

Local-only artifacts:

- narration WAV and MP3 files;
- CapCut `draft_content.json`;
- raw CapCut subtitle extraction;
- generated-audio diagnostics;
- temporary audit audio;
- provider attempt files.

Status:

`CAPTIONS PASS / OWNER REVIEW PASS`

## 7. Pipeline decision

For the current hardware and zero-cost timing path:

`CapCut local auto captions -> extract real cue timestamps -> align against authoritative script -> validate SRT/VTT`

For future automation:

- OpenRouter or another paid STT API may replace CapCut when reliable audio-derived timestamps justify the cost;
- a provider must demonstrate acoustic timestamp alignment rather than estimated timeline interpolation;
- CPU-only local Whisper is not the active path because it is too slow on current hardware;
- Kie.ai currently has no suitable STT model in the tested catalog.

Next gate:

`CORRECT REMAINING SCRIPT/TIMING ARTIFACTS -> MAP SCENE ANCHORS -> REMOTION ASSET AND IMPLEMENTATION PLAN`
