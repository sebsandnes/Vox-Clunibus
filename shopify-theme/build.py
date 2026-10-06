"""Packs the theme folders into dist/voxclunibus-theme.zip for upload in Shopify admin."""

import pathlib
import zipfile

ROOT = pathlib.Path(__file__).parent
FOLDERS = ["assets", "config", "layout", "locales", "sections", "snippets", "templates"]
OUT = ROOT / "dist" / "voxclunibus-theme.zip"

OUT.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zf:
    for folder in FOLDERS:
        for path in sorted((ROOT / folder).rglob("*")):
            if path.is_file():
                zf.write(path, path.relative_to(ROOT).as_posix())

print(f"wrote {OUT.relative_to(ROOT)}")
