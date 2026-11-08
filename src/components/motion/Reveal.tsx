"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const tags = { div: motion.div, li: motion.li, p: motion.p, article: motion.article, span: motion.span } as const;
type Tag = keyof typeof tags;

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  y?: number;
  /** Sfocatura iniziale in px (blur → nitido). 0 per disattivare. */
  blur?: number;
}

/** Reveal allo scroll: opacity + translate + blur → nitido. */
export function Reveal({ children, className, as = "div", delay = 0, y = 28, blur = 8 }: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = tags[as] as typeof motion.div;
  if (reduced) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: blur ? `blur(${blur}px)` : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </Comp>
  );
}

const groupVariants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

const itemVariants = {
  hidden: (o: { y: number; blur: number }) => ({ opacity: 0, y: o.y, filter: `blur(${o.blur}px)` }),
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
};

/** Contenitore che anima i figli `RevealItem` con stagger. */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const Comp = tags[as] as typeof motion.div;
  if (reduced) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  y = 26,
  blur = 6,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  y?: number;
  blur?: number;
}) {
  const reduced = useReducedMotion();
  const Comp = tags[as] as typeof motion.div;
  if (reduced) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp className={className} variants={itemVariants} custom={{ y, blur }}>
      {children}
    </Comp>
  );
}
