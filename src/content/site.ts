/**
 * ============================================================================
 *  TRISKELL ECOSYSTEM — CONTENUTI DEL SITO
 *  Tutto il testo del sito vive in questo file. Modifica qui i copy senza
 *  toccare i componenti.
 *
 *  Regole: titoli max 6 parole · descrizioni max 12 parole · niente paragrafi.
 *  Ogni valore marcato `// TODO: dato reale` è un SEGNAPOSTO da sostituire.
 *  Elenco completo dei segnaposto:  npm run todos
 * ============================================================================
 */

import type { IconName } from "@/components/ui/Icon";

/* ------------------------------ Tipi ---------------------------------------- */

export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Cifre decimali (es. 2,5) */
  decimals?: number;
  label: string;
  /** true = segnaposto, da sostituire con un dato reale */
  todo?: true;
}

export interface NavLink {
  label: string;
  href: string;
}

export type ServiceVisual = "bars" | "posts" | "browser" | "video" | "flow" | "funnel";

export interface Service {
  id: string;
  icon: IconName;
  title: string;
  visual: ServiceVisual;
  metric: Metric;
  /** Tile più grande nella bento grid */
  featured?: boolean;
}

export interface ProcessStep {
  title: string;
  text: string;
  icon: IconName;
}

export interface ResultCard {
  sector: string;
  client: string;
  period: string;
  kpi: Metric;
  secondary: Metric;
}

export interface Tutorial {
  title: string;
  tag: string;
  duration: string;
  /** ID video YouTube. null = segnaposto "In arrivo" */
  youtubeId: string | null;
}

