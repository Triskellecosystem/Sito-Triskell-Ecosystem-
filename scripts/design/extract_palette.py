#!/usr/bin/env python3
"""Estrazione palette dalla grafica di riferimento.
Uso: python3 -I extract_palette.py <immagine> <output.json>
"""
import json
import sys
import colorsys

import numpy as np
from PIL import Image


def to_hex(rgb):
    r, g, b = [int(round(x)) for x in rgb]
    return "#{:02X}{:02X}{:02X}".format(r, g, b)


def hsl(rgb):
    r, g, b = [x / 255 for x in rgb]
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    return (round(h * 360), round(s * 100), round(l * 100))


def kmeans(px, k, iters=30, seed=7):
    rng = np.random.default_rng(seed)
    # init k-means++
    centers = [px[rng.integers(len(px))]]
    for _ in range(1, k):
        d2 = np.min(((px[:, None, :] - np.array(centers)[None]) ** 2).sum(-1), axis=1)
        p = d2 / d2.sum()
        centers.append(px[rng.choice(len(px), p=p)])
    centers = np.array(centers, dtype=float)
    for _ in range(iters):
        d = ((px[:, None, :] - centers[None]) ** 2).sum(-1)
        lab = d.argmin(1)
        for i in range(k):
            m = lab == i
            if m.any():
                centers[i] = px[m].mean(0)
    d = ((px[:, None, :] - centers[None]) ** 2).sum(-1)
    lab = d.argmin(1)
    counts = np.bincount(lab, minlength=k)
    return centers, counts


def patch(img, x, y, r=3):
    h, w, _ = img.shape
    x0, x1 = max(0, x - r), min(w, x + r + 1)
    y0, y1 = max(0, y - r), min(h, y + r + 1)
    return np.median(img[y0:y1, x0:x1].reshape(-1, 3), axis=0)


