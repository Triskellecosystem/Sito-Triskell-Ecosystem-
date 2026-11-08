#!/usr/bin/env python3
"""Genera la tabella token (HEX/RGB/HSL) per docs/design-tokens.md.
Uso: python3 -I gen_tokens_doc.py > tabella.md
"""
import colorsys

def rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def hsl(h):
    r, g, b = [x / 255 for x in rgb(h)]
    hh, l, s = colorsys.rgb_to_hls(r, g, b)
    return f"{round(hh*360)}° {round(s*100)}% {round(l*100)}%"

# (token, hex, dove compare nella grafica, uso previsto)
GROUPS = {
"Sfondi e superfici": [
 ("night (background)", "#010F1C", "Sfondo pagina (50% dell'area, 4 angoli, fascia header)", "`bg-night` — sfondo base"),
 ("night-deep", "#000C18", "Angolo alto-dx, fondo pagina", "Footer, vignettatura"),
 ("night-glow", "#011A30", "Centro hero a sx del medaglione", "Gradient mesh hero/CTA"),
 ("night-raised", "#051F36", "Cluster k-means 18% (aree sfumate tra sezioni)", "Bande di sezione alternate"),
 ("surface", "#061725", "Fondo card Agency/Academy (zone vuote)", "`bg-surface` — card standard"),
 ("surface-2 (elevated)", "#0D273D", "Pannello CTA finale (centro)", "Card in evidenza, dropdown, form"),
 ("surface-3", "#1A2940", "Card Agency, punto più chiaro del fill", "Hover card, tile bento attiva"),
],
"Bordi": [
 ("line", "#152F47", "Bordo alto pannello CTA (tratto spento)", "Separatori, bordi card neutre"),
 ("line-strong", "#233750", "Linee orizzontali di sezione, bordo tile", "Bordi in hover / input"),
 ("line-neutral", "#888F97", "Picco 1px bordo card 'Storie di crescita'", "Usato a 30% di opacità"),
],
"Testo": [
 ("fg (text-primary)", "#F2F6FB", "Titoli bianchi, 90° percentile testo chiaro", "Titoli e testo principale"),
 ("fg-2 (text-secondary)", "#CED2DA", "Testo corpo/descrizioni (mediana)", "Sottotitoli, descrizioni"),
 ("fg-3 (text-muted)", "#91979A", "Cluster k-means 2.2%: micro-testo", "Didascalie, legali (6.5:1 su night)"),
],
"Oro (da chiaro a scuro)": [
 ("gold-100", "#FFF7BE", "Highlight angoli bordi card, riflesso piattaforma", "Highlight bordo beam"),
 ("gold-200", "#FDDA5A", "Logo p98, bordo alto bottone #FBDC82", "Inizio gradiente oro"),
 ("gold-300", "#F7C85C", "Bottone primario (zona centrale)", "Fill CTA primaria"),
 ("gold-400", "#ECB851", "Titolo 'Crescita reale.' (mediana)", "Testo accento su scuro"),
 ("gold-500", "#DEA112", "Logo, spirale (p55)", "Icone oro, tratti SVG"),
 ("gold-600", "#C3850E", "Logo, ombre (p35)", "Fine gradiente, bordi attenuati"),
 ("gold-700", "#86550B", "Logo, ombra profonda (p15)", "SOLO decorativo (3.0:1)"),
 ("gold-800", "#5E3605", "Logo, ombra più scura (p3)", "SOLO decorativo, profondità"),
 ("gold-btn-end", "#DA9C25", "Bordo inferiore bottone primario", "Stop finale gradiente bottone"),
],
"Cobalt": [
 ("cobalt-900", "#031125", "Medaglione logo, zona più scura", "Fill medaglione"),
 ("cobalt-800", "#032046", "Medaglione logo (p25)", "Fill radiale medaglione"),
 ("cobalt-700", "#083059", "Medaglione logo (mediana)", "Gradient mesh"),
 ("cobalt-600", "#0D3E66", "Cluster k-means 5.2%, tile glass", "Fill tile/glow secondario"),
 ("cobalt-500", "#054F82", "Alone hero, tile 'bar chart' (#04568F)", "Alone, bordi glass"),
 ("cobalt-400", "#0B5A8D", "Cobalt p95", "Bordi glass attivi"),
 ("cobalt-300", "#216A9E", "Riflessi medaglione", "Highlight glass"),
],
"Azure": [
 ("azure-500", "#138DC8", "Icone nei tile glass (mediana)", "Icone, linee di connessione"),
 ("azure-400", "#2A90C3", "Media pixel azure (hue 185–205°)", "Accento freddo, link"),
 ("azure-300", "#3AA4D4", "Icone nei tile (p90)", "Highlight icone"),
 ("azure-glow", "#0B81B1", "Anello luminoso intorno al medaglione", "Glow azure"),
],
}

print("| Token | HEX | RGB | HSL | Dove compare nella grafica | Uso previsto |")
print("|---|---|---|---|---|---|")
for g, rows in GROUPS.items():
    print(f"| **{g}** | | | | | |")
    for n, h, w, u in rows:
        r = rgb(h)
        print(f"| `{n}` | `{h}` | {r[0]}, {r[1]}, {r[2]} | {hsl(h)} | {w} | {u} |")
