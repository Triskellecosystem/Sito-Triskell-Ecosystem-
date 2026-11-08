"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/lenis";

/** Smooth scroll con Lenis (disattivato con prefers-reduced-motion). Anchor links inclusi. */
export function SmoothScroll() {
  useEffect(() => {
    // niente Lenis con reduced motion né su dispositivi touch (scroll nativo, zero JS extra)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let cancelled = false;
    let destroy: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: true,
        autoRaf: true,
      });
      setLenis(lenis);
      destroy = () => {
        lenis.destroy();
        setLenis(null);
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return null;
}
