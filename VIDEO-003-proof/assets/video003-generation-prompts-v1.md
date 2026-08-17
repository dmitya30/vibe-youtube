# VIDEO-003 generation prompts

Updated: 2026-08-17
Status: accepted production-source record

## Shared references

Identity reference:

`VIDEO-001-proof/assets/nod/nod-canonical-v1.jpg`

Style reference:

`VIDEO-001-proof/assets/nod/styleframe-desk-notification-v1.jpg`

Canonical constraints:

- preserve the rounded double-layer paper head and established facial geometry;
- preserve pseudo-3D paper-and-clay materials;
- use canonical mitten-style hands rather than realistic fingers;
- no readable phone UI, text, logos or watermark;
- maintain a clean negative-space region for Remotion typography.

## S01 opening bedroom state

Purpose: tired NOD in bed, phone glow, active scrolling and title continuity.

Accepted output:

`video003-s01-bedroom-scroll-v1.jpg`

Prompt intent:

Create a cinematic midnight-bedroom frame. NOD is awake in bed, visibly tired but understated, holding one smartphone while the mitten thumb is positioned for scrolling. Cool phone light contrasts with warm room shadows. Keep NOD and the phone primarily on the right and preserve dark negative space on the left.

## S01 motion

Accepted source:

`video003-s01-bedroom-scroll-kling-v1.mp4`

Motion intent:

Use one continuous locked-camera shot. Preserve identity, face, mitten hands, clothing, phone and room. Add subtle breathing, one blink, restrained scrolling and small phone-light changes. No cuts, camera-angle changes, object generation, hand morphing or phone deformation.

Runtime treatment:

`video003-s01-bedroom-scroll-kling-pingpong-v1.mp4`

FFmpeg creates a forward-reverse loop and extends it across S01 and S02. This prevents an abrupt generated-video-to-static-image seam.

## S08 end-of-day state

Purpose: replace the non-canonical deterministic placeholder character.

Accepted output:

`video003-s08-not-fun-anymore-v1.jpg`

Prompt intent:

Show the same NOD sitting at the edge of a bed or on a quiet sofa, holding one phone loosely in one mitten hand. NOD is no longer enjoying the feed: tired neutral eyes, low energy and no exaggerated sadness. Keep the character on the right and dark negative space on the left.

## S18 landing-place state

Purpose: make the physical next action visually unmistakable.

Accepted output:

`video003-s18-phone-landing-v1.jpg`

Prompt intent:

Continue the same NOD identity, bedroom, clothing, palette and materials. Show the phone placed on a clearly visible bedside landing surface outside the immediate bed position. The phone no longer lights the face. Keep the action calm and practical.

## Provider record limits

The image provider and model were recorded as Genspark / GPT Image 2.0.

The exact Kling model tier, task ID, generation cost and machine time were not recorded and must remain `NOT_RECORDED`; they must not be reconstructed from memory.
