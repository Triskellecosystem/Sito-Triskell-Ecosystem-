import type { Service } from "@/content/site";
import { cn } from "@/lib/cn";
import { CountUp } from "@/components/motion/CountUp";
import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";

/**
 * Tile della bento grid: icona, titolo (2–3 parole), UNA riga che spiega il servizio, 1 metrica.
 * Niente micro-disegni: il significato è nelle parole. Le tile in evidenza sono doppie e più grandi.
 * Hover: solo bordo e luce, nessuno spostamento.
 */
export function ServiceTile({ service, className }: { service: Service; className?: string }) {
  const { featured } = service;
  return (
    <Spotlight
      className={cn(
        "group/tile h-full rounded-card border border-line bg-surface transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo",
        "hover:border-gold-400/50 hover:shadow-[0_0_44px_-14px_rgb(247_200_92/0.45)]",
        featured && "bg-[linear-gradient(155deg,var(--color-surface-2)_0%,var(--color-surface)_65%)]",
        className,
      )}
    >
      <div className={cn("relative z-[2] flex h-full flex-col p-6 sm:p-7", featured ? "min-h-[16rem]" : "min-h-[15rem]")}>
        <span
          className={cn(
            "grid place-items-center rounded-2xl border border-gold-400/35 bg-gold-300/10 text-gold-300 transition-colors duration-[var(--dur-base)] group-hover/tile:bg-gold-300/20",
            featured ? "h-14 w-14" : "h-12 w-12",
          )}
        >
          <Icon name={service.icon} className={featured ? "h-7 w-7" : "h-6 w-6"} strokeWidth={1.6} />
        </span>

        <h3 className={cn("mt-6 text-fg", featured ? "text-[clamp(1.5rem,1.2rem+1.3vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em]" : "text-h3")}>{service.title}</h3>
        <p className={cn("mt-2 text-fg-2", featured ? "max-w-md text-lead" : "text-body")}>{service.text}</p>

        <p className="mt-auto flex items-baseline gap-2.5 border-t border-line pt-4">
          <CountUp {...service.metric} className="font-display text-[1.5rem] font-bold leading-none tracking-[-0.03em] text-gold" />
          <span className="text-small text-fg-2">{service.metric.label}</span>
        </p>
      </div>
    </Spotlight>
  );
}
