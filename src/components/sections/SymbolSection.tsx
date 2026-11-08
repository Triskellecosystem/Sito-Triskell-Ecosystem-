"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

const sizes = "(min-width: 1024px) 30rem, 90vw";
/** Livelli del medaglione dall'alto in basso (come nel video): spirali in un pezzo, disco blu, cerchio oro. */
const LAYERS = [
  { src: "/brand/triskell-layer-coils.png", z: 170, ly: "15%", base: "none" },
  { src: "/brand/triskell-layer-disc.png", z: 0, ly: "50%", base: "brightness(1.9) saturate(1.5)" },
  { src: "/brand/triskell-layer-ring.png", z: -170, ly: "85%", base: "none" },
] as const;
const ICONS: IconName[] = ["cpu", "users", "sparkles"];
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Il simbolo, in 3D, legato allo scroll: la sezione resta ferma mentre scorri; più scendi, più il medaglione si
 * inclina e si scompone nei suoi tre livelli (spirali, disco, cerchio). Man mano che si separano compaiono, uno
 * dopo l'altro, Mente, Corpo e Anima: il livello corrispondente si accende. Tornando su si ricompone.
 * Il mouse inclina la scena. Con reduced motion: vista scomposta statica, tutto visibile.
 */
export function SymbolSection() {
  const { symbol } = site;
  const [active, setActive] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    const list = listRef.current;
    if (!track || !scene || !list) return;
    const items = Array.from(list.children) as HTMLElement[];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scene.style.setProperty("--e", "0.9");
      items.forEach((it) => it.style.setProperty("--li", "1"));
      return;
    }
    let raf = 0;
    let near = false;
    let current: number | null = null;
    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / span));
      // scomposizione progressiva lungo tutta la corsa (si ricompone solo scrollando all'indietro)
      const e = smooth(0.04, 0.8, p);
      scene.style.setProperty("--e", e.toFixed(3));
      let act: number | null = null;
      items.forEach((it, i) => {
        const li = smooth(0.34 + i * 0.17, 0.5 + i * 0.17, p);
        it.style.setProperty("--li", li.toFixed(3));
        if (li > 0.6) act = i;
      });
      if (act !== current) {
        current = act;
        setActive(act);
      }
    };
    const onScroll = () => {
      if (near && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        near = !!entry?.isIntersecting;
        if (near) onScroll();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(track);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = sceneRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty("--tx", `${(nx * 10).toFixed(2)}deg`);
    el.style.setProperty("--ty", `${(-ny * 8).toFixed(2)}deg`);
  };
  const onPointerLeave = () => {
    sceneRef.current?.style.setProperty("--tx", "0deg");
    sceneRef.current?.style.setProperty("--ty", "0deg");
  };

  return (
    <Section id={symbol.id} labelledBy="symbol-title" className="pb-0">
      <TechBackdrop tone="mixed" rich />
      <SectionHeading id="symbol-title" overline={symbol.overline} title={symbol.title} line={symbol.line} align="center" />

      <div ref={trackRef} className="sym-track mt-6">
        <div className="sym sym-sticky" data-active={active ?? undefined}>
          <div className="grid w-full items-center gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <div ref={sceneRef} className="sym3d" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
                <div className="relative mx-auto w-full max-w-[34rem]" role="img" aria-label={site.hero.symbolAlt}>
                  <div className="relative mx-auto aspect-square w-[min(100%,19rem)] sm:w-[calc(100%-9.5rem)] lg:w-[calc(100%-9.5rem)]">
                    <div className="sym3d-persp" aria-hidden="true">
                      <div className="sym3d-tilt">
                        <div className="sym3d-scene">
                          <div className="sym3d-sway">
                            <div className="sym3d-layer" style={{ "--z": -260 } as CSSVars}>
                              <div className="absolute inset-[-6%] rounded-full bg-[radial-gradient(circle,rgb(0_0_0/0.55),transparent_62%)]" />
                            </div>
                            {LAYERS.map((l, i) => (
                              <Image
                                key={l.src}
                                src={l.src}
                                alt=""
                                width={640}
                                height={640}
                                sizes={sizes}
                                data-i={i}
                                className="sym3d-layer"
                                style={{ "--z": l.z, "--base-f": l.base } as CSSVars}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 hidden sm:block" aria-hidden="true">
                    {symbol.layers.map((l, i) => (
                      <li key={l.title} data-i={i} className="sym3d-label flex w-[9rem] items-start gap-2" style={{ "--ly": LAYERS[i]!.ly } as CSSVars}>
                        <span className="mt-[0.45rem] h-px w-5 shrink-0 bg-gold-300/70" />
                        <span className="font-display text-[0.9375rem] font-semibold leading-tight text-fg-2 sym3d-label-title">{l.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <ul ref={listRef} className="lg:col-span-6">
              {symbol.layers.map((l, i) => (
                <li
                  key={l.name}
                  data-active={active === i ? "" : undefined}
                  className={cn(
                    "sym-item relative mb-3 flex items-start gap-4 rounded-2xl border bg-night/60 p-4 backdrop-blur-sm sm:gap-5 sm:p-5",
                    active === i ? "border-gold-300/70 shadow-[0_0_40px_-12px_rgb(247_200_92/0.55)]" : "border-line",
                  )}
                >
                  <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-colors duration-[var(--dur-base)]", active === i ? "border-gold-300 bg-gold-300 text-night" : "border-gold-400/35 bg-gold-300/10 text-gold-300")}>
                    <Icon name={ICONS[i] ?? "sparkles"} className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="flex flex-wrap items-baseline gap-x-3 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold leading-none tracking-[-0.03em] text-fg">
                      <span className={active === i ? "text-gold" : undefined}>{l.name}</span>
                      <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-fg-3">{l.title}</span>
                    </h3>
                    <p className="mt-2 text-[1rem] leading-snug text-fg-2">{l.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
