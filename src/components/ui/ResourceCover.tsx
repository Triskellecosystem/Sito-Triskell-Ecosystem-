import Image from "next/image";

export type CoverKind = "vibe" | "codes" | "gpt56" | "gpt55" | "cowork" | "artifacts" | "crowd" | "flows" | "skills" | "fable";

/**
 * Copertine delle risorse: immagini 1920×1080 (in `public/risorse`), nello stile cinematografico scuro con luce dorata
 * delle copertine del blog, una diversa per ogni tema e senza testo (il titolo sta nella scheda, sotto).
 */
export function ResourceCover({ kind }: { kind: CoverKind }) {
  return <Image src={`/risorse/${kind}.webp`} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover" />;
}
