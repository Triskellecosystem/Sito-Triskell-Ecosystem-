"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

export interface BlogCardData {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  minutes: number;
  date: string;
  featured: boolean;
}

/** Filtri per categoria + griglia di card. L'articolo in evidenza compare per primo, più grande. */
export function BlogGrid({ posts, categories }: { posts: BlogCardData[]; categories: Array<{ key: string; label: string }> }) {
  const [cat, setCat] = useState("all");
  const list = posts.filter((p) => cat === "all" || p.category === cat);
  const featured = cat === "all" ? list.find((p) => p.featured) : undefined;
  const rest = featured ? list.filter((p) => p !== featured) : list;

  return (
    <div>
      <div role="group" aria-label="Filtra per categoria" className="flex flex-wrap justify-center gap-2.5">
        {[{ key: "all", label: "Tutti" }, ...categories].map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={cat === c.key}
            onClick={() => setCat(c.key)}
            className={cn(
              "rounded-full border px-5 py-2 text-small font-semibold transition-colors",
              cat === c.key ? "border-gold-300 bg-gold-300 text-night" : "border-line-strong text-fg-2 hover:border-gold-400/60 hover:text-gold-200",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {featured && (
        <Link href={`/blog/${featured.slug}`} className="group mt-10 grid overflow-hidden rounded-[var(--radius-card)] border border-gold-400/30 bg-surface/60 transition-colors hover:border-gold-300/70 lg:grid-cols-2">
          <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[22rem]">
            <Image src={featured.cover} alt="" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" priority />
          </div>
          <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
            <p className="flex items-center gap-3 text-overline font-semibold uppercase text-gold-400 tracking-[var(--text-overline--letter-spacing)]">
              <span className="rounded-full bg-gold-300 px-3 py-1 text-night">In evidenza</span>
              {featured.categoryLabel}
            </p>
            <h3 className="text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-fg group-hover:text-gold-200">{featured.title}</h3>
            <p className="text-body text-fg-2">{featured.excerpt}</p>
            <p className="text-small text-fg-3">
              {featured.date} · {featured.minutes} min di lettura
            </p>
          </div>
        </Link>
      )}

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/60 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold-400/60">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={p.cover} alt="" fill sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-overline font-semibold uppercase text-gold-400 tracking-[var(--text-overline--letter-spacing)]">{p.categoryLabel}</p>
                <h3 className="text-[1.1875rem] font-bold leading-snug tracking-[-0.02em] text-fg group-hover:text-gold-200">{p.title}</h3>
                <p className="line-clamp-3 text-small text-fg-2">{p.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-3 text-small text-fg-3">
                  <span>
                    {p.date} · {p.minutes} min
                  </span>
                  <Icon name="arrow-right" className="h-4 w-4 text-gold-300 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="mt-10 text-center text-fg-2">Nessun articolo in questa categoria.</p>}
    </div>
  );
}
