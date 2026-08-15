# Experiments

Updated: 2026-08-14

## Experiment format

Каждый эксперимент фиксирует:

- hypothesis;
- evidence;
- deliverable;
- cost;
- pass/fail signals;
- result;
- decision.

Числовые пороги до появления собственных данных являются рабочими ориентирами, а не отраслевыми фактами.

---

# VIDEO-001 — Attention Span

Status: Public / live / post-launch monitoring
Publication: completed 2026-08-05

## Hypothesis

A task-switching and environment-design explanation will differentiate the video from generic `fix your attention span` content.

## Viewer problem

The viewer starts one task, switches to messages, tabs or short-form feeds, and concludes that their brain is permanently damaged.

## Promise

Explain external and self-created task exits, then provide a practical experiment without medical claims, fake dopamine resets or guaranteed results.

## Packaging

Test title held constant across all three thumbnail candidates:

`You Don't Need More Focus — You Need Fewer Exits`

Thumbnail test set:

1. A — Phone Portal v2; no text; visual-conflict hypothesis.
2. B — Three Exits v2; `NOT YOUR BRAIN`; diagnostic-reframe hypothesis.
3. C — Timer v2; `00:47`; data-curiosity hypothesis.

Visual QA:

- full-size readability: PASS;
- 160x90 mobile readability: PASS;
- grayscale hierarchy: PASS;
- mild-blur hierarchy: PASS;
- candidate differentiation: PASS;
- title and opening promise match: PASS.

Status:

`A/B/C VISUAL QA PASS / TEST SET LOCKED / WINNER NOT SELECTED`

The first platform test keeps the title constant to isolate the thumbnail
variable. YouTube Test & Compare results must be evaluated using watch-time
share, with CTR, early retention and viewer satisfaction treated as supporting
signals.

## Claim limits

- 47 seconds is an observed average time on one screen before switching, not a biological attention limit.
- Interruptions create resumption costs and can increase stress and workload.
- Notification sounds may impair performance, but observed effects can be small.
- Disabling notifications alone did not reduce checking frequency or screen time in a one-week randomized intervention.
- `One Door Protocol` is an evidence-informed editorial synthesis, not a clinically validated method.
- Do not claim irreversible brain damage, universal recovery times or a literal dopamine reset.

Supporting research belongs to [`SOURCES.md`](SOURCES.md).

## One Door Protocol

1. Name one observable outcome.
2. Close visible exits.
3. Park unrelated impulses.
4. Leave a concrete return cue.
5. Stop at a natural breakpoint.

## Approved outline

1. Cold open: one task turns into repeated switching.
2. Correctly explain the 47-second observation.
3. Introduce external and self-created exits.
4. Explain resumption cost without exaggeration.
5. Present the One Door Protocol.
6. Run a 25-minute single-task experiment.
7. End with one CTA about the viewer’s most common exit.

Target: 8–10 minutes / approximately 1,300–1,450 English words.

Production documents:

- locked public script v2: [`SCRIPT.md`](SCRIPT.md);
- storyboard, exact timing and asset plan:
  [`STORYBOARD.md`](STORYBOARD.md).

Актуальная narration v2:

- файл: `VIDEO-001-proof/audio/video001-narration-v2.wav`;
- duration: 631.570958 seconds / 10:31.57;
- codec: PCM signed 16-bit little-endian;
- sample rate: 24 kHz;
- channels: mono;
- Sections 01–04 and 06–07: Gemini 3.1 Flash TTS;
- Section 05: Gemini 2.5 Pro TTS;
- voice: Aoede;
- style: Empathetic;
- pace: Natural;
- voice consistency: PASS;
- volume consistency: PASS;
- pronunciation: PASS;
- section completeness: PASS.

Production status:

| Section | Status |
|---|---|
| 01 Cold open | PASS / LOCKED |
| 02 47 seconds | PASS / LOCKED |
| 03 Two kinds of exits | PASS / LOCKED |
| 04 Switch cost | PASS / LOCKED |
| 05 One Door Protocol | PASS / LOCKED |
| 06 25-minute experiment | PASS / LOCKED |
| 07 Ending | PASS / LOCKED |
| Master | PASS / LOCKED |
| English captions | PASS / LOCKED |

Current production styleframes:

- `screen-switching-observation-v1.jpg` — approved;
- `external-exits-clean-v1.jpg` — approved;
- `self-interruption-phone-v1.jpg` — approved with accepted limitation;
- `mental-model-blocks-v1.jpg` — approved as Section 04 layout/style reference.

Text transcripts and silence maps are version-controlled.
Generated WAV, MP4 and raster-image files remain local.

