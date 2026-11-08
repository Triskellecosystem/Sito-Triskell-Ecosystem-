"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { formatNumber, isDev } from "@/lib/format";
import type { Metric } from "@/content/site";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

interface CountUpProps extends Pick<Metric, "value" | "prefix" | "suffix" | "decimals" | "todo"> {
  className?: string;
  duration?: number;
}

/**
 * Numero con count-up all'ingresso in viewport.
 * L'HTML server contiene già il valore finale (SEO, no-JS, reduced motion).
 */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, todo, className, duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduced = useReducedMotion();
  const format = (n: number) => `${prefix}${formatNumber(n, decimals)}${suffix}`;

  // Prima del paint: riparte da 0 (solo se l'animazione è consentita).
  useIsoLayoutEffect(() => {
    if (reduced || !ref.current) return;
    ref.current.textContent = format(0);
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v);
      },
      onComplete: () => {
        el.textContent = format(value);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className} data-todo={todo && isDev ? "" : undefined} suppressHydrationWarning>
      {format(value)}
    </span>
  );
}
