"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "./Reveal";

interface SplitRevealProps {
  /** Testo del titolo. Le parti tra [parentesi quadre] diventano oro. */
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  delay?: number;
}

interface Word {
  text: string;
  gold: boolean;
}

function parse(text: string): Word[] {
  const out: Word[] = [];
  const re = /\[([^\]]+)\]|([^[\]\s]+)/g;
  let m: RegExpExecArray | null;
  let prevEnd = -1;
  while ((m = re.exec(text))) {
    const glued = m.index === prevEnd && out.length > 0;
    prevEnd = m.index + m[0].length;
    if (m[1]) {
      m[1].split(/\s+/).forEach((w, i) => {
        if (i === 0 && glued) out[out.length - 1]!.text += w;
        else out.push({ text: w, gold: true });
      });
    } else if (m[2]) {
      // punteggiatura attaccata a una parte in [oro]: resta nello stesso span
      if (glued) out[out.length - 1]!.text += m[2];
      else out.push({ text: m[2], gold: false });
    }
  }
  return out;
}

const parent = {
  hidden: {},
  show: (delay: number) => ({ transition: { staggerChildren: 0.055, delayChildren: delay } }),
};
const child = {
  hidden: { y: "108%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

/** Titolo con reveal a maschera per parola. Parti in [oro] evidenziate. */
export function SplitReveal({ text, as = "h2", className, id, delay = 0 }: SplitRevealProps) {
  const reduced = useReducedMotion();
  const words = parse(text);
  const Tag = motion[as] as typeof motion.h2;

  return (
    <Tag
      id={id}
      className={className}
      variants={parent}
      custom={delay}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {words.map((w, i) => (
        <span key={`${w.text}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]">
            <motion.span variants={child} className={w.gold ? "text-gold inline-block" : "inline-block"}>
              {w.text}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
