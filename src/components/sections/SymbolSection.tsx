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
  { src: "/brand/triskell-layer-coils.png", z: 170, zb: 2, ly: "15%", base: "none" },
  { src: "/brand/triskell-layer-disc.png", z: 0, zb: 1, ly: "50%", base: "brightness(1.9) saturate(1.5)" },
  { src: "/brand/triskell-layer-ring.png", z: -170, zb: 0, ly: "85%", base: "none" },
] as const;
/** Le tre spirali come settori conici (gradi in senso orario da "ore 12"); il nucleo centrale resta escluso. */
const SECTORS = [
  { from: 320, span: 106 },
  { from: 66, span: 135 },
  { from: 201, span: 119 },
] as const;
const CORE = { cx: "50.5%", cy: "48.5%", r: "14%" } as const;
const ICONS: IconName[] = ["cpu", "users", "sparkles", "workflow", "rocket"];
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Il simbolo, in 3D, legato allo scroll. Fin da subito il logo è intero e le sue tre spirali si illuminano una
 * alla volta: Mente, Corpo, Anima. Scendendo il medaglione si inclina e si scompone (spirali, circuito, cerchio):
 * quando si staccano, anche il circuito e il cerchio si illuminano con il loro significato. Risalendo si ricompone.
 * Il mouse inclina la scena. Con reduced motion: vista scomposta statica, tutto visibile.
 */
export function SymbolSection() {
  const { symbol } = site;
  const [spiral, setSpiral] = useState(0);
  const [stage, setStage] = useState(0);
  const [live, setLive] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const items = [
    ...symbol.spirals.map((s) => ({ name: s.name, tag: symbol.layers[0]!.name, text: s.text })),
    { name: symbol.layers[1]!.name, tag: "Connessione", text: symbol.layers[1]!.text },
    { name: symbol.layers[2]!.name, tag: "Continuità", text: symbol.layers[2]!.text },
  ];
  const active = stage === 0 ? spiral : 2 + stage;

  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    const list = listRef.current;
    if (!track || !scene || !list) return;
    const rows = Array.from(list.children) as HTMLElement[];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scene.style.setProperty("--e", "0.9");
      rows.forEach((it) => it.style.setProperty("--li", "1"));
      return;
    }
    let raf = 0;
    let near = false;
    let currentStage = 0;
    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / span));
      scene.style.setProperty("--e", smooth(0.04, 0.8, p).toFixed(3));
      // Mente, Corpo, Anima sono visibili subito; circuito e cerchio arrivano quando si staccano
      rows.forEach((it, i) => it.style.setProperty("--li", (i < 3 ? 1 : smooth(0.38 + (i - 3) * 0.25, 0.48 + (i - 3) * 0.25, p)).toFixed(3)));
      const st = p >= 0.72 ? 2 : p >= 0.46 ? 1 : 0;
      if (st !== currentStage) {
        currentStage = st;
        setStage(st);
      }
    };
    const onScroll = () => {
      if (near && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        near = !!entry?.isIntersecting;
        setLive(near);
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

  // le tre spirali si illuminano a turno finché siamo nella fase "spirali"
  useEffect(() => {
    if (!live || stage !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setSpiral((s) => (s + 1) % 3), 1900);
    return () => window.clearInterval(t);
  }, [live, stage]);

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

      <div ref={trackRef} className="sym-track mt-4">
        <div className="sym sym-sticky" data-active={active} data-stage={stage}>
          <div className="grid w-full items-center gap-4 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <div ref={sceneRef} className="sym3d" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
                <div className="relative mx-auto w-full max-w-[34rem]" role="img" aria-label={site.hero.symbolAlt}>
                  <div className="relative mx-auto aspect-square w-[min(72vw,15rem)] sm:w-[calc(100%-9.5rem)] lg:w-[calc(100%-9.5rem)]">
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
                                loading="eager"
                                fetchPriority="low"
                                data-i={i}
                                className="sym3d-layer"
                                style={{ "--z": l.z, "--zb": l.zb, "--base-f": l.base } as CSSVars}
                              />
                            ))}
                            {/* le tre spirali una per una: Mente, Corpo, Anima */}
                            {SECTORS.map((sec, i) => {
                              const mask = [
                                `conic-gradient(from ${sec.from}deg at 50% 50%, #000 0deg ${sec.span}deg, transparent ${sec.span}deg)`,
                                `radial-gradient(circle at ${CORE.cx} ${CORE.cy}, transparent 0 ${CORE.r}, #000 calc(${CORE.r} + 0.6%))`,
                              ].join(", ");
                              return (
                                <Image
                                  key={sec.from}
                                  src="/brand/triskell-layer-coils.png"
                                  alt=""
                                  width={640}
                                  height={640}
                                  sizes={sizes}
                                  loading="eager"
                                  fetchPriority="low"
                                  data-i={i}
                                  className="sym3d-layer sym3d-spiral"
                                  style={{ "--z": 172, "--zb": 3, maskImage: mask, WebkitMaskImage: mask, maskComposite: "intersect", WebkitMaskComposite: "source-in" } as CSSVars}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 hidden sm:block" aria-hidden="true">
                    {symbol.layers.map((l, i) => (
                      <li key={l.name} data-i={i} className="sym3d-label flex w-[9rem] items-start gap-2" style={{ "--ly": LAYERS[i]!.ly } as CSSVars}>
                        <span className="mt-[0.45rem] h-px w-5 shrink-0 bg-gold-300/70" />
                        <span className="sym3d-label-title font-display text-[0.9375rem] font-semibold leading-tight text-fg-2">{l.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <ul ref={listRef} className="lg:col-span-6">
              {items.map((it, i) => (
                <li
                  key={it.name}
                  data-active={active === i ? "" : undefined}
                  className={cn(
                    "sym-item relative mb-2 flex items-start gap-3 rounded-2xl border bg-night/60 p-3 backdrop-blur-sm sm:mb-3 sm:gap-5 sm:p-5",
                    active === i ? "border-gold-300/70 shadow-[0_0_40px_-12px_rgb(247_200_92/0.55)]" : "border-line",
                  )}
                >
                  <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-colors duration-[var(--dur-base)] sm:h-12 sm:w-12 sm:rounded-2xl", active === i ? "border-gold-300 bg-gold-300 text-night" : "border-gold-400/35 bg-gold-300/10 text-gold-300")}>
                    <Icon name={ICONS[i] ?? "sparkles"} className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="flex flex-wrap items-baseline gap-x-3 font-display text-[clamp(1.25rem,1.05rem+1vw,2rem)] font-bold leading-none tracking-[-0.03em] text-fg">
                      <span className={active === i ? "text-gold" : undefined}>{it.name}</span>
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-fg-3 sm:text-[0.75rem]">{it.tag}</span>
                    </h3>
                    <p className={cn("mt-1.5 text-[0.9375rem] leading-snug text-fg-2 sm:mt-2 sm:text-[1rem]", active !== i && "max-lg:hidden")}>{it.text}</p>
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
