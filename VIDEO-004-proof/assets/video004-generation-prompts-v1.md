# VIDEO-004 generation prompts

Updated: 2026-08-20
Status: REDESIGN V2 / A01 SINGLE-SOURCE GENERATION AUTHORIZED

## Shared references

Identity reference: `VIDEO-001-proof/assets/nod/nod-canonical-v1.jpg`

Style reference: `VIDEO-001-proof/assets/nod/styleframe-desk-notification-v1.jpg`

Canonical constraints:

- preserve the rounded double-layer paper head and established facial geometry;
- preserve pseudo-3D paper-and-clay materials;
- use canonical mitten-style hands rather than realistic fingers;
- no readable brand UI, logos or watermark;
- preserve one recognizable unfinished project across opening, transfer and ending;
- leave controlled negative space for Remotion typography and deterministic overlays;
- avoid phone-centered imagery;
- avoid generic sadness, therapy imagery and brain imagery.

## A01 — opening workspace and important project

Purpose: source state for S01, S03 and S06, with deterministic overlays and camera treatment carrying the substitution sequence.

Prompt: Create a cinematic 16:9 workspace scene featuring the canonical NOD character facing one large, clearly unfinished and personally meaningful project. The project should feel substantial through physical layers, an incomplete central element and one visible first action, without readable text or generic productivity icons. Place NOD primarily in the left third and the project in the right-center, preserve depth for a controlled camera push, use cream, graphite and restrained electric-orange accents, preserve the rounded double-layer paper head, mitten-style hands and pseudo-3D paper-and-clay materials, and leave clean spatial lanes where deterministic email, filename and tutorial objects can pass between NOD and the project. The mood is focused tension rather than sadness. No phone, logos, watermark, realistic fingers or embedded typography.

Planned filename: `video004-a01-opening-workspace-v1.jpg`.

## A02 — NOW/LATER project transfer

Purpose: source state for S10 and S12, with compositional reuse for S24.

Prompt: Create a cinematic 16:9 scene with two consistent instances of the canonical NOD character separated by a strong physical NOW-to-LATER boundary. Present-NOD is transferring the same recognizable unfinished project from the opening toward future-NOD; the project is visibly heavier on the future side but remains one coherent object rather than a pile of icons. Preserve the rounded double-layer paper head, facial geometry, mitten-style hands and pseudo-3D paper-and-clay materials. Use cream and graphite with electric orange marking unresolved transfer pressure. Keep the composition readable without embedded words so Remotion can add NOW and LATER typography. Leave enough negative space for deterministic motion and a later closing variation in which present-NOD catches the handoff and starts one rough action. No phone, logos, watermark or realistic fingers.

Planned filename: `video004-a02-now-later-transfer-v1.jpg`.

## A03 — conditional hero motion derivative

Generation decision: `BLOCKED_PENDING_LAYOUT_PROOF`.

If the complete layout proof confirms that generated motion materially strengthens C01, animate A01 as one locked-camera spatial shot. Preserve NOD identity, project geometry, workspace, hands and lighting. Allow subtle breathing, one blink, restrained project parallax and small environmental movement only. Deterministic Remotion remains responsible for substitute-task objects, the relief corridor, NOW/LATER transfer and first-moment transition.

Required end policy: `PING_PONG_OR_CROSSFADE_TO_MATCHED_A01_STILL`. A raw generated clip may not end inside S01–S03.

## Conditional additional sources

There is no fixed image quota. After the complete layout proof, additional controlled NOD source frames may be generated only where character identity, emotion, physical action or visual variety is materially inadequate. Evidence cards, diagrams, task selectors, timelines, if-then builders and protocol graphics remain deterministic.

```text
VIDEO004_PRIORITY_SOURCE_A01=PLANNED
VIDEO004_PRIORITY_SOURCE_A02=PLANNED
VIDEO004_CONDITIONAL_MOTION_A03=BLOCKED_PENDING_LAYOUT_PROOF
VIDEO004_ADDITIONAL_SOURCE_QUOTA=NONE
VIDEO004_ASSET_GENERATION=NOT_STARTED
```

