"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import type { Service } from "@/content/site";
import { cn } from "@/lib/cn";
import { CountUp } from "@/components/motion/CountUp";
import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";
import { ServiceVisual } from "./ServiceVisual";

/** Tile della bento grid: icona, titolo, micro-visual animato, 1 metrica. Spotlight al passaggio del cursore. */
export function ServiceTile({ service, className }: { service: Service; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const { featured } = service;

  return (
    <div ref={ref} data-inview={inView || undefined} className={cn("group/tile h-full", className)}>
      <Spotlight
        className={cn(
          "flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-[border-color,transform,box-shadow] duration-[var(--dur-base)] ease-out-expo",
          "hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-[0_24px_60px_-28px_rgb(247_200_92/0.35)] sm:p-7",
          featured && "bg-[linear-gradient(155deg,var(--color-surface-2)_0%,var(--color-surface)_60%)]",
        )}
      >
        <div className="relative z-[2] flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold-400/35 bg-gold-300/10 text-gold-300 transition-colors duration-[var(--dur-base)] group-hover/tile:bg-gold-300/20">
              <Icon name={service.icon} className="h-6 w-6" strokeWidth={1.6} />
            </span>
            <Icon
              name="arrow-up-right"
              className="h-5 w-5 text-fg-3 transition-[transform,color] duration-[var(--dur-base)] ease-out-expo group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5 group-hover/tile:text-gold-300"
            />
          </div>

          <div className={cn("my-6 min-h-[5.5rem] flex-1", featured ? "lg:min-h-[9rem] lg:max-h-[20rem]" : "max-h-[7rem]")}>
            <ServiceVisual kind={service.visual} />
          </div>

          <div>
            <h3 className="text-h3 text-fg">{service.title}</h3>
            <p className="mt-3 flex items-baseline gap-2.5">
              <CountUp {...service.metric} className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.03em] text-gold" />
              <span className="text-small text-fg-2">{service.metric.label}</span>
            </p>
          </div>
        </div>
      </Spotlight>
    </div>
  );
}
