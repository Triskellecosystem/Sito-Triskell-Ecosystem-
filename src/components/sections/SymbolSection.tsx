"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { site } from "@/content/site";
import { ARM_PATH } from "@/components/brand/triskell-path";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };
const ROTATIONS = [0, 120, 240];

/**
 * Il simbolo: a sinistra il triskell grande, a destra i 3 pilastri come righe con filetto.
 * Ogni braccio della spirale è collegato a un pilastro: un ciclo CSS (9 s) li accende in sequenza,
 * l'hover su un pilastro prende il controllo. Con reduced motion: tutto acceso, statico.
 */
export function SymbolSection() {
  const { symbol } = site;
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id={symbol.id} labelledBy="symbol-title" className="overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-10%] top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(5_76_137/0.35),transparent_65%)]" />

      <div className="sym relative grid items-center gap-14 lg:grid-cols-12 lg:gap-12" data-active={active ?? undefined}>
        <Reveal className="mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none" y={30}>
          <div className="relative mx-auto aspect-square w-full max-w-[28rem]">
            <svg viewBox="-4 -4 108 108" fill="none" role="img" aria-label={site.hero.symbolAlt} className="h-full w-full overflow-visible">
              <defs>
                <linearGradient id="sym-gold" x1="18" y1="6" x2="82" y2="94" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="var(--color-gold-200)" />
                  <stop offset="0.5" stopColor="var(--color-gold-300)" />
                  <stop offset="1" stopColor="var(--color-gold-500)" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="49" stroke="var(--color-line-strong)" strokeWidth="0.35" strokeDasharray="0.6 2.4" />
              <circle cx="50" cy="50" r="42" stroke="var(--color-line)" strokeWidth="0.3" />
              {ROTATIONS.map((deg, i) => (
                <g key={deg} transform={deg ? `rotate(${deg} 50 50)` : undefined} strokeLinecap="round" strokeLinejoin="round">
                  {/* tracciato base (si disegna all'ingresso) */}
                  <motion.path
                    d={ARM_PATH}
                    stroke="var(--color-cobalt-400)"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 1.8, delay: 0.2 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* glow + evidenziazione oro (ciclo coordinato) */}
                  <path
                    d={ARM_PATH}
                    className="sym-arm-glow"
                    data-i={i}
                    style={{ "--i": i, filter: "blur(2.4px)" } as CSSVars}
                    stroke="var(--color-gold-400)"
                    strokeWidth="5.5"
                  />
                  <path d={ARM_PATH} className="sym-arm-hi" data-i={i} style={{ "--i": i } as CSSVars} stroke="url(#sym-gold)" strokeWidth="4.4" />
                </g>
              ))}
              <circle cx="50" cy="50" r="3" fill="var(--color-gold-200)" />
            </svg>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading id="symbol-title" overline={symbol.overline} title={symbol.title} line={symbol.line} />

          <ul className="mt-10 sm:mt-12" onPointerLeave={() => setActive(null)}>
            {symbol.pillars.map((p, i) => (
              <li
                key={p.from}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                className="relative border-t border-line last:border-b"
              >
                <span aria-hidden="true" data-i={i} style={{ "--i": i } as CSSVars} className="sym-pillar-bar absolute inset-x-0 -top-px h-px bg-gold-300" />
                <div data-i={i} style={{ "--i": i } as CSSVars} className="sym-pillar flex items-start gap-5 py-6 sm:py-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold-400/35 bg-gold-300/10 text-gold-300">
                    <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="flex flex-wrap items-baseline gap-x-3 text-h3 text-fg">
                      <span className="text-fg-2">{p.from}</span>
                      <Icon name="arrow-right" className="h-5 w-5 translate-y-0.5 text-gold-300" />
                      <span className="text-gold">{p.to}</span>
                    </h3>
                    <p className="mt-2 text-body text-fg-2">{p.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
