"use client";

import { useEffect, useRef } from "react";

/**
 * Effetto "matrix" discreto: colonne di 0/1 con scia, a bassa opacità.
 * Performance: DPR ≤ 1.5, ~14 fps, in pausa fuori viewport e con tab nascosta;
 * con prefers-reduced-motion disegna un solo fotogramma statico.
 */
export function MatrixBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const azure = css.getPropertyValue("--color-azure-500").trim() || "#138dc8";
    const gold = css.getPropertyValue("--color-gold-300").trim() || "#f7c85c";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const CELL = 26;
    const FRAME_MS = 70;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;
    let running = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "top";
      const cols = Math.ceil(w / CELL);
      drops = Array.from({ length: cols }, () => Math.random() * -(h / CELL));
    };

    const step = (staticFrame = false) => {
      // sfuma i fotogrammi precedenti verso la trasparenza (scia)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${staticFrame ? 1 : 0.13})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      for (let i = 0; i < drops.length; i++) {
        const y = (drops[i] ?? 0) * CELL;
        if (y > -CELL && y < h) {
          const accent = Math.random() > 0.97;
          ctx.fillStyle = accent ? gold : azure;
          ctx.globalAlpha = accent ? 0.7 : 0.55;
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * CELL, y);
        }
        if (!staticFrame) {
          drops[i] = (drops[i] ?? 0) + 1;
          if ((drops[i] ?? 0) * CELL > h && Math.random() > 0.975) drops[i] = Math.random() * -12;
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < FRAME_MS) return;
      last = t;
      step();
    };

    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if (reduced) {
      // un solo fotogramma statico, sparso
      drops = drops.map(() => Math.random() * (h / CELL));
      step(true);
      for (let k = 0; k < 6; k++) step();
    } else {
      // pre-riscalda la scia
      drops = drops.map(() => Math.random() * (h / CELL));
      start();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
