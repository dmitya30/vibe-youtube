# AGENTS.md — Mandatory Execution Contract

This file is the first operational source of truth after any dialogue compression or context restoration.

## User environment

- Shell: Git Bash MINGW64 on Windows.
- The assistant writes commands and patches; the user applies them.
- Every executable patch must begin with an explicit cd to the required directory.
- Never use exit, exit 1, or commands that close the active Git Bash session.
- Never use set -e in commands pasted into the active shell.

## Patch delivery format

- Deliver each operational patch as one complete executable code block.
- Do not split one operation across many separately copied code blocks.
- Do not use heredoc syntax, including python here-documents and cat here-documents.
- Avoid unfinished shell structures that can produce the secondary prompt character.
- Prefer short deterministic file replacements or narrowly scoped Python commands.
- Do not invent JSON keys, paths, schemas, APIs, or repository structure.
- Read the actual local or repository schema before writing a patch.
- Do not provide placeholder code when an executable patch is required.
- Validate syntax and quoting before sending every command.
- Use command chaining only when later commands must not run after a failed validation.

## Workflow behavior

- Do not merely announce the next step. Perform the next actionable step in the same response whenever user input is not required first.
- Do not ask the user to repair assistant-generated code manually.
- Do not commit before the requested human QA gate passes.
- Do not modify accepted narration, captions, scene timings, or hashes without an explicit correction gate.
- Never insert artificial physical line breaks inside sentences, spoken phrases, TTS input, STT prompts, or generation prompts.
- Keep every model prompt as one physical paragraph.

## Remotion rules

- Current stack: Remotion 4.0.503, React 19.2.3, TypeScript 5.9.3.
- Never run npm audit fix or npm audit fix --force during a locked production cycle.
- The local sync-public.py scanner only detects literal staticFile calls.
- Every runtime asset required by Remotion must appear in a literal staticFile call before npm run sync-public.
- After synchronization, explicitly verify every expected file under remotion/public before rendering.
- Lint and TypeScript validation must pass before rendering.
- Render commands must not run after failed lint or failed asset validation.
- Generated public, out, dist, node_modules, images, audio, and video remain ignored unless repository policy explicitly says otherwise.

## VIDEO-002 locked state

- Narration master: PASS.
- Captions: PASS.
- Scene timing manifest: PASS.
- Scene count: 53.
- Production composition count: 20.
- Master duration: 18513 frames at 30 fps.
- Timing commit: 792035711d62e1952f7549acb64844b31c39c678.
- C01 geometric render: layout animatic only.
- C01 clean cinematic source frame: accepted.
- C01 reach v1: rejected because pose delta is too small.
- C01 reach v2: accepted with a masked transition.

## Required context restoration order

1. Read AGENTS.md.
2. Read docs/CONTEXT.md.
3. Read docs/REPOSITORY_STRUCTURE.md.
4. Read docs/SHADOW_AUTOMATION.md.
5. Read the current video storyboard, narration checkpoint, captions, timing manifest, and local production README.
6. Verify current Git HEAD and working-tree state.
7. Continue from the recorded gate without reconstructing the workflow from memory.

## Production compiler preflight

- Read `docs/VIDEO_PIPELINE_COMPILER.md` before VIDEO-003 production architecture or automation work.
- Never infer composition scene ownership. Derive it from the locked timing manifest and validate the exact scene list before writing code.
- After removing a scene block, check for unused variables, components and imports before delivering a patch.
- Never combine failure and success reporting in shell control flow that can print PASS after an exception.
- Production compositions must not contain debug progress indicators or other non-editorial diagnostic UI.
- Full render is forbidden until schema, ownership, asset, lint and sampled-still gates pass.

## Uncommitted local-file recovery after context compression

- If the exact content of an uncommitted local file is missing after dialogue compression and cannot be recovered from the repository, ask the user to attach or paste the current file before generating a patch.
- Never reconstruct or modify an unavailable local file by guessing its JSX structure, identifiers, displayed text, or previous assistant output.
- Repository synchronization does not replace inspection of newer uncommitted local work.

## Production visual-QA artifacts

- Standalone preflight PNG frames must not be generated for production compositions.
- Production visual QA uses the rendered MP4 and its contact sheet.
- The normal gate sequence is lint, runtime-asset validation, MP4 render, contact-sheet generation and human visual QA.

## Composition grouping and batch production

- Prefer fewer production compositions by grouping multiple adjacent semantic scenes when timing, visual continuity and implementation complexity allow it.
- Do not default to one production composition per semantic scene.
- Batch the source validation, lint and sequential rendering of multiple compositions before one shared visual-QA stop-point when this does not weaken defect isolation.
- Do not change an already locked timing manifest merely to reduce the number of compositions.
