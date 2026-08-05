# Local publication packets

Updated: 2026-08-05
Status: active

This directory contains tracked lifecycle records for publication-ready
video packets.

For each video:

- `manifest.txt` is version-controlled;
- `local/` contains the actual upload payload and is excluded from Git;
- payload files must be verified against the manifest before upload;
- `remotion/out/` is a transient render and QA location, not an upload source;
- no cleanup of render sources is permitted until the local packet and an
  external backup have both passed checksum verification.
