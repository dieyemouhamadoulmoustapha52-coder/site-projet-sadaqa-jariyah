#!/usr/bin/env python3
"""
Génère public/og-image.png — image d'aperçu réseaux sociaux (1200×630, < 300 Ko).

Charte : vert foncé #1B3B2D, or #F5C85C, beige #FFF8E1.
Logo  : public/images/logo-sadaqa.png (réutilisé, fond transparent).

Aucune dépendance projet : Pillow uniquement (usage machine / CI).
Usage : python3 scripts/generate-og-image.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "public" / "images" / "logo-sadaqa.png"
OUT = ROOT / "public" / "og-image.png"

W, H = 1200, 630
VERT = (27, 59, 45)        # #1B3B2D
VERT_HAUT = (36, 78, 60)   # dégradé subtil
OR = (245, 200, 92)        # #F5C85C
BLANC = (255, 255, 255)
BEIGE = (255, 248, 225)

FONT_BOLD = "/usr/share/fonts/google-noto/NotoSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/google-noto/NotoSans-Regular.ttf"
FONT_SEMI = "/usr/share/fonts/google-noto/NotoSans-SemiBold.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def main() -> None:
    # --- Fond : dégradé vertical vert foncé -------------------------------
    img = Image.new("RGB", (W, H), VERT)
    top = Image.new("RGB", (W, H), VERT_HAUT)
    mask = Image.new("L", (W, H))
    md = ImageDraw.Draw(mask)
    for y in range(H):
        md.line([(0, y), (W, y)], fill=int(255 * (1 - y / H) * 0.35))
    img = Image.composite(top, img, mask)

    draw = ImageDraw.Draw(img)

    # --- Bande dorée haute (accent charte) --------------------------------
    draw.rectangle([0, 0, W, 6], fill=OR)

    # --- Logo centré -------------------------------------------------------
    logo = Image.open(LOGO).convert("RGBA")
    target_w = 560
    ratio = target_w / logo.width
    logo = logo.resize((target_w, int(logo.height * ratio)), Image.LANCZOS)
    lx = (W - logo.width) // 2
    ly = 78
    img.paste(logo, (lx, ly), logo)

    # --- Filet doré sous le logo ------------------------------------------
    rule_y = ly + logo.height + 36
    draw.rounded_rectangle(
        [(W // 2 - 90, rule_y), (W // 2 + 90, rule_y + 5)],
        radius=3,
        fill=OR,
    )

    # --- Titre officiel ----------------------------------------------------
    title = "Association Projet Sadaqa Jariyah"
    f_title = font(FONT_BOLD, 46)
    tb = draw.textbbox((0, 0), title, font=f_title)
    tw = tb[2] - tb[0]
    ty = rule_y + 34
    draw.text(((W - tw) // 2, ty), title, font=f_title, fill=BLANC)

    # --- Accroche sobre ----------------------------------------------------
    tag = "Organisation caritative — des projets à impact durable"
    f_tag = font(FONT_REG, 26)
    tb = draw.textbbox((0, 0), tag, font=f_tag)
    tw = tb[2] - tb[0]
    ty += 64
    draw.text(((W - tw) // 2, ty), tag, font=f_tag, fill=BEIGE)

    # --- Bas de page : URL + pastille « OFFICIEL » ------------------------
    url = "projet-sadaqa-jarirah.netlify.app"
    f_url = font(FONT_SEMI, 22)
    tb = draw.textbbox((0, 0), url, font=f_url)
    uw = tb[2] - tb[0]
    uy = H - 52
    # pastille
    pad_x, pad_y = 18, 10
    bx0 = (W - uw) // 2 - pad_x
    by0 = uy - pad_y + 4
    bx1 = bx0 + uw + pad_x * 2
    by1 = by0 + 40
    draw.rounded_rectangle([(bx0, by0), (bx1, by1)], radius=20, fill=OR)
    draw.text(((W - uw) // 2, uy), url, font=f_url, fill=VERT)

    # --- Enregistrement optimisé (< 300 Ko) --------------------------------
    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)

    size = OUT.stat().st_size
    print(f"✔ {OUT.relative_to(ROOT)} — {W}×{H} — {size / 1024:.1f} Ko")
    if size > 300 * 1024:
        raise SystemExit("✘ Image > 300 Ko — WhatsApp risque de l'ignorer")


if __name__ == "__main__":
    main()
