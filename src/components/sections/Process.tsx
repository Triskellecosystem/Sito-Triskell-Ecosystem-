"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { onLenis } from "@/lib/lenis";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { StepVisual } from "./StepVisual";

const { process: content } = site;
const N = content.steps.length;

/**
 * Come lavoriamo — sezione PINNED con scrub (GSAP ScrollTrigger) da 768px in su:
 * una linea oro si riempie e accende i 4 nodi mentre il pannello centrale cambia step.
 * Sotto i 768px diventa una timeline verticale non pinned (la linea si riempie con lo scroll).
 * GSAP viene caricato dinamicamente solo se serve.
 */
export function Process() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Array<HTMLLIElement | null>>([]);
  const panelsRef = useRef<Array<HTMLDivElement | null>>([]);

  /* --- Desktop: pin + scrub --- */
  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    let killed = false;
    let cleanup: (() => void) | undefined;

    const setActive = (idx: number) => {
      nodesRef.current.forEach((el, i) => el?.setAttribute("data-state", i < idx ? "done" : i === idx ? "active" : "todo"));
      panelsRef.current.forEach((el, i) => el?.setAttribute("data-state", i === idx ? "active" : i < idx ? "past" : "next"));
    };

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (killed || !stageRef.current || !fillRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      // Lenis → ScrollTrigger
      let offLenis: (() => void) | undefined;
      const unsub = onLenis((lenis) => {
        offLenis?.();
        offLenis = lenis ? lenis.on("scroll", ScrollTrigger.update) : undefined;
      });

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: `+=${N * 85}%`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(N - 1, Math.floor(self.progress * N))),
          },
        });
        // la linea raggiunge il nodo i esattamente quando lo step i si attiva (progress = i / N)
        tl.fromTo(fillRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: N - 1 }, 0);
        tl.to({}, { duration: 1 }); // pausa di lettura sull'ultimo step
        setActive(0);
      }, stageRef);

      cleanup = () => {
        unsub();
        offLenis?.();
        ctx.revert();
      };
      if (killed) cleanup();
    })();

    return () => {
      killed = true;
      cleanup?.();
    };
  }, [reduced]);

  /* --- Mobile: la linea verticale si riempie con lo scroll --- */
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 65%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <section id={content.id} aria-labelledby="process-title" className="relative scroll-mt-[72px]">
      {/* ---- Desktop / tablet: stage pinned ---- */}
      <div ref={stageRef} className="relative hidden min-h-svh flex-col justify-center overflow-hidden py-[clamp(5rem,10vh,7rem)] md:flex">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_50%,#000,transparent)]" />
        <div className="container-x relative">
          <SectionHeading id="process-title" overline={content.overline} title={content.title} line={content.line} />

          {/* Linea di progresso con 4 nodi */}
          <div className="relative mt-[clamp(2rem,6vh,4rem)]">
            <div aria-hidden="true" className="absolute left-0 right-0 top-[1.375rem] h-[3px] rounded-full bg-line-strong" />
            <div aria-hidden="true" className="absolute left-0 right-0 top-[1.375rem] h-[3px] overflow-hidden rounded-full">
              <div
                ref={fillRef}
                className={cn("h-full origin-left rounded-full bg-[image:var(--gradient-gold-btn)] shadow-glow-gold", reduced && "scale-x-100")}
                style={{ transform: reduced ? undefined : "scaleX(0)" }}
              />
            </div>
            <ol className="relative grid grid-cols-4">
              {content.steps.map((step, i) => (
                <li
                  key={step.title}
                  ref={(el) => {
                    nodesRef.current[i] = el;
                  }}
                  data-state={reduced ? "done" : i === 0 ? "active" : "todo"}
                  className="group/node flex flex-col items-start"
                  style={{ alignItems: i === 0 ? "flex-start" : i === N - 1 ? "flex-end" : "center" }}
                >
                  <span
                    className={cn(
                      "relative grid h-11 w-11 place-items-center rounded-full border-2 border-line-strong bg-night font-display text-[0.9375rem] font-bold text-fg-3",
                      "transition-[transform,background-color,border-color,color,box-shadow] duration-[var(--dur-slow)] ease-out-expo",
                      "group-data-[state=done]/node:border-gold-300 group-data-[state=done]/node:text-gold-300",
                      "group-data-[state=active]/node:scale-110 group-data-[state=active]/node:border-gold-200 group-data-[state=active]/node:bg-gold-300 group-data-[state=active]/node:text-night group-data-[state=active]/node:shadow-glow-gold",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "mt-3 font-display text-small font-semibold text-fg-3 transition-colors duration-[var(--dur-base)]",
                      "group-data-[state=done]/node:text-fg-2 group-data-[state=active]/node:text-fg",
                    )}
                  >
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Pannelli: uno alla volta (scrub) */}
          <div className={cn("relative mt-[clamp(1.5rem,5vh,3rem)]", !reduced && "h-[clamp(11rem,28vh,17rem)]")}>
            {content.steps.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => {
                  panelsRef.current[i] = el;
                }}
                data-state={reduced ? (i === N - 1 ? "active" : "past") : i === 0 ? "active" : "next"}
                className={cn(
                  "grid items-center gap-8 rounded-card border border-line bg-[linear-gradient(135deg,var(--color-surface-2),var(--color-surface))] p-7 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:p-10",
                  reduced
                    ? "relative mb-4"
                    : [
                        "absolute inset-0 pointer-events-none translate-y-8 opacity-0 transition-[opacity,transform] duration-[var(--dur-slow)] ease-out-expo",
                        "data-[state=active]:pointer-events-auto data-[state=active]:translate-y-0 data-[state=active]:opacity-100",
                        "data-[state=past]:-translate-y-6",
                      ].join(" "),
                )}
              >
                <div>
                  <div className="flex items-center gap-5">
                    <p className="font-display text-[clamp(2.75rem,2rem+3vw,4.75rem)] font-bold leading-none tracking-[-0.05em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="flex items-center gap-3 text-h2 text-fg">
                      <Icon name={step.icon} className="h-7 w-7 shrink-0 text-gold-300" strokeWidth={1.5} />
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-md text-lead text-fg-2">{step.text}</p>
                </div>
                <div className="hidden h-full max-h-56 lg:block">
                  <StepVisual step={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Mobile: timeline verticale ---- */}
      <div className="py-[clamp(4.5rem,3rem+6vw,9rem)] md:hidden">
        <div className="container-x">
          <SectionHeading id="process-title-m" overline={content.overline} title={content.title} line={content.line} />
          <ol ref={listRef} className="relative mt-12 space-y-8 pl-10">
            <span aria-hidden="true" className="absolute bottom-2 left-[1.0625rem] top-2 w-[3px] rounded-full bg-line-strong" />
            <motion.span
              aria-hidden="true"
              style={{ scaleY: reduced ? 1 : scaleY }}
              className="absolute bottom-2 left-[1.0625rem] top-2 w-[3px] origin-top rounded-full bg-gold-300 shadow-glow-gold"
            />
            {content.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="absolute -left-10 top-0 grid h-9 w-9 place-items-center rounded-full border-2 border-gold-300 bg-night font-display text-small font-bold text-gold-300">
                  {i + 1}
                </span>
                <Reveal y={18}>
                  <div className="rounded-card border border-line bg-surface p-5">
                    <div className="mb-4 h-28 opacity-90">
                      <StepVisual step={i} />
                    </div>
                    <h3 className="flex items-center gap-2.5 text-h3 text-fg">
                      <Icon name={step.icon} className="h-5 w-5 text-gold-300" />
                      {step.title}
                    </h3>
                    <p className="mt-2 text-body text-fg-2">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
