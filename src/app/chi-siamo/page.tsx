import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { CtaBand } from "@/components/sections/CtaBand";
import { HowWeWork } from "@/components/sections/HowWeWork";
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
      <About />
      <HowWeWork />
      <CtaBand content={site.cta.generic} />
    </>
  );
}
