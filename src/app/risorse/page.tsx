import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Libreria risorse",
  description: "Guide, modelli e strumenti gratuiti di Triskell Ecosystem per far crescere il tuo business.",
  alternates: { canonical: "/risorse" },
};

export default function ResourcesPage() {
  const { risorse: p } = site;
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Libreria risorse" }]} />
      <Section id="risorse" labelledBy="risorse-title" className="pt-[clamp(1rem,2vw,2rem)]">
        <h2 id="risorse-title" className="sr-only">
          {p.title.replace(/[[\]]/g, "")}
        </h2>
        <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {p.items.map((item) => (
            <RevealItem key={item.title} y={24}>
              <article className="flex h-full items-start gap-5 rounded-card border border-line bg-surface p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-400/40 bg-gold-300/10 text-gold-300">
                  <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <p className="text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-azure-300">{item.tag}</p>
                  <h3 className="mt-1.5 font-display text-[1.125rem] font-semibold leading-snug tracking-tight text-fg">{item.title}</h3>
                  <p className="mt-3 inline-flex rounded-full border border-line-strong px-3 py-1 text-small text-fg-3">{p.soon}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
      <CtaBand content={site.cta.generic} />
    </>
  );
}
