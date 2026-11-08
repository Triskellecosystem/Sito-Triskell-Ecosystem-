import Link from "next/link";
import type { Service } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";
import { ScrollSlide } from "@/components/motion/ScrollSlide";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

/**
 * I servizi come schede vive: entrano da sinistra e da destra con lo scroll, una alla volta si accende a rotazione
 * (come un "evidenziatore" che passa sui servizi), l'icona respira e al passaggio del mouse la scheda segue il cursore
 * con un bagliore. Fine, non invadente.
 */
export function ServiceList({ items }: { items: Service[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => {
        const card = (
          <Spotlight className="svc-card group/svc h-full rounded-card border border-line bg-[linear-gradient(170deg,var(--color-surface-2),var(--color-night-raised))] p-5 transition-[border-color,transform] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1 hover:border-gold-300/70" size={320}>
            <div className="relative z-[2]">
              <span className="svc-icon grid h-14 w-14 place-items-center rounded-2xl border border-gold-400/45 bg-gold-300/10 text-gold-300" style={{ "--i": i } as CSSVars}>
                <Icon name={s.icon} className="h-7 w-7" strokeWidth={1.6} />
              </span>
              <h3 className="mt-4 flex items-center gap-2 font-display text-[1.125rem] font-semibold leading-tight tracking-tight text-fg">
                {s.title}
                {s.href && <Icon name="arrow-up-right" className="h-4 w-4 text-gold-300" />}
              </h3>
              <p className="mt-1.5 text-[0.9375rem] leading-snug text-fg-2">{s.text}</p>
            </div>
            <span aria-hidden="true" className="svc-bar pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-gold-500 via-gold-300 to-azure-300" />
          </Spotlight>
        );
        return (
          <li key={s.title} style={{ "--i": i } as CSSVars} className="min-w-0">
            <ScrollSlide from={i % 2 === 0 ? "left" : "right"} className="h-full">
              {s.href ? (
                <Link href={s.href} className="block h-full">
                  {card}
                </Link>
              ) : (
                card
              )}
            </ScrollSlide>
          </li>
        );
      })}
    </ul>
  );
}
