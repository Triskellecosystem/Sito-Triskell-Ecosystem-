import { site } from "@/content/site";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Barra numeri: una fascia unica con filetti verticali (non quattro card), 4 metriche con count-up.
 * L'heading è solo per screen reader: la barra è un "dato", non una sezione narrativa.
 */
export function Metrics() {
  const { metrics } = site;
  return (
    <section aria-labelledby="metrics-title" className="relative -mt-2 pb-[clamp(3rem,5vw,5rem)]">
      <h2 id="metrics-title" className="sr-only">
        {metrics.title.replace(/[[\]]/g, "")}
      </h2>
      <div className="container-x">
        <Reveal>
          <dl className="relative grid grid-cols-2 overflow-hidden rounded-card border border-line bg-surface/70 backdrop-blur-sm lg:grid-cols-4">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
            {metrics.items.map((m, i) => (
              <div
                key={m.label}
                className={[
                  "flex flex-col gap-2 px-6 py-7 sm:px-8 sm:py-9",
                  i % 2 === 1 ? "border-l border-line" : "",
                  i >= 2 ? "border-t border-line lg:border-t-0" : "",
                  i > 0 ? "lg:border-l lg:border-line" : "",
                ].join(" ")}
              >
                <dd className="order-1 font-display text-metric font-bold text-gold">
                  <CountUp {...m} />
                </dd>
                <dt className="order-2 text-small text-fg-2">{m.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
