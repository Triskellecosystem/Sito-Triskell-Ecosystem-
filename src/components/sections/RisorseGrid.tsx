"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
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
                "rounded-full border px-5 py-2 text-small font-semibold transition-colors",
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
              <div className="relative flex aspect-[16/9] flex-col justify-between overflow-hidden border-b border-line bg-[radial-gradient(120%_120%_at_0%_0%,rgb(212_169_59/0.18),transparent_55%),linear-gradient(135deg,#06182b,#0a2440)] p-5">
                <span aria-hidden="true" className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_90%)]" />
                <span className="relative w-fit rounded-full border border-gold-400/50 px-3 py-1 text-overline font-semibold uppercase text-gold-300 tracking-[var(--text-overline--letter-spacing)]">{r.family}</span>
                <span className="relative">
                  <span className="block text-overline font-semibold uppercase text-fg-3 tracking-[var(--text-overline--letter-spacing)]">Triskell Field Guide</span>
                  <span className="mt-1 block font-display text-[1.125rem] font-semibold tracking-tight text-fg">{r.topic}</span>
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="flex items-center justify-between text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)]">
                  <span className="text-gold-400">{r.kind}</span>
                  <span className="text-fg-3">{r.date}</span>
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
