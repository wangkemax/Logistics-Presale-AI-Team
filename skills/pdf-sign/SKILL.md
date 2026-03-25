# PDF Sign Skill

Sign a PDF file by embedding a signature image at the right location — typically the last page, bottom-right, in a blank area.

## How it works

1. **Analyze** the PDF: get page count, last page dimensions, and detect blank area at bottom-right
2. **Place** the signature image there, scaled appropriately (max width ~200px, maintain aspect ratio)
3. **Output** the signed PDF with `_signed` suffix

## Usage

```json
{
  "pdf_path": "/path/to/document.pdf",
  "signature_image": "/path/to/signature.png",
  "output_path": "/path/to/output.pdf"
}
```

## Detection logic

- Look for a **blank region** at the bottom-right of the last page (bottom 20% height, right 40% width)
- If no good blank area found, place signature **centered at bottom**, with a small margin
- Signature scaled to max **200px wide**, aspect ratio preserved
- If signature area would overlap non-blank content, warn user

## Requirements

- PyMuPDF (`pip install pymupdf`)
- Signature image: PNG with transparency recommended

## Notes

- Does not flatten annotations — signature is embedded as an image overlay
- Works for single-page and multi-page PDFs
- Only signs the **last page** by default
