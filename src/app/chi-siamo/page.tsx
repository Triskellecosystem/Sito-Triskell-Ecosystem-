import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { PersonStage } from "@/components/sections/PersonStage";
import { TeamIntro } from "@/components/sections/TeamIntro";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: "Il team di Triskell Ecosystem (Tomaso, founder, e William, web developer) e il metodo con cui lavoriamo: analisi, strategia, produzione, risultati.",
  alternates: { canonical: "/chi-siamo" },
};

export default function AboutPage() {
  const { about } = site;
  return (
    <>
      <PageHero overline={about.overline} title={about.title} line={about.line} crumbs={[{ label: "Chi siamo" }]} />
      <TeamIntro />
      {about.people.map((p, i) => (
        <PersonStage key={p.id} person={p} index={i} />
      ))}
      <HowWeWork />
      <CtaBand content={site.cta.generic} />
    </>
  );
}
