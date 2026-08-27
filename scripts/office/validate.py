#!/usr/bin/env python3
"""
Minimal .docx validator — checks that the file is a valid ZIP with required
Office Open XML parts.
"""

import sys
import zipfile
import os


REQUIRED_PARTS = [
    "[Content_Types].xml",
    "word/document.xml",
    "word/_rels/document.xml.rels",
]


def validate(filepath):
    abs_path = os.path.abspath(filepath)
    print(f"Validating: {abs_path}")

    if not os.path.exists(abs_path):
        print(f"  ERROR: File not found — {abs_path}")
        return False

    size_kb = os.path.getsize(abs_path) / 1024
    print(f"  File size: {size_kb:.1f} KB")

    if not zipfile.is_zipfile(abs_path):
        print("  ERROR: File is not a valid ZIP / .docx container")
        return False

    with zipfile.ZipFile(abs_path, "r") as zf:
        names = zf.namelist()
        missing = [p for p in REQUIRED_PARTS if p not in names]
        if missing:
            print(f"  ERROR: Missing required parts: {missing}")
            return False
        print(f"  Parts found: {len(names)} entries in archive")
        print(f"  Required parts: OK ({', '.join(REQUIRED_PARTS)})")

    print(f"  Result: VALID\n")
    return True


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python validate.py <file1.docx> [file2.docx ...]")
        sys.exit(1)

    all_ok = True
    for f in sys.argv[1:]:
        if not validate(f):
            all_ok = False

    sys.exit(0 if all_ok else 1)
