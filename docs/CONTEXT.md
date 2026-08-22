# Project Context

Updated: 2026-08-17
Status: VIDEO-001, VIDEO-002 and VIDEO-003 Public / platform QA complete
Source of truth for project-level context

## 1. Goal

Создать с нуля масштабируемый AI-assisted YouTube-медиаактив.

Финансовые ориентиры:

- первый уровень: $1,000 / около 80,000 ₽ в месяц;
- стабильным считается доход, сохраняющийся не менее трёх месяцев;
- долгосрочная цель — автоматизируемая и масштабируемая модель.

Проект не должен превращаться в консалтинг, внедрения или постоянную продажу личного труда.

## 2. Owner resources

- IT и automation background.
- n8n, LLM, API, FFmpeg и другие инструменты.
- Готовность вручную произвести первые эталонные ролики.
- Возможность использовать собственное лицо или голос как основу синтетического персонажа.
- Английский создаётся и проверяется с помощью LLM; native QA подключается при доказанной необходимости.
- Исходной аудитории нет.
- Расходы должны подтверждаться экспериментами.

IT является производственным инструментом, а не обязательной тематикой канала.

## 3. Operating model

Человек отвечает за стратегию, гипотезы, editorial judgment, риски и итоговые решения.

AI и автоматизация могут помогать с исследованием, сценариями, раскадровкой, ассетами, озвучкой, монтажом, репакетингом и аналитикой.

Массовое производство запрещено до создания 3–5 ручных эталонных роликов и подтверждения повторяемого стандарта.

## 4. Platform constraints

Подтверждено официальными источниками:

- российские AdSense-аккаунты деактивированы;
- штатная регистрация нового YPP из России ограничена;
- AI-контент не запрещён сам по себе;
- реалистичный существенно изменённый synthetic content может требовать disclosure;
- массовый повторяющийся или неаутентичный контент может не пройти монетизацию.

Запрещены fake identity, fake documents, KYC evasion, bought engagement и stolen content.

Актуальные платформенные источники хранятся в [`SOURCES.md`](SOURCES.md).

## 5. Revenue strategy

Приоритеты:

1. Sponsorships.
2. Affiliate / CPA / CPL.
3. YPP через допустимую структуру или посредника.
4. Licensing и localization rights.
5. Revenue share с владельцами продуктов.
6. Дополнительные subscriptions/donations.
7. Продажа канала или доли в медиаактиве.

AdSense не является единственной моделью.

Способ получения выплат выбирается отдельно для каждого контрагента с учётом закона, налогов, KYC/AML, доступности payout provider и условий договора. Crypto является возможным способом расчёта, но не считается единственным заранее. Обход ограничений платформ и платёжных систем запрещён.

## 6. Current stage

The Fewer Exits channel, VIDEO-001 and VIDEO-002 are Public. Launch and platform QA are complete for both videos. Canonical VIDEO-001 launch details belong to [`CHANNEL_LAUNCH.md`](CHANNEL_LAUNCH.md) and [`VIDEO001_PUBLISHING.md`](VIDEO001_PUBLISHING.md). Canonical VIDEO-002 launch details belong to [`VIDEO002_PUBLISHING.md`](VIDEO002_PUBLISHING.md).

VIDEO-002 publication record:

- Video ID: `C63q7i5GDI8`;
- Public URL: `https://youtu.be/C63q7i5GDI8`;
- public launch: 2026-08-14;
- platform QA: PASS.

The active workstream is:

1. VIDEO-001 and VIDEO-002 post-launch monitoring;
2. complete the VIDEO-002 Shadow Automation summary;
3. begin VIDEO-003 topic and production planning;
4. prepare for the Day-30 checkpoint on 2026-08-27.

The output target, cadence, growth milestones, backlog and stop conditions
belong to [`ROADMAP_30D.md`](ROADMAP_30D.md).

Pipeline timing, cost, retries, defects and automation candidates for
VIDEO-002 belong to
[`SHADOW_AUTOMATION.md`](SHADOW_AUTOMATION.md).

VIDEO-001 remains the first manual benchmark. Its locked source, master,
caption and production records remain valid historical evidence and should
not be rewritten as the current production gate.

