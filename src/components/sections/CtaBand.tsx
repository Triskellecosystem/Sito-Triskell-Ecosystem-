import { site, type CtaContent } from "@/content/site";
import { BeamCard } from "@/components/ui/BeamCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Fascia "Prenota ora": compatta, riusabile in più punti del sito (home, Agency, Academy, risultati…).
 * Titolo e riga cambiano in base al contesto; il pulsante porta sempre alla pagina Contatti.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  const { cta } = site;
  return (
    <section aria-label={content.title} className="relative py-[clamp(1.5rem,3vw,2.5rem)]">
      <div className="container-x">
        <Reveal y={24} blur={0}>
          <BeamCard>
            <div className="relative flex flex-col items-start justify-between gap-7 overflow-hidden rounded-[inherit] bg-[linear-gradient(120deg,var(--color-surface-2),var(--color-night-raised)_60%,var(--color-surface))] px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center">
              <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.14),transparent_65%)]" />
              <div className="relative max-w-xl">
                <h2 className="text-[clamp(1.5rem,1.15rem+1.6vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">{content.title}</h2>
                <p className="mt-2.5 text-lead text-fg-2">{content.text}</p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {cta.perks.map((perk) => (
                    <li key={perk.label} className="flex items-center gap-2 text-small font-medium text-fg-2">
                      <Icon name={perk.icon} className="h-4 w-4 text-gold-300" />
                      {perk.label}
                    </li>
                  ))}
                </ul>
              </div>
              <Button href={cta.href} size="lg" icon="calendar" iconPosition="start" className="relative shrink-0">
                {cta.button}
              </Button>
            </div>
          </BeamCard>
        </Reveal>
      </div>
    </section>
  );
}
