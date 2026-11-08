import type { Metadata } from "next";
import { CallBlock } from "@/components/sections/CallBlock";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceList } from "@/components/sections/ServiceList";
import { Showcase } from "@/components/sections/Showcase";
import { SocialMock } from "@/components/sections/SocialMock";
import { ZigZagSteps } from "@/components/sections/ZigZagSteps";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Agency",
  description: "Non pensare a niente: social, Meta Ads e Google Ads, siti web, CRM, automazioni e applicazioni su misura. Deleghi tutto a Triskell Ecosystem.",
  alternates: { canonical: "/agency" },
};

export default function AgencyPage() {
  const { agencyPage: p, paths, cta } = site;
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Agency" }]} aside={<SocialMock />}>
        <Button href={cta.href} size="lg" icon="calendar" iconPosition="start" pulse>
          Prenota una call gratuita
        </Button>
        <Button href="#lavori" variant="secondary" size="lg" icon="arrow-right">
          Guarda i nostri lavori
        </Button>
      </PageHero>

      <Section id="funnel" labelledBy="funnel-title" className="pt-[clamp(1rem,2vw,2rem)]">
        <SectionHeading id="funnel-title" overline="Il funnel" title={p.pathTitle} line={p.pathLine} align="center" />
        <div className="mt-12 sm:mt-16">
          <ZigZagSteps path={paths.agency} tone="gold" />
        </div>
      </Section>

      <Section id="servizi" labelledBy="servizi-title">
        <SectionHeading id="servizi-title" overline="Servizi" title={p.servicesTitle} line={p.servicesLine} />
        <div className="mt-8 sm:mt-10">
          <ServiceList items={p.services} />
        </div>
      </Section>

      <CallBlock />
      <Showcase />
      <CtaBand content={cta.agency} />
    </>
  );
}
