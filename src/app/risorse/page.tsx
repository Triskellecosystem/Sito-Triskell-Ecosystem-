import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { RisorseGrid } from "@/components/sections/RisorseGrid";
import { VibeSection } from "@/components/sections/VibeSection";
import { Book3D } from "@/components/ui/Book3D";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { risorse } from "@/content/risorse";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Risorse gratuite",
  description: "Tutorial, guide visuali e il libretto sul Vibe Coding di Triskell: i materiali di riferimento dietro i nostri video, gratis.",
  alternates: { canonical: "/risorse" },
};

/**
 * Il libro del Vibe Coding, libero (senza riquadro): lo tocchi e si muove, come nella pagina del libretto di prima.
 * Di lato, due definizioni sospese; "Scopri il libro" porta alla sezione dedicata, più in basso nella stessa pagina.
 */
function BookFeature() {
  const v = site.vibeCoding;
  return (
    <div className="relative flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-0 lg:-mr-6">
      {/* alone morbido e rotondo che sfuma in tutte le direzioni (nessun bordo, nessun riquadro) */}
      <div aria-hidden="true" className="vibe-glow pointer-events-none absolute left-[38%] top-1/2 h-[40rem] w-[40rem] max-md:left-1/2 max-md:top-[34%] max-md:h-[22rem] max-md:w-[22rem] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full [background:radial-gradient(closest-side,rgb(80_180_245/0.62),rgb(50_135_215/0.32)_40%,rgb(25_90_170/0.1)_70%,transparent)]" />
      <Book3D className="[&>div[aria-hidden=true]]:hidden" cover="/brand/vibe-cover.webp" alt={v.coverAlt} title="Vibe Coding" hint="Toccalo o trascinalo per girarlo" />
      <div className="flex max-w-[13rem] flex-col gap-7 text-center max-md:relative max-md:z-10 sm:-ml-4 sm:text-left">
        <p>
          <span className="inline-block rounded-full bg-gold-300 px-3 py-1 text-overline font-bold uppercase text-night tracking-[var(--text-overline--letter-spacing)]">Gratis</span>
          <span className="mt-3 block font-display text-[1.375rem] font-bold leading-tight tracking-tight text-fg">Il libretto sul Vibe Coding</span>
          <span className="mt-1 block text-[0.9375rem] leading-snug text-fg-2">PDF di 10 pagine, senza saper programmare.</span>
        </p>
        <p>
          <span className="block text-[0.9375rem] leading-snug text-fg-2">Costruisci siti e app descrivendo all&apos;AI cosa vuoi.</span>
          <a href="#vibe-coding" className="mt-3 inline-flex items-center gap-2 font-display text-[1.0625rem] font-bold text-gold-300 transition-colors hover:text-gold-100">
            Scopri il libro
            <Icon name="arrow-down" className="h-4 w-4 animate-bounce" strokeWidth={2.4} />
          </a>
        </p>
      </div>
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
