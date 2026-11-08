#!/usr/bin/env python3
"""Analisi mirata a regioni: oro, bordi, glow, card.
Uso: python3 -I extract_regions.py <immagine>
"""
import sys
import colorsys
import numpy as np
from PIL import Image


def hx(c):
    return "#{:02X}{:02X}{:02X}".format(*[int(round(v)) for v in c])


def hsv(a):
    a = a / 255
    mx, mn = a.max(-1), a.min(-1)
    d = np.maximum(mx - mn, 1e-6)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    return h, s, mx


def lum(a):
    return a @ np.array([0.2126, 0.7152, 0.0722])


def ramp(region, mask, qs=(5, 25, 50, 75, 95)):
    px = region[mask]
    if len(px) < 30:
        return None
    L = lum(px)
    out = []
    for q in qs:
        lo, hi = np.percentile(L, max(q - 4, 0)), np.percentile(L, min(q + 4, 100))
        sel = px[(L >= lo) & (L <= hi)]
        out.append((q, hx(sel.mean(0))))
    return out


im = np.asarray(Image.open(sys.argv[1]).convert("RGB")).astype(float)


def crop(x0, y0, x1, y1):
    return im[y0:y1, x0:x1]


# 1) Bottone oro primario "Prenota una consulenza gratuita"
r = crop(60, 362, 344, 404)
h, s, v = hsv(r)
m = (h > 30) & (h < 55) & (s > 0.4) & (v > 0.7)
print("BTN gold area px", m.sum())
print("BTN ramp (lum quantili):", ramp(r, m))
# gradiente verticale: mediana per riga
rows = []
for yy in range(0, r.shape[0], max(1, r.shape[0] // 6)):
    mm = m[yy]
    if mm.sum() > 20:
        rows.append((yy, hx(np.median(r[yy][mm], axis=0))))
print("BTN vertical:", rows)
cols = []
for xx in range(0, r.shape[1], r.shape[1] // 8):
    mm = m[:, xx]
    if mm.sum() > 5:
        cols.append((xx, hx(np.median(r[:, xx][mm], axis=0))))
print("BTN horizontal:", cols)
# bordo bottone (bordo più chiaro)
print("BTN top edge:", hx(np.median(im[360:364, 100:300].reshape(-1, 3), axis=0)), " bottom edge:", hx(np.median(im[402:406, 100:300].reshape(-1, 3), axis=0)))

# 2) Titolo "Crescita reale." gradiente verticale
r = crop(58, 232, 380, 282)
h, s, v = hsv(r)
m = (h > 30) & (h < 55) & (s > 0.5) & (v > 0.6)
print("TITLE gold ramp:", ramp(r, m))

# 3) Logo (gold ring+triskell)
r = crop(615, 100, 885, 370)
h, s, v = hsv(r)
m = (h > 28) & (h < 55) & (s > 0.55) & (v > 0.3)
print("LOGO gold px", m.sum(), "ramp:", ramp(r, m, (3, 15, 35, 55, 75, 90, 98)))
# core blu interno del medaglione
m2 = (h > 200) & (h < 235) & (s > 0.5)
print("LOGO blue medallion ramp:", ramp(r, m2))
print("LOGO centre fill:", hx(np.median(im[200:215, 655:675].reshape(-1, 3), axis=0)), "(zone near ring interior)")

# 4) Bordi card: profilo trasversale sul lato sinistro/alto di card Agency (x 31..343, y 731..895)
def edge_profile(label, line):
    # line: array Nx3 lungo un tratto
    L = lum(line)
    i = L.argmax()
    print(label, "brightest:", hx(line[i]), "at", i)

# Lato alto Agency: per ogni x campiono il max luminanza tra y 728..736
top = [im[728:737, x].max(axis=0) for x in range(40, 335, 1)]
top = np.array(top)
print("CARD Agency top edge sweep (x%->hex):", [(int(i / 8 * 100), hx(top[int(i / 8 * (len(top) - 1))])) for i in range(9)])
left = np.array([im[y, 28:36].max(axis=0) for y in range(740, 890)])
print("CARD Agency left edge sweep (y%->hex):", [(int(i / 8 * 100), hx(left[int(i / 8 * (len(left) - 1))])) for i in range(9)])
bottom = np.array([im[890:899, x].max(axis=0) for x in range(40, 335)])
print("CARD Agency bottom edge sweep:", [(int(i / 8 * 100), hx(bottom[int(i / 8 * (len(bottom) - 1))])) for i in range(9)])
# card Results (cobalt/azure border?) Nordic: x 658..964, y 937..1086
topr = np.array([im[934:941, x].max(axis=0) for x in range(670, 955)])
print("CARD result top sweep:", [(int(i / 4 * 100), hx(topr[int(i / 4 * (len(topr) - 1))])) for i in range(5)])
# CTA panel border
topc = np.array([im[1270:1278, x].max(axis=0) for x in range(60, 960)])
print("CTA panel top sweep:", [(int(i / 8 * 100), hx(topc[int(i / 8 * (len(topc) - 1))])) for i in range(9)])
botc = np.array([im[1452:1460, x].max(axis=0) for x in range(60, 960)])
print("CTA panel bottom sweep:", [(int(i / 8 * 100), hx(botc[int(i / 8 * (len(botc) - 1))])) for i in range(9)])

# 5) Fill delle card (mediana di zone vuote)
def med(x0, y0, x1, y1):
    return hx(np.median(im[y0:y1, x0:x1].reshape(-1, 3), axis=0))

print("FILL agency (left-top empty):", med(45, 745, 120, 760), " center:", med(45, 830, 70, 850))
print("FILL academy:", med(380, 745, 440, 765), " AI lab:", med(700, 745, 770, 765))
print("FILL results card:", med(350, 1060, 440, 1080), " second:", med(670, 1060, 740, 1080))
print("FILL cta panel left:", med(45, 1290, 60, 1330), " centre:", med(520, 1290, 600, 1310))
print("FILL header band:", med(0, 0, 30, 55), " | below header line:", med(0, 60, 40, 80))
print("FILL section 'Cos'e' band:", med(10, 470, 50, 500))

# 6) Alone attorno al medaglione: profilo radiale da centro (750, 215) verso destra e in basso
cx, cy = 750, 215
print("GLOW radial right:", [(d, hx(im[cy, min(cx + d, 1023)])) for d in (140, 160, 180, 200, 230, 260)])
print("GLOW radial down (platform):", [(d, hx(im[cy + d, cx])) for d in (150, 170, 180, 190, 200)])
print("GLOW left:", [(d, hx(im[cy, cx - d])) for d in (140, 180, 220, 260, 300)])

# 7) Panel/card chip: icon tiles floating (cobalt glass) e icone azure
print("Tile glass fill (AI chip tile):", med(915, 130, 930, 150), " bar chart tile:", med(520, 120, 540, 135))
h, s, v = hsv(crop(520, 110, 600, 200))
m = (h > 185) & (h < 215) & (s > 0.4) & (v > 0.6)
print("AZURE icon ramp (bar chart tile):", ramp(crop(520, 110, 600, 200), m, (10, 50, 90)))

# 8) Testi
r = crop(58, 115, 500, 235)
h, s, v = hsv(r)
m = (s < 0.15) & (v > 0.8)
print("TEXT primary ramp (headline):", ramp(r, m, (50, 90)))
r = crop(58, 285, 480, 345)
h, s, v = hsv(r)
m = (s < 0.2) & (v > 0.55)
print("TEXT body ramp (sub):", ramp(r, m, (50, 90, 98)))
r = crop(58, 540, 335, 880)
h, s, v = hsv(r)
m = (s < 0.2) & (v > 0.5)
print("TEXT card desc ramp:", ramp(r, m, (50, 90, 98)))
r = crop(105, 420, 340, 455)
h, s, v = hsv(r)
m = (s < 0.2) & (v > 0.5)
print("TEXT trust-bar ramp:", ramp(r, m, (50, 90, 98)))
# etichette overline (oro piccolo)
r = crop(58, 645, 240, 662)
h, s, v = hsv(r)
m = (h > 30) & (h < 55) & (s > 0.4) & (v > 0.5)
print("OVERLINE gold ramp:", ramp(r, m, (50, 90)))
