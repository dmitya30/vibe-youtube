# Project Context

Updated: 2026-08-02
Status: production / VIDEO-001 master PASS / LOCKED
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

Выбран один англоязычный пилотный канал.

Позиционирование, аудитория, content pillars, визуальная система NOD и
pipeline принадлежат [`PLAYBOOK.md`](PLAYBOOK.md).

Активный эксперимент — `VIDEO-001`. Его тема, packaging, claims, метрики
и production status принадлежат [`EXPERIMENTS.md`](EXPERIMENTS.md).

Stack feasibility status:

1. Test A / NOD visual development — PASS.
2. Test B1 / Kling character motion — PASS.
3. Test C1 / Remotion deterministic overlay — PASS.
4. Test D / narration — PASS.
5. Cold-open proof v3 — PASS / LOCKED.
6. Для VIDEO-001 подтверждён balanced hybrid pipeline:
   Kling + Remotion + approved styleframes.

Полный публичный сценарий VIDEO-001 v2:
[`SCRIPT.md`](SCRIPT.md).

Production sequence, asset plan и точные тайминги:
[`STORYBOARD.md`](STORYBOARD.md).

Актуальная full narration:

- файл: `VIDEO-001-proof/audio/video001-narration-v2.wav`;
- длительность: 631.570958 секунды / 10:31.57;
- PCM signed 16-bit little-endian;
- 24 kHz;
- mono;
- Sections 01–04 и 06–07: Gemini 3.1 Flash TTS;
- Section 05: Gemini 2.5 Pro TTS;
- voice: Aoede;
- style: Empathetic;
- pace: Natural;
- voice, volume, pronunciation и completeness: PASS.

Production status:

1. Section 01 / cold open — PASS / LOCKED.
2. Section 02 / 47 seconds — PASS / LOCKED.
3. Section 03 / two kinds of exits — PASS / LOCKED.
4. Section 04 / switch cost — PASS / LOCKED.
5. Section 05 / One Door Protocol — PASS / LOCKED.
6. Section 06 / 25-minute experiment — PASS / LOCKED.
7. Section 07 / ending — PASS / LOCKED.


Master status:

- source: `VIDEO-001-proof/remotion/src/Video001Master.tsx`;
- approved local render:
  `VIDEO-001-proof/remotion/out/video-001-master-v1.mp4`;
- duration: 631.600 seconds / 18,948 frames;
- mux duration: 631.658667 seconds;
- resolution: 1920x1080;
- fps: 30;
- automated technical QA: PASS;
- human boundary/audio/visual QA: PASS;
- overall: PASS / LOCKED.
Текущий gate — packaging и publication-readiness review для VIDEO-001.

Repository policy:

- source code, Markdown, manifests, prompts, transcripts, timing maps
  и другие небольшие текстовые production artifacts коммитятся;
- generated audio, video, raster images и render outputs остаются
  локальными и исключаются через `.gitignore`.

## 7. Current restrictions

До прохождения stack и visual feasibility gates запрещены:

- регистрация и финальный брендинг канала;
- публикация контента;
- массовая генерация сценариев;
- автоматизация полного производства;
- покупка дорогих дополнительных сервисов без отдельного эксперимента.