def main():
    src, out = sys.argv[1], sys.argv[2]
    im = Image.open(src).convert("RGB")
    W, H = im.size
    arr = np.asarray(im).astype(float)
    res = {"size": [W, H]}

    # --- k-means su immagine ridotta
    small = im.resize((W // 4, H // 4), Image.LANCZOS)
    px = np.asarray(small).reshape(-1, 3).astype(float)
    km = {}
    for k in (10, 12):
        c, n = kmeans(px, k)
        order = np.argsort(-n)
        km[k] = [
            {"hex": to_hex(c[i]), "rgb": [int(round(v)) for v in c[i]], "hsl": hsl(c[i]), "pct": round(100 * n[i] / n.sum(), 2)}
            for i in order
        ]
    res["kmeans"] = km

    # --- campionamento puntuale (coordinate relative 0..1)
    pts = {
        "bg_corner_tl": (0.01, 0.01),
        "bg_corner_tr": (0.99, 0.01),
        "bg_corner_bl": (0.01, 0.99),
        "bg_corner_br": (0.99, 0.99),
        "bg_header": (0.30, 0.03),
        "bg_hero_left": (0.05, 0.20),
        "bg_hero_center": (0.40, 0.17),
        "bg_hero_glow_halo": (0.70, 0.10),
        "bg_mid_section": (0.50, 0.39),
        "bg_between_sections": (0.50, 0.595),
        "bg_dark_bottom": (0.05, 0.93),
        "bg_bottom_glow": (0.20, 0.965),
        "card_agency_fill": (0.20, 0.545),
        "card_academy_fill": (0.55, 0.57),
        "card_results_fill": (0.50, 0.66),
        "cta_panel_fill": (0.50, 0.88),
        "text_primary_title": (0.06, 0.088),  # 'P' di Più clienti
        "text_gold_title": (0.06, 0.165),
        "btn_gold_left": (0.07, 0.25),
        "btn_gold_mid": (0.20, 0.25),
        "btn_gold_right": (0.32, 0.25),
        "btn_cta_left": (0.65, 0.885),
        "btn_cta_right": (0.93, 0.885),
        "border_card_gold_top": (0.20, 0.4755),
        "border_card_gold_left": (0.0305, 0.55),
        "border_cta_panel_top": (0.5, 0.8305),
        "cobalt_chip_ai": (0.915, 0.115),
        "azure_icon": (0.575, 0.113),
        "logo_gold_mid": (0.73, 0.14),
    }
    res["points"] = {}
    for name, (fx, fy) in pts.items():
        x, y = int(fx * (W - 1)), int(fy * (H - 1))
        c = patch(arr, x, y, 2)
        res["points"][name] = {"xy": [x, y], "hex": to_hex(c), "rgb": [int(v) for v in c], "hsl": hsl(c)}

    # --- gradiente di sfondo verticale (colonna senza contenuto: x=1%)
    col = arr[:, int(0.008 * W):int(0.02 * W), :].mean(1)
    res["bg_vertical"] = []
    for i in range(0, 21):
        y = int(i / 20 * (H - 1))
        c = col[y]
        res["bg_vertical"].append({"y%": i * 5, "hex": to_hex(c)})

    # --- gradiente orizzontale del bottone oro (riga centrale del bottone primario)
    by = int(0.25 * (H - 1)) - 8
    row = arr[by, int(0.06 * W):int(0.33 * W), :]
    res["gold_button_h"] = [{"x%": i * 10, "hex": to_hex(row[int(i / 10 * (len(row) - 1))])} for i in range(11)]
    # verticale
    bx = int(0.2 * W)
    colb = arr[int(0.237 * H):int(0.268 * H), bx, :]
    res["gold_button_v"] = [{"y%": i * 25, "hex": to_hex(colb[int(i / 100 * (len(colb) - 1))])} for i in range(5)]

    # --- oro: pixel molto saturi, hue 35-50°, per ottenere rampa chiaro->scuro
    flat = arr.reshape(-1, 3) / 255
    mx, mn = flat.max(1), flat.min(1)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    r, g, b = flat[:, 0], flat[:, 1], flat[:, 2]
    hue = np.zeros(len(flat))
    d = np.maximum(mx - mn, 1e-6)
    hue = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    gold_mask = (hue > 28) & (hue < 55) & (sat > 0.55) & (mx > 0.45)
    gold = flat[gold_mask] * 255
    res["gold_pixels"] = int(gold_mask.sum())
    if len(gold) > 100:
        lum = gold.mean(1)
        ranks = [2, 10, 25, 50, 75, 90, 98]
        res["gold_ramp"] = [{"pctl": p, "hex": to_hex(gold[lum <= np.percentile(lum, p)][-200:].mean(0))} for p in ranks]

    # --- azure/cobalt: hue 195-235, sat>0.5, luminosità variabile
    blue_mask = (hue > 195) & (hue < 235) & (sat > 0.5) & (mx > 0.4)
    blue = flat[blue_mask] * 255
    res["blue_pixels"] = int(blue_mask.sum())
    if len(blue) > 100:
        lum = blue.mean(1)
        res["blue_ramp"] = [{"pctl": p, "hex": to_hex(blue[lum <= np.percentile(lum, p)][-200:].mean(0))} for p in [5, 25, 50, 75, 95]]
    azure_mask = (hue > 185) & (hue < 205) & (sat > 0.45) & (mx > 0.6)
    az = flat[azure_mask] * 255
    res["azure_pixels"] = int(azure_mask.sum())
    if len(az) > 100:
        res["azure_mean"] = to_hex(az.mean(0))

    # --- testo: testo secondario = pixel chiari non saturi
    lightmask = (mx > 0.55) & (sat < 0.25)
    res["text_light_pixels"] = int(lightmask.sum())
    if lightmask.sum() > 100:
        res["text_primary_candidates"] = to_hex((flat[lightmask] * 255)[(flat[lightmask] * 255).mean(1) > 235].mean(0)) if ((flat[lightmask] * 255).mean(1) > 235).any() else None
        midmask = lightmask & (mx < 0.85)
        if midmask.sum() > 50:
            res["text_secondary_candidates"] = to_hex((flat[midmask] * 255).mean(0))

    with open(out, "w") as f:
        json.dump(res, f, indent=2)
    print("OK", out)


if __name__ == "__main__":
    main()
