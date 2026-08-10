# VIDEO-002 — Preliminary Storyboard

Updated: 2026-08-10
Version: v0.1
Status: SCENE ARCHITECTURE ACCEPTED / NARRATION AND CAPTION TIMINGS PASS
Script: [VIDEO002_SCRIPT.md](VIDEO002_SCRIPT.md)

## 1. Production model

Primary mode:

`DETERMINISTIC-HEAVY REMOTION / SELECTIVE GENERATED KEYFRAMES / OPTIONAL KLING`

Rules:

- scene boundaries are defined by exact narration anchors before audio exists;
- final timestamps come from full-audio STT alignment;
- generated keyframes should normally represent complete scene states rather
  than every spoken phrase;
- adjacent semantic scenes may share one Remotion composition;
- Kling is optional at selected emotional or physical-action beats;
- animation is not added to satisfy a quota;
- random visual variation must not break narrative continuity;
- phrase-level slideshow is a future alternative format, not the active
  VIDEO-002 production direction.

Estimated structure:

- 53 semantic scene states;
- approximately 18–22 production compositions;
- approximately 2–4 new generated styleframes;
- zero mandatory Kling clips;
- selective Kling clips allowed after scene-level review.

## 2. Narration and timing architecture

Accepted narration:

- one-piece generation: failed after multiple attempts;
- fallback: two large Gemini 2.5 Pro TTS blocks through Kie.ai;
- corrective generation: required after a complete middle passage was omitted by the model;
- accepted master duration: 617.037042 seconds;
- accepted master SHA-256: `4557d844256756897d803abce538d431670f603353946252cf2ddb70dc435860`;
- voice consistency: PASS with mild accepted variation;
- complete narration playback: PASS.

Accepted timing path:

1. CapCut Windows generated local auto captions from the accepted narration master.
2. Real cue timestamps were extracted from CapCut project JSON.
3. CapCut text was aligned with the authoritative narration script.
4. Known ASR spelling and normalization errors were corrected without replacing the acoustic timestamps.
5. Final SRT and VTT passed structural and human review.

Qwen recognized the spoken text accurately but generated interpolated timestamps that drifted by approximately ten seconds by the seventh minute. Qwen timestamps are rejected for scene timing and captions.

The final caption set contains 210 cues, zero overlaps and zero invalid-duration cues. The final cue ends 0.030 seconds after the reported WAV duration, which is accepted as container and cue-boundary rounding.

Canonical narration and caption details belong to [VIDEO002_NARRATION.md](VIDEO002_NARRATION.md).

FFmpeg remains responsible for inspection, loudness, conversion, muxing and technical QA. Silence detection is not the primary semantic timing method.

## 3. Scene manifest

### Cold open

| ID | Narration anchor | Visual state |
|---|---|---|
| S01 | You turned off every notification | Last notification toggle moves to OFF |
| S02 | No banners. No vibrations | Banners, vibration marks and badges disappear |
| S03 | Your phone is silent, face down | NOD places the phone beside the document |
| S04 | you reach for it anyway | NOD's hand returns to the silent phone |
| S05 | notifications and checking are not the same problem | Two doors: NOTIFICATION and CHECKING |
| S06 | no significant reduction | Study card: 205 PEOPLE / 1 WEEK |
| S07 | It didn't close the exit | Notification door closes; checking door remains open |

### Notifications can interrupt

| ID | Narration anchor | Visual state |
|---|---|---|
| S08 | not bad advice | Non-essential notifications switch off |
| S09 | exactly the wrong moment | Message pulse crosses an active thought |
| S10 | Someone may be waiting | Uncertainty cards appear behind the screen |
| S11 | sustained-attention task | Simplified laboratory-task diagram |
| S12 | phone is silent | External signals disappear; checking remains |
| S13 | find yourself holding the phone | Match cut to phone already in NOD's hand |

### Notification-disabling experiment

| ID | Narration anchor | Visual state |
|---|---|---|
| S14 | for one week | 205 participants and one-week marker |
| S15 | objective phone logs | Event log replaces a self-estimate bubble |
| S16 | no significant reduction | Checking and screen-time comparison |
| S17 | less habitual | Subjective measure changes; objective count remains |
| S18 | fear of missing out | Silent phone surrounded by uncertainty |
| S19 | Real behavior was more complicated | Simple causal chain splits into two doors |
| S20 | task becomes briefly boring | Difficult paragraph, loading file and blank next step |

### Two doors

