"use client";

import { useId } from "react";
import { ARM_PATH } from "./triskell-path";

interface TriskellMarkProps {
  className?: string;
  /** Titolo accessibile. Se omesso il simbolo è decorativo. */
  title?: string;
  /** Disegna i tre bracci con un'animazione di path drawing. */
  draw?: boolean;
  strokeWidth?: number;
}

/** Simbolo triskell: tre bracci a spirale ruotati di 120°, gradiente oro metallico. */
export function TriskellMark({ className, title, draw = false, strokeWidth = 4.6 }: TriskellMarkProps) {
  const id = useId().replace(/:/g, "");
  const gradient = `tm-${id}`;
  const rotations = [0, 120, 240];

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={gradient} x1="15" y1="8" x2="85" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-gold-100)" />
          <stop offset="0.28" stopColor="var(--color-gold-200)" />
          <stop offset="0.62" stopColor="var(--color-gold-500)" />
          <stop offset="1" stopColor="var(--color-gold-700)" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gradient})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {rotations.map((deg, i) => (
          <path
            key={deg}
            d={ARM_PATH}
            transform={deg ? `rotate(${deg} 50 50)` : undefined}
            pathLength={draw ? 1 : undefined}
            className={draw ? "draw-path" : undefined}
            style={draw ? ({ "--draw-delay": `${0.2 + i * 0.28}s` } as React.CSSProperties) : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
