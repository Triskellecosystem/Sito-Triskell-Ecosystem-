import { site, type CtaContent } from "@/content/site";
import { BeamCard } from "@/components/ui/BeamCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";

function Perk({ icon, label, side, delay }: { icon: (typeof site.cta.perks)[number]["icon"]; label: string; side: "left" | "right"; delay: number }) {
  return (
    <Reveal from={side === "left" ? "far-left" : "far-right"} blur={0} delay={delay} className={side === "left" ? "lg:justify-self-end" : "lg:justify-self-start"}>
      <span className="eco-bob inline-flex items-center gap-3 rounded-full border border-gold-400/40 bg-night/60 py-2 pl-2 pr-5 font-display text-[1.0625rem] font-semibold text-fg shadow-card backdrop-blur-sm">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/50 bg-gold-300/10 text-gold-300">
          <Icon name={icon} className="h-5 w-5" strokeWidth={1.7} />
        </span>
        {label}
      </span>
    </Reveal>
  );
}

/**
 * Fascia "Prenota ora": nessun calendario aperto. Il titolo si spezza in due righe che entrano da sinistra e da
 * destra; al centro un grande pulsante lampeggiante con onde che si espandono, ai lati i vantaggi che arrivano
 * da fuori schermo. Occupa tutta la larghezza, senza spazi vuoti.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  const { cta } = site;
  const [p0, p1, p2, p3] = cta.perks;
  return (
    <section aria-label={content.title} className="relative isolate py-[clamp(1.5rem,3vw,2.5rem)]">
      <TechBackdrop tone="gold" cursor rich />
      <div className="container-x">
        <Reveal y={40} blur={0} from="scale">
          <BeamCard>
            <div className="relative overflow-hidden rounded-[inherit] bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night-raised)_55%,var(--color-surface))] px-5 py-12 text-center sm:px-10 sm:py-16">
              <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(70%_90%_at_50%_50%,#000,transparent)]" />
              <div className="relative">
                <h2 className="text-[clamp(2.25rem,1.3rem+4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-fg">
                  <Reveal as="span" from="far-left" blur={0} className="block">
                    {content.lines[0]}
                  </Reveal>
                  <Reveal as="span" from="far-right" blur={0} delay={0.2} className="text-gold block">
                    {content.lines[1]}
                  </Reveal>
                </h2>
                <Reveal delay={0.45} y={16} blur={0}>
                  <p className="mx-auto mt-5 max-w-xl text-lead text-fg-2">{content.text}</p>
                </Reveal>

                <div className="mt-10 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
                  <div className="order-2 flex flex-wrap justify-center gap-3 lg:order-1 lg:grid lg:justify-items-end lg:gap-5">
                    {p0 && <Perk {...p0} side="left" delay={0.2} />}
                    {p1 && <Perk {...p1} side="left" delay={0.4} />}
                  </div>

                  <Reveal from="scale" blur={0} delay={0.3} className="relative order-1 grid place-items-center px-8 py-6 lg:order-2">
                    <span aria-hidden="true" className="sonar absolute left-1/2 top-1/2 h-24 w-24" />
                    <span aria-hidden="true" className="sonar absolute left-1/2 top-1/2 h-24 w-24" style={{ animationDelay: "0.9s" }} />
                    <span aria-hidden="true" className="sonar absolute left-1/2 top-1/2 h-24 w-24" style={{ animationDelay: "1.8s" }} />
                    <Button href={cta.href} size="xl" icon="calendar" iconPosition="start" pulse className="relative h-[4.75rem] px-10 text-[1.375rem] sm:h-[5.5rem] sm:px-16 sm:text-[1.625rem]">
                      {cta.button}
                    </Button>
                  </Reveal>

                  <div className="order-3 flex flex-wrap justify-center gap-3 lg:grid lg:justify-items-start lg:gap-5">
                    {p2 && <Perk {...p2} side="right" delay={0.2} />}
                    {p3 && <Perk {...p3} side="right" delay={0.4} />}
                  </div>
                </div>
              </div>
            </div>
          </BeamCard>
        </Reveal>
      </div>
    </section>
  );
}
