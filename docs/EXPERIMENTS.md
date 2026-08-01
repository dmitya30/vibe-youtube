# Experiments

Updated: 2026-08-01

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

Status: script and narration locked / first production styleframe approved
Publication: not approved

## Hypothesis

A task-switching and environment-design explanation will differentiate the video from generic `fix your attention span` content.

## Viewer problem

The viewer starts one task, switches to messages, tabs or short-form feeds, and concludes that their brain is permanently damaged.

## Promise

Explain external and self-created task exits, then provide a practical experiment without medical claims, fake dopamine resets or guaranteed results.

## Packaging

Default title:

`You Don’t Need More Focus — You Need Fewer Exits`

Alternatives:

1. `Why You Keep Switching Tasks — Even With Notifications Off`
2. `Your Attention Span Isn’t the Problem — Your Setup Is`

Thumbnail concepts:

1. `47 SEC` — NOD surrounded by open orange doors.
2. `STILL CHECKING` — notifications are off, but NOD reaches for the phone.
3. No text — one task surrounded by visual exits.

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

- locked script v2: [`SCRIPT.md`](SCRIPT.md);
- storyboard and asset plan v1: [`STORYBOARD.md`](STORYBOARD.md).

Полная narration v1:
- duration: 501.400 seconds / 8:21.40;
- codec: PCM signed 16-bit little-endian;
- sample rate: 24 kHz;
- channels: mono;
- voice consistency: PASS;
- volume consistency: PASS;
- section boundaries: PASS;
- unnatural pronunciation detected by owner: No.

Утверждён первый production styleframe:
`VIDEO-001-proof/assets/nod/screen-switching-observation-v1.jpg`.

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

Следующий этап — полный английский сценарий и раскадровка.

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
