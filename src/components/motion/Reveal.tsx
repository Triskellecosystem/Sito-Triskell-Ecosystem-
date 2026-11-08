import type { CSSProperties, ReactNode } from "react";

type Tag = "div" | "li" | "p" | "article" | "span";
type Vars = CSSProperties & { [key: `--${string}`]: string | number };

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Ritardo in secondi. */
  delay?: number;
  y?: number;
  /** Sfocatura iniziale in px (blur → nitido). 0 per disattivare. */
  blur?: number;
}

/**
 * Reveal allo scroll: opacity + translate + blur → nitido.
 * Server component: l'attivazione è gestita da <RevealRoot /> (un solo IntersectionObserver).
 */
export function Reveal({ children, className, as: Tag = "div", delay = 0, y = 28, blur = 8 }: RevealProps) {
  const style: Vars = { "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px`, "--reveal-blur": `${blur}px` };
  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Contenitore che anima i figli `RevealItem` con stagger (indice via :nth-child, vedi globals.css). */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
}) {
  const style: Vars = { "--stagger": `${Math.round(stagger * 1000)}ms` };
  return (
    <Tag data-reveal-group="" className={className} style={style}>
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
  y = 26,
  blur = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  y?: number;
  blur?: number;
}) {
  const style: Vars = { "--reveal-y": `${y}px`, "--reveal-blur": `${blur}px` };
  return (
    <Tag data-reveal-item="" className={className} style={style}>
      {children}
    </Tag>
  );
}
