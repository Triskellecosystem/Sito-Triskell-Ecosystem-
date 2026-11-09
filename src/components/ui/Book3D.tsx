"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface Book3DProps {
  /** Copertina frontale (rapporto ~ 2:3). */
  cover: string;
  alt: string;
  title: string;
  hint: string;
  className?: string;
}

/**
 * Libro in vero 3D (CSS): copertina, dorso, taglio delle pagine, retro. Basta passarci sopra col mouse: il libro segue
 * il puntatore e lo comandi tu. Si può anche trascinare (mouse o dito) per farlo girare liberamente, con inerzia; se
 * lo lasci, gira piano da solo. Doppio click/tap: riporta in posizione.
 * Con reduced motion: nessuna rotazione automatica, resta trascinabile.
 */
export function Book3D({ cover, alt, title, hint, className }: Book3DProps) {
  const stage = useRef<HTMLDivElement>(null);
  const hit = useRef<HTMLDivElement>(null);
  const book = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hit.current;
    const b = book.current;
    if (!el || !b) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ry = -28;
    let rx = -10;
    let vy = 0;
    let vx = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;
    let visible = false;
    let idleSince = performance.now();
    let hover = false;
    let tRy = -28;
    let tRx = -10;

    const apply = () => {
      b.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (hover && !dragging) {
        // il libro segue il mouse: lo comandi tu, spostando il puntatore sopra di lui
        ry += (tRy - ry) * 0.12;
        rx += (tRx - rx) * 0.12;
        vy = 0;
        vx = 0;
        idleSince = performance.now();
      } else if (!dragging) {
        if (Math.abs(vy) > 0.02 || Math.abs(vx) > 0.02) {
          ry += vy;
          rx = Math.max(-80, Math.min(80, rx + vx));
          vy *= 0.95;
          vx *= 0.95;
          idleSince = performance.now();
        } else if (!reduced && performance.now() - idleSince > 1800) {
          ry += 0.22;
          rx += (-10 - rx) * 0.02;
        }
      }
      apply();
    };
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      vy = 0;
      vx = 0;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) {
        if (e.pointerType === "mouse") {
          const r = el.getBoundingClientRect();
          const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
          hover = true;
          // base: il giro attuale (mod 360), così non "riavvolge" tutto
          const base = Math.round(ry / 360) * 360;
          tRy = base + nx * 80 - 20;
          tRx = Math.max(-60, Math.min(60, -ny * 45 - 8));
        }
        return;
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      ry += dx * 0.6;
      rx = Math.max(-80, Math.min(80, rx - dy * 0.5));
      vy = dx * 0.6;
      vx = -dy * 0.5;
      idleSince = performance.now();
    };
    const leave = () => {
      hover = false;
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      el.style.cursor = "grab";
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    const reset = () => {
      ry = Math.round(ry / 360) * 360 - 28;
      rx = -10;
      vy = 0;
      vx = 0;
    };
    const io = new IntersectionObserver(([en]) => {
      visible = !!en?.isIntersecting;
    });
    io.observe(el);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("dblclick", reset);
    apply();
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("dblclick", reset);
    };
  }, []);

  return (
    <div className={cn("relative mx-auto w-fit", className)}>
      {/* aura azzurra chiara dietro al libro: alone che pulsa e luce che gira piano */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-20 [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]">
        <div className="aurora-azure absolute inset-0 rounded-full opacity-80" />
      </div>
      <div aria-hidden="true" className="book-aura pointer-events-none absolute -inset-14 rounded-full bg-[radial-gradient(circle,rgb(140_215_255/0.55),rgb(60_170_230/0.28)_40%,transparent_68%)]" />
      <div ref={hit} role="img" aria-label={`${alt}. ${hint}`} className="relative cursor-grab touch-none select-none p-10 sm:p-12">
      <div ref={stage} className="book-stage relative" style={{ perspective: "1400px" }}>
        <div ref={book} className="book">
          <div className="book-face book-front">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt="" draggable={false} width={560} height={841} loading="lazy" decoding="async" />
            <span aria-hidden="true" className="book-sheen" />
          </div>
          <div className="book-face book-back">
            <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold-300">Triskell Ecosystem</span>
            <span className="mt-2 font-display text-[1.5rem] font-extrabold leading-none text-fg">{title}</span>
          </div>
          <div className="book-face book-spine">
            <span>{title}</span>
          </div>
          <div className="book-face book-pages" />
          <div className="book-face book-top" />
          <div className="book-face book-bottom" />
        </div>
        <span aria-hidden="true" className="book-shadow" />
      </div>
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-small text-fg-3">
        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-300" />
        {hint}
      </p>
    </div>
  );
}