## Redesign v2 generation authority

This section supersedes the earlier A01, A02 and A03 generation instructions wherever they conflict. The locked visual grammar is `docs/VIDEO004_PRODUCTION.md` section 10. Only A01 v2 is authorized now. Do not batch-generate A01R, A02, A03 or conditional sources.

### A01 v2 — canonical opening workspace

Purpose: clean source state for S01 through S03 and continuity return in S06. Remotion owns substitute objects, labels, relief geometry, NOW to LATER logic and all typography.

Prompt: Create one cinematic 16:9 production source frame for the Fewer Exits channel using the attached canonical NOD identity reference and the approved pseudo-3D paper-and-clay style reference. Show canonical NOD in the left third facing one large, recognizable, unfinished project in the right-center of a deep workspace. The project must feel personally meaningful and incomplete through physical construction, layered material, one missing or rough central element and one clearly visible first physical action, without embedded writing, logos or generic productivity icons. Preserve the rounded double-layer paper head, established facial geometry, compact body proportions and canonical mitten-style hands. NOD shows focused tension and hesitation rather than sadness. Use cinematic directional lighting and depth with ink and midnight shadows, tactile cream and paper project materials and restrained orange pressure accents; avoid a flat beige presentation-card appearance. Leave three clean spatial lanes between NOD and the project for deterministic substitute objects and preserve negative space for later Remotion overlays. Keep the camera locked at a medium-wide perspective with enough image area for a subtle crop and push. Do not include email cards, browser UI, tutorial screens, RELIEF, NOW, LATER, readable text, phones, brains, logos, watermarks, realistic fingers or extra characters.

Planned output: `video004-a01-opening-workspace-v2.jpg`.

Required source QA before any dependent generation:

- canonical NOD identity and double-layer head;
- mitten hands and plausible anatomy;
- one readable unfinished project rather than office clutter;
- deep cinematic hierarchy rather than a flat three-color field;
- clean overlay lanes and crop-safe negative space;
- no embedded text, UI, phone, logo or watermark;
- 16:9 source at a minimum of 1920 by 1080;
- exact provider, model, dimensions, byte size and SHA-256 recorded after acceptance.

### A01R v1 — blocked matched relief response

After A01 passes human source QA, create a targeted matched edit rather than an independent regeneration. Preserve camera, environment, project, materials, lighting, clothing and character identity. Change only NOD posture and expression enough to show a restrained short-term release while the important project remains unresolved. Do not generate this state before A01 acceptance.

Planned output: `video004-a01r-relief-response-v1.jpg`.

### A03 v2 — blocked controlled motion

After still continuity passes, motion may be tested from the accepted A01 source. Use one locked-camera shot. Preserve NOD identity, project geometry, hands, lighting and overlay lanes. Permit subtle breathing, one blink, a small hesitation and restrained environmental parallax. Do not bake substitute objects or typography into the clip. Runtime use requires a ping-pong treatment or a crossfade to an accepted matched still; a raw clip endpoint is forbidden.

Planned output: `video004-a03-opening-motion-v2.mp4`.

### A02 v2 — deferred NOW to LATER source

A02 remains deferred until C01 source QA proves the redesigned character and material treatment. Its later prompt must use the same recognizable project and the accepted A01 identity, depth and palette. It must not be generated in the current batch.

```text
VIDEO004_A01_OPENING_WORKSPACE_V2=AUTHORIZED_SINGLE_SOURCE
VIDEO004_A01R_RELIEF_RESPONSE_V1=BLOCKED_PENDING_A01_QA
VIDEO004_A03_HERO_MOTION_V2=BLOCKED_PENDING_ACCEPTED_STILL_CONTINUITY
VIDEO004_A02_NOW_LATER_TRANSFER_V2=DEFERRED_UNTIL_C01_SOURCE_QA
NEXT_REQUIRED_GATE=VIDEO004_C01_A01_SOURCE_GENERATION_AND_HUMAN_QA
```
