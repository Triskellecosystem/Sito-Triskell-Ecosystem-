import { site, type CtaContent } from "@/content/site";
import { BeamCard } from "@/components/ui/BeamCard";
import { Icon } from "@/components/ui/Icon";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { BookingCard } from "./BookingCard";

/**
 * Fascia "Prenota ora": il titolo si spezza in due righe che entrano da sinistra e da destra, mentre a destra
 * arriva una mini scheda di prenotazione interattiva (giorno e orario) con il pulsante lampeggiante.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  const { cta } = site;
  return (
    <section aria-label={content.title} className="relative isolate py-[clamp(1.5rem,3vw,2.5rem)]">
      <TechBackdrop tone="gold" cursor />
      <div className="container-x">
        <Reveal y={40} blur={0} from="scale">
          <BeamCard>
            <div className="relative overflow-hidden rounded-[inherit] bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night-raised)_55%,var(--color-surface))] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
              <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(70%_90%_at_30%_50%,#000,transparent)]" />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
                <div>
                  <h2 className="text-[clamp(2rem,1.3rem+3vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.04em] text-fg">
                    <Reveal as="span" from="far-left" blur={0} className="block">
                      {content.lines[0]}
                    </Reveal>
                    <Reveal as="span" from="far-right" blur={0} delay={0.2} className="text-gold block">
                      {content.lines[1]}
                    </Reveal>
                  </h2>
                  <Reveal delay={0.45} y={16} blur={0}>
                    <p className="mt-5 max-w-lg text-lead text-fg-2">{content.text}</p>
                  </Reveal>
                  <Reveal delay={0.6} y={16} blur={0}>
                    <ul className="mt-7 flex flex-wrap gap-2.5">
                      {cta.perks.map((perk) => (
                        <li key={perk.label} className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-night/50 px-3.5 py-1.5 text-small font-medium text-fg-2">
                          <Icon name={perk.icon} className="h-4 w-4 text-gold-300" />
                          {perk.label}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
                <Reveal from="far-right" blur={0} delay={0.15} className="min-w-0">
                  <BookingCard />
                </Reveal>
              </div>
            </div>
          </BeamCard>
        </Reveal>
      </div>
    </section>
  );
}
