# VIDEO-002 — Production Implementation Plan

Status: CONTROLLED IMPLEMENTATION STARTED

## Rendering strategy

- Primary renderer: Remotion 4.0.503 at 1920×1080 and 30 fps.
- Locked master duration: 18513 frames.
- Locked production units: C01–C20.
- Scene boundaries: imported from the locked timing manifest.
- Narration master: video002-narration-combined-repaired-v2.wav.
- Kling clips required: zero.
- Generated source images allowed: maximum four approved NOD states.

## Composition modes

| Compositions | Mode | External source state |
|---|---|---|
| C01 | Remotion | Deterministic phone UI and geometric reach |
| C02–C03 | Remotion | None |
| C04 | Hybrid | KF-B: phone already in NOD hand |
| C05–C09 | Remotion | None |
| C10 | Hybrid | KF-C: reach completed but instant path blocked |
| C11–C18 | Remotion | None |
| C19–C20 | Hybrid | Reuse KF-A plus KF-D: noticed reach and return to task |

## Source-image budget

1. KF-A supports S49.
2. KF-B supports S13 and S22.
3. KF-C supports S31.
4. KF-D supports S51 and the ending continuity state.

## Optional motion candidates

- S04: first silent reach.
- S13: phone already in hand.
- S31: reach interrupted by friction.
- S51: noticed reach and return to task.

No Kling generation begins until the static Remotion implementation passes scene-level QA. Static keyframes remain the accepted fallback.

## Current implementation gate

- Diagnostic master composition: required.
- Diagnostic C01–C20 compositions: required.
- TypeScript validation: required.
- Audio synchronization: required.
- Broad asset generation: prohibited.

## C01 implementation status

- Timing, audio routing and scene transitions: PASS.
- Current geometric render: LAYOUT ANIMATIC ONLY.
- Current character, arm, phone perspective and typography: REJECTED FOR PRODUCTION.
- Final C01 requires approved NOD source art plus deterministic Remotion overlays.

## C01 source-art QA

- Clean cinematic source frame: ACCEPTED.
- Clean frame resolution: 2048×1152.
- Clean frame production use: S03.
- Reach edit v1: REJECTED_POSE_DELTA_TOO_SMALL.
- Required replacement: controlled reach edit v2 based directly on the accepted clean frame.
- Geometric C01 character and phone art: layout animatic only.

- C01 reach edit v2 is accepted for S04. The reach is readable and the phone remains face down. Minor pose drift from the clean frame must be hidden with a short deterministic transition rather than a long crossfade.

## C01 production render v2 QA

- Runtime asset synchronization: PASS, three required assets.
- TypeScript and ESLint: PASS.
- Video: H.264, 1920×1080, 30 fps, 18.166667 seconds.
- Audio: AAC, audible narration, 18.218667 seconds.
- Render size: 9285674 bytes.
- Accepted source-art direction: cinematic pseudo-3D NOD desk environment.
- Clean frame and reach v2 integration: PASS.
- Remaining visual correction: remove visible heading overlap during the S01 to S02 transition.
- Current C01 status: PRODUCTION DIRECTION PASS / TRANSITION POLISH REQUIRED.
