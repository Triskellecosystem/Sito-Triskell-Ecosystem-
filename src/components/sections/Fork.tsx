import { site } from "@/content/site";
import { TriskellMark } from "@/components/brand/TriskellMark";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BeamCard } from "@/components/ui/BeamCard";
import { Spotlight } from "@/components/ui/Spotlight";
import { Magnetic } from "@/components/motion/Magnetic";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Il bivio: due card ASIMMETRICHE (7/12 + 5/12). Agency è in primo piano — bordo beam rotante,
 * headline grande, CTA oro, simbolo in filigrana. Academy è più sobria: bordo beam solo in hover.
 * Entrambe con spotlight che segue il cursore.
 */
export function Fork() {
  const { fork } = site;
  const { agency, academy } = fork;

  return (
    <Section id={fork.id} labelledBy="fork-title">
      <SectionHeading id="fork-title" overline={fork.overline} title={fork.title} line={fork.line} />

      <RevealGroup className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-12 lg:gap-6" stagger={0.14}>
        {/* AGENCY — priorità visiva */}
        <RevealItem className="lg:col-span-7" y={40}>
          <BeamCard className="h-full">
            <Spotlight className="flex h-full min-h-[26rem] flex-col rounded-[inherit] bg-[linear-gradient(160deg,var(--color-surface-3)_0%,var(--color-surface)_55%,var(--color-night-glow)_100%)] p-7 sm:p-10 lg:min-h-[31rem]">
              <TriskellMark flat strokeWidth={1.1} className="pointer-events-none absolute -bottom-16 -right-12 h-[22rem] w-[22rem] rotate-[-14deg] opacity-[0.22] sm:h-[27rem] sm:w-[27rem]" />
              <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.14),transparent_65%)]" />

              <div className="relative z-[2] flex flex-1 flex-col">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/40 bg-gold-300/10 px-3.5 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-300">
                  <Icon name="sparkles" className="h-3.5 w-3.5" />
                  {agency.badge}
                </span>

                <p className="mt-8 font-display text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-fg-3">{agency.name}</p>
                <h3 className="mt-3 text-h2 text-fg">{agency.headline}</h3>
                <p className="mt-4 max-w-md text-lead text-fg-2">{agency.line}</p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-1">
                  {agency.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[0.9375rem] text-fg">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold-400/50 bg-gold-300/10 text-gold-300">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <Magnetic className="inline-block">
                    <Button href={agency.cta.href} size="lg" icon="arrow-right">
                      {agency.cta.label}
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </Spotlight>
          </BeamCard>
        </RevealItem>

        {/* ACADEMY — secondaria */}
        <RevealItem className="lg:col-span-5" y={40}>
          <BeamCard hoverOnly className="h-full">
            <Spotlight
              tone="azure"
              className="flex h-full min-h-[22rem] flex-col rounded-[inherit] border border-line bg-[linear-gradient(170deg,var(--color-surface)_0%,var(--color-night-raised)_100%)] p-7 sm:p-10 lg:min-h-[31rem]"
            >
              <div className="relative z-[2] flex flex-1 flex-col">
                <div className="glass grid h-14 w-14 place-items-center rounded-2xl text-azure-300">
                  <Icon name="graduation" className="h-7 w-7" strokeWidth={1.5} />
                </div>

                <p className="mt-8 font-display text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-fg-3">{academy.name}</p>
                <h3 className="mt-3 text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">{academy.headline}</h3>
                <p className="mt-4 max-w-sm text-body text-fg-2">{academy.line}</p>

                {/* micro-visual: avanzamento di un percorso */}
                <div aria-hidden="true" className="mt-8 space-y-2.5">
                  {[78, 54, 32].map((w, i) => (
                    <div key={w} className="h-1.5 overflow-hidden rounded-full bg-line">
                      <div className="h-full rounded-full bg-azure-400" style={{ width: `${w}%`, opacity: 1 - i * 0.25 }} />
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-10">
                  <Button href={academy.cta.href} variant="secondary" size="lg" icon="arrow-right">
                    {academy.cta.label}
                  </Button>
                </div>
              </div>
            </Spotlight>
          </BeamCard>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
