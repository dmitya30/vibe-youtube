# VIDEO-003 production record

Updated: 2026-08-17
Status: PRODUCTION VISUAL QA PASS / FINAL FULL-SIZE RENDER PASS

## 1. Production model

VIDEO-003 uses a fast validated batch-production model:

- 25 semantic scene states;
- 8 production compositions;
- one locked timing manifest;
- one declarative scene-content registry;
- reusable Remotion visual components;
- controlled GPT Image 2.0 NOD source frames;
- selective Kling motion;
- one shared layout proof gate;
- one shared production-motion proof gate;
- one final full-size render.

This replaces the VIDEO-002 pattern of repeated composition-level implementation and human stops.

## 2. Locked timing

- master narration: 389.341917 seconds;
- composition duration: 11,681 frames;
- frame rate: 30 fps;
- captions: 143 cues;
- semantic scenes: 25;
- production compositions: 8;
- scene ownership, anchors and frame continuity: PASS.

Canonical files:

- `VIDEO-003-proof/timing/video003-scene-plan-v1.json`;
- `VIDEO-003-proof/timing/video003-scene-timing-v1.json`;
- `VIDEO-003-proof/timing/video003-scene-timing-v1.md`;
- `docs/VIDEO003_STORYBOARD.md`.

## 3. Implementation architecture

Remotion source:

`VIDEO-003-proof/remotion/src/`

Key files:

- `timing.ts` — compiled locked timing;
- `scenes.ts` — declarative editorial content for all 25 scenes;
- `Video003.tsx` — reusable deterministic and cinematic scene implementations;
- `Root.tsx` — master and C01-C08 composition registration;
- `scripts/sync-public.py` — literal runtime-asset validation and staging.

The master is rendered continuously. Composition boundaries remain available for defect isolation, but normal production does not stop after every composition.

## 4. Proof sequence

### Layout proof v1

Purpose:

- validate all scene ownership;
- validate typography and hierarchy;
- inspect palette and composition;
- confirm full narration playback;
- identify only the bespoke states that require generated media.

Result:

`PASS_WITH_REQUIRED_PRODUCTION_UPGRADES`

Observed defects:

- deterministic placeholder character did not meet NOD quality;
- most motion ended after the first seconds;
- debug-like timeline bars remained visible;
- long deterministic scenes felt presentation-like.

### Motion proof v2

Changes:

- accepted S01 and S18 NOD source frames;
- S01 Kling motion;
- longer deterministic motion;
- full-width timeline bars used temporarily as motion indicators.

Result:

`REWORK_REQUIRED`

Observed defects:

- abrupt S01 generated-video-to-static transition;
- S08 still used a non-canonical placeholder character;
- timeline bars were not acceptable production visuals;
- subtle card movement did not materially remove the presentation feel.

### Production proof v3

Changes:

- S01 and S02 use one continuous ping-pong motion asset;
- S08 uses an accepted GPT Image 2.0 NOD state;
- timeline bars are removed;
- S18 and S25 retain the accepted landing-place state.

Human result:

`VIDEO003_PRODUCTION_VISUAL_QA=PASS`

## 5. Asset policy learned from VIDEO-003

Do not impose a fixed quota on GPT Image 2.0 stills. Generate as many controlled source frames as are editorially justified.

Do not add Kling merely to increase motion count. Use it where temporal motion improves:

- the cold-open hook;
- emotional character behavior;
- physical action;
- spatial transition;
- a necessary pattern interruption.

Deterministic Remotion remains preferred for evidence, diagrams, typography, logs and controlled explanatory transitions.

## 6. Important process findings

1. A semantic scene is not the same as one static frame.
2. Fewer production compositions reduce coordination overhead without weakening locked timing.
3. A full layout proof reveals asset needs more reliably than speculative per-scene generation.
4. Human review should evaluate the complete rhythm, not isolated composition screenshots.
5. Motion does not materially reduce render time; every Remotion frame is still rendered.
6. Generated video must have an explicit end-of-asset continuity policy.
7. Character-component scenes require real NOD asset coverage or an explicitly approved deterministic substitute.
8. Debug progress bars and diagnostic UI must be impossible in production mode.
9. Contact sheets are sampling aids and cannot prove that the final frame is empty.
10. Final audio must be muxed from the locked narration master rather than accepting proof-render audio defaults.
11. Broad rewrites after a successful proof are discouraged; human review should identify a small critical-fix set.
12. Failed nonessential cosmetic patches must not block or reopen an already passed production gate.

## 7. Automation classification

### AUTOMATE_NOW

- repository/schema preflight;
- SRT-to-scene timing compilation;
- scene ownership and frame continuity;
- declarative scene coverage;
- literal runtime-asset discovery;
- asset existence and hash manifest;
- lint and TypeScript validation;
- proof render orchestration;
- contact-sheet generation;
- FFprobe technical report;
- final narration-master audio mux;
- final publication hashes.

### ASSIST

- scene-plan proposal;
- component selection;
- controlled generation prompts;
- motion-density review;
- generated-media seam detection;
- suggested critical-fix list.

### KEEP_MANUAL

- NOD identity and anatomy approval;
- cold-open watchability;
- judgment of presentation-like pacing;
- choice of scenes that deserve GPT Image or Kling;
- final playback;
- thumbnail;
- publication;
- analytics interpretation.

## 8. Remaining gates

1. final full-size render technical QA;
2. final complete human playback QA;
3. production source and documentation commit;
4. publication packet;
5. thumbnail finalization;
6. YouTube upload and platform QA.

## Final production acceptance — 2026-08-17

Human full-playback QA: PASS. The accepted production master is local and remains excluded from version control under repository media policy.

- master: `VIDEO-003-proof/remotion/out/video003-master-production-v1.mp4`;
- video: H.264, 1920x1080, 30 fps, 11,681 frames;
- audio: AAC, 24 kHz, mono;
- duration: 389.366 seconds;
- size: 84,191,407 bytes;
- SHA-256: `eea99f513ab0af9307a7b6a6c3174067b43f70fb284fd5fa40013251084919d8`;
- decode QA: PASS;
- contact-sheet QA: PASS;
- full-playback QA: PASS.

```text
VIDEO003_FINAL_RENDER=TECHNICAL_PASS
VIDEO003_FINAL_DECODE_QA=PASS
VIDEO003_FINAL_PLAYBACK_QA=PASS
VIDEO003_PRODUCTION_MASTER=ACCEPTED
```

Production, packaging and publication are complete. VIDEO-003 is Public at `https://youtu.be/st3uCBzCXNw`. Canonical launch details belong to [`VIDEO003_PUBLISHING.md`](VIDEO003_PUBLISHING.md).
