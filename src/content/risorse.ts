/**
 * Archivio delle risorse gratuite: elenco importato dal sito originale (titoli, testi e tag invariati).
 * Le guide visuali sono pagine interattive che restano sul sito originale: il pulsante le apre in una nuova scheda.
 * Il libretto sul Vibe Coding ha invece la sua pagina qui.
 */
export interface Risorsa {
  title: string;
  text: string;
  kind: "Guida visuale" | "Tutorial";
  date: string;
  tags: string[];
  cta: string;
  href: string;
  external?: boolean;
  /** Etichetta in alto nell'anteprima, come sull'originale. */
  family: string;
  topic: string;
}

const O = "https://www.triskellecosystem.com";

export const risorse = {
  overline: "Libreria · Archivio video",
  title: "Libreria [risorse]",
  line: "Tutti i materiali di riferimento dietro i video YouTube e gli Shorts: tutorial, prompt, workflow e guide rapide. Un unico indice, sempre aggiornato.",
  updated: "Aggiornato · settembre 2026",
  filters: ["Tutti", "Tutorial", "Guida visuale"] as const,
  items: [
    {
      title: "Vibe Coding: l'estratto gratuito del libro",
      text: "Il riassunto del libro in 5 minuti e le prime 10 pagine in PDF, gratis: cos'è il Vibe Coding e come costruire siti e app con l'AI senza saper programmare.",
      kind: "Guida visuale",
      date: "set 2026",
      tags: ["Vibe Coding", "Lovable", "PDF gratuito"],
      cta: "Scarica l'estratto",
      href: "/vibe-coding",
      family: "Vibe Coding",
      topic: "Libretto · PDF gratuito",
    },
    {
      title: "I 5 codici di ChatGPT che ti crei tu",
      text: "Cinque sigle da scrivere insieme alla richiesta per cambiare come risponde ChatGPT. Cosa sono davvero, come installarle in 2 minuti e le definizioni pronte da incollare.",
      kind: "Guida visuale",
      date: "set 2026",
      tags: ["OpenAI", "ChatGPT", "Prompt"],
      cta: "Apri la guida",
      href: `${O}/risorse/5-codici-chatgpt`,
      external: true,
      family: "ChatGPT",
      topic: "5 codici · Istruzioni",
    },
    {
      title: "GPT-5.6 e ChatGPT Work: la guida completa",
      text: "Tre nuovi modelli (Sol, Terra, Luna), l'agente che consegna il lavoro finito e l'app desktop unificata. Cosa cambia davvero e cosa puoi usare in Italia.",
      kind: "Guida visuale",
      date: "lug 2026",
      tags: ["OpenAI", "GPT-5.6", "ChatGPT Work", "AI News"],
      cta: "Apri la guida",
      href: `${O}/risorse/gpt-5-6-chatgpt-work`,
      external: true,
      family: "ChatGPT",
      topic: "GPT-5.6 · ChatGPT Work",
    },
    {
      title: "GPT-5.5: la nuova era dell'AI agentica",
      text: "Il modello OpenAI più potente di sempre: benchmark, agentic coding, Codex, prezzi e applicazioni business reali.",
      kind: "Guida visuale",
      date: "apr 2026",
      tags: ["OpenAI", "GPT-5.5", "AI News"],
      cta: "Apri la guida",
      href: `${O}/risorse/gpt-5-5-nuova-era-agentica`,
      external: true,
      family: "ChatGPT",
      topic: "GPT-5.5 · Agentic AI",
    },
    {
      title: "Workflow Cowork — Video pt.1",
      text: "Roadmap, step e prompt pronti da incollare.",
      kind: "Guida visuale",
      date: "giu 2026",
      tags: ["Claude", "Cowork", "Workflow"],
      cta: "Apri la guida",
      href: `${O}/risorse/workflow-cowork-video`,
      external: true,
      family: "Claude",
      topic: "Cowork · Workflow",
    },
    {
      title: "Artefatti vs Progetti",
      text: "Capire la differenza in 60 secondi.",
      kind: "Guida visuale",
      date: "giu 2026",
      tags: ["Claude", "Anthropic"],
      cta: "Apri la guida",
      href: `${O}/risorse/artifatti-vs-progetti`,
      external: true,
      family: "Claude",
      topic: "Artifacts · Projects",
    },
    {
      title: "Da 1 a 1.000.000 — Video folla sulla spiaggia",
      text: "Tutorial completo per generare una scena di folla realistica con l'AI, dal singolo soggetto fino al milione.",
      kind: "Tutorial",
      date: "giu 2026",
      tags: ["Veo 3", "Midjourney", "Video AI"],
      cta: "Apri risorsa",
      href: `${O}/tutorial/folla-spiaggia`,
      external: true,
      family: "Google Veo",
      topic: "Veo 3 · Tutorial",
    },
    {
      title: "Flussi Dinamici di Claude Code",
      text: "La guida completa e illustrata ai workflow dinamici di Claude Code, spiegata in modo semplice. È la presentazione che abbiamo usato nel video.",
      kind: "Guida visuale",
      date: "giu 2026",
      tags: ["Claude Code", "Anthropic", "Workflow"],
      cta: "Apri la guida",
      href: `${O}/flussi-dinamici-claude-code.html`,
      external: true,
      family: "Claude Code",
      topic: "Dynamic Workflows",
    },
    {
      title: "Smetti di 'parlare' con l'AI. Inizia a programmarla.",
      text: "I 4 segreti degli ingegneri di Anthropic per costruire un ecosistema AI scalabile.",
      kind: "Guida visuale",
      date: "giu 2026",
      tags: ["Claude Code", "Anthropic", "Skills", "Workflow"],
      cta: "Apri la guida",
      href: `${O}/risorse/guida-skills-ai`,
      external: true,
      family: "Anthropic",
      topic: "Skills · AI Systems",
    },
    {
      title: "Fable 5 & Mythos 5",
      text: "La guida completa ai nuovi modelli Anthropic: benchmark, differenze, casi d'uso reali, prezzi e strategia di lancio. Con scaletta presentatore numerata e navigazione laterale interattiva.",
      kind: "Guida visuale",
      date: "giu 2026",
      tags: ["Claude", "Anthropic", "AI"],
      cta: "Apri la guida",
      href: `${O}/risorse/fable5_mythos5_triskell.html`,
      external: true,
      family: "Anthropic",
      topic: "Fable 5 · Mythos 5",
    },
  ] satisfies Risorsa[],
};