export interface Pillar {
  from: string;
  to: string;
  text: string;
  icon: IconName;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Social {
  id: "instagram" | "linkedin" | "tiktok" | "youtube";
  label: string;
  href: string;
}

/* ------------------------------ Contenuti ------------------------------------ */

export const site = {
  brand: {
    name: "Triskell Ecosystem",
    short: "Triskell",
    tagline: "Marketing, AI e automazioni per crescere davvero.",
    description:
      "Triskell Ecosystem aiuta le aziende a crescere con marketing, intelligenza artificiale, video AI e automazioni. Agency e Academy.",
    url: "https://triskell-ecosystem.vercel.app", // TODO: dominio definitivo
    email: "info@triskellecosystem.com", // TODO: dato reale
    locale: "it_IT",
  },

  nav: {
    items: [
      { label: "Agency", href: "#agency" },
      { label: "Academy", href: "#academy" },
      { label: "Chi siamo", href: "#chi-siamo" },
    ] satisfies NavLink[],
    more: {
      label: "Altro",
      items: [{ label: "AI Lab", href: "/ai-lab", hint: "Sperimentazione e strumenti AI" }],
    },
    cta: { label: "Parliamone", href: "#contatti" },
    menuOpen: "Apri il menu",
    menuClose: "Chiudi il menu",
    skip: "Vai al contenuto",
  },

  hero: {
    overline: "Marketing · Intelligenza artificiale · Automazioni",
    titleLines: ["Più clienti.", "Più fatturato."],
    titleAccent: "Crescita reale.",
    subtitle: "Strategia, AI e automazioni per far crescere la tua azienda.",
    primaryCta: { label: "Scopri Agency", href: "#agency" },
    secondaryCta: { label: "Scopri Academy", href: "#academy" },
    keyNumbers: [
      { value: 320, prefix: "+", suffix: "%", label: "Nuovi iscritti", todo: true }, // TODO: dato reale
      { value: 500, prefix: "+", label: "Contatti qualificati", todo: true }, // TODO: dato reale
      { value: 180, prefix: "+", suffix: "%", label: "Lead da campagne", todo: true }, // TODO: dato reale
    ] satisfies Metric[],
    symbolAlt: "Simbolo Triskell: tre spirali oro in un medaglione blu notte",
  },

  metrics: {
    title: "Numeri che [contano]",
    items: [
      { value: 40, suffix: "+", label: "Progetti completati", todo: true }, // TODO: dato reale
      { value: 25, suffix: "+", label: "Clienti seguiti", todo: true }, // TODO: dato reale
      { value: 600, suffix: "+", label: "Contenuti prodotti", todo: true }, // TODO: dato reale
      { value: 1200, suffix: "h", label: "Ore automatizzate", todo: true }, // TODO: dato reale
    ] satisfies Metric[],
  },

  fork: {
    id: "agency",
    overline: "Da dove partire",
    title: "Scegli come [lavorare insieme]",
    line: "Due percorsi, un solo obiettivo: la tua crescita.",
    agency: {
      badge: "Il nostro cuore",
      name: "Agency",
      headline: "Deleghi tutto a noi",
      line: "Strategia, ads, contenuti e automazioni: ci pensiamo noi.",
      points: ["Meta Ads e funnel", "Siti e video AI", "Automazioni su misura"],
      cta: { label: "Scopri Agency", href: "#servizi" },
    },
    academy: {
      name: "Academy",
      headline: "Ti insegniamo le competenze",
      line: "Percorsi pratici su AI e marketing, per te e il tuo team.",
      cta: { label: "Scopri Academy", href: "#academy" },
    },
  },

  services: {
    id: "servizi",
    overline: "Servizi Agency",
    title: "Cosa facciamo [per te]",
    line: "Sei servizi, un unico ecosistema.",
    items: [
      {
        id: "meta-ads",
        icon: "target",
        title: "Meta Ads",
        visual: "bars",
        featured: true,
        metric: { value: 35, prefix: "−", suffix: "%", label: "Costo per lead", todo: true }, // TODO: dato reale
      },
      {
        id: "social",
        icon: "share",
        title: "Contenuti social",
        visual: "posts",
        metric: { value: 120, prefix: "+", suffix: "%", label: "Reach organica", todo: true }, // TODO: dato reale
      },
      {
        id: "siti",
        icon: "globe",
        title: "Siti web",
        visual: "browser",
        metric: { value: 95, suffix: "+", label: "Punteggio performance", todo: true }, // TODO: dato reale (target Lighthouse)
      },
      {
        id: "video-ai",
        icon: "clapperboard",
        title: "Video AI",
        visual: "video",
        featured: true,
        metric: { value: 10, suffix: "×", label: "Produzione più rapida", todo: true }, // TODO: dato reale
      },
      {
        id: "automazioni",
        icon: "workflow",
        title: "Automazioni",
        visual: "flow",
        metric: { value: 20, prefix: "−", suffix: "h", label: "Lavoro manuale a settimana", todo: true }, // TODO: dato reale
      },
      {
        id: "strategia",
        icon: "compass",
        title: "Strategia",
        visual: "funnel",
        metric: { value: 90, suffix: "gg", label: "Dal piano ai primi dati", todo: true }, // TODO: dato reale
      },
    ] satisfies Service[],
    tools: {
      label: "Strumenti che usiamo",
      items: ["Meta", "Higgsfield", "HeyGen", "n8n", "Claude", "Supabase", "Vercel", "Next.js"],
    },
  },

  process: {
    id: "metodo",
    overline: "Il nostro metodo",
    title: "Come [lavoriamo]",
    line: "Quattro passi, dalla prima call ai risultati.",
    steps: [
      { title: "Analisi", text: "Capiamo obiettivi, risorse e opportunità.", icon: "search" },
      { title: "Strategia", text: "Progettiamo il piano più adatto al tuo business.", icon: "compass" },
      { title: "Produzione", text: "Creiamo contenuti, siti e automazioni.", icon: "clapperboard" },
      { title: "Risultati", text: "Misuriamo, ottimizziamo e scaliamo.", icon: "trending" },
    ] satisfies ProcessStep[],
  },

  results: {
    id: "risultati",
    overline: "Risultati concreti",
    title: "Storie di [crescita reale]",
    line: "Alcuni progetti, con i loro numeri.",
    prev: "Risultato precedente",
    next: "Risultato successivo",
    items: [
      {
        sector: "Fitness",
        client: "InForm Fitness", // TODO: dato reale (conferma nome cliente e permesso di pubblicazione)
        period: "2,5 anni insieme", // TODO: dato reale
        kpi: { value: 320, prefix: "+", suffix: "%", label: "Nuovi iscritti", todo: true }, // TODO: dato reale
        secondary: { value: 500, prefix: "+", label: "Contatti qualificati / anno", todo: true }, // TODO: dato reale
      },
      {
        sector: "Fitness",
        client: "Nordic Fitness Lab", // TODO: dato reale (conferma nome cliente e permesso di pubblicazione)
        period: "1 anno insieme", // TODO: dato reale
        kpi: { value: 180, prefix: "+", suffix: "%", label: "Lead da campagne", todo: true }, // TODO: dato reale
        secondary: { value: 2, suffix: " su 3", label: "Prenotano la prova", todo: true }, // TODO: dato reale
      },
      {
        sector: "Wellness",
        client: "Centro wellness", // TODO: dato reale (cliente da definire)
        period: "Periodo da definire", // TODO: dato reale
        kpi: { value: 0, prefix: "+", suffix: "%", label: "Da definire", todo: true }, // TODO: dato reale
        secondary: { value: 0, label: "Da definire", todo: true }, // TODO: dato reale
      },
    ] satisfies ResultCard[],
  },

  academy: {
    id: "academy",
    overline: "Academy",
    title: "Impara con [Triskell Academy]",
    line: "Tutorial e percorsi pratici su AI e marketing.",
    cta: { label: "Esplora i percorsi", href: "#contatti" }, // TODO: pagina /academy
    soon: "In arrivo",
    play: "Guarda il video",
    tutorials: [
      { title: "AI per il tuo business", tag: "Tutorial", duration: "—", youtubeId: null }, // TODO: dato reale (titolo e ID YouTube)
      { title: "Video con l'intelligenza artificiale", tag: "Tutorial", duration: "—", youtubeId: null }, // TODO: dato reale
      { title: "Automazioni senza codice", tag: "Percorso", duration: "—", youtubeId: null }, // TODO: dato reale
    ] satisfies Tutorial[],
    numbers: [
      { value: 30, suffix: "+", label: "Video tutorial", todo: true }, // TODO: dato reale
      { value: 1000, suffix: "+", label: "Persone formate", todo: true }, // TODO: dato reale
      { value: 12, label: "Ore di formazione", todo: true }, // TODO: dato reale
    ] satisfies Metric[],
  },

  symbol: {
    id: "simbolo",
    overline: "Il simbolo",
    title: "Tre spirali, [una sola energia]",
    line: "Mente, corpo e anima, riletti per il mondo digitale.",
    pillars: [
      { from: "Mente", to: "Digitale", text: "Strumenti, dati e AI al servizio del business.", icon: "cpu" },
      { from: "Corpo", to: "Umano", text: "Persone, relazioni e creatività al centro.", icon: "users" },
      { from: "Anima", to: "Futuro", text: "Visione e innovazione per crescere nel tempo.", icon: "sparkles" },
    ] satisfies Pillar[],
  },

  about: {
    id: "chi-siamo",
    overline: "Chi siamo",
    title: "Un team piccolo, [visione grande]",
    line: "Le persone dietro Triskell Ecosystem.",
    team: [
      {
        name: "Tomaso",
        role: "Founder",
        bio: "Strategia, marketing e intelligenza artificiale.", // TODO: dato reale (bio definitiva)
        initials: "T",
      },
      {
        name: "William",
        role: "Web developer",
        bio: "Siti veloci, performance e automazioni.", // TODO: dato reale (bio definitiva)
        initials: "W",
      },
    ] satisfies TeamMember[],
    photoNote: "Foto in arrivo", // TODO: foto reali del team
    extra: {
      title: "Collaboratori occasionali",
      text: "Video maker, designer e specialisti, coinvolti per progetto.",
    },
  },

  faq: {
    id: "faq",
    overline: "FAQ",
    title: "Domande [frequenti]",
    line: "Le risposte che ci chiedono più spesso.",
    items: [
      {
        q: "Cosa fa Triskell Ecosystem?",
        a: "Aiutiamo le aziende a crescere con marketing, AI e automazioni, in un unico percorso.", // TODO: conferma copy
      },
      {
        q: "Quanto costa lavorare con voi?",
        a: "Dipende dagli obiettivi. Dopo la call ricevi un piano con costi chiari.", // TODO: conferma copy
      },
      {
        q: "In quanto tempo arrivano i risultati?",
        a: "Dipende dal progetto. Definiamo tempi e obiettivi insieme già nella prima fase.", // TODO: conferma copy
      },
      {
        q: "Lavorate solo con il fitness?",
        a: "No. Lavoriamo con attività di ogni settore, dal fitness al wellness.", // TODO: conferma copy
      },
      {
        q: "Cos'è l'Academy?",
        a: "Il nostro percorso di formazione pratica su AI e marketing, per te e il tuo team.", // TODO: conferma copy
      },
    ] satisfies Faq[],
  },

  contact: {
    id: "contatti",
    title: "Vuoi far crescere [la tua attività]?",
    line: "Raccontaci il tuo progetto, ti ricontattiamo noi.",
    perks: [
      { icon: "calendar", label: "Consulenza gratuita" },
      { icon: "clock", label: "30 minuti" },
      { icon: "zap", label: "Piano su misura" },
    ] satisfies Array<{ icon: IconName; label: string }>,
    form: {
      name: { label: "Nome", placeholder: "Il tuo nome" },
      email: { label: "Email", placeholder: "nome@azienda.it" },
      service: {
        label: "Servizio di interesse",
        placeholder: "Scegli un servizio",
        options: ["Meta Ads", "Contenuti social", "Siti web", "Video AI", "Automazioni", "Strategia", "Academy", "Altro"],
      },
      message: { label: "Messaggio", placeholder: "Raccontaci in due righe cosa vuoi ottenere" },
      consent: "Accetto la privacy policy",
      submit: "Prenota una call con il team",
      sending: "Invio in corso…",
      success: { title: "Messaggio inviato", text: "Grazie! Ti rispondiamo il prima possibile." },
      error: { title: "Qualcosa non ha funzionato", text: "Riprova tra poco o scrivici a" },
      errors: {
        required: "Campo obbligatorio",
        email: "Inserisci un'email valida",
        service: "Scegli un servizio",
        messageShort: "Scrivi almeno 10 caratteri",
        consent: "Serve il tuo consenso",
      },
    },
  },

  footer: {
    tagline: "Marketing, AI e automazioni per crescere davvero.",
    columns: [
      {
        title: "Esplora",
        links: [
          { label: "Agency", href: "/#agency" },
          { label: "Academy", href: "/#academy" },
          { label: "Chi siamo", href: "/#chi-siamo" },
          { label: "AI Lab", href: "/ai-lab" },
          { label: "Contatti", href: "/#contatti" },
        ],
      },
      {
        title: "Legale",
        links: [
          { label: "Privacy Policy", href: "#" }, // TODO: pagina legale
          { label: "Cookie Policy", href: "#" }, // TODO: pagina legale
          { label: "Termini di servizio", href: "#" }, // TODO: pagina legale
        ],
      },
    ] satisfies Array<{ title: string; links: NavLink[] }>,
    socialTitle: "Seguici",
    social: [
      { id: "instagram", label: "Instagram", href: "https://www.instagram.com/" }, // TODO: profilo reale
      { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" }, // TODO: profilo reale
      { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/" }, // TODO: profilo reale
      { id: "youtube", label: "YouTube", href: "https://www.youtube.com/" }, // TODO: profilo reale
    ] satisfies Social[],
    legal: "P.IVA 00000000000", // TODO: dato reale (P.IVA / ragione sociale)
    rights: "Tutti i diritti riservati.",
  },

  aiLab: {
    overline: "AI Lab",
    title: "Il laboratorio AI [sta arrivando]",
    line: "Esperimenti, strumenti e integrazioni su misura.",
    cta: { label: "Torna alla home", href: "/" },
  },

  a11y: {
    scrollProgress: "Avanzamento della pagina",
    home: "Triskell Ecosystem — vai alla home",
    toTop: "Torna su",
  },
};

export type Site = typeof site;
