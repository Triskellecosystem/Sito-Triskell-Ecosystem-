import Link from "next/link";
import type { Service } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** Elenco servizi ordinato su due colonne: riga con icona, titolo e una frase. Nessun riquadro. */
export function ServiceList({ items }: { items: Service[] }) {
  return (
    <RevealGroup as="div" className="grid gap-x-14 md:grid-cols-2" stagger={0.07} alternate>
      {items.map((s) => {
        const body = (
          <div className="group/row flex items-start gap-5 border-t border-line py-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold-400/45 bg-gold-300/10 text-gold-300 transition-[background-color,box-shadow,transform] duration-[var(--dur-base)] ease-out-expo group-hover/row:scale-105 group-hover/row:bg-gold-300/20 group-hover/row:shadow-[0_0_28px_-4px_rgb(247_200_92/0.55)]">
              <Icon name={s.icon} className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="flex items-center gap-2 font-display text-[1.1875rem] font-semibold tracking-tight text-fg">
                {s.title}
                {s.href && <Icon name="arrow-up-right" className="h-4 w-4 text-gold-300" />}
              </h3>
              <p className="mt-1 text-body text-fg-2">{s.text}</p>
            </div>
          </div>
        );
        return (
          <RevealItem key={s.title} y={26} blur={0}>
            {s.href ? (
              <Link href={s.href} className="block rounded-xl transition-colors hover:bg-surface/60">
                {body}
              </Link>
            ) : (
              body
            )}
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
