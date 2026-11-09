import { Marked, type Tokens } from "marked";
import data from "@/content/blog-data.json";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  category: string;
  tags: string[];
  author: string;
  minutes: number;
  seoTitle: string | null;
  seoDescription: string | null;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  ai: "AI",
  business: "Business",
  "vibe-coding": "Vibe Coding",
  ecosistema: "Ecosistema",
  tutorial: "Tutorial",
};

export const CATEGORY_ORDER = ["ai", "business", "vibe-coding", "ecosistema", "tutorial"];

/** Articoli del blog, dal più recente. I testi sono quelli del sito originale (importati senza modifiche). */
export const posts: BlogPost[] = (data as BlogPost[]).slice().sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }): string {
  return new Intl.DateTimeFormat("it-IT", { ...opts, timeZone: "Europe/Rome" }).format(new Date(iso));
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const md = new Marked({ gfm: true, breaks: false });
md.use({
  renderer: {
    heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Heading) {
      const inner = this.parser.parseInline(token.tokens as Tokens.Generic[]);
      return `<h${token.depth} id="${slugify(token.text)}">${inner}</h${token.depth}>\n`;
    },
    link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Link) {
      const inner = this.parser.parseInline(token.tokens as Tokens.Generic[]);
      const external = /^https?:\/\//.test(token.href);
      const title = token.title ? ` title="${token.title}"` : "";
      return `<a href="${token.href}"${title}${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${inner}</a>`;
    },
  },
});

/** Markdown → HTML. Il contenuto è nostro (importato dal sito originale), quindi può contenere HTML. */
export function renderMarkdown(content: string): string {
  return md.parse(content, { async: false }) as string;
}
