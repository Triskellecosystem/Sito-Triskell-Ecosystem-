import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { CaseCard } from "./CaseCard";

/** Risultati sulla home: titolo centrato, quattro casi reali a tutta larghezza su sfondo tech, link a tutti i progetti. */
export function Results() {
  const { results } = site;
  return (
    <Section id={results.id} labelledBy="results-title">
      <TechBackdrop tone="azure" cursor />
      <SectionHeading id="results-title" overline={results.overline} title={results.title} line={results.line} align="center" />
      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 sm:mt-12 xl:grid-cols-4" stagger={0.12} alternate>
        {results.items.slice(0, 4).map((item) => (
          <RevealItem key={item.id} y={34} className="h-full">
            <CaseCard item={item} href={`/agency/portfolio#${item.id}`} />
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="mt-9 flex justify-center" y={16} blur={0}>
        <Button href={results.all.href} size="lg" icon="arrow-right" variant="secondary">
          {results.all.label}
        </Button>
      </Reveal>
    </Section>
  );
}
