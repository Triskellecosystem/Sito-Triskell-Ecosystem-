"use client";

import { motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/cn";

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  /** Colore del bagliore: oro (Agency) o azure (Academy). */
  tone?: "gold" | "azure";
}

/**
 * Spotlight che segue il cursore. Il bagliore è un layer pre-renderizzato spostato
 * con transform (nessun repaint del gradiente) e mostrato con opacity.
 */
export function Spotlight({ children, className, size = 460, tone = "gold" }: SpotlightProps) {
  const x = useMotionValue(-size);
  const y = useMotionValue(-size);

  return (
    <div
      className={cn("group/spot relative overflow-hidden", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left - size / 2);
        y.set(e.clientY - r.top - size / 2);
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{ x, y, width: size, height: size }}
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-[1] rounded-full opacity-0 transition-opacity duration-[var(--dur-base)] will-change-transform group-hover/spot:opacity-100",
          tone === "gold"
            ? "bg-[radial-gradient(circle,rgb(247_200_92/0.2),transparent_62%)]"
            : "bg-[radial-gradient(circle,rgb(42_144_195/0.22),transparent_62%)]",
        )}
      />
      {children}
    </div>
  );
}
