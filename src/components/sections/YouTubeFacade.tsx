"use client";

import Image from "next/image";
import { useState } from "react";
import { site, type Tutorial } from "@/content/site";
import { cn } from "@/lib/cn";
import { TriskellMark } from "@/components/brand/TriskellMark";
import { Icon } from "@/components/ui/Icon";

interface FacadeProps {
  tutorial: Tutorial;
  className?: string;
  size?: "lg" | "sm";
}

/**
 * YouTube "facade": poster leggero (nessun iframe all'avvio). L'iframe youtube-nocookie
 * viene creato solo al click. Senza ID mostra un poster "In arrivo" non cliccabile.
 */
export function YouTubeFacade({ tutorial, className, size = "lg" }: FacadeProps) {
  const [playing, setPlaying] = useState(false);
  const { academy } = site;
  const id = tutorial.youtubeId;
  const big = size === "lg";

  return (
    <div className={cn("group/yt relative aspect-video overflow-hidden rounded-card border border-line-strong bg-night-raised", className)}>
      {playing && id ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={tutorial.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <>
          {id ? (
            <Image
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover transition-transform duration-[var(--dur-slow)] ease-out-expo group-hover/yt:scale-105"
            />
          ) : (
            <>
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-cobalt-700),var(--color-night-glow)_55%,var(--color-surface))]" />
              <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
              <TriskellMark flat strokeWidth={1.4} className="absolute -right-6 -bottom-8 h-3/4 w-auto opacity-25" />
            </>
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
            <div className="min-w-0">
              <span className="rounded-full bg-night/70 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-300 backdrop-blur">
                {tutorial.tag}
              </span>
              <p className={cn("mt-2 font-display font-semibold leading-tight tracking-tight text-fg", big ? "text-h3" : "text-[1.0625rem]")}>{tutorial.title}</p>
            </div>
            {id ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`${academy.play}: ${tutorial.title}`}
                className="group/play grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night shadow-glow-gold transition-transform duration-[var(--dur-base)] ease-out-expo hover:scale-110 active:scale-95 after:absolute after:inset-0 after:content-['']"
              >
                <Icon name="play" className="ml-0.5 h-6 w-6" fill="currentColor" />
              </button>
            ) : (
              <span className="shrink-0 rounded-full border border-line-strong bg-night/70 px-3.5 py-1.5 text-small font-medium text-fg-2 backdrop-blur">{academy.soon}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
