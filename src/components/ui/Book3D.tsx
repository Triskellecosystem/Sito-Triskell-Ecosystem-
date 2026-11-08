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
 * Libro in vero 3D (CSS): copertina, dorso, taglio delle pagine, retro. Si trascina col mouse o col dito per
 * ruotarlo liberamente nello spazio (con inerzia); da fermo gira piano da solo. Doppio click/tap: riporta in posizione.
 * Con reduced motion: nessuna rotazione automatica, resta trascinabile.
 */
export function Book3D({ cover, alt, title, hint, className }: Book3DProps) {
  const stage = useRef<HTMLDivElement>(null);
  const book = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
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

    const apply = () => {
      b.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (!dragging) {
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
      if (!dragging) return;
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
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("dblclick", reset);
    };
  }, []);

  return (
    <div className={cn("relative mx-auto w-fit", className)}>
      <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.35),transparent_65%)]" />
      <div ref={stage} role="img" aria-label={`${alt}. ${hint}`} className="book-stage relative cursor-grab touch-none select-none" style={{ perspective: "1400px" }}>
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
      <p className="mt-6 flex items-center justify-center gap-2 text-small text-fg-3">
        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-300" />
        {hint}
      </p>
    </div>
  );
}