Repository policy remains unchanged: source code, Markdown, manifests,
prompts, transcripts and timing maps are version-controlled; generated media
and render outputs remain local unless an explicit repository rule says
otherwise.

## 7. Current restrictions

Разрешено:

- производить VIDEO-002 и последующие ручные benchmark-видео;
- постепенно автоматизировать повторяемые механические операции;
- анализировать VIDEO-001 без немедленной смены нескольких packaging variables;
- ускорять cadence при сохранении quality gates.

По-прежнему запрещены:

- массовая шаблонная генерация;
- unattended publication;
- запуск второго или отдельного языкового канала без нового решения;
- публикация непроверенных автоматических переводов или дубляжей;
- покупка engagement;
- fake identity, fake documents, KYC evasion и обход региональных ограничений;
- дорогие сервисы без отдельного эксперимента.

Automatic dubbing is disabled. All experimental auto-dub tracks and translated
titles/descriptions created before this checkpoint were deleted.


## 8. Analytics and cadence correction — 2026-08-14

Record ID:

`VIDEO001_ANALYTICS_RECOVERY_2026_08_14`

The delayed VIDEO-001 snapshot is now recorded in [`VIDEO001_ANALYTICS.md`](VIDEO001_ANALYTICS.md). The planned 72-hour checkpoint was missed; the recovered range covers 2026-08-05 through 2026-08-13.

The initial benchmark produced 26 views from 581 impressions, 2.6% CTR, 2:14 average view duration, 21.3% average percentage viewed and 38% retention at 0:31. These are weak early signals, not proof that the channel can never work. They do establish that the current topic-packaging-opening combination did not earn broader distribution in its first small recommendation test.

The active operating correction is:

1. increase validated hypothesis throughput;
2. design packaging before full production;
3. gate the first 30 seconds separately;
4. automate repeatable technical work;
5. preserve human editorial and publication decisions;
6. avoid another nine-day cycle before the next analytics checkpoint.

VIDEO-002 used a deterministic-heavy Remotion implementation with a small number of bespoke generated cinematic assets. Its visual-watchability risk is real but unproven and must be evaluated from VIDEO-002 retention rather than asset count alone.


## 9. VIDEO-003 research start — 2026-08-15

Record ID:

`VIDEO003_RESEARCH_GATE_2026_08_15`

VIDEO-001 thumbnail-only intervention began on 2026-08-15 at 08:30 UTC+7. Thumbnail C / `00:47` was replaced by B / `NOT YOUR BRAIN`; title, description and visibility remained unchanged.

VIDEO-003 selected direction:

`Why You Keep Scrolling Even When You’re Tired`

Demand and claims status:

- demand signal: `PASS_WITH_LIMITATIONS`;
- editorial direction: approved;
- claims gate: PASS;
- leading thumbnail: B / `STILL AWAKE?`;
- target runtime: 6–8 minutes;
- production authorization: not yet granted.

Canonical VIDEO-003 research record:

[`VIDEO003_RESEARCH.md`](VIDEO003_RESEARCH.md)

Next required gate:

`VIDEO003_TITLE_THUMBNAIL_AND_COLD_OPEN_LOCK`


## 10. VIDEO-003 script draft — 2026-08-15

The title, leading thumbnail direction, first 30 seconds and argument outline passed human editorial lock.

Full script draft:

[`VIDEO003_SCRIPT.md`](VIDEO003_SCRIPT.md)

Status:

- script authorization: granted;
- full draft: accepted;
- AI English-language QA: PASS;
- native-speaker QA: not performed and accepted for this benchmark;
- narration authorization: granted;
- asset production: not granted.

Next required gate:

`VIDEO003_TTS_GENERATION_AND_COMPLETENESS_QA`


## 11. VIDEO-003 narration and captions — 2026-08-15

The accepted script was split into two tracked TTS inputs. This mitigated the long-generation omission defect observed during VIDEO-002.

Canonical record:

[`VIDEO003_NARRATION.md`](VIDEO003_NARRATION.md)

Status:

- TTS text: locked;
- target voice: Aoede;
- narration master: PASS;
- duration: 06:29.342;
- completeness QA: PASS;
- physical join QA: PASS;
- voice continuity: PASS WITH ACCEPTED VARIATION;
- captions: PASS, 143 cues;
- acoustic timing source: CapCut Desktop 9.2.8;
- caption text: exact reconstruction of the authoritative narration;
- reusable CapCut export and caption-alignment tools: created and validated;
- broad asset production: not yet authorized.

