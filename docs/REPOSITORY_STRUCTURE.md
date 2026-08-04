# Repository Structure

Updated: 2026-08-04
Status: active

Этот файл фиксирует каноническую структуру репозитория, назначение
каталогов и жизненный цикл локальных production-файлов.

## 1. Canonical tree

```text
vibe-youtube/
├── README.md
├── .gitignore
├── .gitattributes
├── docs/
│   ├── CONTEXT.md
│   ├── PLAYBOOK.md
│   ├── EXPERIMENTS.md
│   ├── SOURCES.md
│   ├── SCRIPT.md
│   ├── STORYBOARD.md
│   └── REPOSITORY_STRUCTURE.md
├── archive/
│   └── historical documents
└── VIDEO-001-proof/
    ├── assets/
    │   ├── nod/
    │   │   ├── manifest.txt
    │   │   └── local raster source assets
    │   └── video/
    │       └── local source video assets
    ├── audio/
    │   ├── full-voice-list.txt
    │   ├── local master narration
    │   └── segments/
    │       ├── tracked transcripts and silence maps
    │       └── local WAV segments
    ├── captions/
    │   ├── README.md
    │   ├── video001-en-v1.srt
    │   └── video001-en-v1.vtt
    └── remotion/
        ├── src/
        │   └── tracked compositions
        ├── scripts/
        │   └── sync-public.py
        ├── public/
        │   └── generated runtime-only asset staging
        ├── out/
        │   └── local renders and active QA contact sheets
        ├── package.json
        ├── package-lock.json
        ├── remotion.config.ts
        └── tsconfig.json
```

## 2. Version-controlled files

Коммитятся:

- source code и configuration;
- Markdown documentation;
- manifests и production notes;
- narration transcripts;
- reviewed SRT/VTT captions;
- silence maps и другие текстовые timing artifacts;
- lock/status information.

## 3. Local-only files

Не коммитятся:

- MP4, MOV и другие generated video;
- WAV, MP3 и другие audio files;
- JPG, PNG, WEBP и другие raster images;
- contact sheets;
- render outputs;
- caches, temporary files и secrets.

Правила исключения задаются только корневым `.gitignore`.

## 4. Media roots

Единственный канонический корень production media:

```text
VIDEO-001-proof/
```

Канонические исходные media-файлы остаются в:

```text
VIDEO-001-proof/assets/
VIDEO-001-proof/audio/
```

Remotion использует отдельный generated runtime root:

```text
VIDEO-001-proof/remotion/public/
```

Перед render выполняется:

```bash
npm run sync-public
```

`sync-public.py` сканирует literal-вызовы `staticFile()`, проверяет наличие
каждого исходника и создаёт в `remotion/public/` только необходимое подмножество
media. На одном диске используются hard links; при невозможности применяется
автоматический copy fallback.

`remotion/public/` является generated local staging directory, исключён из Git
и не считается вторым каноническим media root. Это предотвращает копирование
всего `VIDEO-001-proof/`, включая `remotion/out/`, при каждом bundle.

### Master assembly strategy

The first complete VIDEO-001 master is rendered in Remotion as an integration
reference. This validates all source components, runtime assets, section
boundaries and audio tracks together.

For later revisions:

1. render only changed sections;
2. retain approved locked section renders locally;
3. use FFmpeg concat with stream copy when codecs, resolution, fps, pixel
   format and audio parameters match;
4. use a full Remotion master render only after composition-level changes or
   when a new integration reference is required.

This avoids repeating an approximately one-hour full render when unchanged
locked sections already exist.

## 5. Remotion output lifecycle

`VIDEO-001-proof/remotion/out/` — единственный локальный каталог
рендеров.

Во время активного QA в нём могут находиться:

- текущий section render;
- текущий contact sheet.

После PASS / LOCKED:

1. оставить утверждённый MP4;
2. удалить contact sheet;
3. удалить устаревшие итерации;
4. не переносить render в другие временные каталоги.

Не создавать `temp-verify/`, `renders/`, `output/` и другие параллельные
каталоги без отдельного обоснования.

## 6. Naming

```text
section-XX-short-name-vN.mp4
section-XX-short-name-vN-contact-sheet.jpg
```

Новая версия создаётся только при содержательном изменении. Временные
backup-копии удаляются после выбора утверждённой версии.

## 7. Assistant patch protocol

- Пользователь не выполняет серию ручных правок.
- Изменения передаются одним copy-paste patch для Git Bash / MINGW64.
- Для TSX используются полные блоковые замены по стабильным маркерам
  или полная замена файла.
- Форматирование-зависимые regex-патчи для TSX запрещены.
- Перед записью проверяется вся ожидаемая структура.
- При ошибке shell остаётся открытым, а диагностика сохраняется.
- Shell `exit` и `|| exit 1` запрещены.
- Remotion render нельзя направлять через `tee`: иначе progress bar
  заполняет терминал отдельными строками.
- Render запускается напрямую после успешных patch, diff-check и lint.
- Незакоммиченный production-файл нельзя реконструировать по памяти.

## 8. Commit isolation

Production work и repository maintenance по возможности коммитятся
раздельно.

При documentation-only commit явно добавляются только требуемые пути.
Незаконченные Remotion compositions, media и timing-файлы активной
секции не должны случайно попадать в такой commit.
