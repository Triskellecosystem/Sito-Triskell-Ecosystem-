import type { Metadata } from "next";
import { AcademyVideos } from "@/components/sections/AcademyVideos";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { PathColumn } from "@/components/sections/PathColumn";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Academy",
  description: "Percorsi pratici su vendite, marketing e intelligenza artificiale, per te in prima persona o per i tuoi dipendenti.",
  alternates: { canonical: "/academy" },
};

export default function AcademyPage() {
  const { academyPage: p, paths, cta } = site;
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Academy" }]}>
        <Button href={cta.href} size="lg" icon="calendar" iconPosition="start">
          {cta.button}
        </Button>
      </PageHero>

      <Section id="percorso" labelledBy="percorso-title" className="pt-[clamp(1rem,2vw,2rem)]">
        <SectionHeading id="percorso-title" overline="Il percorso" title={p.pathTitle} line={p.pathLine} />
        <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
          <PathColumn path={paths.academy} tone="azure" showCta={false} />
        </div>
      </Section>

      <AcademyVideos />
      <CtaBand content={cta.academy} />
    </>
  );
}