Next required gate:

`VIDEO003_STORYBOARD_AND_TIMING_MANIFEST`

## 12. VIDEO-003 production implementation — 2026-08-17

Canonical production record:

[`VIDEO003_PRODUCTION.md`](VIDEO003_PRODUCTION.md)

Current status:

- storyboard and timing manifest: LOCKED;
- semantic scenes: 25;
- production compositions: 8;
- declarative scene coverage: PASS;
- layout proof: PASS WITH REQUIRED UPGRADES;
- NOD source-frame QA: PASS;
- production motion proof: PASS;
- production visual QA: PASS;
- final full-size render: PASS;
- final playback QA: PASS.

VIDEO-003 validated the faster batch-production direction. Mechanical gates are grouped, and human visual review happens on complete proofs rather than after every composition.

Next required gate:

`VIDEO003_PUBLIC_PLATFORM_QA`

## VIDEO-003 final production acceptance — 2026-08-17

VIDEO-003 completed final technical render, decode validation, contact-sheet review and human full-playback QA. The accepted local master contains 11,681 frames at 1920x1080 and 30 fps, with 24 kHz mono AAC narration. Its SHA-256 is `eea99f513ab0af9307a7b6a6c3174067b43f70fb284fd5fa40013251084919d8`. Generated media remains local and ignored; production source, manifests, prompts and documentation are version-controlled.

Thumbnail, publication packet and public platform QA are complete.

## VIDEO-003 public launch — 2026-08-17

VIDEO-003 is Public.

- Video ID: `st3uCBzCXNw`;
- public URL: `https://youtu.be/st3uCBzCXNw`;
- launch: 2026-08-17 22:09 UTC+7 / 2026-08-17 15:09 UTC;
- visibility: Public;
- 1080p processing and public playback: PASS;
- channel-page visibility: PASS;
- thumbnail B: PASS;
- reviewed English captions: PASS;
- description timestamp links: PASS;
- visual chapter segmentation: unavailable and accepted;
- first comment: published;
- YouTube Checks: PASS.

Canonical publication record:

[`VIDEO003_PUBLISHING.md`](VIDEO003_PUBLISHING.md)

The exact launch time is retained as an experimental parameter. YouTube states that publication time may affect immediate viewership when an audience is active, but is not known to affect long-term video performance. No channel-specific timing conclusion is permitted until sufficient audience-history data exists.

Next workstream: compare VIDEO-001 and VIDEO-002 analytics, then establish the VIDEO-003 post-launch baseline after enough impressions accumulate.

## VIDEO-001 / VIDEO-002 analytics and VIDEO-004 direction — 2026-08-19

The VIDEO-001 thumbnail-B 72-hour checkpoint produced only one additional impression and is classified as insufficient sample. YouTube also reconciled the displayed view count from the earlier 26-view snapshot to 24. The historical snapshot is preserved, and the later platform reconciliation is documented in [`VIDEO001_ANALYTICS.md`](VIDEO001_ANALYTICS.md).

The initial VIDEO-002 snapshot contains 46 impressions, four views and insufficient retention data. It is documented in [`VIDEO002_ANALYTICS.md`](VIDEO002_ANALYTICS.md). No VIDEO-002 packaging conclusion is permitted from this sample.

VIDEO-004 moves from the three-video phone and digital-behavior sequence into the broader procrastination and task-initiation demand cluster. The accepted direction, public demand evidence, claims boundary and provisional expanded channel core are documented in [`VIDEO004_RESEARCH.md`](VIDEO004_RESEARCH.md).

Next workstream: claims research, competitor-package review and cold-open development for VIDEO-004. Title and thumbnail remain leading candidates rather than locked publication metadata.

## VIDEO-004 package lock — 2026-08-19

Owner QA accepted the differentiated procrastination package:

- title: `Why You Avoid the Work That Matters Most`;
- thumbnail: `NOT NOW.`;
- cold open: `RELIEF_NOW_A`;
- target runtime: approximately 6:30–7:30.

The package and cold open are locked. Script, narration, assets, production and publication remain unauthorized until their respective gates pass.

