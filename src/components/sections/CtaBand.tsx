import { site, type CtaContent } from "@/content/site";
import { BeamCard } from "@/components/ui/BeamCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Fascia "Prenota ora": tutta centrata, con il pulsante grande e lampeggiante al centro.
 * Riusabile in più punti del sito; titolo e riga cambiano in base al contesto, il pulsante porta a Contatti.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  const { cta } = site;
  return (
    <section aria-label={content.title} className="relative py-[clamp(1.5rem,3vw,2.5rem)]">
      <div className="container-x">
        <Reveal y={50} blur={0} from="scale">
          <BeamCard className="float-slower">
            <div className="relative overflow-hidden rounded-[inherit] bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night-raised)_55%,var(--color-surface))] px-6 py-12 text-center sm:px-12 sm:py-16">
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[44rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(247_200_92/0.14),transparent_68%)]" />
              <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_80%_at_50%_50%,#000,transparent)]" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em] text-fg">{content.title}</h2>
                <p className="mx-auto mt-4 max-w-xl text-lead text-fg-2">{content.text}</p>
                <div className="mt-9 flex justify-center">
                  <Button href={cta.href} size="xl" icon="calendar" iconPosition="start" pulse>
                    {cta.button}
                  </Button>
                </div>
                <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2.5">
                  {cta.perks.map((perk) => (
                    <li key={perk.label} className="flex items-center gap-2 text-small font-medium text-fg-2">
                      <Icon name={perk.icon} className="h-4 w-4 text-gold-300" />
                      {perk.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </BeamCard>
        </Reveal>
      </div>
    </section>
  );
}