| ID | Narration anchor | Visual state |
|---|---|---|
| S21 | prompted exit | Phone opens the notification door |
| S22 | self-created exit | NOD opens a door without an external signal |
| S23 | confusing sentence | Task-friction cards surround the document |
| S24 | not a diagnosis | BROKEN BRAIN and ADDICTION labels are rejected |
| S25 | exactly what the task requires | Legitimate phone functions remain available |
| S26 | easier than noticing | Easy checking path versus visible next action |

### Stronger friction

| ID | Narration anchor | Visual state |
|---|---|---|
| S27 | blocked mobile internet | Internet closes; calls and texts remain |
| S28 | internet on computers | Laptop access remains available |
| S29 | sustained attention | Objective and self-reported outcomes stay distinct |
| S30 | difficult to follow | Participant group narrows to compliant subset |
| S31 | after someone reached | Reach completes, but the instant path is blocked |
| S32 | different decision | A decision step appears between impulse and app |
| S33 | smaller test | Two weeks collapse into a 25:00 timer |

### Silent Door Test

| ID | Narration anchor | Visual state |
|---|---|---|
| S34 | one task and one 25-minute block | One document, finish line and timer |
| S35 | necessary contact | Emergency route remains available |
| S36 | Layer one | Notification door closes |
| S37 | Layer two | Phone moves outside automatic reach |
| S38 | Layer three | Distracting apps close; necessary tools remain |
| S39 | Layer four | Exact next-check time appears |
| S40 | make one mark | Each checking impulse creates a tally mark |
| S41 | map of the exits | Marks transform into a visible exit map |

### Interpreting the result

| ID | Narration anchor | Visual state |
|---|---|---|
| S42 | no marks | Zero-mark branch without a universal conclusion |
| S43 | several marks | Checking path becomes visible |
| S44 | opened an app anyway | Event becomes data, not a failure stamp |
| S45 | immediately before the check | Task moment, reach and check timeline |
| S46 | unclear / waiting / uncomfortable | Causes sort into neutral categories |
| S47 | easier than continuing | Central question with two visible paths |

### Ending

| ID | Narration anchor | Visual state |
|---|---|---|
| S48 | door your phone opens | Prompted door closes |
| S49 | the one you open yourself | NOD notices a hand on the second handle |
| S50 | require a decision again | A deliberate step appears before the phone |
| S51 | notice the reach | Hand stops and returns to the task |
| S52 | notification that never arrived | Silent phone and disappearing final door |
| S53 | End CTA | NOTICE THE REACH / THEN CHOOSE |

## 4. Reuse plan

Reuse or refactor from VIDEO-001:

- canonical NOD identity;
- cream, graphite and orange palette;
- desk and document environment;
- phone and notification motifs;
- fixed-hinge door metaphor;
- timer;
- tally marks;
- task-friction cards;
- classification cards;
- typography and safe-area conventions;
- 25-minute experiment visual language.

Do not copy complete VIDEO-001 sections blindly. Extract a reusable component
only when VIDEO-002 confirms that the primitive has repeated.

## 5. New generated states

Priority candidates:

1. NOD reaches for a silent phone.
2. The phone is already in NOD's hand without an external signal.
3. NOD reaches the phone but the expected instant path is blocked.
4. NOD notices the reach and returns to the task.

These states should be reduced to approximately 2–4 source images through
cropping, compositing and scene-state reuse.

## 6. Controlled visual variation

Optional Kling use is allowed beyond the opening scene.

Candidate beats:

- the first silent reach;
- phone already in hand;
- reach interrupted by friction;
- final noticed reach and return to the task.

Selection rules:

- use Kling only when natural movement materially strengthens the moment;
- reject identity drift, malformed hands, phone-shape drift and excessive
  cinematic motion;
- do not insert unrelated clips to reduce perceived template use;
- preserve a coherent visual grammar across the full video.

Anti-template options for future tests:

- scene-level generated keyframes;
- phrase-level visual slideshow;
- stronger variation between typography, diagram, character and environment
  compositions;
- selective live-motion or generative-video inserts.

For VIDEO-002, Remotion remains the primary visual system.

## 7. Current gate

Completed:

1. documentation checkpoint before narration: PASS;
2. narration provider and voice selection: PASS;
3. accepted narration master: PASS;
4. full-script completeness comparison: PASS after one detected TTS omission was corrected;
5. real caption timestamps: PASS;
6. final SRT/VTT structural QA: PASS;
7. owner caption review: PASS.

Do not begin broad asset generation until the remaining script/timing artifact correction and scene-anchor mapping are complete.

Next gate:

`MAP S01-S53 TO ACCEPTED AUDIO TIMESTAMPS / LOCK PRODUCTION COMPOSITIONS / START CONTROLLED ASSET WORK`
