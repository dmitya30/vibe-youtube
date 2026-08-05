# VIDEO-001 publication packet

Updated: 2026-08-05
Status: VERIFIED LOCAL PACKET / NOT YET UPLOADED

The ignored `local/` directory is the sole internal source for the VIDEO-001
YouTube upload.

Expected payload:

- `local/video-001-master-v1.mp4`;
- `local/video001-en-v1.srt`;
- `local/video001-en-v1.vtt`;
- three final JPEG thumbnails under `local/thumbnails/`.

The packet was copied from the independently verified external staging bundle
and must match `manifest.txt`.

Do not commit media from `local/`.
Do not delete the external staging bundle or render sources during this step.
