import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Fork } from "@/components/sections/Fork";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { Academy } from "@/components/sections/Academy";
import { SymbolSection } from "@/components/sections/SymbolSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <Fork />
      <Services />
      <Process />
      <Results />
      <Academy />
      <SymbolSection />
    </>
  );
}
