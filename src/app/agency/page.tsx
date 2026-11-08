import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { PathColumn } from "@/components/sections/PathColumn";
import { Process } from "@/components/sections/Process";
import { ServiceList } from "@/components/sections/ServiceList";
import { Button } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/LinkCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Agency",
  description: "Social, Meta Ads e Google Ads, siti web, CRM, automazioni e applicazioni su misura: delega tutto a Triskell Ecosystem.",
  alternates: { canonical: "/agency" },
};

export default function AgencyPage() {
  const { agencyPage: p, paths, cta } = site;
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Agency" }]}>
        <Button href={cta.href} size="lg" icon="calendar" iconPosition="start">
          {cta.button}
        </Button>
        <Button href={p.sitesCta.href} variant="secondary" size="lg" icon="arrow-right">
          {p.sitesCta.label}
        </Button>
      </PageHero>

      <Section id="funnel" labelledBy="funnel-title" className="pt-[clamp(1rem,2vw,2rem)]">
        <SectionHeading id="funnel-title" overline="Il funnel" title={p.pathTitle} line={p.pathLine} />
        <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
          <PathColumn path={paths.agency} tone="gold" showCta={false} />
        </div>
      </Section>

      <Section id="servizi" labelledBy="servizi-title">
        <SectionHeading id="servizi-title" overline="Servizi" title={p.servicesTitle} line={p.servicesLine} />
        <div className="mt-8 sm:mt-10">
          <ServiceList items={p.services} />
        </div>
      </Section>

      <Process />

      <Section id="esplora" labelledBy="esplora-title" className="pt-0">
        <h2 id="esplora-title" className="sr-only">
          Siti web e portfolio
        </h2>
        <RevealGroup className="grid gap-4 md:grid-cols-2" stagger={0.1}>
          <RevealItem y={28}>
            <LinkCard href={p.sitesCta.href} icon="globe" title="Siti web" text="I siti realizzati dal nostro web developer." />
          </RevealItem>
          <RevealItem y={28}>
            <LinkCard href={p.portfolioCta.href} icon="trending" title="Portfolio" text="Progetti e risultati ottenuti insieme ai clienti." />
          </RevealItem>
        </RevealGroup>
      </Section>

      <CtaBand content={cta.agency} />
    </>
  );
}
