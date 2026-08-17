# Shadow Automation Log

Updated: 2026-08-10
Status: active for VIDEO-002 and VIDEO-003 benchmarks
Purpose: measure the production pipeline before scaling automation

## 1. Principle

VIDEO-002 is produced manually with instrumentation around the work.

Do not build a complete orchestration system in advance. Automate an operation
during the benchmark cycle only when:

1. the need has already repeated;
2. inputs and outputs are explicit;
3. success can be checked mechanically;
4. editorial judgment remains human-controlled;
5. the change can save time in VIDEO-002 or VIDEO-003.

## 2. Stage log schema

Create one row for each meaningful work session or automated run.

| Field | Meaning |
|---|---|
| video | VIDEO-002 |
| stage | research, script, narration, assets, edit, captions, QA, packaging or publishing |
| task | concrete operation |
| started_at | timestamp |
| finished_at | timestamp |
| wall_minutes | elapsed time |
| human_minutes | active human time |
| machine_minutes | unattended processing time |
| provider_model | service, model or local tool |
| attempts | number of attempts |
| direct_cost | known API/service cost |
| input_artifacts | source paths or URLs |
| output_artifacts | generated paths |
| reused_assets | assets/components reused from earlier videos |
| defect | defect discovered, or none |
| rework_reason | why another attempt was needed |
| decision_owner | human or deterministic check |
| automation_candidate | yes/no plus proposed operation |
| notes | concise context |

Unknown values should be recorded as `UNKNOWN`, not estimated silently.

## 3. Stage summary

At the end of each stage record:

- total wall time;
- total human time;
- total direct cost;
- attempts and retries;
- accepted outputs;
- rejected outputs;
- defects escaping into the next stage;
- percentage of materially reused assets;
- automation added;
- measured or expected time saved;
- human decisions that must remain manual.

## 4. Required VIDEO-002 stages

1. Topic and demand research.
2. Angle and promise selection.
3. Sources and claim table.
4. Outline and script.
5. Narration generation and review.
6. Timing or forced alignment.
7. Scene manifest and asset plan.
8. Asset generation.
9. Remotion implementation.
10. Technical QA.
11. Human editorial/playback QA.
12. Captions.
13. Packaging.
14. Publication packet.
15. Platform QA.
16. Post-publication analytics.

## 5. Automation candidates already supported by VIDEO-001 evidence

Candidates, not mandatory implementation commitments:

- project-folder scaffolding;
- source and claim-table validation;
- scene-manifest validation;
- narration and caption duration checks;
- forced alignment;
- missing-asset checks;
- text-overflow and safe-area checks;
- sampled-frame/contact-sheet generation;
- FFmpeg technical reports;
- publication manifest and SHA-256 generation;
- analytics snapshot templates.

## 6. Human-only gates

The following remain human-approved:

- channel and topic strategy;
- viewer problem and promise;
- source interpretation;
- final claims;
- script meaning and tone;
- title and thumbnail choice;
- narrative and visual quality;
- publication;
- response to analytics.

## 7. Benchmark decision after VIDEO-002

Classify each pipeline operation as:

- `KEEP_MANUAL`;
- `ASSIST`;
- `AUTOMATE_NOW`;
- `AUTOMATE_AFTER_3_TO_5_BENCHMARKS`;
- `REMOVE`.

No mass production or unattended publication is approved by this document.


## 8. VIDEO-002 active benchmark status

| Stage | Status |
|---|---|
| Topic and demand research | PASS |
| Angle and promise selection | PASS / LOCKED |
| Sources and claim table | v0.1 ACCEPTED |
| Cold open and outline | v0.1 ACCEPTED |
| Full script | v0.2 LOCKED |
| Script-strengthening editor | MANUAL PASS / FUTURE ASSIST AGENT |
| Preliminary scene architecture | v0.1 ACCEPTED |
| One-piece narration | FAIL / FALLBACK TO TWO LARGE BLOCKS |
| Narration master | PASS / COMPLETENESS RESTORED |
| Qwen timestamp test | FAIL / INTERPOLATED TIMESTAMPS |
| CapCut timestamp extraction | PASS |
| Script-to-caption alignment | PASS |
| English SRT/VTT | PASS / OWNER REVIEW PASS |
| Scene-anchor timing map | NEXT |
| Human time | UNKNOWN |
| Accepted TTS direct cost | 43.63 KIE.AI CREDITS |
| Accepted TTS machine time | 440 SECONDS |

