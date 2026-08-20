# Repository Structure

Updated: 2026-08-20
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
│   ├── ROADMAP_30D.md
│   ├── SHADOW_AUTOMATION.md
│   ├── VIDEO_PIPELINE_COMPILER.md
│   ├── VIDEO002_RESEARCH.md
│   ├── VIDEO002_SCRIPT.md
│   ├── VIDEO002_NARRATION.md
│   ├── VIDEO002_STORYBOARD.md
│   ├── VIDEO003_PRODUCTION.md
│   ├── VIDEO003_PUBLISHING.md
│   ├── SOURCES.md
│   ├── SCRIPT.md
│   ├── STORYBOARD.md
│   └── REPOSITORY_STRUCTURE.md
├── archive/
│   └── historical documents
├── tools/
│   ├── capcut_export_captions.py
│   ├── verify_caption_completeness.py
│   ├── align_captions_to_script.py
│   └── build_video003_timing.py
├── VIDEO-003-proof/
│   ├── assets/
│   │   ├── manifest.txt
│   │   ├── video003-generation-prompts-v1.md
│   │   ├── nod/
│   │   │   └── local accepted NOD source frames
│   │   └── video/
│   │       └── local generated and deterministic motion assets
│   ├── audio/
│   │   ├── tracked locked TTS inputs
│   │   └── local generated narration WAV files
│   ├── captions/
│   │   ├── video003-en-v1.srt
│   │   ├── video003-en-v1.vtt
│   │   ├── video003-caption-alignment-v1.txt
│   │   └── local raw CapCut extraction and QA diagnostics
│   ├── timing/
│   │   ├── video003-scene-plan-v1.json
│   │   ├── video003-scene-timing-v1.json
│   │   └── video003-scene-timing-v1.md
│   └── remotion/
│       ├── src/
│       │   └── tracked declarative and production components
│       ├── scripts/
│       │   └── sync-public.py
│       ├── public/
│       │   └── generated runtime-only staging
│       ├── out/
│       │   └── local proofs, contact sheets and final renders
│       └── package and Remotion configuration
├── VIDEO-002-proof/
│   ├── audio/
│   │   ├── video002-narration-input-v1.txt
│   │   └── local narration WAV/MP3 and diagnostics
│   └── captions/
│       ├── video002-en-v1.srt
│       ├── video002-en-v1.vtt
│       ├── video002-caption-alignment-v1.txt
│       └── local CapCut raw extraction
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
    ├── publish/
    │   ├── README.md
    │   └── video-001/
    │       ├── README.md
    │       ├── manifest.txt
    │       └── local/
    │           ├── video-001-master-v1.mp4
    │           ├── video001-en-v1.srt
    │           ├── video001-en-v1.vtt
    │           └── thumbnails/
    │               └── final A/B/C JPEG files
    └── remotion/
        ├── src/
        │   └── tracked compositions
        ├── scripts/
        │   └── sync-public.py
        ├── public/
        │   └── generated runtime-only staging, created on demand
        ├── out/
        │   └── locked section renders and compact QA evidence
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

## 5. Render and publication lifecycle

`VIDEO-001-proof/remotion/out/` — локальный transient render/QA root.

Во время production и активного QA в нём могут находиться:

- section renders;
- integration master renders;
- contact sheets;
- FFmpeg/ffprobe reports;
- другие regenerable QA artifacts.

`remotion/out/` не является источником файлов для загрузки на платформу.
После PASS / LOCKED публикационные артефакты копируются в:

```text
VIDEO-001-proof/publish/<video-id>/local/
```

Для каждого publication packet:

- `README.md` и `manifest.txt` коммитятся;
- `local/` исключён из Git;
- master, captions и thumbnails проверяются по SHA-256;
- `local/` является единственным внутренним источником upload-файлов;
- внешний staging bundle является проверенной резервной копией, но не
  каноническим project path.

После успешного копирования и проверки publication packet содержимое
`remotion/out/` классифицируется отдельно. Удаление или архивирование
разрешено только после подтверждения manifest и резервной копии.

Не создавать дополнительные `temp-verify/`, `renders/`, `output/` или
параллельные publication roots без отдельного обоснования.

### VIDEO-001 cleanup state

После создания и двойной SHA-256-проверки publication packet для VIDEO-001:

- `remotion/public/` очищен и создаётся заново через `npm run sync-public`;
- старый параллельный `VIDEO-001-proof/renders/` удалён;
- уникальный Kling source перенесён в канонический `assets/video/`;
- superseded paid generations перенесены во внешний локальный архив;
- Whisper intermediates, Qwen fragments, loudness previews, contact sheets,
  comparison images и duplicate upload copies удалены;
- в `remotion/out/` оставлены locked section renders и компактные текстовые
  QA artifacts;
- transient master удалён: upload master хранится в проверенном
  `publish/video-001/local/` и во внешнем staging bundle;
- `remotion/node_modules/` оставлен локально и не инспектировался.

Локальный cleanup archive:

```text
~/vibe-youtube-local-archive/VIDEO-001/cleanup-2026-08-05-v1/
```

Его `cleanup-manifest.tsv` содержит SHA-256 и выполненное действие для
каждого архивированного, перемещённого или удалённого файла. Архив не является
частью Git-репозитория.

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


## 9. Operational planning documents

- `VIDEO001_ANALYTICS.md` is the canonical source for the recovered VIDEO-001 analytics baseline, evidence limits, diagnosis and intervention boundary.
- `ROADMAP_30D.md` is the canonical source for the active execution horizon,
  cadence, Day-30 targets, backlog and stop conditions.
- `SHADOW_AUTOMATION.md` defines production-time, cost, retry, defect and
  automation measurement for VIDEO-002 and later benchmarks.
