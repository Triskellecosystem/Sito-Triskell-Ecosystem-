"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/** Percorso a 6 passi interattivo: tocca un passo per vedere cosa fai tu e cosa fa l'AI. */
export function VibeStepPath() {
  const v = site.vibeCoding;
  const [i, setI] = useState(0);
  const step = v.steps[i] ?? v.steps[0]!;
  return (
    <div>
      <div role="tablist" aria-label={v.stepsTitle.replace(/[[\]]/g, "")} className="flex flex-wrap justify-center gap-2">
        {v.steps.map((s, k) => (
          <button
            key={s.n}
            role="tab"
            id={`vstep-${k}`}
            aria-selected={i === k}
            aria-controls="vstep-panel"
            onClick={() => setI(k)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-display text-small font-semibold transition-[background-color,border-color,color,box-shadow] duration-[var(--dur-base)]",
              i === k ? "border-gold-300 bg-gold-300 text-night shadow-glow-gold" : k < i ? "border-gold-400/50 text-gold-200" : "border-line-strong text-fg-2 hover:border-gold-300/60 hover:text-fg",
            )}
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-night/30 text-[0.6875rem]">{k < i ? <Icon name="check" className="h-3 w-3" strokeWidth={3} /> : k + 1}</span>
            {s.n}
          </button>
        ))}
      </div>

      <div id="vstep-panel" role="tabpanel" aria-labelledby={`vstep-${i}`} key={i} className="mx-auto mt-8 grid max-w-4xl gap-4 animate-[tab-in_0.5s_var(--ease-out-expo)_backwards] md:grid-cols-2">
        <div className="rounded-card border border-gold-400/40 bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-6 sm:p-7">
          <p className="text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-gold-400">{v.youLabel}</p>
          <p className="mt-3 text-[1.1875rem] leading-snug text-fg">{step.you}</p>
        </div>
        <div className="rounded-card border border-azure-400/40 bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-6 sm:p-7">
          <p className="text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-azure-300">{v.aiLabel}</p>
          <p className="mt-3 text-[1.1875rem] leading-snug text-fg">{step.ai}</p>
        </div>
        <p className="rounded-card border border-line bg-surface/70 px-6 py-4 text-body text-fg-2 md:col-span-2">{step.ex}</p>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button type="button" disabled={i === 0} onClick={() => setI((n) => Math.max(0, n - 1))} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-small font-semibold text-fg transition-[border-color,box-shadow] hover:border-gold-300 hover:shadow-[0_0_24px_-6px_rgb(247_200_92/0.5)] disabled:opacity-35">
          <Icon name="chevron-left" className="h-4 w-4" /> Indietro
        </button>
        <button type="button" disabled={i === v.steps.length - 1} onClick={() => setI((n) => Math.min(v.steps.length - 1, n + 1))} className="inline-flex h-11 items-center gap-2 rounded-full border border-gold-400/60 bg-gold-300/10 px-5 text-small font-semibold text-gold-200 transition-[border-color,box-shadow] hover:border-gold-300 hover:shadow-[0_0_24px_-6px_rgb(247_200_92/0.6)] disabled:opacity-35">
          Avanti <Icon name="chevron-right" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