Failed-attempt cost, failed-attempt machine time and total human time remain `UNKNOWN`. They are not inferred retroactively.


## 9. New automation candidates

### Script-strengthening editor

Classification:

`ASSIST`

The agent may identify weak transitions, overclaims, unsupported mechanisms,
promise mismatches and opportunities for stronger phrasing. It must output a
reviewable diff and may not lock or publish a script.

### Anchor-based narration alignment

Classification:

`AUTOMATE_NOW AFTER PROVIDER TEST`

Inputs:

- locked script;
- one-piece narration audio;
- verbatim timestamped STT output;
- stable narration anchors.

Outputs:

- sentence or word alignment;
- scene `startSec` and `endSec`;
- mismatch report;
- unaligned or low-confidence spans.

Silence detection is not the source of semantic boundaries.


## 10. Narration benchmark result

The accepted narration used two large Gemini 2.5 Pro TTS blocks through Kie.ai. One-piece generation was not reliable across the tested Gemini 2.5 Pro and Gemini 3.1 routes.

Gemini 2.5 Pro TTS omitted a complete middle passage even though the passage was present in the input. The output sounded complete and retained its ending, so endpoint-only QA would not have detected the defect.

Automation decision:

`AUTOMATE_NOW: FULL TRANSCRIPT-TO-SCRIPT COMPLETENESS CHECK`

Required checks:

- authoritative input text preserved;
- transcription of every candidate;
- complete lexical alignment;
- explicit missing-span report;
- special validation of numbered steps and repeated structures;
- human review of every mismatch;
- narration lock blocked when substantive omissions remain.

A possible relationship between omissions and generations near or above five minutes is an unverified hypothesis. Duration, word count, token count, provider and repeated attempts must be tested separately before setting a hard chunk-size rule.

## 11. Caption timing benchmark result

Qwen text recognition passed, but its generated timestamps drifted because they were interpolated rather than acoustically aligned.

CapCut local auto captions plus deterministic JSON extraction produced usable real timestamps in seconds rather than hours on the current machine.

Classification:

- Qwen for transcript completeness: `ASSIST`;
- Qwen for generated subtitle timestamps: `REMOVE`;
- CapCut local timing extraction: `KEEP_MANUAL / AUTOMATE EXTRACTION`;
- script-to-caption lexical alignment: `AUTOMATE_NOW`;
- paid cloud STT: `AUTOMATE_AFTER PROVIDER AND COST TEST`.

The authoritative timing source must be tied to audio events. Reading-speed interpolation is prohibited.

## 12. Model-input formatting control

Classification:

`AUTOMATE_NOW`

Prompt and narration builders must reject artificial line breaks inside sentences or intentional spoken phrases. Display-oriented prose wrapping can alter TTS phrasing, stress, pacing and pronunciation.

Validation should distinguish intentional blank-line paragraph boundaries from width-based line wrapping.

## Persistent patch-execution contract

The root `AGENTS.md` file records mandatory execution behavior that must survive dialogue compression. It requires one-block patches, explicit working-directory changes, no heredocs, no shell-closing commands, schema inspection before patch generation, literal Remotion asset references, validation before rendering and immediate execution of the next actionable gate.

## Video pipeline compiler

The failure catalog, compiler input contract, validation gates, agent-role design and VIDEO-003 shadow-compilation strategy are maintained in [VIDEO_PIPELINE_COMPILER.md](VIDEO_PIPELINE_COMPILER.md). Repeated production defects must become regression controls there.


## 13. VIDEO-002 production-form assessment

Record ID:

`VIDEO001_ANALYTICS_RECOVERY_2026_08_14`

