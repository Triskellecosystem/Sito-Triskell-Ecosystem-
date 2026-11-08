import { site, type CtaContent } from "@/content/site";
import { BeamCard } from "@/components/ui/BeamCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Fascia "Prenota ora", fine e compatta: il titolo entra in due righe da sinistra e da destra, sotto un solo
 * pulsante che lampeggia (si accende ancora di più al passaggio del mouse) e i tre vantaggi in una riga ordinata.
 * Nessun calendario aperto. Funziona bene anche da telefono.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  const { cta } = site;
  return (
    <section aria-label={content.title} className="relative isolate py-[clamp(1.25rem,3vw,2.25rem)]">
      <TechBackdrop tone="gold" cursor />
      <div className="container-x">
        <Reveal y={30} blur={0} from="scale" className="mx-auto max-w-3xl">
          <BeamCard>
            <div className="relative overflow-hidden rounded-[inherit] bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night-raised)_55%,var(--color-surface))] px-5 py-8 text-center sm:px-10 sm:py-10">
              <div className="relative">
                <h2 className="text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] font-bold leading-[1.06] tracking-[-0.035em] text-fg">
                  <Reveal as="span" from="far-left" blur={0} className="block">
                    {content.lines[0]}
                  </Reveal>
                  <Reveal as="span" from="far-right" blur={0} delay={0.2} className="text-gold block">
                    {content.lines[1]}
                  </Reveal>
                </h2>
                <Reveal delay={0.4} y={12} blur={0}>
                  <p className="mx-auto mt-3 max-w-md text-[1rem] leading-snug text-fg-2 [text-wrap:balance]">{content.text}</p>
                </Reveal>

                <Reveal delay={0.5} y={12} blur={0} from="scale" className="mt-6 flex justify-center">
                  <Button href={cta.href} size="lg" icon="calendar" iconPosition="start" pulse>
                    {cta.button}
                  </Button>
                </Reveal>

                <Reveal delay={0.6} y={12} blur={0}>
                  <ul className="mx-auto mt-6 grid max-w-lg grid-cols-3 divide-x divide-line border-t border-line pt-5">
                    {cta.perks.map((perk) => (
                      <li key={perk.label} className="flex flex-col items-center gap-1.5 px-2 text-[0.8125rem] font-medium leading-tight text-fg-2 sm:flex-row sm:justify-center sm:gap-2 sm:whitespace-nowrap sm:text-[0.875rem]">
                        <Icon name={perk.icon} className="h-4 w-4 shrink-0 text-gold-300" strokeWidth={1.8} />
                        {perk.label}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </BeamCard>
        </Reveal>
      </div>
    </section>
  );
}
