import type { Metadata } from "next";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { LogoMark } from "@/components/brand/LogoMark";

export const metadata: Metadata = {
  title: "AI Lab",
  description: "Il laboratorio AI di Triskell Ecosystem: esperimenti, strumenti e integrazioni su misura.",
  alternates: { canonical: "/ai-lab" },
};

/** Pagina segnaposto: AI Lab compare solo nel menu a tendina, non in home. */
export default function AiLabPage() {
  const { aiLab } = site;
  return (
    <section className="relative isolate grid min-h-svh place-items-center overflow-hidden px-[var(--gutter)] pb-24 pt-[calc(var(--header-h)+2rem)] text-center">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_45%,#000,transparent)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[image:var(--gradient-bg-hero)]" />
      <div className="max-w-2xl">
        <LogoMark size={112} priority className="mx-auto h-28 w-28" />
        <p className="mt-8 text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-gold-400">{aiLab.overline}</p>
        <SplitReveal as="h1" text={aiLab.title} className="mt-4 text-h2 text-fg" />
        <p className="mt-5 text-lead text-fg-2">{aiLab.line}</p>
        <div className="mt-9">
          <Button href={aiLab.cta.href} variant="secondary" size="lg" icon="arrow-right">
            {aiLab.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
