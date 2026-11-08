"use client";

import { useEffect, useRef } from "react";

interface Particle { x: number; y: number; vx: number; vy: number; life: number; max: number; ch: string; size: number; gold: boolean }
interface Circuit { x: number; y: number; dx: number; dy: number; len: number; life: number; max: number }
interface Pt { x: number; y: number; t: number }

const GLYPHS = ["0", "1", "0", "1", "{", "}", "<", ">", "/", "+", ";"];

/**
 * Effetto "digitale" al movimento del mouse (scia, cifre, linee a circuito), riusabile in qualsiasi sezione:
 * si aggancia alla <section> più vicina. Canvas leggero, attivo solo mentre ci sono particelle e la sezione è
 * visibile. Disattivato su touch e con prefers-reduced-motion.
 */
export function DigitalCursor({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.closest("section");
    if (!canvas || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const azure = css.getPropertyValue("--color-azure-300").trim() || "#3aa4d4";
    const azureDeep = css.getPropertyValue("--color-azure-400").trim() || "#2a90c3";
    const gold = css.getPropertyValue("--color-gold-300").trim() || "#f7c85c";

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles: Particle[] = [];
    const circuits: Circuit[] = [];
    const trail: Pt[] = [];
    let raf = 0;
    let running = false;
    let visible = false;
    let last = 0;
    let lastSpawn = { x: -999, y: -999 };
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (x: number, y: number) => {
      const n = 2 + Math.floor(Math.random() * 2);
      for (let k = 0; k < n; k++) {
        particles.push({
          x: x + rnd(-8, 8), y: y + rnd(-8, 8), vx: rnd(-0.5, 0.5), vy: rnd(-1.1, -0.2), life: 0, max: rnd(0.9, 1.7),
          ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "0", size: rnd(11, 17), gold: Math.random() < 0.2,
        });
      }
      if (Math.random() < 0.34) {
        const horizontal = Math.random() < 0.5;
        circuits.push({ x, y, dx: horizontal ? (Math.random() < 0.5 ? -1 : 1) : 0, dy: horizontal ? 0 : Math.random() < 0.5 ? -1 : 1, len: rnd(36, 96), life: 0, max: rnd(0.9, 1.5) });
      }
      while (particles.length > 80) particles.shift();
      while (circuits.length > 12) circuits.shift();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      while (trail.length && now - trail[0]!.t > 520) trail.shift();
      if (trail.length > 1) {
        ctx.lineCap = "round";
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1]!;
          const b = trail[i]!;
          const age = 1 - (now - b.t) / 520;
          ctx.strokeStyle = azure;
          ctx.globalAlpha = Math.max(0, age) * 0.7;
          ctx.lineWidth = 1 + age * 2.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        const head = trail[trail.length - 1]!;
        const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 46);
        g.addColorStop(0, "rgba(58,164,212,0.45)");
        g.addColorStop(1, "rgba(58,164,212,0)");
        ctx.globalAlpha = Math.max(0, 1 - (now - head.t) / 520);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 46, 0, 6.283);
        ctx.fill();
      }
      for (let i = circuits.length - 1; i >= 0; i--) {
        const c = circuits[i]!;
        c.life += dt;
        const k = c.life / c.max;
        if (k >= 1) { circuits.splice(i, 1); continue; }
        const grow = Math.min(1, k * 3);
        const ex = c.x + c.dx * c.len * grow;
        const ey = c.y + c.dy * c.len * grow;
        ctx.globalAlpha = (1 - k) * 0.85;
        ctx.strokeStyle = azureDeep;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(ex, ey);
        const bx = ex + (c.dy !== 0 ? c.len * 0.35 * grow : 0);
        const by = ey + (c.dx !== 0 ? -c.len * 0.35 * grow : 0);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.fillStyle = gold;
        ctx.beginPath();
        ctx.arc(bx, by, 2.6, 0, 6.283);
        ctx.fill();
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.life += dt;
        const k = p.life / p.max;
        if (k >= 1) { particles.splice(i, 1); continue; }
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        ctx.globalAlpha = (1 - k) * 0.95;
        ctx.fillStyle = p.gold ? gold : azure;
        ctx.font = `${p.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        ctx.fillText(p.ch, p.x, p.y);
      }
      ctx.globalAlpha = 1;
      if (!particles.length && !circuits.length && !trail.length) {
        running = false;
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, w, h);
      }
    };
    const kick = () => {
      if (running || !visible) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const onMove = (e: Event) => {
      const ev = e as PointerEvent;
      if (ev.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      const x = ev.clientX - r.left;
      const y = ev.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      trail.push({ x, y, t: performance.now() });
      if (trail.length > 28) trail.shift();
      if (Math.hypot(x - lastSpawn.x, y - lastSpawn.y) > 16) {
        lastSpawn = { x, y };
        spawn(x, y);
      }
      kick();
    };
    const io = new IntersectionObserver(([en]) => {
      visible = !!en?.isIntersecting;
      if (!visible) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(canvas);
    host.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);
    return () => {
      host.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className ?? "pointer-events-none absolute inset-0 h-full w-full"} />;
}
