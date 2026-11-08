import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Siti web",
  description: "I siti web realizzati da William, web developer di Triskell Ecosystem.",
  alternates: { canonical: "/agency/siti-web" },
};

export default function WebsitesPage() {
  const { sitiWeb: p } = site;
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Agency", href: "/agency" }, { label: "Siti web" }]} />
      <Section id="siti" labelledBy="siti-title" className="pt-[clamp(1rem,2vw,2rem)]">
        <h2 id="siti-title" className="sr-only">
          {p.title.replace(/[[\]]/g, "")}
        </h2>
        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {p.items.map((item, i) => (
            <RevealItem key={i} y={28}>
              <article className="overflow-hidden rounded-card border border-line bg-surface">
                {/* "finestra del browser" per lo screenshot del sito */}
                <div className="border-b border-line bg-night/60 px-3.5 py-2.5">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-2 w-2 rounded-full bg-line-strong" />
                    ))}
                    <span className="ml-2 h-2 flex-1 rounded-full bg-line" />
                  </div>
                </div>
                <div className="relative grid aspect-[16/10] place-items-center bg-[linear-gradient(135deg,var(--color-cobalt-700),var(--color-night-glow)_60%,var(--color-surface))]">
                  <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
                  <span className="relative inline-flex items-center gap-2 rounded-full border border-line-strong bg-night/70 px-4 py-1.5 text-small font-medium text-fg-2 backdrop-blur">
                    <Icon name="globe" className="h-4 w-4 text-gold-300" />
                    {p.soon}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[1.0625rem] font-semibold tracking-tight text-fg">{item.name}</h3>
                  <p className="mt-1 text-small text-gold-400">{item.category}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
      <CtaBand content={site.cta.agency} />
    </>
  );
}
