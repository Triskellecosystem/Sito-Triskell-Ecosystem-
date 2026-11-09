import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CATEGORY_LABELS, formatDate, getPost, posts, renderMarkdown } from "@/lib/blog";
import { site } from "@/content/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.seoTitle || p.title,
    description: p.seoDescription || p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, images: [p.cover], publishedTime: p.publishedAt },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const html = renderMarkdown(post.content);
  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const more = related.length >= 3 ? related : [...related, ...posts.filter((p) => p.slug !== post.slug && !related.includes(p))].slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${site.brand.url}${post.cover}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Triskell Ecosystem" },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="relative isolate overflow-hidden pb-10 pt-[calc(var(--header-h)+clamp(2rem,5vh,4rem))]">
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,#000,transparent_90%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[image:var(--gradient-bg-hero)]" />
        <div className="container-x mx-auto max-w-3xl">
          <nav aria-label="Percorso" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-small text-fg-3">
              <li><Link href="/" className="transition-colors hover:text-gold-300">Home</Link></li>
              <li className="flex items-center gap-2"><Icon name="chevron-right" className="h-3.5 w-3.5" /><Link href="/blog" className="transition-colors hover:text-gold-300">Blog</Link></li>
            </ol>
          </nav>
          <p className="mb-4 text-overline font-semibold uppercase text-gold-400 tracking-[var(--text-overline--letter-spacing)]">{CATEGORY_LABELS[post.category] ?? post.category}</p>
          <h1 className="text-balance text-[clamp(1.875rem,1.2rem+3vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.035em] text-fg">{post.title}</h1>
          <p className="mt-5 text-lead text-fg-2">{post.excerpt}</p>
          <p className="mt-6 text-small text-fg-3">
            {post.author} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.minutes} min di lettura
          </p>
        </div>
      </header>

      <div className="container-x mx-auto max-w-4xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] border border-line">
          <Image src={post.cover} alt="" fill sizes="(min-width:1024px) 896px, 100vw" className="object-cover" priority />
        </div>
      </div>

      <div className="container-x mx-auto max-w-3xl py-[clamp(2.5rem,5vw,4rem)]">
        <div className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />
        {post.tags.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full border border-line-strong px-3.5 py-1.5 text-small text-fg-2">#{t}</li>
            ))}
          </ul>
        )}
      </div>

      <section aria-label="Altri articoli" className="border-t border-line py-[clamp(3rem,6vw,5rem)]">
        <div className="container-x">
          <h2 className="mb-8 text-h3 font-bold tracking-tight text-fg">Continua a leggere</h2>
          <ul className="grid gap-5 md:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/60 transition-colors hover:border-gold-400/60">
                  <div className="relative aspect-[16/9]"><Image src={p.cover} alt="" fill sizes="(min-width:768px) 360px, 100vw" className="object-cover" /></div>
                  <div className="p-5">
                    <p className="text-overline font-semibold uppercase text-gold-400 tracking-[var(--text-overline--letter-spacing)]">{CATEGORY_LABELS[p.category] ?? p.category}</p>
                    <h3 className="mt-2 font-bold leading-snug text-fg group-hover:text-gold-200">{p.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center"><Button href="/blog" variant="secondary" icon="chevron-left" iconPosition="start">Tutti gli articoli</Button></div>
        </div>
      </section>
    </article>
  );
}
