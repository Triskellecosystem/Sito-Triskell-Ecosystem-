import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

/** "Prenota una call gratuita": cosa succede nella call, in 3 passi che arrivano da lati diversi, e il pulsante grande. */
export function CallBlock() {
  const { call } = site.agencyPage;
  const { cta } = site;
  const from = ["left", "up", "right"] as const;
  return (
    <Section id="call" labelledBy="call-title">
      <SectionHeading id="call-title" overline={call.overline} title={call.title} line={call.line} align="center" />
      <div className="relative mt-12 grid gap-5 md:grid-cols-3 md:gap-8">
        <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-[3.25rem] hidden h-[3px] bg-gradient-to-r from-gold-300/0 via-gold-300/70 to-gold-300/0 md:block" />
        {call.points.map((p, i) => (
          <Reveal key={p.title} from={from[i] ?? "up"} blur={0}>
            <div className="relative h-full rounded-card border border-gold-400/30 bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-7 text-center">
              <span className="relative mx-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border-2 border-gold-300 bg-night text-gold-300 shadow-glow-gold">
                <Icon name={p.icon} className="h-8 w-8" strokeWidth={1.6} />
                <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-gold-300 font-display text-small font-bold text-night">{i + 1}</span>
              </span>
              <h3 className="mt-5 font-display text-[1.375rem] font-bold tracking-tight text-fg">{p.title}</h3>
              <p className="mt-2 text-body text-fg-2">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex justify-center" from="scale" blur={0}>
        <Button href={cta.href} size="xl" icon="calendar" iconPosition="start" pulse>
          {cta.button}
        </Button>
      </Reveal>
    </Section>
  );
}
