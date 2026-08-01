# Operating Playbook

Updated: 2026-08-01
Status: draft v0.1

## 1. Editorial promise

Объяснять проблемы современной жизни визуально, практично и без guru-позиционирования.

Контент должен давать зрителю:

1. узнаваемую проблему;
2. неожиданное, но доказательное объяснение;
3. простую визуальную модель;
4. проверяемое действие;
5. ощущение контроля, а не стыда.

## 2. Audience

Primary viewer:

- 18–34;
- English-speaking;
- student или knowledge worker;
- phone-heavy;
- испытывает проблемы с focus, learning, action или communication;
- знает vocabulary интернет-культуры;
- не доверяет miracle fixes и motivational shouting.

Tone:

- clear;
- calm;
- lightly humorous;
- non-clinical;
- non-judgmental;
- culturally neutral;
- no fake personal story.

## 3. Content pillars

Утверждены:

1. Attention & Digital Behavior.
2. Learning & Action Systems.
3. Social Navigation.
4. Decisions & Money Behavior — после подтверждения первых кластеров.

Launch sequence:

1. attention span / task switching;
2. phone addiction / doomscrolling;
3. learning difficult things;
4. starting before feeling ready;
5. small talk / social blanking.

Practical philosophy используется только для actionable ideas. Generic psychology, health и finance не должны размывать стартовое ожидание аудитории.

Темы здоровья, психологии и финансов требуют повышенного fact-checking.

Не давать:

- медицинские диагнозы;
- лечение;
- гарантированные результаты;
- инвестиционные рекомендации;
- псевдонаучные dopamine claims;
- вымышленные credentials.

## 4. Long-form format

Целевая длительность: 8–11 минут.

Базовая структура:

1. Cold open.
2. Fulfilment of title/thumbnail promise.
3. Reframe or myth correction.
4. Visual explanation of mechanism.
5. Practical protocol.
6. Small experiment.
7. One CTA.

Рабочая длина сценария: 1,250–1,600 English words.

Визуальное изменение: ориентировочно каждые 3–7 секунд, без хаотичного overstimulation.

## 5. Packaging system

Title и thumbnail разрабатываются до финального сценария.

Для каждого long-form:

- не менее трёх title concepts;
- не менее трёх thumbnail concepts;
- одна проблема;
- один визуальный конфликт;
- один dominant object;
- минимум текста;
- отсутствие обещаний, которые ролик не выполняет.

YouTube Test & Compare оценивает варианты по watch-time share, поэтому CTR рассматривается вместе с удержанием.

Рабочая воронка:

Impression → title/thumbnail → click → fulfilled promise → watch time → next action.

## 6. NOD visual system

NOD — герой-зритель.

Base palette:

- cream background;
- graphite outline;
- electric-orange accent.

Orange означает:

- distraction;
- temptation;
- interruption;
- warning;
- unresolved conflict.

После решения сцена возвращается к спокойной палитре.

Минимальный asset pack:

- 12 expressions;
- 16 poses;
- phone;
- laptop;
- browser tabs;
- notifications;
- doors/portals;
- timer;
- note sheet;
- energy indicator;
- room;
- arrows and diagram elements.

Motion grammar:

- problem: fast cuts, interruption, orange flashes;
- explanation: diagrams, morphing, controlled camera;
- solution: removal or closing of exits;
- final: fewer objects and calmer movement.

## 7. Production pipeline

Первоначальный ручной pipeline:

1. Topic hypothesis.
2. Competitor and demand check.
3. Source collection.
4. Claim table.
5. Angle and promise.
6. Three packaging concepts.
7. Outline.
8. English script.
9. Independent LLM critique.
10. Fact and language QA.
11. Storyboard.
12. Asset list.
13. Voice generation.
14. Controlled 2D production.
15. Edit and sound.
16. Final policy/copyright QA.
17. Publish.
18. Repurpose.
19. Analytics.
20. Postmortem.

Automation разрешается только по повторяемым участкам после 3–5 эталонов.

## 8. Distribution pipeline

Один long-form создаёт:

- до 3 YouTube Shorts;
- до 3 Instagram Reels;
- 3–5 Threads posts.

Shorts должны вести на long-form через Related Video.

Cross-platform performance измеряется, а не предполагается.

## 9. Monetization fit

Предпочтительные категории:

- learning platforms;
- book-summary services;
- language learning;
- productivity software;
- task managers;
- focus tools;
- writing assistants;
- educational products;
- relevant apps and subscriptions.

До интеграции проверяются:

- доступность программы;
- payout route;
- geographic restrictions;
- brand safety;
- доказательность claims;
- disclosure requirements;
- соответствие конкретному ролику.

## 10. Quality gate

Ролик не публикуется, если:

- упаковка обещает больше сценария;
- источник не найден для существенного factual claim;
- английский звучит как машинный перевод;
- визуальные сцены не соответствуют общей системе;
- ролик повторяет конкурента;
- CTA не соответствует аудитории;
- используются неясные права на музыку, изображения или видео;
- synthetic content требует disclosure, но он не подготовлен.

## 11. Technology architecture

### Principles

- Формат канала не должен зависеть от одного provider или одной модели.
- Ручная creative development отделяется от автоматического production pipeline.
- Модели выбираются через конфигурацию, а не зашиваются в workflow.
- Все media outputs скачиваются и сохраняются вне provider storage.
- Human approval обязателен перед публикацией пилотных материалов.
- Generative и deterministic production могут сочетаться в одной сцене.

Внутренние операции pipeline:

- `generate_text`;
- `generate_image`;
- `generate_video`;
- `generate_voice`;
- `render_scene`;
- `assemble_video`;
- `publish_draft`.

Конкретные providers подключаются через заменяемые adapters.

### Manual creative layer

