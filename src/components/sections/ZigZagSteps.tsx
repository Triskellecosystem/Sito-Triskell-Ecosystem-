import type { Path } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Percorso a zig-zag: gli step arrivano a turno da sinistra e da destra (entrano mentre scorri)
 * e si agganciano a una linea centrale, componendo il tutto. Su mobile: una colonna, linea a sinistra.
 */
export function ZigZagSteps({ path, tone }: { path: Path; tone: "gold" | "azure" }) {
  const gold = tone === "gold";
  const accent = gold ? "text-gold-300 border-gold-400/70" : "text-azure-300 border-azure-400/70";
  const line = gold ? "from-gold-300/0 via-gold-300 to-gold-300/0 shadow-[0_0_16px_2px_rgb(247_200_92/0.35)]" : "from-azure-300/0 via-azure-300 to-azure-300/0 shadow-[0_0_16px_2px_rgb(42_144_195/0.4)]";
  const conn = gold ? "bg-gold-300/80" : "bg-azure-300/80";

  return (
    <ol className="relative mx-auto max-w-5xl">
      <span aria-hidden="true" className={cn("absolute bottom-3 left-[1.375rem] top-3 w-[3px] rounded-full bg-gradient-to-b md:left-1/2 md:-translate-x-1/2", line)} />
      {path.steps.map((step, i) => {
        const left = i % 2 === 0;
        return (
          <li key={step.title} className="relative grid items-center py-4 md:grid-cols-2 md:gap-x-24 md:py-5">
            {/* nodo sulla linea */}
            <Reveal from="scale" y={0} blur={0} className="absolute left-[1.375rem] top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 md:left-1/2">
              <span className={cn("relative grid h-12 w-12 place-items-center rounded-full border-2 bg-night font-display text-small font-bold", accent)}>
                <span aria-hidden="true" className={cn("btn-ping absolute inset-0 rounded-full border", accent)} style={{ animationDelay: `${i * 0.35}s` }} />
                {String(i + 1).padStart(2, "0")}
              </span>
            </Reveal>

            {/* card che arriva dal lato */}
            <Reveal from={left ? "left" : "right"} blur={0} className={cn("pl-16 md:pl-0", left ? "md:col-start-1" : "md:col-start-2")}>
              <div
                className={cn(
                  "group/zz relative rounded-card border bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-6 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo sm:p-7",
                  gold ? "border-gold-400/30 hover:border-gold-300/70 hover:shadow-[0_0_40px_-12px_rgb(247_200_92/0.5)]" : "border-azure-400/30 hover:border-azure-300/70 hover:shadow-[0_0_40px_-12px_rgb(42_144_195/0.55)]",
                  left && "md:text-right",
                )}
              >
                {/* collegamento alla linea */}
                <span aria-hidden="true" className={cn("absolute top-1/2 h-[3px] w-10 -translate-y-1/2 -left-10", conn, left ? "md:-right-12 md:left-auto md:w-12" : "md:-left-12 md:w-12")} />
                <div className={cn("flex items-start gap-4", left && "md:flex-row-reverse")}>
                  <span className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-2xl border bg-night/60 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/zz:scale-110", accent)}>
                    <Icon name={step.icon} className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-bold tracking-tight text-fg">{step.title}</h3>
                    <p className="mt-1.5 text-[1.0625rem] leading-snug text-fg-2">{step.text}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
