# VIDEO-001 Remotion proof

Deterministic compositing proof for the hybrid Kling + Remotion pipeline.

## Environment

- shell: Git Bash;
- Node.js: 20.x;
- generated MP4 files are not committed;
- ignore rules are stored only in the repository root `.gitignore`.

## Install

From the repository root:

```bash
cd ~/projects/vibe-youtube/VIDEO-001-proof/remotion
npm i
```

## Add the local Kling source

```bash
cp ../renders/test-b-kling3-v1.mp4 public/
```

## Preview

```bash
npm run dev
```

Composition:

```text
TestCNotificationOverlay
```

## Render

```bash
npx remotion render \
  TestCNotificationOverlay \
  out/test-c-notification-overlay-v1.mp4 \
  --codec=h264 \
  --crf=18 \
  --pixel-format=yuv420p \
  --muted
```

The source MP4, `out/`, `dist/` and dependency directories remain outside Git.