## VIDEO-001 CAPTIONS LOCK

Status:

`PASS / LOCKED`

Canonical artifacts:

- `VIDEO-001-proof/captions/video001-en-v1.srt`;
- `VIDEO-001-proof/captions/video001-en-v1.vtt`;
- `VIDEO-001-proof/captions/README.md`.

Parameters:

- language: English;
- cue count: 201;
- first cue: 00:00:00.000;
- final cue end: 00:10:31.500;
- maximum line length: 42 characters;
- maximum lines per cue: 2;
- zero-duration cues: none;
- overlaps: none.

QA:

- Whisper transcript comparison: PASS after targeted corrections;
- human caption playback review: PASS;
- overall: PASS / LOCKED.

Operational decision:

The CPU-only `small.en` transcription took several hours on the current
machine. Do not rerun Whisper unless narration changes. Reuse the locked
timings and authoritative script text.

Independent VLM review is optional and pending an accessible provider.
Google AI Studio is unavailable from the current region.

## VIDEO-001 production lessons

Фактический production mode:

`Deterministic-heavy with selective Kling motion`.

Решение:

- Kling остаётся инструментом для сцен, где естественное движение
  заметно улучшает результат;
- candidate Kling clips в storyboard не являются обязательным shot
  contract;
- UI, diagrams, typography, timing и controlled motion выполняются в
  Remotion, когда это точнее и легче исправлять;
- VIDEO-001 не должен получать дополнительные generative clips только
  ради формального соответствия первоначальному asset plan.

Наблюдения для будущей автоматизации:

1. Текущий TSX-per-section pipeline является способом создания первого
   эталона, а не финальной архитектурой.
2. Silence detection полезен для пауз, но недостаточен для смысловой
   синхронизации.
3. Следующие версии должны использовать word-level timestamps или
   forced alignment.
4. Повторяемые сцены должны перейти в reusable Remotion components.
5. Видео должно описываться scene manifest с timing events, а не
   уникальным большим TSX-файлом для каждой секции.
6. Automated QA должен проверять duration, missing scenes, empty
   transitions, text overflow, overlaps, safe areas и sampled frames.
7. Массовая orchestration откладывается до 3–5 эталонных роликов и
   появления viewer retention data.
8. Цель автоматизации — не гарантированный идеальный first take, а
   автоматические проверки, ограниченные retries и один human approval
   pass.

## Evaluation after publication

Monitor:

- impressions;
- CTR by traffic source;
- first 30-second retention;
- average percentage viewed;
- retention dips and spikes;
- packaging watch-time share;
- geography and language;
- meaningful comments;
- Shorts to Related Video traffic.

Provisional reference points:

- 30-second retention: 65% or higher;
- average percentage viewed: 40% or higher.

These are planning references, not pass/fail rules without sufficient data.

## Current feasibility gate

Stack microtests A–D и cold-open proof завершены со статусом PASS.

Подтверждено:

1. NOD сохраняет идентичность в коротком Kling motion.
2. Narration, generative motion и deterministic graphics можно менять независимо.
3. UI, уведомления, вкладки, телефон, мысль, timing и pressure-lines редактируются без повторной генерации Kling.
4. Для сложной метафоры дверей допустимо использовать утверждённый generated styleframe.
5. Для VIDEO-001 выбран balanced hybrid production mode.

This historical production gate is closed; VIDEO-001 is Public and now in post-launch monitoring.

## Cold-open proof specification v1.0

### Voice-over

> You open your laptop to finish one thing.
> Then a message appears. You close it.
> A tab reminds you of something else.
> You check your phone without even knowing why.
> Thirty seconds later, the document is still there—but the thought you had is gone.
> Maybe your attention span isn’t broken.
> Maybe your task just has too many exits.
> And if that’s the problem, forcing yourself to focus harder may be the wrong fix.

Original target: 29–32 seconds. Selected feasibility narration: 34 seconds with calmer delivery; accepted for the proof.

### Shot sequence

1. NOD opens one document.
2. A message appears.
3. The message closes and becomes an exit.
4. A browser tab becomes another exit.
5. NOD automatically reaches for the phone.
6. Message, tab and phone create a short switching loop.
7. NOD returns to the unchanged document.
8. The original thought is gone.
9. Camera reveals multiple open doors.
10. NOD tries to force concentration while the exits remain open.

### Minimum assets

NOD poses:

- neutral sitting;
- typing;
- closing notification;
- reaching for phone;
- confused;
- forcing concentration.

Props:

