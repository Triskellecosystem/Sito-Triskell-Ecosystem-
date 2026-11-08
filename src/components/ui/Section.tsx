import { cn } from "@/lib/cn";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";

interface SectionProps {
  id: string;
  /** id dell'heading, per aria-labelledby */
  labelledBy?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

/** Contenitore di sezione: padding verticale fluido, ancora con scroll-margin per l'header. */
export function Section({ id, labelledBy, className, innerClassName, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative scroll-mt-[72px] py-[clamp(4.5rem,3rem+6vw,9rem)]", className)}>
      <div className={cn("container-x", innerClassName)}>{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  overline: string;
  title: string;
  line?: string;
  align?: "left" | "center";
  className?: string;
}

/** Ordine visivo identico in tutta la home: overline → titolo (max 6 parole) → 1 riga. */
export function SectionHeading({ id, overline, title, line, align = "left", className }: SectionHeadingProps) {
  return (
    <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal blur={0} y={12}>
        <p className="mb-4 inline-flex items-center gap-3 text-overline font-semibold uppercase text-gold-400 tracking-[var(--text-overline--letter-spacing)]">
          <span aria-hidden="true" className="h-px w-8 bg-gold-400/70" />
          {overline}
        </p>
      </Reveal>
      <SplitReveal id={id} text={title} as="h2" className="text-h2 text-fg" />
      {line && (
        <Reveal delay={0.25} blur={4} y={14}>
          <p className="mt-5 max-w-xl text-lead text-fg-2">{line}</p>
        </Reveal>
      )}
    </header>
  );
}
