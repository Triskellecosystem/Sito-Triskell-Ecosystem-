"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/content/site";
import { HeroSymbol } from "@/components/brand/HeroSymbol";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface TileProps {
  className: string;
  delay: string;
  duration: string;
  children: React.ReactNode;
  rotate: string;
}

function Tile({ className, delay, duration, rotate, children }: TileProps) {
  return (
    <div className={cn("absolute", className)}>
      <div className="animate-[float-y_var(--dur)_ease-in-out_infinite]" style={{ "--dur": duration, animationDelay: delay } as React.CSSProperties}>
        <div className="glass grid h-[4.25rem] w-[4.25rem] place-items-center rounded-2xl text-azure-300 sm:h-20 sm:w-20" style={{ transform: rotate }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function IconTile({ name }: { name: IconName }) {
  return <Icon name={name} className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.5} />;
}

/** Composizione visiva dell'hero: medaglione, piattaforma luminosa, tile glass con parallax. */
export function HeroVisual() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const yMedallion = useTransform(scrollY, [0, 800], reduced ? [0, 0] : [0, -70]);
  const yTilesA = useTransform(scrollY, [0, 800], reduced ? [0, 0] : [0, -130]);
  const yTilesB = useTransform(scrollY, [0, 800], reduced ? [0, 0] : [0, -40]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      {/* Alone */}
      <div
        aria-hidden="true"
        className="absolute -inset-[18%] animate-[glow-pulse_6s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,var(--glow-cobalt)_0%,transparent_62%)]"
      />

      {/* Piattaforma luminosa */}
      <svg aria-hidden="true" viewBox="0 0 460 100" className="absolute -bottom-[3%] left-1/2 w-[96%] -translate-x-1/2 overflow-visible">
        <defs>
          <radialGradient id="plat-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="var(--color-gold-300)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--color-gold-300)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="plat-ring" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-gold-600)" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="var(--color-gold-100)" />
            <stop offset="1" stopColor="var(--color-gold-600)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <ellipse cx="230" cy="50" rx="200" ry="34" fill="url(#plat-glow)" />
        <ellipse cx="230" cy="50" rx="218" ry="40" fill="none" stroke="var(--color-azure-glow)" strokeOpacity="0.45" strokeWidth="1.5" />
        <ellipse cx="230" cy="50" rx="172" ry="29" fill="none" stroke="url(#plat-ring)" strokeWidth="2" />
        <ellipse cx="230" cy="50" rx="120" ry="19" fill="none" stroke="url(#plat-ring)" strokeWidth="1.5" strokeOpacity="0.8" />
      </svg>

      {/* Medaglione */}
      <motion.div style={{ y: yMedallion }} className="absolute inset-[9%] bottom-[12%]">
        <HeroSymbol label={site.hero.symbolAlt} />
      </motion.div>

      {/* Tile glass fluttuanti */}
      <motion.div style={{ y: yTilesA }} className="absolute inset-0">
        <Tile className="left-[2%] top-[16%]" delay="0s" duration="7s" rotate="perspective(500px) rotateY(18deg) rotateX(6deg)">
          <div className="flex h-9 items-end gap-1" aria-hidden="true">
            {[40, 62, 50, 82, 100].map((h, i) => (
              <span key={i} className="w-1.5 rounded-sm bg-azure-300" style={{ height: `${h}%`, opacity: 0.55 + i * 0.1 }} />
            ))}
          </div>
        </Tile>
        <Tile className="right-[1%] top-[7%]" delay="-2s" duration="8s" rotate="perspective(500px) rotateY(-18deg) rotateX(6deg)">
          <span className="font-display text-xl font-bold tracking-tight text-azure-300 sm:text-2xl">AI</span>
        </Tile>
      </motion.div>
      <motion.div style={{ y: yTilesB }} className="absolute inset-0">
        <Tile className="left-[-3%] top-[56%]" delay="-4s" duration="9s" rotate="perspective(500px) rotateY(16deg) rotateX(-4deg)">
          <IconTile name="users" />
        </Tile>
        <Tile className="right-[-2%] top-[52%]" delay="-1s" duration="7.5s" rotate="perspective(500px) rotateY(-16deg) rotateX(-4deg)">
          <IconTile name="target" />
        </Tile>
      </motion.div>
    </div>
  );
}