- `EXPERIMENTS.md` owns individual content hypotheses and results.
- `VIDEO003_RESEARCH.md` owns the VIDEO-003 demand scan, selected direction, claim boundaries, source record and packaging hypotheses.
- `VIDEO003_SCRIPT.md` owns the VIDEO-003 full narration draft, claim annotations, sources and human editorial QA gate.
- `VIDEO003_NARRATION.md` owns the VIDEO-003 TTS inputs, generation cost, accepted audio master, completeness QA, caption timing source and accepted caption artifacts.
- `VIDEO002_RESEARCH.md` owns the VIDEO-002 direction, claim boundaries and
  sources.
- `VIDEO002_SCRIPT.md` owns the locked editorial narration text.
- `VIDEO002_NARRATION.md` owns accepted narration parameters, TTS defects, timing-provider evaluation and caption QA.
- `VIDEO002_STORYBOARD.md` owns preliminary scene architecture, narration/STT
  timing design, reuse planning and controlled visual variation.
- `CONTEXT.md` links the current project stage without duplicating full
  operational plans.

## Assistant execution contract

`AGENTS.md` at the repository root is the mandatory first-read operational contract for Git Bash patch delivery, context restoration, validation and Remotion asset handling.

## VIDEO-003 publication lifecycle

Tracked publication lifecycle records:

- `docs/VIDEO003_PUBLISHING.md` — title, description, thumbnail decision, launch record and platform QA;
- `VIDEO-003-proof/publish/video-003/README.md` — packet handling and lifecycle status;
- `VIDEO-003-proof/publish/video-003/manifest.txt` — payload hashes and publication status.

Ignored local payload:

- `VIDEO-003-proof/publish/video-003/local/` — master, thumbnail, captions, metadata and checksum list.

External verified backup:

- `~/vibe-youtube-publish-staging/VIDEO-003`.

Public record: `https://youtu.be/st3uCBzCXNw` / `st3uCBzCXNw`.

## VIDEO-004 and analytics records — 2026-08-19

Current analytical and editorial records:

- `docs/VIDEO001_ANALYTICS.md` — VIDEO-001 baseline, thumbnail intervention and platform reconciliation;
- `docs/VIDEO002_ANALYTICS.md` — VIDEO-002 initial post-launch baseline;
- `docs/VIDEO004_RESEARCH.md` — VIDEO-004 demand direction, working package, channel-core correction and claims boundary.

VIDEO-004 production directories must not be created until the title, thumbnail direction and cold open pass their editorial gate. When implementation begins, its directory structure must follow the established tracked-source versus ignored-generated-media policy.

## VIDEO-004 editorial records

- `docs/VIDEO004_RESEARCH.md` — demand direction, evidence and claims boundary;
- `docs/VIDEO004_PACKAGE.md` — accepted title, thumbnail direction, cold open and retention architecture.

Future records `docs/VIDEO004_SCRIPT.md` and `docs/VIDEO004_STORYBOARD.md` may be created during the next editorial workstream. VIDEO-004 production directories must not be created before script and storyboard authorization.

`VIDEO004_PACKAGE_AND_COLD_OPEN_LOCK=PASS`

## VIDEO-004 production entry

- `docs/VIDEO004_SCRIPT.md` — accepted authoritative narration and claims audit;
- `docs/VIDEO004_STORYBOARD.md` — accepted semantic scene and composition architecture;
- `docs/VIDEO004_NARRATION.md` — TTS input, voice target and completeness-QA record;
- `VIDEO-004-proof/audio/video004-narration-input-block-a-v1.txt` — tracked TTS block A;
- `VIDEO-004-proof/audio/video004-narration-input-block-b-v1.txt` — tracked TTS block B.

Generated audio remains local and ignored. Visual production directories and assets remain blocked until narration and exact timing pass.

## VIDEO-004 timing artifacts — 2026-08-19

- `VIDEO-004-proof/timing/video004-scene-plan-v1.json` — declarative scene ownership and hero cold-open beats;
- `VIDEO-004-proof/timing/video004-scene-timing-v1.json` — compiled 30-fps timing source of truth;
- `VIDEO-004-proof/timing/video004-scene-timing-v1.md` — human-readable timing manifest;
- `tools/build_scene_timing.py` — reusable deterministic caption-to-scene compiler.

Generated media remains local and ignored. Controlled asset and Remotion implementation may begin from the locked manifest.

## VIDEO-004 asset and Remotion scaffold — 2026-08-19

- `VIDEO-004-proof/assets/manifest.txt` — planned and accepted source lifecycle;
- `VIDEO-004-proof/assets/video004-generation-prompts-v1.md` — controlled generation prompts;
- `VIDEO-004-proof/remotion/` — VIDEO-004 Remotion source and local runtime workspace;
- `docs/VIDEO004_PRODUCTION.md` — canonical VIDEO-004 production checkpoint.

Generated raster, video, audio, public staging and render outputs remain local and ignored.

## VIDEO-004 layout-recovery documentation ownership — 2026-08-20

- `docs/VIDEO004_PRODUCTION.md` owns layout-proof QA, research boundaries, accepted structural decisions, rejected visual grammar and the active redesign gate.
- `docs/VIDEO004_NARRATION.md` owns the unchanged accepted master and its post-layout retrospective boundary.
- `docs/SHADOW_AUTOMATION.md` owns provider-independent future TTS controls and VIDEO-005-plus voice experiments.
- `docs/drafts/VIDEO004_AUDIO_VISUAL_RESEARCH_RECOVERY.md` was a temporary compression-recovery journal and is removed after canonical transfer.
- `VIDEO-004-proof/remotion/src/` remains tracked recovery source until a separately reviewed redesign replaces it.
