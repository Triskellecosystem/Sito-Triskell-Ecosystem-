import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { YouTubeFacade } from "./YouTubeFacade";

/**
 * Academy: colonna sinistra con titolo, 3 numeri e CTA; a destra un video grande in evidenza
 * con due tutorial più piccoli affiancati sotto. Facade YouTube: nessun iframe all'avvio.
 */
export function Academy() {
  const { academy } = site;
  const [main, ...rest] = academy.tutorials;

  return (
    <Section id={academy.id} labelledBy="academy-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <SectionHeading id="academy-title" overline={academy.overline} title={academy.title} line={academy.line} />

          <Reveal delay={0.1} className="mt-10">
            <dl className="grid grid-cols-3 border-t border-line pt-6">
              {academy.numbers.map((n, i) => (
                <div key={n.label} className={`flex flex-col ${i > 0 ? "border-l border-line pl-4 sm:pl-6" : "pr-2"}`}>
                  <dd className="order-1 font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-bold leading-none tracking-[-0.04em] text-gold">
                    <CountUp {...n} />
                  </dd>
                  <dt className="order-2 mt-2 text-[0.8125rem] leading-snug text-fg-2 sm:text-small">{n.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-9">
              <Button href={academy.cta.href} variant="secondary" size="lg" icon="arrow-right">
                {academy.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-7" stagger={0.12}>
          {main && (
            <RevealItem className="sm:col-span-2" y={36}>
              <YouTubeFacade tutorial={main} />
            </RevealItem>
          )}
          {rest.map((t) => (
            <RevealItem key={t.title} y={36}>
              <YouTubeFacade tutorial={t} size="sm" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
