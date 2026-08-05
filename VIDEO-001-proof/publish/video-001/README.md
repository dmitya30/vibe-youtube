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

Local cleanup completed on 2026-08-05 after this packet and the external
staging bundle passed SHA-256 verification. The transient master, duplicate
upload copies and temporary QA media were removed. Locked section renders and
compact textual QA evidence remain under `remotion/out/`.

Do not delete this packet or the external staging bundle before successful
Private upload and platform QA.
