# Project Context

Updated: 2026-08-14
Status: VIDEO-001 and VIDEO-002 Public / VIDEO-003 planning next
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
