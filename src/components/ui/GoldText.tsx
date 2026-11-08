import type { ReactNode } from "react";

/** Rende il testo con le parti tra [parentesi quadre] in oro. Server component, nessuna animazione. */
export function GoldText({ text }: { text: string }): ReactNode {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("[") ? (
      <span key={i} className="text-gold">
        {part.slice(1, -1)}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