Genspark используется для:

- ручных LLM-итераций;
- исследования;
- style exploration;
- character sheets;
- keyframes;
- thumbnail ideation;
- сравнения моделей.

Genspark не используется как автоматический backend или для массового программного извлечения результатов.

### Automated text layer

OpenRouter является основным LLM gateway для автоматизации.

Маршруты:

- `QUALITY` — сложная редактура и финальный QA;
- `FAST` — интерактивные операции;
- `CHEAP` — массовые черновые задачи;
- `FALLBACK` — резервная модель или provider.

Конкретные model slugs хранятся в конфигурации. Pipeline должен поддерживать timeout, retry, fallback, budget limits и выбор privacy-compatible providers.

### Media generation layer

Kie.ai является основным media API для пилотного pipeline.

Основные задачи:

- image generation;
- keyframe generation;
- Kling video generation;
- text-to-speech;
- API-driven media experiments.

Kling 3.0 является первым кандидатом для character motion и expressive scenes с использованием start/end frames и Element references.

Kie.ai не является незаменимым dependency. Интеграция должна допускать замену на официальный API или другого provider.

Для каждой генерации сохраняются:

- provider;
- model;
- parameters;
- prompt;
- input asset hashes;
- task ID;
- generation date;
- cost;
- output path;
- rights/terms snapshot when material.

Результаты скачиваются сразу после генерации и не полагаются на временное provider storage.

### Deterministic production layer

Remotion используется для программируемых:

- compositions;
- typography;
- UI;
- diagrams;
- doors, tabs and notifications;
- captions;
- transitions;
- exact timing;
- reusable scene templates.

FFmpeg используется для:

- assembly;
- conversion;
- audio mixing;
- normalization;
- proxy generation;
- final encoding.

DaVinci Resolve допускается как необязательный ручной finishing layer. Pipeline не должен зависеть от него.

### Voice architecture

Master narration создаётся отдельно от video generation.

Production narration candidate — Gemini 3.1 Flash TTS through Kie.ai with the Aoede voice. ElevenLabs remains a replaceable fallback.

Narration и visual generation хранятся отдельными дорожками, чтобы менять текст, голос и монтаж независимо.

Kling native audio допускается для ambient sound, reactions и отдельных синхронных сцен, но не является master narration по умолчанию.

### Orchestration and storage

- n8n — orchestration;
- GitHub — documentation, prompts, manifests, schemas and code;
- local storage — editable assets, generation outputs, audio and video;
- FFmpeg/Remotion — render workers.

Большие media files, API keys, voice samples и приватные документы не хранятся в публичном GitHub.

S3-compatible storage рассматривается только после появления реальной потребности в масштабировании.

### Distribution

На пилотном этапе:

- YouTube long-form master загружается и проверяется вручную через YouTube Studio;
- Postmypost используется для подготовки и дистрибуции Shorts, Reels, TikTok и Threads;
- автоматическая публикация без human approval запрещена;
- автоматизация long-form upload рассматривается после 3–5 эталонных публикаций.

### Production modes

До завершения stack feasibility test не выбирается единственный production mode.

Кандидаты:

1. `Kling-heavy` — большая часть character motion создаётся генеративно.
2. `Balanced hybrid` — generative character motion сочетается с deterministic UI, typography и compositing.
3. `Deterministic-heavy` — основной ролик собирается в Remotion, а generative video используется выборочно.

Выбор выполняется по результатам микротестов, а не заранее.

## 12. Stack feasibility gate

### Test A — NOD visual development

Status: PASS.

Подтверждены:

- canonical NOD v1.0;
- expression vocabulary с ограниченным reference use;
- desk-notification style frame;
- multiple-exits style frame;
- one-generation-first workflow.

Canonical reference и результаты принадлежат `VIDEO-001-proof/assets/nod/manifest.txt`.

### Test B — Kling character motion

Status: PASS.

Минимальный тест:

- один image-to-video run;
- продолжительность не менее 5 секунд;
- `std` для feasibility и `pro` для production;
- `multi_shots: false`;
- `sound: false`;
- один целостный JPG/PNG input;
- точные параметры и prompt сохраняются в manifest.

Повторный run выполняется только при неоднозначном результате или когда run-to-run reproducibility становится отдельной production-задачей.

Проверяются:

- character identity;
- rear paper layer;
- face and limbs;
- scene stability;
- outline flicker;
- editability;
- temporal quality.

### Test C — deterministic compositing

Status: PASS.

Минимальный тест проверяет:

- импорт Kling MP4 в Remotion;
- SVG/shape overlay поверх видео;
- точное позиционирование;
- frame-based timing;
- render и playback;
- изменение UI без повторной генерации Kling.

Notification-to-door morph, camera movement и сложное occlusion проверяются уже в 30-секундном cold-open proof, а не отдельным искусственным микротестом.

SVG не передаётся в Kling напрямую. Он:

1. встраивается в flattened keyframe до Kling, если нужен direct interaction;
2. либо композится после Kling как deterministic overlay.

### Test D — narration

Status: PASS.

Проверены ElevenLabs и две Gemini 3.1 Flash TTS deliveries. Выбран Aoede / Empathetic / Natural.

Проверить:

- neutral international English;
- calm non-guru delivery;
- естественные паузы;
- повторяемость голоса;
- пригодность для независимого монтажа;
- отсутствие зависимости от native Kling audio.

Для каждого теста сохраняются:

- provider and exact model;
- parameters and prompt;
- task ID, если доступен;
- generation cost, если доступна;
- hands-on time;
- successful and failed runs;
- consistency;
- editability;
- reusability;
- main bottleneck;
- recommended production mode.

Если историческая метрика не была записана, используется `not recorded`; значения не восстанавливаются догадками.
