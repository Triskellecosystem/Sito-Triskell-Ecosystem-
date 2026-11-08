import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ServiceTile } from "./ServiceTile";

const spans: Record<string, string> = {
  "meta-ads": "sm:col-span-2",
  strategia: "sm:col-span-2",
};

/**
 * Bento grid a 4 colonne, senza spazi vuoti: riga 1 = Meta Ads (doppia) + Social + Siti,
 * riga 2 = Video AI + Automazioni + Strategia (doppia). Il ritmo viene dalle proporzioni, non da disegni.
 */
export function Services() {
  const { services } = site;
  return (
    <Section id={services.id} labelledBy="services-title">
      <SectionHeading id="services-title" overline={services.overline} title={services.title} line={services.line} />

      <RevealGroup className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {services.items.map((service) => (
          <RevealItem key={service.id} className={spans[service.id] ?? ""} y={32}>
            <ServiceTile service={service} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-14 sm:mt-20">
        <p className="mb-5 text-center text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-fg-3">
          {services.tools.label}
        </p>
        <Marquee items={services.tools.items} label={services.tools.label} />
      </Reveal>
    </Section>
  );
}