VIDEO-002 completed 53 timed semantic scenes through 20 Remotion production compositions. A small number of bespoke generated cinematic assets were combined with deterministic diagrams, typography, layouts and controlled motion.

This is not classified as a production failure based on asset count. Remotion scenes can provide meaningful visual progression without continuous generative footage. The unresolved risk is insufficient emotional, spatial or textural variation across longer explanatory passages.

Classification:

`VIDEO002_VISUAL_WATCHABILITY_RISK=REAL_BUT_UNPROVEN`

Required evaluation:

- first-30-second retention;
- retention around major visual transitions;
- dips during typography-heavy or diagram-heavy sections;
- average percentage viewed;
- comparison between direct and recommendation-derived viewing where available.

Do not add generative clips merely to increase the number of unique assets. Add them only when they improve narrative clarity, emotion, physical action, spatial change or pattern interruption.

## 14. Acceleration decision for VIDEO-003

The nine-day interval between VIDEO-001 and VIDEO-002 is too slow for the active Day-30 output objective.

Pipeline priority:

`FASTER_VALIDATED_HYPOTHESIS_THROUGHPUT`

Automation should immediately target:

1. project scaffolding;
2. structured research and claim-table checks;
3. script-to-narration completeness;
4. timing and scene-manifest validation;
5. asset existence and synchronization;
6. lint and TypeScript orchestration;
7. deterministic sequential rendering;
8. contact-sheet generation;
9. FFmpeg and ffprobe reports;
10. captions and publication manifests;
11. analytics checkpoint reminders and snapshot templates.

Human approval remains mandatory for:

- topic demand and strategic fit;
- promise and title;
- thumbnail direction;
- claims and script meaning;
- cold-open effectiveness;
- visual watchability;
- final playback;
- publication;
- interpretation of analytics.

The objective is not unattended mass generation. The objective is to compress repeated technical work so that VIDEO-003 can be completed in approximately two to three working days without lowering the editorial and technical gates.

## 15. VIDEO-003 batch-production benchmark

VIDEO-003 changed the production unit from many separately reviewed compositions to one locked timeline containing 25 semantic scenes grouped into 8 production compositions.

Result so far:

`VIDEO003_BATCH_PRODUCTION_DIRECTION=SUPPORTED`

Observed advantages:

- faster end-to-end implementation;
- fewer conversational handoffs;
- stronger whole-video visual consistency;
- earlier discovery of global pacing problems;
- generated media purchased only after the complete layout was visible;
- one bounded critical-fix list instead of scene-by-scene redesign.

Observed defects and controls:

| Defect | Control |
|---|---|
| S22 anchor fell outside its assigned cue range | Validate every scene anchor against its owned cues before artifact generation and report the expected cue context |
| Nonessential formatting patch reopened a passed gate | Do not patch cosmetic output after mechanical PASS unless it blocks a downstream consumer |
| Placeholder character escaped into S08 | Require asset coverage for every character-component scene, not only priority keyframes |
| Generated S01 motion ended inside a longer scene | Require an explicit loop, ping-pong, matched-still or transition policy |
| Deterministic scenes felt presentation-like | Add motion-density review to the complete proof; do not rely on token animation alone |
| Timeline bars entered proof renders | Keep diagnostic UI separate and reject forbidden production elements |
| Contact-sheet sampling suggested a false empty ending | Treat contact sheets as sampling evidence only; retain full playback QA |
| Proof audio became 48 kHz stereo | Final mux must use the locked narration master and explicit delivery parameters |
| Dynamic motion did not shorten rendering | Estimate render time from total frames, resolution and component cost, not visible motion amount |

Classification:

- batch timing and scene compilation: `AUTOMATE_NOW`;
- declarative coverage: `AUTOMATE_NOW`;
- asset lifecycle and hash manifest: `AUTOMATE_NOW`;
- media seam policy validation: `AUTOMATE_NOW`;
- forbidden debug-element validation: `AUTOMATE_NOW`;
- motion-density suggestions: `ASSIST`;
- NOD identity, anatomy and visual rhythm: `KEEP_MANUAL`;
- choice of additional GPT Image or Kling scenes: `KEEP_MANUAL`.
