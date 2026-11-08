import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ResultCardView } from "@/components/sections/ResultsCarousel";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Progetti e risultati ottenuti da Triskell Ecosystem insieme ai clienti.",
  alternates: { canonical: "/agency/portfolio" },
};

export default function PortfolioPage() {
  const { portfolio, results } = site;
  return (
    <>
      <PageHero overline={portfolio.overline} title={portfolio.title} line={portfolio.line} crumbs={[{ label: "Agency", href: "/agency" }, { label: "Portfolio" }]} />
      <Section id="progetti" labelledBy="progetti-title" className="pt-[clamp(1rem,2vw,2rem)]">
        <h2 id="progetti-title" className="sr-only">
          {portfolio.title.replace(/[[\]]/g, "")}
        </h2>
        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {results.items.map((item) => (
            <RevealItem key={item.client} y={30}>
              <ResultCardView item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
      <CtaBand content={site.cta.results} />
    </>
  );
}
