"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { LogoMark } from "@/components/brand/LogoMark";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };
/**
 * Le tre spirali del logo reale, come settori conici (gradi in senso orario da "ore 12"):
 * spirale in alto, in basso a destra, a sinistra. Misurati sul medaglione ritagliato.
 */
const SECTORS = [
  { from: 320, span: 106 },
  { from: 66, span: 135 },
  { from: 201, span: 119 },
] as const;

/**
 * Il simbolo: a sinistra il logo reale grande, a destra i 3 pilastri come righe con filetto.
 * Ogni spirale del logo è collegata a un pilastro: un ciclo CSS (9 s) li accende in sequenza,
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
            <div aria-hidden="true" className="absolute -inset-[6%] rounded-full border border-dashed border-line-strong" />
            <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.16),transparent_68%)]" />
            {/* logo spento + una spirale alla volta accesa */}
            <LogoMark alt={site.hero.symbolAlt} sizes="(min-width: 1024px) 28rem, 90vw" className="absolute inset-0 h-full w-full brightness-[0.5] saturate-[0.65]" />
            {SECTORS.map((sec, i) => {
              const mask = `conic-gradient(from ${sec.from}deg at 50% 50%, #000 0deg ${sec.span}deg, transparent ${sec.span}deg)`;
              return (
                <LogoMark
                  key={sec.from}
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  data-i={i}
                  className="sym-sector absolute inset-0 h-full w-full brightness-[1.35] saturate-150"
                  style={{ "--i": i, maskImage: mask, WebkitMaskImage: mask } as CSSVars}
                />
              );
            })}
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