`NEXT_WORKSTREAM=VIDEO004_SCRIPT_AND_STORYBOARD_QA`

## VIDEO-004 production acceptance — 2026-08-19

The owner reviewed the Russian semantic translation and accepted the English narration script and the 24-scene, 8-composition storyboard for production.

Authoritative narration was split mechanically into two tracked TTS inputs. Narration generation is authorized. Visual asset generation remains blocked until audio completeness QA and exact timing pass.

`NEXT_WORKSTREAM=VIDEO004_TTS_GENERATION_AND_COMPLETENESS_QA`

## VIDEO-004 timing lock — 2026-08-19

Accepted narration and captions were compiled into a locked 24-scene, eight-composition timing manifest at 30 fps. C01 is the highest-priority hero composition and implements the owner-approved escalating-substitution visual hypothesis across the first 33.833 seconds.

`NEXT_WORKSTREAM=VIDEO004_ASSET_PLAN_AND_REMOTION_BATCH_IMPLEMENTATION`

## VIDEO-004 layout recovery and redesign research — 2026-08-20

The complete 395-second VIDEO-004 low-resolution layout proof passed technical validation and failed human visual QA. C01 continuity, causal progression, scene ownership and object-motion logic remain accepted. The serif typography, beige-graphite-orange grammar, shared presentation-like treatment across C02 through C08, central text wrapping and placeholder character treatment were rejected.

The accepted narration master, 147 captions, 24-scene timing and eight-composition ownership remain locked. The committed Remotion source is a recovery checkpoint, not an accepted final visual design.

External audio and visual claims were revalidated and transferred to canonical production, narration and automation records. The temporary recovery journal was retired after transfer.

`NEXT_WORKSTREAM=VIDEO004_VISUAL_GRAMMAR_REDESIGN_SPEC_AND_C01_ASSET_PLAN`

## VIDEO-004 visual grammar and C01 source plan — 2026-08-20

The redesigned visual system is specified in `docs/VIDEO004_PRODUCTION.md`. It preserves canonical NOD and the accepted causal architecture while introducing composition-owned visual modes, bounded typography presets, explicit semantic color roles and stronger light-dark-depth contrast.

Only the redesigned A01 opening-workspace still is authorized for the next generation unit. Dependent relief, motion and NOW-to-LATER sources remain blocked until A01 passes human identity, anatomy, project-readability and composition QA. Locked narration, captions, timing and composition ownership remain unchanged.

`NEXT_WORKSTREAM=VIDEO004_C01_A01_SOURCE_GENERATION_AND_HUMAN_QA`

## VIDEO-004 accepted production checkpoint — 2026-08-22

VIDEO-004 production and full audio-visual playback QA passed after the redesign. The accepted final master is local at `VIDEO-004-proof/remotion/out/video004-master-final-v1.mp4`; its SHA-256 is `fd96e10960e1950340388cd7bcd3085199ac8fce75d611ba436d2bcc2524eca3`.

The thumbnail gate was reopened after the original `NOT NOW.` package lock. Launch thumbnail B v1, `RELIEF IS THE TRAP`, was accepted. B v2 was rejected as too smooth; A remains an alternative.

Canonical continuation is `docs/VIDEO004_PUBLISHING.md`.

`NEXT_WORKSTREAM=VIDEO004_PUBLICATION_PACKET_COMPLETION`


## VIDEO-004 publication packet completion — 2026-08-22

The VIDEO-004 publication packet and external backup are verified. The accepted master was copied without rerendering and remains preserved under `remotion/out/`. Locked upload metadata, reviewed captions, launch thumbnail B v1 and checksums are present in the ignored local payload and represented by the tracked packet manifest.

`NEXT_WORKSTREAM=VIDEO004_YOUTUBE_UPLOAD_PROCESSING_AND_PLATFORM_QA`

## VIDEO-004 public publication checkpoint — 2026-08-22

VIDEO-004 is Public at `https://youtu.be/J0kKV_bic_M`. Public page availability, accepted title, channel identity and 1080p processing passed. The first comment was published.

Final explicit verification remains open for YouTube Checks, reviewed English captions, timestamp links, launch thumbnail, public incognito playback and channel-page visibility.

`NEXT_WORKSTREAM=VIDEO004_FINAL_PUBLIC_PLATFORM_QA`
