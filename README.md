# Triskell Ecosystem — sito

Home e base scalabile del nuovo sito. Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 · Motion · GSAP + ScrollTrigger · Lenis · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
npm run todos      # elenco dei segnaposto da sostituire (--strict per fallire se ne restano)
```

## Dove si modifica cosa

| Cosa | Dove |
|---|---|
| **Tutti i testi** (copy, numeri, FAQ, menu, form, footer) | `src/content/site.ts` — non servono modifiche ai componenti. Le parti tra `[parentesi]` nei titoli diventano oro. |
| Colori, font, easing, raggi, gradienti | `src/styles/tokens.css` (nessun colore hardcoded nei componenti) |
| Misure e motivazioni dei colori | `docs/design-tokens.md` + `scripts/design/` |
| Sezioni della home | `src/components/sections/` (ordine in `src/app/page.tsx`) |
| Primitive / motion | `src/components/ui/`, `src/components/motion/` |
| Form contatti | `src/components/sections/ContactForm.tsx` + `src/app/api/contact/route.ts` |

## Come sono fatte le animazioni

- **Reveal, titoli a maschera, count-up, micro-visual**: componenti *server* + CSS (solo `opacity`/`transform`/`filter`) attivati da **un solo** `IntersectionObserver` (`RevealRoot`). Zero idratazione per istanza.
- **Hero**: CSS puro, senza opacità iniziale (serve per l'LCP, vedi sotto).
- **Come lavoriamo**: GSAP ScrollTrigger (pin + scrub), importato dinamicamente e solo da 768 px in su.
- **Menu e dropdown**: Motion (`LazyMotion` + `m`, solo le feature necessarie).
- **Smooth scroll** Lenis: non su touch né con `prefers-reduced-motion`.
- **Matrix**: canvas solo da 768 px, DPR ≤ 1.5, in pausa fuori viewport e con tab nascosta.
- `prefers-reduced-motion`: ogni animazione ha una versione statica.

### Regole che vale la pena non rompere (costate caro in debug)

1. **Niente `opacity` animata da 0 su antenati/hero**: Chrome esclude l'elemento (e tutto ciò che contiene) dall'LCP finché dura l'animazione. Per questo `template.tsx` anima solo `transform`.
2. **Niente `animation-fill-mode: both/forwards` con `transform` su antenati di elementi `position: fixed`**: un transform residuo li rende relativi al contenitore e rompe il pin GSAP. Usare `backwards`.

## Prestazioni (build di produzione, Lighthouse 12, emulazione mobile e desktop)

| | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Mobile | 99 | 100 | 100 | 100 | 0,9 s | 0 | ~110 ms |
| Desktop | 100 | 100 | 100 | 100 | 0,3 s | 0 | ~0 ms |

## Da collegare / da fornire

Vedi `npm run todos`. In sintesi: dati reali (metriche, clienti, KPI, bio), foto del team, ID YouTube dei tutorial, profili social, dominio, P.IVA e pagine legali, logo SVG ufficiale (oggi un redisegno vettoriale provvisorio in `public/brand/triskell-mark.svg` e `src/components/brand/triskell-path.ts`), e il collegamento di Supabase/Resend in `src/app/api/contact/route.ts` (variabili in `.env.example`).
