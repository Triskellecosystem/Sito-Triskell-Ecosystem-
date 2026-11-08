"use client";

import { useRef } from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Intensità dell'attrazione (0–1). */
  strength?: number;
}

/**
 * Effetto magnetico, solo desktop con puntatore preciso (hover + pointer: fine) e senza reduced motion.
 * Solo transform; l'effetto "molla" arriva dalla transition CSS con easing definito nei token.
 */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: "transform 0.45s var(--ease-out-expo)" }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse" || !enabled()) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
      }}
    >
      {children}
    </div>
  );
}
