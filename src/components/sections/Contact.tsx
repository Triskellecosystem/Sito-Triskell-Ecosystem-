import { site } from "@/content/site";
import { TriskellMark } from "@/components/brand/TriskellMark";
import { BeamCard } from "@/components/ui/BeamCard";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ContactForm } from "./ContactForm";

/**
 * CTA finale + form: un unico pannello largo con bordo beam; a sinistra messaggio e vantaggi
 * (consulenza gratuita · 30 minuti · piano su misura, come nella grafica), a destra il form.
 */
export function Contact() {
  const { contact } = site;
  return (
    <Section id={contact.id} labelledBy="contact-title" className="pb-[clamp(5rem,4rem+6vw,10rem)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-bg-cta)]" />
      <Reveal y={40} blur={6}>
        <BeamCard className="relative">
          <div className="relative grid gap-10 overflow-hidden rounded-[inherit] bg-[linear-gradient(135deg,var(--color-surface-2),var(--color-night-raised)_55%,var(--color-surface))] p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:p-14">
            <TriskellMark flat strokeWidth={1} className="pointer-events-none absolute -bottom-24 -left-20 h-[26rem] w-[26rem] rotate-[20deg] opacity-[0.16]" />

            <div className="relative flex flex-col">
              <SplitReveal id="contact-title" text={contact.title} as="h2" className="text-h2 text-fg" />
              <Reveal delay={0.2} blur={4} y={14}>
                <p className="mt-5 max-w-md text-lead text-fg-2">{contact.line}</p>
              </Reveal>

              <ul className="mt-10 space-y-4 lg:mt-auto">
                {contact.perks.map((perk) => (
                  <li key={perk.label} className="flex items-center gap-4 text-[1.0625rem] font-medium text-fg">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-400/35 bg-gold-300/10 text-gold-300">
                      <Icon name={perk.icon} className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    {perk.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </BeamCard>
      </Reveal>
    </Section>
  );
}
