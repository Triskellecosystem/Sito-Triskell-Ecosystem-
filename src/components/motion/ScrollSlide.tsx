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
