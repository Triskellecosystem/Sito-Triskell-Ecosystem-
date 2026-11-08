import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { Academy } from "@/components/sections/Academy";
import { SymbolSection } from "@/components/sections/SymbolSection";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ecosystem />
      <Metrics />
      <Services />
      <Process />
      <Results />
      <Academy />
      <SymbolSection />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
