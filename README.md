# Triskell Ecosystem — sito

Home e base scalabile del nuovo sito. Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 · Motion · GSAP + ScrollTrigger · Lenis · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
npm run todos      # elenco dei segnaposto da sostituire (--strict per fallire se ne restano)
```

## Struttura del sito

| Pagina | Percorso | Contenuto |
|---|---|---|
| Home | `/` | Hero, "Cos'è Triskell Ecosystem?" (definizione + schema dei due rami), "Cosa ottieni step dopo step", metodo, storie di crescita, simbolo 3D |
| Agency | `/agency` | Funnel gestito da noi, servizi, "Come lavoriamo", link a Siti web e Portfolio |
| Siti web | `/agency/siti-web` | Vetrina dei siti realizzati da William (oggi segnaposto) |
| Portfolio | `/agency/portfolio` | Progetti e risultati |
| Academy | `/academy` | Percorso per diventare indipendente + tutorial video |
| Chi siamo | `/chi-siamo` | Team (Tomaso, William, collaboratori occasionali) |
| Contatti | `/contatti` | Form "Prenota ora" + FAQ |
| Altro | `/ai-lab`, `/risorse` | AI Lab (in arrivo) e Libreria risorse (segnaposto) |

Le fasce **"Prenota ora"** (`CtaBand`) compaiono in più punti di ogni pagina; testo e titolo si cambiano in `site.cta`.

## Dove si modifica cosa

| Cosa | Dove |
|---|---|
| **Tutti i testi** (copy, menu, percorsi, FAQ, form, footer, pagine) | `src/content/site.ts` — non servono modifiche ai componenti. Le parti tra `[parentesi]` nei titoli diventano oro. |
| Menu in alto (voci, sottomenu, pulsante) | `site.nav` |
| Colori, font, easing, raggi, gradienti | `src/styles/tokens.css` (nessun colore hardcoded nei componenti) |
| Misure e motivazioni dei colori | `docs/design-tokens.md` + `scripts/design/` |
| Sezioni | `src/components/sections/` · pagine in `src/app/` |
| Primitive / motion | `src/components/ui/`, `src/components/motion/` |
| Logo e livelli del simbolo 3D | `brand-assets/` (originali) → `public/brand/` (ritagli e livelli) |
| Form contatti | `src/components/sections/ContactForm.tsx` + `src/app/api/contact/route.ts` |

## Come sono fatte le animazioni

- **Reveal, titoli a maschera, count-up, micro-visual**: componenti *server* + CSS (solo `opacity`/`transform`/`filter`) attivati da **un solo** `IntersectionObserver` (`RevealRoot`). Zero idratazione per istanza.
- **Hero**: logo reale su sfondo vivo (rete di nodi e impulsi in canvas da 768px in su, aurora e anelli HUD che ruotano via CSS transform; su mobile restano fermi). Il titolo è CSS puro senza opacità iniziale; al passaggio del mouse le parole bianche diventano oro.
- **Simbolo 3D**: il logo reale è separato in livelli (fondo, anello, tre spirali, nucleo) con `scripts` in Python/OpenCV; la scena usa CSS 3D (`perspective`, `translateZ`) guidata dallo scroll e dal mouse.
- **Pulsanti**: restano sul loro asse (nessun effetto magnetico); feedback solo con luce in hover e al click.
- **Come lavoriamo**: GSAP ScrollTrigger (pin + scrub), importato dinamicamente e solo da 768 px in su.
- **Menu e dropdown**: Motion (`LazyMotion` + `m`, solo le feature necessarie).
- **Smooth scroll** Lenis: non su touch né con `prefers-reduced-motion`.
- **Matrix**: canvas solo da 768 px, DPR ≤ 1.5, in pausa fuori viewport e con tab nascosta.
- `prefers-reduced-motion`: ogni animazione ha una versione statica.

### Regole che vale la pena non rompere (costate caro in debug)

1. **Niente `opacity` animata da 0 su antenati/hero**: Chrome esclude l'elemento (e tutto ciò che contiene) dall'LCP finché dura l'animazione. Per questo `template.tsx` anima solo `transform`.
3. **L'H1 della hero è un unico blocco di testo** (niente parole in `inline-block`): con il logo come immagine più grande sopra la piega, Lighthouse mobile simula un LCP molto più alto se il candidato è l'immagine. Un H1 unico resta il candidato LCP.
2. **Niente `animation-fill-mode: both/forwards` con `transform` su antenati di elementi `position: fixed`**: un transform residuo li rende relativi al contenitore e rompe il pin GSAP. Usare `backwards`.

## Prestazioni (build di produzione, Lighthouse 12, emulazione mobile e desktop)

| | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Mobile | 96–100 | 100 | 100 | 100 | 0,9 s | 0 | 80–210 ms |
| Desktop | 100 | 100 | 100 | 100 | 0,7 s | 0 | 0 ms |

## Da collegare / da fornire

Vedi `npm run todos`. In sintesi: dati reali (metriche, clienti, KPI, bio), foto del team, ID YouTube dei tutorial, profili social, dominio, P.IVA e pagine legali, logo in alta risoluzione o SVG (oggi si usa il PNG 1024 ritagliato, vedi `brand-assets/` e `public/brand/`), e il collegamento di Supabase/Resend in `src/app/api/contact/route.ts` (variabili in `.env.example`).
