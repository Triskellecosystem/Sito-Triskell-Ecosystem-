"use client";

import { MotionConfig } from "motion/react";

/** `reducedMotion="user"`: rispetta prefers-reduced-motion per tutte le animazioni Motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
