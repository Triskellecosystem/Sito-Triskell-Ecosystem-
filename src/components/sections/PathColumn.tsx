import type { Path } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

interface PathColumnProps {
  path: Path;
  tone: "gold" | "azure";
  /** Mostra il pulsante in fondo (sulla home); nelle pagine interne no. */
  showCta?: boolean;
}

/**
 * Un percorso come timeline verticale ordinata: numero, icona, titolo, una riga.
 * Una linea sottile collega gli step (funnel). Righe di altezza uguale: le due colonne restano allineate.
 */
export function PathColumn({ path, tone, showCta = true }: PathColumnProps) {
  const gold = tone === "gold";
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-card border bg-[linear-gradient(170deg,var(--color-surface)_0%,var(--color-night-raised)_100%)] p-6 sm:p-9",
        gold ? "border-gold-400/35" : "border-azure-400/30",
      )}
    >
      <div aria-hidden="true" className={cn("absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent to-transparent", gold ? "via-gold-300/80" : "via-azure-300/80")} />
      <p className={cn("font-display text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)]", gold ? "text-gold-400" : "text-azure-300")}>{path.name}</p>
      <h3 className="mt-2 text-[clamp(1.375rem,1.1rem+1.2vw,1.875rem)] font-bold leading-tight tracking-[-0.025em] text-fg">{path.tagline}</h3>

      <ol className="relative mt-8 flex-1">
        <span aria-hidden="true" className={cn("absolute bottom-6 left-[1.4375rem] top-6 w-px", gold ? "bg-gradient-to-b from-gold-300/70 via-gold-300/25 to-gold-300/5" : "bg-gradient-to-b from-azure-300/70 via-azure-300/25 to-azure-300/5")} />
        {path.steps.map((step, i) => (
          <li key={step.title} className="relative flex min-h-[5.5rem] gap-5 py-3">
            <span
              className={cn(
                "relative z-[1] grid h-12 w-12 shrink-0 place-items-center rounded-full border bg-night",
                gold ? "border-gold-400/60 text-gold-300" : "border-azure-400/60 text-azure-300",
              )}
            >
              <Icon name={step.icon} className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <div className="pt-0.5">
              <h4 className="font-display text-[1.0625rem] font-semibold tracking-tight text-fg">
                <span className={cn("mr-2 text-small font-medium", gold ? "text-gold-400" : "text-azure-300")}>{String(i + 1).padStart(2, "0")}</span>
                {step.title}
              </h4>
              <p className="mt-1 text-body text-fg-2">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      {showCta && (
        <div className="mt-8">
          <Button href={path.cta.href} variant={gold ? "primary" : "secondary"} size="lg" icon="arrow-right">
            {path.cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}
