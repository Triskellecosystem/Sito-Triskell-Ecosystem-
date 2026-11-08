"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site, type ResultCard } from "@/content/site";
import { cn } from "@/lib/cn";
import { CountUp } from "@/components/motion/CountUp";
import { Icon } from "@/components/ui/Icon";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Card({ item }: { item: ResultCard }) {
  return (
    <article className="border-gold-static relative flex h-full flex-col justify-between overflow-hidden rounded-card bg-[linear-gradient(165deg,var(--color-surface-2),var(--color-night-raised)_60%,var(--color-surface))] p-6 sm:p-7">
      {/* "foto" segnaposto elegante */}
      <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 h-36 opacity-60 [mask-image:linear-gradient(#000,transparent)]" />
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(11_129_177/0.35),transparent_70%)]" />

      <header className="relative flex items-center gap-3.5">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-night font-display text-small font-bold tracking-wide text-gold-300">
          {initials(item.client)}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-display text-[1.0625rem] font-semibold tracking-tight text-fg">{item.client}</h3>
          <p className="mt-1.5 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-azure-400/15 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-azure-300">{item.sector}</span>
            <span className="rounded-full bg-gold-300/15 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-gold-300">{item.period}</span>
          </p>
        </div>
      </header>

      <div className="relative mt-10 border-t border-line pt-6">
        <p className="flex flex-col">
          <CountUp {...item.kpi} className="font-display text-[clamp(3rem,2.4rem+2.2vw,4.25rem)] font-bold leading-none tracking-[-0.045em] text-gold" />
          <span className="mt-2.5 text-small text-fg-2">{item.kpi.label}</span>
        </p>
        <p className="mt-5 flex items-baseline gap-3 border-t border-line pt-4">
          <CountUp {...item.secondary} className="font-display text-[1.625rem] font-bold leading-none tracking-[-0.03em] text-fg" />
          <span className="text-small text-fg-2">{item.secondary.label}</span>
        </p>
      </div>
    </article>
  );
}

/** Carousel con scroll-snap nativo (touch, tastiera, rotella), frecce e indicatori. */
export function ResultsCarousel() {
  const { results } = site;
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "16") : 1;
    setIndex(Math.min(results.items.length - 1, Math.round(el.scrollLeft / step)));
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, [results.items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "16");
    el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: "smooth" });
  };

  const arrow = "grid h-12 w-12 place-items-center rounded-full border border-line-strong text-fg transition-[border-color,color,opacity,box-shadow] duration-[var(--dur-base)] ease-out-expo enabled:hover:border-gold-300 enabled:hover:text-gold-300 enabled:hover:shadow-glow-gold disabled:opacity-30";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={results.title.replace(/[[\]]/g, "")}>
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={results.title.replace(/[[\]]/g, "")}
        className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-[var(--gutter)] px-[var(--gutter)] pb-2 focus-visible:outline-offset-[-2px] sm:gap-5 lg:mx-0 lg:-mr-[var(--gutter)] lg:px-0 lg:pr-[var(--gutter)]"
      >
        {results.items.map((item, i) => (
          <li
            key={item.client}
            aria-roledescription="slide"
            aria-label={`${i + 1} di ${results.items.length}`}
            className="w-[min(84vw,23rem)] shrink-0 snap-start sm:w-[23rem]"
          >
            <Card item={item} />
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-center justify-between">
        <div className="flex items-center gap-2" aria-hidden="true">
          {results.items.map((item, i) => (
            <span
              key={item.client}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-[var(--dur-slow)] ease-out-expo",
                i === index ? "w-8 bg-gold-300" : "w-1.5 bg-line-strong",
              )}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button type="button" className={arrow} onClick={() => go(-1)} disabled={edges.start} aria-label={results.prev}>
            <Icon name="chevron-left" className="h-5 w-5" />
          </button>
          <button type="button" className={arrow} onClick={() => go(1)} disabled={edges.end} aria-label={results.next}>
            <Icon name="chevron-right" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
