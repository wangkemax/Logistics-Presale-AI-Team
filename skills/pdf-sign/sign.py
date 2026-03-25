#!/usr/bin/env python3
"""
Sign a PDF by embedding a signature image on the last page.
Finds a blank area at bottom-right; falls back to centered bottom.
"""

import sys
import argparse
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image


def load_signature(path: str) -> Image.Image:
    img = Image.open(path).convert("RGBA")
    return img


def get_page_size(fitz_doc: fitz.Document, page_num: int) -> tuple[float, float]:
    page = fitz_doc[page_num]
    rect = page.rect
    return rect.width, rect.height


def is_blank_region(page: fitz.Page, x0: float, y0: float, x1: float, y1: float,
                    threshold: float = 0.95) -> bool:
    """Check if a region is mostly blank (white)."""
    clip = fitz.Rect(x0, y0, x1, y1)
    pix = page.get_pixmap(clip=clip, alpha=True)
    pixels = pix.samples
    total = len(pixels) // 4  # RGBA
    white_or_transparent = sum(
        1 for i in range(total)
        if pixels[i*4] > 240 and pixels[i*4+1] > 240 and pixels[i*4+2] > 240
        and pixels[i*4+3] < 10
    )
    return (white_or_transparent / total) >= threshold


def find_signature_position(page: fitz.Page, sig_w: float, sig_h: float,
                              margin: float = 20) -> tuple[float, float, float, float]:
    """
    Find the best position for the signature.
    Returns (x0, y0, x1, y1) of the signature rect.
    
    Strategy:
    1. Scan bottom-right quadrant for blank region
    2. Fall back to bottom-center if not found
    """
    pw, ph = page.rect.width, page.rect.height

    # Signature area should be at bottom-right
    # Try region: bottom 25% height, right 40% width
    region_w = max(sig_w, pw * 0.35)
    region_h = max(sig_h, ph * 0.20)

    # Bottom-right candidate
    candidate_x0 = pw - region_w - margin
    candidate_y0 = ph - region_h - margin
    candidate_x1 = pw - margin
    candidate_y1 = ph - margin

    if is_blank_region(page, candidate_x0, candidate_y0, candidate_x1, candidate_y1):
        # Align signature to bottom-right of this region
        return (candidate_x0, candidate_y0,
                candidate_x0 + sig_w, candidate_y0 + sig_h)

    # Try right half of bottom 25%
    for frac in [0.50, 0.45, 0.40]:
        rw = pw * frac
        rh = ph * 0.25
        for x_frac in [0.5, 0.6, 0.7, 0.8, 0.9, 1.0]:
            rx0 = pw * x_frac - rw
            rx1 = pw * x_frac
            ry0 = ph - rh - margin
            ry1 = ph - margin
            if is_blank_region(page, rx0, ry0, rx1, ry1):
                return (rx0, ry0, rx0 + sig_w, ry0 + sig_h)

    # Fallback: center-bottom
    x0 = (pw - sig_w) / 2
    y0 = ph - sig_h - margin * 2
    x1 = x0 + sig_w
    y1 = ph - margin * 2
    return (x0, y0, x1, y1)


def embed_signature_image(page: fitz.Page, sig_pil: Image.Image,
                           x0: float, y0: float, x1: float, y1: float):
    """Embed signature as an image overlay on the page."""
    # Save PIL image to PNG bytes
    import io
    buf = io.BytesIO()
    sig_pil.save(buf, format="PNG")
    png_data = buf.getvalue()

    # Create image annotation from PNG
    img_rect = fitz.Rect(x0, y0, x1, y1)
    img_index = page.add_image_image(
        fitz.Pixmap(fitz_document=None, xref=0),  # will be overridden
        img_rect,
        overlay=True  # place on top
    )

    # Use the correct approach: add_image_image takes PNG data directly
    page.add_image_image(sig_pil, img_rect, overlay=True)


def sign_pdf(pdf_path: str, sig_path: str, output_path: str,
             max_sig_width: float = 200, page_num: int = -1):
    """Main signing function."""
    doc = fitz.open(pdf_path)
    last_page_idx = page_num if page_num >= 0 else doc.page_count - 1
    page = doc[last_page_idx]

    # Load and size signature
    sig_img = load_signature(sig_path)
    img_w, img_h = sig_img.size

    # Scale to max width while preserving aspect ratio
    aspect = img_h / img_w
    sig_w = min(max_sig_width, img_w)
    sig_h = sig_w * aspect

    # Find position
    x0, y0, x1, y1 = find_signature_position(page, sig_w, sig_h)

    # Embed
    img_rect = fitz.Rect(x0, y0, x1, y1)
    page.add_image_image(sig_img, img_rect, overlay=True)

    # Also add a text annotation showing "Signed"
    # rect for text - small, below signature
    text_rect = fitz.Rect(x0, y0 + sig_h + 2, x0 + sig_w, y0 + sig_h + 14)
    # Only add if there's room
    if text_rect.y1 < page.rect.height - 5:
        page.insert_textbox(text_rect, "signed",
                           fontsize=8, color=(0.5, 0.5, 0.5))

    doc.save(output_path, incremental=True, encryption=fitz.PDF_ENCRYPT_KEEP)
    doc.close()
    print(f"Signed PDF saved to: {output_path}")
    print(f"Signature placed at bottom-right of page {last_page_idx + 1}")
    print(f"Position: ({x0:.1f}, {y0:.1f}) -> ({x1:.1f}, {y1:.1f})")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sign a PDF with a signature image")
    parser.add_argument("pdf", help="Input PDF path")
    parser.add_argument("signature", help="Signature image path (PNG)")
    parser.add_argument("-o", "--output", help="Output PDF path")
    parser.add_argument("--width", type=float, default=200,
                        help="Max signature width in points (default: 200)")
    parser.add_argument("--page", type=int, default=-1,
                        help="Page number to sign (default: last page, -1)")

    args = parser.parse_args()

    pdf_path = Path(args.pdf)
    sig_path = Path(args.signature)

    if not pdf_path.exists():
        print(f"Error: PDF not found: {pdf_path}", file=sys.stderr)
        sys.exit(1)
    if not sig_path.exists():
        print(f"Error: Signature image not found: {sig_path}", file=sys.stderr)
        sys.exit(1)

    output_path = args.output or str(pdf_path.with_name(
        pdf_path.stem + "_signed" + pdf_path.suffix))

    sign_pdf(str(pdf_path), str(sig_path), output_path,
             max_sig_width=args.width, page_num=args.page)
