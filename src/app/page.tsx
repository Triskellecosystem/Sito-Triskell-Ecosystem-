import { CtaBand } from "@/components/sections/CtaBand";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Hero } from "@/components/sections/Hero";
import { Paths } from "@/components/sections/Paths";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { SymbolSection } from "@/components/sections/SymbolSection";
import { site } from "@/content/site";

/** Home: presenta l'ecosistema e smista verso Agency e Academy. Il dettaglio sta nelle pagine dedicate. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Ecosystem />
      <Paths />
      <CtaBand content={site.cta.home} />
      <Process />
      <Results />
      <CtaBand content={site.cta.results} />
      <SymbolSection />
      <CtaBand content={site.cta.generic} />
    </>
  );
}