- desk and chair;
- laptop and document;
- blinking cursor;
- phone;
- message and thought bubbles;
- browser tab;
- modular open/closed door;
- message, browser and phone icons;
- one reusable room.

### Technical target

- 1920×1080;
- 16:9;
- 30 fps;
- 48 kHz audio;
- editable vector masters;
- separated voice and SFX;
- no irreplaceable generative-video dependency;
- mobile-readable composition.

### Pass criteria

- the visual sequence is understandable without narration;
- narration clearly communicates the `too many exits` thesis;
- NOD remains readable on a mobile screen;
- doors work as one consistent metaphor;
- assets and motions are reusable;
- revisions do not require regenerating whole scenes;
- hands-on production time and bottlenecks are recorded.

Heavy media and editable production files remain outside the public repository.

### Результат cold-open proof

Статус: PASS.

Итоговая версия:

`VIDEO-001-proof/remotion/out/cold-open-proof-v3.mp4`

Параметры:

- длительность: 34.645 секунды;
- видео: H.264, 1920×1080, 30 fps;
- аудио: AAC, 48 kHz, stereo;
- narration: Gemini 3.1 Flash TTS / Aoede / Empathetic / Natural;
- character motion: Kling 3.0 Pro;
- стоимость production Kling run: 90 credits;
- время Kling generation: 251 секунда;
- Remotion composition: 1038 кадров при 30 fps;
- воспроизведение: PASS;
- непрерывность звука: PASS;
- плавность переходов: PASS.

Производственное решение:

- Kling используется для ограниченного движения NOD;
- Remotion используется для UI, timing, compositing и pressure-lines;
- утверждённый A5 styleframe используется для multiple-exits reveal;
- SVG-варианты дверей отклонены из-за слабой читаемости;
- повторная генерация Kling для правок UI не требуется.

Допустимые ограничения:

- небольшой визуальный overlap во время перехода на A5;
- небольшая тень на голове NOD при наклоне;
- небольшое размытие пальцев во время печати;
- native-listener QA английского произношения остаётся обязательным перед публикацией.


---

# Adjacency Scan

Status: completed
Decision: expand internal positioning to `visual life skills for navigating modern life`.

## Comparative result

1. Digital behavior / attention — 92/100.
2. Learning / action systems — 89/100.
3. Social navigation — 82/100.
4. Decisions / behavioral economics — 79/100.
5. Practical philosophy — 72/100.
6. Generic everyday psychology — 61/100.

Scores are internal comparative judgments, not external statistics.

## Evidence

- Smart Adjacent: approximately 126K subscribers / 24 videos; public examples include phone addiction around 933K, body transformation around 1.6M, twenties around 208K, habits around 120K and productivity around 74K views.
- Smart Adjacent integrated Jomo with a trackable code and trial.
- Learning demand is supported by Justin Sung, Amy Wang, Gohar Khan, Elizabeth Filips and someunfilteredguy.
- Social navigation demand is supported by Charisma on Command, Vinh Giang and Vanessa Van Edwards.
- Pursuit of Wonder received approximately 2.2–2.5M views on an actionable game-theory video.
- Educated Wonder demonstrates that generic psychology can produce hits, but results are uneven and the format has high template/AI-slop risk.

All public counts must be rechecked before external citation.

## Decision

The launch channel combines:

1. Attention & Digital Behavior.
2. Learning & Action Systems.
3. Social Navigation.
4. Decisions & Money Behavior later.

Visual Curiosity and Animated Fitness remain potential separate channels.

Generic psychology and practical philosophy are not standalone launch strategies.


---

# VIDEO-001 — Post-launch monitoring

Status: delayed 8–9 day snapshot recorded

- Public URL: https://youtu.be/ow_eUmvptuM
- Public launch: 2026-08-05
- Planned 72-hour checkpoint: missed
- Recovered range: 2026-08-05 through 2026-08-13
- Capture date: 2026-08-14
- Evidence: two CSV exports and eight YouTube Studio screenshots
- Views: 26
- Unique viewers: 19
- Impressions: 581
- CTR: 2.6%
- Watch time: 1.0 hours, rounded
- Average view duration: 2:14
- Average percentage viewed: 21.3%
- Retention at 0:31: 38%
- Subscribers gained: +1
- Impressions shown in recommendation surfaces: 98.1%
- Views from thumbnail impressions: 15
- Average view duration from impressions: 1:35
- Watch time from impressions: 0.4 hours
- Known seeded traffic: present
- Owner-associated views: not quantifiable

Result:

