# Shadow Automation Log

Updated: 2026-08-07
Status: active for VIDEO-002
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
