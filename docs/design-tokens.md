# Design tokens — Triskell Ecosystem

Fonte unica: la grafica di riferimento (`brand-assets/riferimento-home.png`, 1024×1536 px).

**Logo:** si usa il logo reale (`brand-assets/triskell-logo-completo.png`, 1024×1024, raster). Il medaglione è ritagliato su fondo trasparente in `public/brand/triskell-medallion.png` (640×640; favicon e apple-icon derivati). I colori del logo (anello e spirali ramato-oro, fondo blu a trama) sono più scuri dell'oro della grafica: il gradiente oro del sito resta quello misurato sulla grafica. **Con un SVG o un PNG ad alta risoluzione il logo sarebbe più nitido sugli schermi retina.**
Tutti i valori sono **misurati** con gli script in `scripts/design/` (dati grezzi in `docs/palette-raw.json` e `docs/regions-raw.txt`).

## 1. Lettura della grafica (10 righe)

1. Composizione a colonna unica verticale, a bande orizzontali separate da filetti sottili: header → hero → "Cos'è" → 3 aree → risultati → metodo → CTA.
2. Hero asimmetrica: titolo a sinistra su 4 righe, la quarta in oro; a destra il simbolo come medaglione 3D su piattaforma luminosa.
3. Atmosfera: notte profonda (#010F1C, 50% dell'area) con un unico punto di luce cobalt/azure dietro il simbolo. Sensazione tech-premium, non "neon".
4. Glow: alone azure (#0B81B1) in anello attorno al medaglione, bagliore cobalt (#054C89) dietro, riflesso oro sulla piattaforma. Il fondo pagina ha un bagliore cobalt basso (#053860) sotto la CTA.
5. Oro: usato come **segnale**, non come decorazione. Compare solo su ultima riga del titolo, CTA primarie, overline di sezione, parole chiave dei titoli, bordi delle card principali, icone, numeri chiave.
6. Gradienti oro: dall'alto (#FDD873) al basso (#DA9C25) sui bottoni; sul logo da #FDDA5A a #5E3605 per dare volume metallico.
7. Bordi card: oro "beam" con riflessi molto chiari agli angoli e sul lato basso (#FFF7BE), tratto spento (~#64635F) a metà del lato sinistro e in alto al centro. Raggio ~14 px.
8. Tile glass fluttuanti (icone AI, grafico, persone, target) in cobalt semitrasparente con bordo azure sottile, inclinati in prospettiva attorno al logo.
9. Tipografia: titoli in sans geometrica bold (a, e e g a occhio singolo, forme tonde), corpo in sans neutra tipo Inter. Alto contrasto, molta gerarchia.
10. Ritmo: griglia rigorosa a 3 colonne, margini laterali costanti (~58 px su 1024), numeri grandi in oro con micro-etichette in bianco al 80%.

## 2. Palette dominante (k-means, 12 cluster, area %)

| HEX | Area | Ruolo |
|---|---|---|
| #02111F | 49.9% | Sfondo base |
| #051F36 | 18.2% | Sfondo sfumato / fasce |
| #292F31 | 6.5% | Antialias testo/bordi su scuro |
| #0D3E66 | 5.2% | Cobalt (tile, alone) |
| #474A48 | 5.0% | Antialias testo/bordi |
| #656D75 | 3.5% | Testo spento (⚠ non AA) |
| #886D36 | 2.8% | Oro in ombra |
| #D59F2D | 2.5% | Oro medio (bottoni) |
| #91979A | 2.2% | Testo secondario |
| #F2CD6A | 2.1% | Oro chiaro (titolo) |
| #2584B5 | 1.2% | Azure |
| #D9DCDB | 1.1% | Testo primario |

## 3. Token

| Token | HEX | RGB | HSL | Dove compare nella grafica | Uso previsto |
|---|---|---|---|---|---|
| **Sfondi e superfici** | | | | | |
| `night (background)` | `#010F1C` | 1, 15, 28 | 209° 93% 6% | Sfondo pagina (50% dell'area, 4 angoli, fascia header) | `bg-night` — sfondo base |
| `night-deep` | `#000C18` | 0, 12, 24 | 210° 100% 5% | Angolo alto-dx, fondo pagina | Footer, vignettatura |
| `night-glow` | `#011A30` | 1, 26, 48 | 208° 96% 10% | Centro hero a sx del medaglione | Gradient mesh hero/CTA |
| `night-raised` | `#051F36` | 5, 31, 54 | 208° 83% 12% | Cluster k-means 18% (aree sfumate tra sezioni) | Bande di sezione alternate |
| `surface` | `#061725` | 6, 23, 37 | 207° 72% 8% | Fondo card Agency/Academy (zone vuote) | `bg-surface` — card standard |
| `surface-2 (elevated)` | `#0D273D` | 13, 39, 61 | 207° 65% 15% | Pannello CTA finale (centro) | Card in evidenza, dropdown, form |
| `surface-3` | `#1A2940` | 26, 41, 64 | 216° 42% 18% | Card Agency, punto più chiaro del fill | Hover card, tile bento attiva |
| **Bordi** | | | | | |
| `line` | `#152F47` | 21, 47, 71 | 209° 54% 18% | Bordo alto pannello CTA (tratto spento) | Separatori, bordi card neutre |
| `line-strong` | `#233750` | 35, 55, 80 | 213° 39% 23% | Linee orizzontali di sezione, bordo tile | Bordi in hover / input |
| `line-neutral` | `#888F97` | 136, 143, 151 | 212° 7% 56% | Picco 1px bordo card 'Storie di crescita' | Usato a 30% di opacità |
| **Testo** | | | | | |
| `fg (text-primary)` | `#F2F6FB` | 242, 246, 251 | 213° 53% 97% | Titoli bianchi, 90° percentile testo chiaro | Titoli e testo principale |
| `fg-2 (text-secondary)` | `#CED2DA` | 206, 210, 218 | 220° 14% 83% | Testo corpo/descrizioni (mediana) | Sottotitoli, descrizioni |
| `fg-3 (text-muted)` | `#91979A` | 145, 151, 154 | 200° 4% 59% | Cluster k-means 2.2%: micro-testo | Didascalie, legali (6.5:1 su night) |
| **Oro (da chiaro a scuro)** | | | | | |
| `gold-100` | `#FFF7BE` | 255, 247, 190 | 53° 100% 87% | Highlight angoli bordi card, riflesso piattaforma | Highlight bordo beam |
| `gold-200` | `#FDDA5A` | 253, 218, 90 | 47° 98% 67% | Logo p98, bordo alto bottone #FBDC82 | Inizio gradiente oro |
| `gold-300` | `#F7C85C` | 247, 200, 92 | 42° 91% 66% | Bottone primario (zona centrale) | Fill CTA primaria |
| `gold-400` | `#ECB851` | 236, 184, 81 | 40° 80% 62% | Titolo 'Crescita reale.' (mediana) | Testo accento su scuro |
| `gold-500` | `#DEA112` | 222, 161, 18 | 42° 85% 47% | Logo, spirale (p55) | Icone oro, tratti SVG |
| `gold-600` | `#C3850E` | 195, 133, 14 | 39° 87% 41% | Logo, ombre (p35) | Fine gradiente, bordi attenuati |
| `gold-700` | `#86550B` | 134, 85, 11 | 36° 85% 28% | Logo, ombra profonda (p15) | SOLO decorativo (3.0:1) |
| `gold-800` | `#5E3605` | 94, 54, 5 | 33° 90% 19% | Logo, ombra più scura (p3) | SOLO decorativo, profondità |
| `gold-btn-end` | `#DA9C25` | 218, 156, 37 | 39° 71% 50% | Bordo inferiore bottone primario | Stop finale gradiente bottone |
| **Cobalt** | | | | | |
| `cobalt-900` | `#031125` | 3, 17, 37 | 215° 85% 8% | Medaglione logo, zona più scura | Fill medaglione |
| `cobalt-800` | `#032046` | 3, 32, 70 | 214° 92% 14% | Medaglione logo (p25) | Fill radiale medaglione |
| `cobalt-700` | `#083059` | 8, 48, 89 | 210° 84% 19% | Medaglione logo (mediana) | Gradient mesh |
| `cobalt-600` | `#0D3E66` | 13, 62, 102 | 207° 77% 23% | Cluster k-means 5.2%, tile glass | Fill tile/glow secondario |
| `cobalt-500` | `#054F82` | 5, 79, 130 | 204° 93% 26% | Alone hero, tile 'bar chart' (#04568F) | Alone, bordi glass |
| `cobalt-400` | `#0B5A8D` | 11, 90, 141 | 204° 86% 30% | Cobalt p95 | Bordi glass attivi |
| `cobalt-300` | `#216A9E` | 33, 106, 158 | 205° 65% 37% | Riflessi medaglione | Highlight glass |
| **Azure** | | | | | |
| `azure-500` | `#138DC8` | 19, 141, 200 | 200° 83% 43% | Icone nei tile glass (mediana) | Icone, linee di connessione |
| `azure-400` | `#2A90C3` | 42, 144, 195 | 200° 65% 46% | Media pixel azure (hue 185–205°) | Accento freddo, link |
| `azure-300` | `#3AA4D4` | 58, 164, 212 | 199° 64% 53% | Icone nei tile (p90) | Highlight icone |
| `azure-glow` | `#0B81B1` | 11, 129, 177 | 197° 88% 37% | Anello luminoso intorno al medaglione | Glow azure |


### Ruoli semantici

| Ruolo | Token |
|---|---|
| background | `night` |
| surface | `surface` |
| surface-elevated | `surface-2` |
| border | `line` / `line-strong` |
| text-primary | `fg` |
| text-secondary | `fg-2` (muted: `fg-3`) |
| accent-gold | `gold-*` |
| accent-cobalt | `cobalt-*` |
| accent-azure | `azure-*` |
| glow | `--glow-gold`, `--glow-azure`, `--glow-cobalt` |

## 4. Gradienti

| Nome | Direzione | Stop |
|---|---|---|
| `--gradient-gold-btn` | 180° | #FDD873 0% → #F7C85C 45% → #DA9C25 100% |
| `--gradient-gold-text` | 180° | #FDDA5A → #ECB851 → #C3850E (titoli, numeri) |
| `--gradient-gold-metal` | 135° | #FFF7BE → #FDDA5A → #DEA112 → #86550B (logo, simbolo) |
| `--gradient-beam` | conic 360° (ruotato via transform) | oro spento #64635F-like (oro a 18%) → #F7C85C → #FFF7BE → spento. Replica bordo card |
| `--gradient-bg-hero` | radiale, centro a ~72% × 12% | #054C89 (alone) → #011A30 → #010F1C |
| `--gradient-bg-cta` | radiale in basso a sinistra | #053860 → #010F1C |
| Sfondo pagina | verticale | quasi costante #010F1C ±2 (misurato lungo x=1%): niente gradiente globale, solo luci localizzate |

## 5. Contrasti WCAG 2.1 (misurati con `scripts/design/contrast.py`)

| Coppia | Rapporto | Esito |
|---|---|---|
| fg `#F2F6FB` su night | 17.8:1 | AAA |
| fg su surface | 16.7:1 | AAA |
| fg-2 `#CED2DA` su night | 12.8:1 | AAA |
| fg-2 su surface-2 | 10.1:1 | AAA |
| fg-3 `#91979A` su night | 6.5:1 | AA |
| fg-3 su surface | 6.1:1 | AA |
| gold-400 `#ECB851` su night | 10.6:1 | AAA |
| gold-300 `#F7C85C` su night (focus ring) | 12.3:1 | AAA |
| night su gold-300 (testo bottone) | 12.3:1 | AAA |
| night su gold-btn-end `#DA9C25` | 8.1:1 | AAA |
| azure-400 `#2A90C3` su night | 5.4:1 | AA |
| gold-600 `#C3850E` su night | 6.2:1 | AA |
| **`#656D75` su night** (testo spento nella grafica) | **3.7:1** | **Non AA** → sostituito con `fg-3` `#91979A` (+2.8 di rapporto) |
| **gold-700 `#86550B` su night** | **3.0:1** | **Solo grandi/decorativo** → mai per testo |
| **cobalt-600 `#0D3E66` / cobalt-400 `#0B5A8D` su night** | **1.8 / 2.6:1** | **Solo decorativo** (alone, tile, bordi), mai testo né unico indicatore |

Regola nel codice: l'oro per testo piccolo è sempre ≥ gold-400; i cobalt non portano mai informazione da soli.

## 6. Incoerenze tra grafica e brief (decisioni prese)

| Grafica | Brief | Decisione |
|---|---|---|
| Logo a sinistra nell'header | Logo in alto a destra | **Brief**: logo a destra |
| Menu: Agency, Academy, AI Lab, Siti Web, Portfolio, Chi siamo | Agency, Academy, Chi siamo, "Altro" → AI Lab | **Brief** |
| AI Lab è la terza card in home | AI Lab solo nel dropdown | **Brief** |
| CTA "Parla con il Team" / "Prenota una consulenza gratuita" | CTA "Parliamone" | **Brief** |
| Titolo hero di 10 parole | Titoli brevi | Hero ridotto, vedi `site.ts` |
| Metriche reali (+320%, +500, 2 su 3, +180%) | Non inventare dati | Tutte come segnaposto `// TODO: dato reale` |

## 7. Font suggeriti

- **Display:** *Sora* (geometrica, tech, a occhio singolo) — corrisponde ai titoli della grafica. Alternativa: Outfit.
- **Corpo:** *Inter* — corrisponde al testo corpo.
- Entrambi via `next/font/google` (self-hosted al build, nessuna richiesta runtime), con `display: swap` e subset latin.

## 8. Effetti da ricreare

| Effetto | Tecnica |
|---|---|
| Alone/anello azure attorno al simbolo | radial-gradient + SVG blur, opacity pulse |
| Bordo oro "beam" | conic-gradient dentro un anello ritagliato con mask; a ruotare è il layer (transform), non l'angolo del gradiente |
| Glow su hover | box-shadow multiplo + opacity |
| Sfondo tecnico dietro il logo | anelli concentrici con tacche, archi e nodi che ruotano lentamente (livelli SVG separati, rotazione via CSS transform), raggi e tracce di circuito agli angoli |
| Griglia sottile | background-image linear-gradient 1px a 4% (fixed, no repaint) |
| "Matrix" discreta | canvas leggero, DPR ≤ 1.5, in pausa fuori viewport |
