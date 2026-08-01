# Project Context

Updated: 2026-08-01
Status: pre-production / full script and storyboard
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

Позиционирование, аудитория, content pillars, визуальная система NOD и pipeline принадлежат [`PLAYBOOK.md`](PLAYBOOK.md).

Активный эксперимент — `VIDEO-001`. Его тема, titles, thumbnails, claims, outline и метрики принадлежат [`EXPERIMENTS.md`](EXPERIMENTS.md).

Stack feasibility status:

1. Test A / NOD visual development — PASS.
2. Test B1 / Kling character motion — PASS.
3. Test C1 / Remotion deterministic overlay — PASS.
4. Test D / narration — PASS; выбран Gemini 3.1 Flash TTS, Aoede, Empathetic, Natural.
5. Cold-open proof v3 — PASS; 34.645 секунды, 1920×1080, 30 fps.
6. Для VIDEO-001 подтверждён balanced hybrid pipeline: Kling + Remotion + утверждённые styleframes.

Сценарий VIDEO-001 v2 зафиксирован для полного TTS и timing QA:
[`video-001/SCRIPT.md`](video-001/SCRIPT.md).

Последовательность раскадровки v1 и production plan зафиксированы:
[`video-001/STORYBOARD.md`](video-001/STORYBOARD.md).

Следующий gate — утверждение первого full-video styleframe
`screen-switching-observation-v1.jpg`, затем генерация полного VO.

## 7. Current restrictions

До прохождения stack и visual feasibility gates запрещены:

- регистрация и финальный брендинг канала;
- публикация контента;
- массовая генерация сценариев;
- автоматизация полного производства;
- покупка дорогих дополнительных сервисов без отдельного эксперимента.
