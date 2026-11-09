import type { Metadata } from "next";
import { AcademyCourses } from "@/components/sections/AcademyCourses";
import { LessonPlayer } from "@/components/sections/LessonPlayer";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ZigZagSteps } from "@/components/sections/ZigZagSteps";
import { Button } from "@/components/ui/Button";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Academy",
  description: "Diventa indipendente sulle migliori strategie di marketing e AI: percorsi pratici per te e per i tuoi dipendenti.",
  alternates: { canonical: "/academy" },
};

export default function AcademyPage() {
  const { academyPage: p, paths, cta } = site;
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Academy" }]} aside={<LessonPlayer />}>
        <Button href={cta.href} size="lg" icon="calendar" iconPosition="start" pulse>
          {cta.button}
        </Button>
        <Button href="#corsi" variant="secondary" size="lg" icon="arrow-right">
          Guarda i corsi
        </Button>
      </PageHero>

      <Section id="percorso" labelledBy="percorso-title" className="pt-[clamp(1rem,2vw,2rem)]">
        <TechBackdrop tone="azure" cursor rich />
        <SectionHeading id="percorso-title" overline="Il percorso" title={p.pathTitle} line={p.pathLine} align="center" />
        <div className="mt-12 sm:mt-16">
          <ZigZagSteps path={paths.academy} tone="azure" />
        </div>
      </Section>

      <SectionDivider />
      <AcademyCourses />
      <CtaBand content={cta.academy} />
    </>
  );
}
