import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { RisorseGrid } from "@/components/sections/RisorseGrid";
import { Section } from "@/components/ui/Section";
import { risorse } from "@/content/risorse";

export const metadata: Metadata = {
  title: "Risorse gratuite",
  description: "Tutti i materiali di riferimento dietro i video YouTube e gli Shorts di Triskell: tutorial, prompt, workflow e guide rapide.",
  alternates: { canonical: "/risorse" },
};

export default function RisorsePage() {
  return (
    <>
      <PageHero overline={risorse.overline} title={risorse.title} line={risorse.line} crumbs={[{ label: "Risorse gratuite" }]} />
      <Section id="archivio" labelledBy="archivio-title" className="!pt-6">
        <h2 id="archivio-title" className="sr-only">Archivio delle risorse</h2>
        <p className="mb-8 text-center text-overline font-semibold uppercase text-gold-400 tracking-[var(--text-overline--letter-spacing)]">{risorse.updated}</p>
        <RisorseGrid items={risorse.items} filters={risorse.filters} />
      </Section>
    </>
  );
}
