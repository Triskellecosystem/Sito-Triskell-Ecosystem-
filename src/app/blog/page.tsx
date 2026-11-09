import type { Metadata } from "next";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CATEGORY_LABELS, CATEGORY_ORDER, formatDate, posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Approfondimenti su AI, business e innovazione direttamente dal cuore di Triskell Ecosystem.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const cards = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    cover: p.cover,
    category: p.category,
    categoryLabel: CATEGORY_LABELS[p.category] ?? p.category,
    tags: p.tags,
    minutes: p.minutes,
    date: formatDate(p.publishedAt, { day: "numeric", month: "short", year: "numeric" }),
    featured: p.featured,
  }));
  const categories = CATEGORY_ORDER.filter((k) => posts.some((p) => p.category === k)).map((k) => ({ key: k, label: CATEGORY_LABELS[k] ?? k }));
  return (
    <>
      <PageHero
        overline="Blog Triskell"
        title="Idee che costruiscono il [futuro]"
        line="Approfondimenti su AI, business e innovazione direttamente dal cuore di Triskell Ecosystem."
        crumbs={[{ label: "Blog" }]}
      />
      <Section id="articoli" labelledBy="articoli-title" className="!pt-6">
        <h2 id="articoli-title" className="sr-only">Tutti gli articoli</h2>
        <BlogGrid posts={cards} categories={categories} />
      </Section>
    </>
  );
}
