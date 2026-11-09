"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { ResourceCover } from "@/components/ui/ResourceCover";
import type { Risorsa } from "@/content/risorse";

/** Filtro per tipo + card delle risorse. */
export function RisorseGrid({ items, filters }: { items: Risorsa[]; filters: readonly string[] }) {
  const [f, setF] = useState("Tutti");
  const list = items.filter((i) => f === "Tutti" || i.kind === f);
  return (
    <div>
      <div role="group" aria-label="Filtra l'archivio" className="flex flex-wrap items-center justify-center gap-2.5">
        {filters.map((k) => {
          const n = k === "Tutti" ? items.length : items.filter((i) => i.kind === k).length;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={f === k}
              onClick={() => setF(k)}
              className={cn(
                "rounded-full border px-5 py-2 max-md:py-3 text-small font-semibold transition-colors",
                f === k ? "border-gold-300 bg-gold-300 text-night" : "border-line-strong text-fg-2 hover:border-gold-400/60 hover:text-gold-200",
              )}
            >
              {k} <span className={f === k ? "text-night/70" : "text-fg-3"}>{String(n).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-6 text-center text-small text-fg-3" aria-live="polite">
        {list.length} risorse trovate
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => {
          const inner = (
            <>
              <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
                <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]">
                  <ResourceCover kind={r.cover} />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="flex items-center justify-between max-md:flex-wrap max-md:gap-x-3 text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)]">
                  <span className="text-gold-400">
                    {r.kind} <span className="text-fg-3">· {r.family}</span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-fg-3">{r.date}</span>
                </p>
                <h3 className="text-[1.1875rem] font-bold leading-snug tracking-[-0.02em] text-fg group-hover:text-gold-200">{r.title}</h3>
                <p className="text-small text-fg-2">{r.text}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line-strong px-2.5 py-1 text-[0.75rem] text-fg-3">#{t}</li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-3 text-small font-semibold text-gold-300">
                  {r.cta}
                  <Icon name={r.external ? "arrow-up-right" : "arrow-right"} className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </>
          );
          const cls = "group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/60 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold-400/60";
          return (
            <li key={r.title}>
              {r.external ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <Link href={r.href} className={cls}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
