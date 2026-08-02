#!/usr/bin/env python3

from pathlib import Path
import os
import re
import shutil
import sys

REMOTION = Path(__file__).resolve().parents[1]
PROJECT = REMOTION.parent
SOURCE = REMOTION / "src"
PUBLIC = REMOTION / "public"

pattern = re.compile(
    r"""staticFile\(\s*['"]([^'"]+)['"]\s*\)""",
    re.MULTILINE,
)

references = set()

for source_file in sorted(SOURCE.rglob("*.tsx")):
    text = source_file.read_text(encoding="utf-8")
    references.update(pattern.findall(text))

if not references:
    print("SYNC FAILED: no staticFile() references found.")
    sys.exit(1)

unsafe = [
    item for item in references
    if item.startswith("/")
    or ".." in Path(item).parts
    or "\\" in item
]

if unsafe:
    print("SYNC FAILED: unsafe staticFile() paths:")
    print("\n".join(sorted(unsafe)))
    sys.exit(1)

missing = [
    item for item in sorted(references)
    if not (PROJECT / item).is_file()
]

if missing:
    print("SYNC FAILED: source assets missing:")
    print("\n".join(missing))
    sys.exit(1)

staging = REMOTION / ".public-staging"

if staging.exists():
    shutil.rmtree(staging)

staging.mkdir(parents=True)

linked = 0
copied = 0
total_bytes = 0

try:
    for item in sorted(references):
        source = PROJECT / item
        target = staging / item
        target.parent.mkdir(parents=True, exist_ok=True)

        try:
            os.link(source, target)
            linked += 1
        except OSError:
            shutil.copy2(source, target)
            copied += 1

        total_bytes += source.stat().st_size

    if PUBLIC.exists():
        shutil.rmtree(PUBLIC)

    staging.rename(PUBLIC)

except Exception:
    if staging.exists():
        shutil.rmtree(staging)
    raise

print(f"PASS: {len(references)} runtime assets synchronized.")
print(f"Hard-linked: {linked}")
print(f"Copied fallback: {copied}")
print(f"Runtime public size: {total_bytes / 1024 / 1024:.2f} MiB")

for item in sorted(references):
    print(f"- {item}")
