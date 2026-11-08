"use client";

import { useId, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * FAQ: colonna centrata (non la solita coppia titolo-sx / contenuto-dx), accordion accessibile:
 * pulsanti con aria-expanded/aria-controls, regioni con aria-labelledby, frecce su/giù, Home/End.
 */
export function Faq() {
  const { faq } = site;
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = faq.items.length;
    const move = (to: number) => {
      e.preventDefault();
      buttons.current[(to + n) % n]?.focus();
    };
    if (e.key === "ArrowDown") move(i + 1);
    else if (e.key === "ArrowUp") move(i - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(n - 1);
  };

  return (
    <Section id={faq.id} labelledBy="faq-title" innerClassName="max-w-4xl">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />
      <SectionHeading id="faq-title" overline={faq.overline} title={faq.title} line={faq.line} />

      <RevealGroup className="mt-12 sm:mt-14" stagger={0.07}>
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          const btnId = `${uid}-b${i}`;
          const panelId = `${uid}-p${i}`;
          return (
            <RevealItem key={item.q} y={20} blur={0} className="border-t border-line last:border-b">
              <h3>
                <button
                  ref={(el) => {
                    buttons.current[i] = el;
                  }}
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="group/q flex w-full items-center gap-5 py-6 text-left sm:py-7"
                >
                  <span className="w-8 shrink-0 font-display text-small font-semibold text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("flex-1 font-display text-[clamp(1.0625rem,0.95rem+0.5vw,1.375rem)] font-semibold tracking-tight transition-colors duration-[var(--dur-base)]", isOpen ? "text-gold-200" : "text-fg group-hover/q:text-gold-200")}>
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-[var(--dur-base)] ease-out-expo",
                      isOpen ? "rotate-45 border-gold-300 bg-gold-300 text-night" : "border-line-strong text-fg-2 group-hover/q:border-gold-300/70",
                    )}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={btnId} data-open={isOpen} className="acc-panel">
                <div>
                  <p className="max-w-2xl pb-7 pl-[3.25rem] pr-4 text-body text-fg-2 sm:pl-[3.25rem]">{item.a}</p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