- distribution: `FAIL_LOW_IMPRESSIONS`;
- packaging: `WEAK_SIGNAL`;
- first-31-second retention: `FAIL`;
- organic demand: `NOT_ESTABLISHED`;
- monetization trajectory: far below the stretch milestone;
- baseline: locked before any packaging intervention.

The platform provided a small recommendation test, but the combination of 2.6% CTR and weak impressions-derived watch duration did not support wider distribution. The largest negative signal is the fall to 38% by 0:31.

Canonical record: [`VIDEO001_ANALYTICS.md`](VIDEO001_ANALYTICS.md).

Record ID:

`VIDEO001_ANALYTICS_RECOVERY_2026_08_14`

---

# VIDEO-002 — Phone Checking Exit

Status: PUBLIC / LIVE / PLATFORM QA PASS

## Locked hypothesis

Turning off notifications can remove incoming interruptions without necessarily
reducing self-initiated checking. A practical friction-based experiment may
help viewers make checking intentional during one work session.

## Locked viewer problem

The viewer has silenced the phone but still reaches for it when work becomes
difficult, uncertain or briefly boring.

## Promise

Explain why silence and closure are different, then provide one bounded
25-minute Silent Door Test without addiction diagnoses, dopamine reductionism
or guaranteed outcomes.

## Published packaging

- title: `Turning Off Notifications Won't Fix Your Phone Habit`;
- launch thumbnail: B / `STILL CHECKING?`;
- Video ID: `C63q7i5GDI8`;
- Public URL: `https://youtu.be/C63q7i5GDI8`;
- public launch: 2026-08-14;
- platform QA: PASS.

The title, description and launch thumbnail are locked for the initial observation window. A/B/C platform thumbnail testing is deferred until channel eligibility becomes available.

## Research record

Canonical production documents:

- research and claim boundaries:
  [`VIDEO002_RESEARCH.md`](VIDEO002_RESEARCH.md);
- locked narration text:
  [`VIDEO002_SCRIPT.md`](VIDEO002_SCRIPT.md);
- preliminary scene architecture:
  [`VIDEO002_STORYBOARD.md`](VIDEO002_STORYBOARD.md).

## Pipeline objective

VIDEO-002 is the second completed manual benchmark and Shadow Automation test. Narration, captions, locked S01–S53 timing, production master, packaging and YouTube platform QA passed. The next pipeline task is to complete the automation summary and apply the measured lessons to VIDEO-003 without removing human editorial and publication gates.

Canonical narration, TTS-risk and caption records belong to [`VIDEO002_NARRATION.md`](VIDEO002_NARRATION.md).


---

# VIDEO-001 — Thumbnail intervention B

Status: ACTIVE
Start: 2026-08-15 at 08:30 UTC+7
Record ID: `VIDEO001_THUMBNAIL_INTERVENTION_2026_08_15`

Controlled change:

- title: unchanged;
- old thumbnail: C / `00:47`;
- new thumbnail: B / `NOT YOUR BRAIN`;
- incognito QA: PASS.

Hypothesis:

The diagnostic reframe `NOT YOUR BRAIN` will communicate the video premise more directly than the unexplained `00:47` data-curiosity thumbnail.

Evaluation:

- first checkpoint: approximately 2026-08-18 at 08:30 UTC+7;
- second checkpoint: approximately 2026-08-22 at 08:30 UTC+7;
- compare additional impressions, CTR and views;
- record `INSUFFICIENT_SAMPLE` if distribution remains too small;
- do not change the title during the intervention.

---

# VIDEO-003 — Bedtime scrolling

Status: RESEARCH GATE PASS / PACKAGING LOCK NEXT
Record ID: `VIDEO003_RESEARCH_GATE_2026_08_15`

Selected direction:

`Why You Keep Scrolling Even When You’re Tired`

Leading thumbnail:

`B — STILL AWAKE?`

Demand:

`PASS_WITH_LIMITATIONS`

The category shows repeat public demand across bedtime procrastination, late-night scrolling and phone-before-bed videos. The evidence validates further testing, not guaranteed performance.

Claim decision:

- use bedtime procrastination as a defined research construct;
- distinguish bedtime from while-in-bed delay with an exploratory-evidence caveat;
- describe media-and-sleep findings as associations unless stronger evidence applies;
- present autonomy, compensation and emotional regulation as possible motives;
- prohibit addiction, insomnia, ADHD and dopamine-reset diagnoses;
- prohibit universal claims that the viewer is scrolling because the day did not belong to them.

Canonical research and packaging brief:

[`VIDEO003_RESEARCH.md`](VIDEO003_RESEARCH.md)

Next gate:

`VIDEO003_TITLE_THUMBNAIL_AND_COLD_OPEN_LOCK`
