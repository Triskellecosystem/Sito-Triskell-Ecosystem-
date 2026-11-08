#!/usr/bin/env python3
"""Genera il path di un braccio del triskell (coda + spirale) in viewBox 100x100.
Il simbolo completo = 3 copie ruotate di 120° attorno a (50,50).
Uso: python3 -I gen_triskell_path.py
"""
import math

CX, CY = 50.0, 50.0           # centro del simbolo
COIL_C = (0.0, -26.5)         # centro della spirale, relativo al centro (braccio verso l'alto)
R0, R1 = 11.5, 3.2            # raggio iniziale/finale della spirale
TURNS_DEG = 500               # estensione angolare
PHI0 = 180.0                  # si entra nella spirale da sinistra, in senso orario

def pt(phi, r):
    a = math.radians(phi)
    return (COIL_C[0] + r * math.cos(a), COIL_C[1] + r * math.sin(a))

pts = []
n = 64
for i in range(n + 1):
    t = i / n
    phi = PHI0 + TURNS_DEG * t
    r = R0 + (R1 - R0) * (t ** 0.9)
    pts.append(pt(phi, r))

def fmt(p):
    return f"{CX + p[0]:.2f} {CY + p[1]:.2f}"

start = pts[0]
# coda: dal centro (0,0) alla spirale, tangente verticale (verso l'alto) all'ingresso
c1 = (8.5, -8.0)
c2 = (start[0], start[1] + 15.0)
d = f"M{CX:.2f} {CY:.2f} C{fmt(c1)} {fmt(c2)} {fmt(start)}"
# Catmull-Rom -> cubic bezier per la spirale
P = [pts[0]] + pts + [pts[-1]]
for i in range(1, len(P) - 2):
    p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
    b1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
    b2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
    d += f" C{fmt(b1)} {fmt(b2)} {fmt(p2)}"
print(d)
