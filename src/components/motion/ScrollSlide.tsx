"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/* Un solo listener di scroll per tutti gli elementi legati allo scroll (niente listener per istanza). */
type Tick = () => void;
const ticks = new Set<Tick>();
let raf = 0;
let bound = false;
function run() {
  raf = 0;
  ticks.forEach((t) => t());
}
function request() {
  if (!raf) raf = requestAnimationFrame(run);
}
function subscribe(t: Tick) {
  ticks.add(t);
  if (!bound) {
    bound = true;
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }
  request();
  return () => {
    ticks.delete(t);
    if (!ticks.size && bound) {
      bound = false;
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    }
  };
}

const ease = (t: number) => t * t * (3 - 2 * t);

interface ScrollSlideProps {
  children: React.ReactNode;
  className?: string;
  /** Da dove arriva: sinistra o destra (fino a fuori schermo), oppure "pop" (si ingrandisce sul posto). */
  from: "left" | "right" | "pop";
}

/**
 * Elemento che si muove CON lo scroll: arriva da fuori schermo (sinistra o destra) e si ferma al suo posto quando
 * entra bene nella schermata. Così il movimento si vede sempre, a qualunque velocità si scorra, e torna indietro
 * risalendo. Senza JS o con reduced motion resta già al suo posto.
 */
export function ScrollSlide({ children, className, from }: ScrollSlideProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.98 - r.top) / (vh * 0.52)));
      el.style.setProperty("--p", ease(p).toFixed(3));
    };
    update();
    return subscribe(update);
  }, []);

  return (
    <div ref={ref} className={cn(from === "pop" ? "slide-pop" : "slide-x", className)} style={{ "--dir": from === "left" ? -1 : 1 } as React.CSSProperties}>
      {children}
    </div>
  );
}

/** Linea centrale del funnel: si riempie d'oro man mano che scorri. */
export function ScrollFill({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "scaleY(1)";
      return;
    }
    const update = () => {
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.62 - r.top) / Math.max(1, r.height)));
      el.style.transform = `scaleY(${p.toFixed(3)})`;
    };
    update();
    return subscribe(update);
  }, []);
  return <span ref={ref} aria-hidden="true" className={cn("origin-top", className)} style={{ transform: "scaleY(1)" }} />;
}

/**
 * Barre che si completano man mano che scorri: la prima parte da "Vendite", ognuna si riempie dopo la precedente
 * e, una volta piena, diventa dorata; alla fine si accende il traguardo. Risalendo si svuotano.
 */
export function ScrollMeters({ labels, goal }: { labels: string[]; goal: string }) {
  const host = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = host.current;
    if (!ul) return;
    const rows = Array.from(ul.querySelectorAll<HTMLElement>("[data-meter]"));
    const goalEl = ul.querySelector<HTMLElement>("[data-goal]");
    const apply = (p: number) => {
      const n = rows.length;
      rows.forEach((row, i) => {
        const f = Math.min(1, Math.max(0, p * n - i));
        const fill = row.querySelector<HTMLElement>(".meter-fill");
        if (fill) fill.style.transform = `scaleX(${f.toFixed(3)})`;
        row.toggleAttribute("data-done", f >= 0.999);
      });
      goalEl?.toggleAttribute("data-on", p >= 0.999);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }
    const update = () => {
      const r = ul.getBoundingClientRect();
      const vh = window.innerHeight;
      apply(Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.55))));
    };
    update();
    return subscribe(update);
  }, []);

  return (
    <ul ref={host} className="space-y-3" aria-label="Dal punto di partenza al traguardo">
      {labels.map((m) => (
        <li key={m} data-meter="">
          <div className="flex items-center justify-between text-[0.8125rem] font-medium text-fg-2">
            <span className="meter-label">{m}</span>
            <span className="meter-check grid h-4 w-4 place-items-center rounded-full bg-gold-300 text-night">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-line">
            <span className="meter-fill block h-full origin-left rounded-full" style={{ transform: "scaleX(1)" }} />
          </div>
        </li>
      ))}
      <li data-goal="" className="meter-goal flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 font-display text-[1rem] font-bold">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 21V4m0 0h11l-2 4 2 4H5" />
        </svg>
        {goal}
      </li>
    </ul>
  );
}
