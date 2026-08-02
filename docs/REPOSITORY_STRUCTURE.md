# Repository Structure

Updated: 2026-08-02
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
    └── remotion/
        ├── src/
        │   └── tracked compositions
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

Remotion получает его через `Config.setPublicDir("..")`.

Используемые пути:

```text
assets/nod/       NOD styleframes and scene images
assets/video/     source video fragments
audio/            master narration
audio/segments/   section narration and timing artifacts
```

`remotion/public/` не используется и не должен содержать дубликаты
production media.

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
