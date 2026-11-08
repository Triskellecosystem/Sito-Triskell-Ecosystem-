import { site, type CtaContent } from "@/content/site";
import { BeamCard } from "@/components/ui/BeamCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Fascia "Prenota ora": una barra sottile a tutta larghezza (poco spazio vuoto ai lati). A sinistra il titolo che entra in
 * due righe da sinistra e da destra, a destra un solo pulsante che lampeggia (si accende ancora di più al passaggio
 * del mouse) con i tre vantaggi sotto, in fila. Nessun calendario. Su telefono si impila al centro.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  const { cta } = site;
  return (
    <section aria-label={content.title} className="relative isolate py-[clamp(1.25rem,3vw,2.25rem)]">
      <TechBackdrop tone="gold" cursor />
      <div className="container-x">
        <Reveal y={26} blur={0} from="scale">
          <BeamCard>
            <div className="relative overflow-hidden rounded-[inherit] bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night-raised)_55%,var(--color-surface))] px-5 py-6 sm:px-8 sm:py-7 lg:px-10">
              <div className="relative grid items-center gap-5 text-center lg:grid-cols-[1fr_auto] lg:gap-12 lg:text-left">
                <div>
                  <h2 className="text-[clamp(1.5rem,1.1rem+1.7vw,2.375rem)] font-bold leading-[1.08] tracking-[-0.035em] text-fg">
                    <Reveal as="span" from="far-left" blur={0} className="block">
                      {content.lines[0]}
                    </Reveal>
                    <Reveal as="span" from="far-right" blur={0} delay={0.2} className="text-gold block">
                      {content.lines[1]}
                    </Reveal>
                  </h2>
                  <Reveal delay={0.4} y={12} blur={0}>
                    <p className="mt-2.5 text-[0.9375rem] leading-snug text-fg-2 lg:max-w-md">{content.text}</p>
                  </Reveal>
                </div>

                <Reveal delay={0.45} y={12} blur={0} className="flex flex-col items-center gap-4">
                  <Button href={cta.href} size="lg" icon="calendar" iconPosition="start" pulse>
                    {cta.button}
                  </Button>
                  <ul className="grid w-full max-w-sm grid-cols-3 divide-x divide-line lg:max-w-none">
                    {cta.perks.map((perk) => (
                      <li key={perk.label} className="flex flex-col items-center gap-1 px-3 text-[0.75rem] font-medium leading-tight text-fg-2 sm:flex-row sm:justify-center sm:gap-1.5 sm:whitespace-nowrap sm:text-[0.8125rem]">
                        <Icon name={perk.icon} className="h-3.5 w-3.5 shrink-0 text-gold-300" strokeWidth={1.8} />
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
