# VIDEO-004 — Publishing package

Updated: 2026-08-22
Status: PRODUCTION MASTER ACCEPTED / LAUNCH THUMBNAIL ACCEPTED / PRE-PUBLICATION CONTEXT CHECKPOINT
Repository base commit before checkpoint: 56f58648a228e75d783a6739e463d5f277d47e53

## 1. Accepted production state

- Title: `Why You Avoid the Work That Matters Most`.
- Accepted final master: `VIDEO-004-proof/remotion/out/video004-master-final-v1.mp4`.
- Master SHA-256: `fd96e10960e1950340388cd7bcd3085199ac8fce75d611ba436d2bcc2524eca3`.
- Master technical state: H.264, 1920x1080, 30 fps, AAC stereo 48 kHz, 395.114667 seconds.
- Human audio-visual playback QA: PASS.
- C01 continuity and duplicate-exit correction: PASS.
- C04 and C08 accepted state: preserved.
- Contact sheet: optional; no additional visual-QA gate required.

## 2. Accepted thumbnail state

The original script-stage package used `NOT NOW.`. After production, the thumbnail gate was explicitly reopened for two deterministic candidates.

Accepted launch thumbnail:

- direction: B v1;
- text: `RELIEF IS THE TRAP`;
- visual treatment: orange luminous ring and lower supporting caption retained;
- upload file: `thumbnail-b-relief-is-the-trap-v1.jpg`;
- local source: `VIDEO-004-proof/remotion/out/thumbnail-b-relief-is-the-trap-v1.jpg`;
- SHA-256: `4200341fa6207711c047dfe163b39e03b842204bad3ad838290e2e1a3cf88466`;
- resolution: 1280x720;
- visual QA: PASS.

Alternative retained locally:

- A: `NOT NOW.`;
- source export: `VIDEO-004-proof/remotion/out/video004-thumbnail-a-not-now-v1.png`.

Rejected revision:

- B v2 without the sharp ring treatment;
- reason: too smooth and less visually sticky.

This section supersedes only the earlier launch-thumbnail selection. The accepted title and editorial promise remain unchanged.

## 3. Captions

- reviewed English SRT: `VIDEO-004-proof/captions/video004-en-v1.srt`;
- reviewed English VTT: `VIDEO-004-proof/captions/video004-en-v1.vtt`;
- caption count: 147 cues;
- caption and narration timing remain locked.

## 4. Repository and local-payload boundary

Tracked:

- production source;
- thumbnail source;
- accepted captions and timing;
- production and publishing documentation;
- publication packet README and manifest.

Ignored local payload:

- final MP4;
- narration WAV;
- generated JPG and PNG files;
- accepted local image sources;
- future packet-local copies and checksum list.

The ignored payload is preserved by path and SHA-256 in the tracked manifest. It must not be deleted after packaging.

## 5. Remaining pre-publication work

1. Build the ignored `publish/video-004/local/` payload by copying, not rerendering, the accepted master and thumbnail.
2. Create and review the VIDEO-004 metadata file from the accepted script, research and timing sources.
3. Generate and verify local packet checksums.
4. Create and verify the external backup.
5. Commit the completed tracked packet manifest and documentation.
6. Upload to YouTube as Unlisted.
7. Wait for 1080p processing and YouTube Checks.
8. Upload reviewed English captions and verify playback.
9. Set thumbnail B v1 and accepted metadata.
10. Switch to Public only after platform QA.

```text
VIDEO004_AUDIOVISUAL_QA=PASS
VIDEO004_C01_QA=PASS
VIDEO004_FINAL_MASTER=ACCEPTED
VIDEO004_LAUNCH_THUMBNAIL=B_V1_RELIEF_IS_THE_TRAP
VIDEO004_CAPTIONS=LOCKED
VIDEO004_PUBLICATION_PACKET=STRUCTURE_CHECKPOINT
VIDEO004_YOUTUBE_STATUS=NOT_UPLOADED
NEXT_REQUIRED_GATE=VIDEO004_PUBLICATION_PACKET_COMPLETION
```
