import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LaptopShowcase } from "./LaptopShowcase";

const points = [
  { icon: "zap", text: "Veloci e perfetti sul telefono" },
  { icon: "target", text: "Costruiti per trasformare visite in contatti" },
  { icon: "messages", text: "Form, WhatsApp e tracciamento collegati" },
] as const;

/** Siti web: il portatile 3D che si apre e mostra i siti veri, con tre promesse e il link alla vetrina completa. */
export function WebsitesTeaser() {
  const s = site.sitiWeb;
  return (
    <Section id="siti" labelledBy="siti-teaser-title" className="overflow-hidden">
      <TechBackdrop tone="azure" cursor />
      <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading id="siti-teaser-title" overline={s.overline} title={s.title} line="Siti veloci e curati, costruiti per far diventare i visitatori clienti." />
          <RevealGroup className="mt-8 space-y-3" stagger={0.1} alternate>
            {points.map((p) => (
              <RevealItem key={p.text} y={10}>
                <p className="flex items-center gap-3 text-[1.0625rem] font-medium text-fg">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold-400/45 bg-gold-300/10 text-gold-300">
                    <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  {p.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-9" y={14} blur={0}>
            <Button href="/siti-web" size="lg" icon="arrow-right">
              Guarda tutti i siti
            </Button>
          </Reveal>
        </div>
        <div className="min-w-0 lg:col-span-7 lg:-mr-6">
          <LaptopShowcase />
        </div>
      </div>
    </Section>
  );
}
