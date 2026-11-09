import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { RisorseGrid } from "@/components/sections/RisorseGrid";
import { VibeSection } from "@/components/sections/VibeSection";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { risorse } from "@/content/risorse";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Risorse gratuite",
  description: "Tutorial, guide visuali e il libretto sul Vibe Coding di Triskell: i materiali di riferimento dietro i nostri video, gratis.",
  alternates: { canonical: "/risorse" },
};

/** Il libro del Vibe Coding in evidenza accanto al titolo: un clic porta alla sua sezione, più in basso nella stessa pagina. */
function BookFeature() {
  const v = site.vibeCoding;
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.28),transparent_66%)]" />
      <a href="#vibe-coding" className="group/b proof-card relative flex items-center gap-5 overflow-hidden rounded-card border border-gold-300/60 bg-[linear-gradient(140deg,#1a2a44,#0a1626_70%)] p-5 transition-[border-color] duration-[var(--dur-base)] hover:border-gold-200">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_right,#000,transparent_85%)]" />
        <Image
          src="/brand/vibe-cover.webp"
          alt={v.coverAlt}
          width={400}
          height={600}
          sizes="9rem"
          priority
          className="relative h-auto w-[7.5rem] shrink-0 -rotate-3 rounded-sm shadow-[0_18px_36px_-8px_rgb(0_0_0/0.85)] transition-transform duration-500 ease-out-expo group-hover/b:rotate-0 group-hover/b:scale-105 sm:w-[9rem]"
        />
        <div className="relative min-w-0">
          <p className="inline-flex rounded-full bg-gold-300 px-3 py-1 text-overline font-bold uppercase text-night tracking-[var(--text-overline--letter-spacing)]">In evidenza · Gratis</p>
          <p className="mt-3 font-display text-[1.375rem] font-bold leading-tight tracking-tight text-fg">Il libretto sul Vibe Coding</p>
          <p className="mt-1.5 text-[0.9375rem] leading-snug text-fg-2">Costruisci siti e app con l&apos;AI, senza saper programmare.</p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-gold-300 px-4 py-2 font-display text-[0.9375rem] font-bold text-gold-200 transition-colors group-hover/b:bg-gold-300 group-hover/b:text-night">
            Scopri il libro
            <Icon name="arrow-down" className="h-4 w-4" strokeWidth={2.4} />
          </span>
        </div>
      </a>
    </div>
  );
}

export default function RisorsePage() {
  return (
    <>
      <PageHero overline={risorse.overline} title={risorse.title} line={risorse.line} crumbs={[{ label: "Risorse gratuite" }]} aside={<BookFeature />} />
      <Section id="archivio" labelledBy="archivio-title" className="!pt-6">
        <h2 id="archivio-title" className="sr-only">
          Archivio delle risorse
        </h2>
        <p className="mb-8 text-center text-overline font-semibold uppercase text-gold-400 tracking-[var(--text-overline--letter-spacing)]">{risorse.updated}</p>
        <RisorseGrid items={risorse.items} filters={risorse.filters} />
      </Section>
      <VibeSection />
    </>
  );
}
