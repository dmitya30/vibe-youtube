# VIDEO-003 — Fast Production Storyboard

Updated: 2026-08-15
Status: VALIDATED DRAFT / BATCH PRODUCTION BASELINE

## Production decision

- 25 semantic scene states grouped into 8 production compositions.
- Two priority cinematic source states; no generative-filler quota.
- Deterministic Remotion components carry evidence, diagrams, steps and logs.
- Adjacent scenes share one composition and one visual environment when practical.
- No composition-by-composition human stop. The implementation batch proceeds to one proof render and one contact-sheet review.
- Narration, captions and timing remain locked.

## Scene plan

| Scene | Composition | Section | Component | Asset mode | Visual state | Review |
|---|---|---|---|---|---|---|
| S01 | C01 | Cold open | `character_keyframe` | `NEW_KEYFRAME_PRIORITY` | Tired NOD in a dark bedroom; phone glow and continuing thumb motion | face, hand and phone |
| S02 | C01 | Cold open | `title` | `REUSE_OPENING_KEYFRAME` | The same bedroom state reframes into THE SCROLL NEEDS AN END | cold-open promise |
| S03 | C01 | Cold open | `phone_state` | `DETERMINISTIC` | Two paths separate: NOT IN BED and IN BED / NOT ASLEEP | terminology clarity |
| S04 | C02 | Two kinds of delay | `character_keyframe` | `REUSE_OR_CROP` | Sofa and bed states occupy two parallel lanes | identity continuity |
| S05 | C02 | Two kinds of delay | `study_card` | `DETERMINISTIC` | Study card: 177 adults; association and correlation caveat remain visible | claim accuracy |
| S06 | C02 | Two kinds of delay | `metric_comparison` | `DETERMINISTIC` | Two delay lanes separate with 400-teenager evidence and weak-link marker | no causal implication |
| S07 | C03 | Why the feed continues | `phone_state` | `DETERMINISTIC` | Finite chapter, movie and conversation end; feed stack continues below frame | watchability |
| S08 | C03 | Why the feed continues | `character_keyframe` | `REUSE_OPENING_KEYFRAME` | Day closes while unfinished cards and tomorrow move closer | emotional tone |
| S09 | C03 | Why the feed continues | `metric_comparison` | `DETERMINISTIC` | Day blocks belong to obligations; a small night block becomes personally owned | possible motive only |
| S10 | C03 | Why the feed continues | `uncertainty_card` | `DETERMINISTIC` | Possible explanations appear as neutral uncertainty cards; diagnosis labels stay absent | medical boundary |
| S11 | C04 | Evidence boundary | `study_card` | `DETERMINISTIC` | Study card: 55 papers and 41,000-plus participants; association highlighted | claim accuracy |
| S12 | C04 | Evidence boundary | `uncertainty_card` | `DETERMINISTIC` | Timing, content, displacement, arousal and habit orbit the phone; blue light is only one factor | correlation caveat |
| S13 | C04 | Evidence boundary | `section_label` | `DETERMINISTIC` | Evidence field collapses into a finite THREE EVENINGS experiment card | experiment framing |
| S14 | C05 | Step one | `phone_state` | `DETERMINISTIC` | Step 1 asks NOT IN BED? or IN BED / NOT ASLEEP? | question clarity |
| S15 | C05 | Step one | `objective_log` | `DETERMINISTIC` | One-sentence nightly observation enters a simple objective log | non-judgmental tone |
| S16 | C06 | Step two | `section_label` | `DETERMINISTIC` | Step 2 creates a finite owned-time block before the tired decision | step clarity |
| S17 | C06 | Step two | `objective_log` | `DETERMINISTIC` | Saved video, ten pages, one episode, one round and one call become bounded cards | text density |
| S18 | C06 | Step two | `character_keyframe` | `NEW_KEYFRAME_PRIORITY` | Phone leaves automatic reach and lands at one visible physical destination | hand, phone and landing place |
| S19 | C07 | Step three | `title` | `DETERMINISTIC` | Step 3 assembles one if-then sentence from two locked clauses | readability |
| S20 | C07 | Step three | `phone_state` | `DETERMINISTIC` | Decision marker moves from dark-bed negotiation to the earlier owned-time block | mechanism clarity |
| S21 | C07 | Step three | `study_card` | `DETERMINISTIC` | Small-trial evidence card keeps EXPERIMENT, NOT TREATMENT visible | safety boundary |
| S22 | C08 | Review and ending | `objective_log` | `DETERMINISTIC` | Three morning questions populate a clean objective log | question readability |
| S23 | C08 | Review and ending | `uncertainty_card` | `DETERMINISTIC` | Failure stamp disappears; timing, ownership and distance become adjustable design branches | non-judgmental tone |
| S24 | C08 | Review and ending | `phone_state` | `DETERMINISTIC_OR_OPTIONAL_KEYFRAME` | Endless feed lane loses energy while a finite ending becomes calm and visible | emotional resolution |
| S25 | C08 | Review and ending | `title` | `REUSE_LANDING_KEYFRAME` | Phone is parked; final CTA: DECIDE WHERE IT ENDS | final CTA |

## Composition architecture

| Composition | Purpose | Scenes |
|---|---|---|
| C01 | Night conflict, promise and two-delay setup | S01–S03 |
| C02 | Two-delay model and foundational evidence | S04–S06 |
| C03 | Feed structure, end-of-day emotion and motive caveats | S07–S10 |
| C04 | Media-sleep evidence boundary and experiment pivot | S11–S13 |
| C05 | Experiment step one | S14–S15 |
| C06 | Experiment step two and physical landing place | S16–S18 |
| C07 | Experiment step three and safety caveat | S19–S21 |
| C08 | Morning review, troubleshooting and final CTA | S22–S25 |

## Controlled asset plan

Priority cinematic source states:

1. Opening bedroom state: tired NOD, phone glow, moving thumb, strong thumbnail continuity.
2. Landing-place state: phone physically leaves the bed-side reach zone and reaches a visible destination.

Optional third state only if the deterministic ending is visually weak:

3. Calm final bedroom state with the phone parked and the feed visually terminated.

Do not generate separate artwork for study cards, comparison lanes, factor diagrams, experiment steps, objective logs or CTA typography.

## Batch gate

The next production batch is scaffold → declarative scene spec → reusable components → all eight compositions → lint and asset validation → one low-resolution proof → one contact sheet → human visual QA.

```text
VIDEO003_STORYBOARD=VALIDATED_DRAFT
VIDEO003_SCENES=25
VIDEO003_COMPOSITIONS=8
VIDEO003_PRIORITY_KEYFRAMES=2
VIDEO003_ASSET_PRODUCTION=CONTROLLED
NEXT_REQUIRED_GATE=VIDEO003_REMOTION_BATCH_IMPLEMENTATION
```
