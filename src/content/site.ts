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
  /** Riga di spiegazione nel menu a tendina. */
  hint?: string;
  /** Voci del menu a tendina. */
  children?: NavLink[];
}

/** Uno step di un percorso (Agency o Academy). */
export interface PathStep {
  icon: IconName;
  title: string;
  text: string;
}

/** Cosa ottieni, in sintesi: pochi punti decisivi, con numeri che crescono. */
export interface Impact {
  /** Punti decisivi; `stat` = numero grande che compare e cresce (`still` = testo fisso). */
  points: Array<{ icon: IconName; title: string; text: string; stat?: Metric & { still?: true } }>;
  /** Barre che si riempiono (nessun dato: solo progressione). */
  meters?: string[];
  /** Etichetta finale: compare, dorata, quando tutte le barre sono complete. */
  goal?: string;
  /** Traguardo finale della catena. */
  finale: { icon: IconName; label: string; text: string };
}

export interface Path {
  name: string;
  tagline: string;
  steps: PathStep[];
  impact: Impact;
  cta: { label: string; href: string };
}

export interface Service {
  icon: IconName;
  title: string;
  text: string;
  href?: string;
}

export interface CtaContent {
  title: string;
  /** Il titolo spezzato in due: la prima riga entra da sinistra, la seconda da destra. */
  lines: [string, string];
  text: string;
}

/** Caso studio reale (dati del sito originale). */
export interface CaseStudy {
  id: string;
  sector: string;
  place: string;
  client: string;
  tag: string;
  stats: [{ value: string; label: string }, { value: string; label: string }];
  text: string;
  /** Tinta della "copertina" (token cromatico del brand). */
  tone: "gold" | "azure" | "cobalt" | "lime" | "rose";
  icon: IconName;
  /** Foto reale del cliente in /public/cases */
  image: string;
}

export interface SiteItem {
  id: string;
  name: string;
  category: string;
  /** Dominio mostrato nella finestra del browser. */
  domain: string;
  url: string;
  /** Screenshot in /public/sites */
  image: string;
  /** Screenshot lungo (pagina intera) mostrato mentre scorre nel portatile. */
  tall?: string;
  /** Sito dimostrativo inventato (non è un cliente reale). */
  demo?: true;
}

export interface Pillar {
  from: string;
  to: string;
  text: string;
  icon: IconName;
}

/** Una fase della presentazione: finestra di scroll (0-1) e contenuti. */
export interface PersonPhase {
  id: string;
  /** Inizio e fine della fase lungo lo scroll del blocco (0-1). */
  from: number;
  to: number;
  kicker: string;
  title: string;
  text: string;
  tags?: string[];
  stats?: Array<{ value: string; label: string }>;
  /** Blocchi sintetici (es. competenze), mostrati a griglia. */
  blocks?: Array<{ title: string; text: string }>;
  /** Mostra il titolo come citazione. */
  quote?: boolean;
}

/** Un punto della camera lungo lo scroll: punto inquadrato sulla foto (u,v), dolly (tz, px), rotazione orbitale e foto della scena. */
export interface CameraKey {
  at: number;
  u: number;
  v: number;
  tz: number;
  ry: number;
  rx: number;
  /** 0 = figura ritagliata, 1 = foto della scena (scrivania). */
  scene: number;
}

export interface Person {
  id: string;
  name: string;
  short: string;
  role: string;
  tone: "azure" | "red";
  /** Da che lato sta la figura su desktop. */
  layout: "left" | "right";
  /** Foto isolata dallo sfondo (PNG/WebP con alpha), proporzioni 2:3. */
  cutout: string;
  /** Primo piano finale (fotografia al computer), usato come ultima inquadratura. */
  scene: string;
  camera: CameraKey[];
  phases: PersonPhase[];
}

export interface Faq {
  q: string;
  a: string;
}

export interface Social {
  id: "instagram" | "youtube" | "whatsapp";
  label: string;
  href: string;
}

/* ------------------------------ Contenuti ------------------------------------ */

export const site = {
  brand: {
    name: "Triskell Ecosystem",
    short: "Triskell",
    tagline: "Marketing, AI e automazioni per crescere davvero.",
    slogan: "Migliora il tuo business con Triskell Ecosystem",
    description:
      "Triskell Ecosystem aiuta le aziende a crescere con marketing, intelligenza artificiale, video AI e automazioni. Agency e Academy.",
    url: "https://triskell-ecosystem.vercel.app", // TODO: dominio definitivo
    email: "info@triskellecosystem.com", // TODO: dato reale
    phone: "+39 348 430 1500",
    whatsapp: "https://wa.me/393484301500",
    locale: "it_IT",
  },

  nav: {
    items: [
      { label: "Home", href: "/" },
      {
        label: "Agency",
        href: "/agency",
        children: [
          { label: "Agency", href: "/agency", hint: "Deleghi tutto a noi" },
          { label: "Siti web", href: "/agency/siti-web", hint: "I siti web che creiamo" },
          { label: "Portfolio", href: "/agency/portfolio", hint: "Progetti e risultati" },
        ],
      },
      { label: "Academy", href: "/academy" },
      { label: "Chi siamo", href: "/chi-siamo" },
      {
        label: "Altro",
        href: "#",
        children: [
          { label: "Libretto Vibe Coding", href: "/vibe-coding", hint: "Costruisci siti e app con l'AI" },
        ],
      },
    ] satisfies NavLink[],
    cta: { label: "Prenota ora", href: "/contatti" },
    menuOpen: "Apri il menu",
    menuClose: "Chiudi il menu",
    skip: "Vai al contenuto",
  },

  hero: {
    overline: "Migliora il tuo business con Triskell Ecosystem",
    titleLines: ["Più clienti.", "Più guadagni."],
    titleAccent: "Più automatizzi, più fai crescere il tuo business.",
    subtitle: "Marketing, AI e automazioni su misura: lo facciamo noi, o ti insegniamo come.",
    primaryCta: { label: "Scopri Agency", href: "/agency" },
    secondaryCta: { label: "Scopri Academy", href: "/academy" },
    keyNumbers: [
      { value: 20, suffix: "+", label: "Progetti per clienti" },
      { value: 100, prefix: "+", suffix: "K", label: "Lead generati" },
      { value: 3, suffix: " anni", label: "Con i clienti più fedeli" },
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

  ecosystem: {
    overline: "L'ecosistema",
    title: "Cos'è [Triskell Ecosystem]?",
    description:
      "Triskell Ecosystem è un ecosistema che unisce marketing, intelligenza artificiale, automazioni e formazione. Ti aiutiamo a trovare più clienti, a far lavorare meglio la tua azienda e a crescere: puoi delegarci tutto, imparare a farlo da solo, oppure unire le due strade.", // TODO: conferma copy
    sectorsLabel: "I nostri settori",
    sectors: [
      { label: "Marketing", icon: "megaphone" },
      { label: "Intelligenza artificiale", icon: "cpu" },
      { label: "Automazioni", icon: "workflow" },
      { label: "Formazione", icon: "graduation" },
    ] satisfies Array<{ label: string; icon: IconName }>,
    nodeLabel: "Triskell Ecosystem",
    nodeHint: "Due rami principali",
    or: "e anche",
    combine: {
      title: "Oppure puoi combinarle assieme",
      text: "Parti dall'Agency per i risultati subito, impara con l'Academy per crescere in autonomia.",
    },
    agency: {
      badge: "Il nostro cuore",
      question: "Vuoi delegare tutto a noi?",
      name: "Agency",
      line: "Ci pensiamo noi, dalla strategia ai risultati.",
      points: ["Gestione social media", "Meta Ads e Google Ads", "Siti web", "CRM", "Applicazioni e automazioni su misura"],
      cta: { label: "Scopri Agency", href: "/agency" },
    },
    academy: {
      question: "Vuoi imparare in prima persona o far imparare i tuoi dipendenti?",
      name: "Academy",
      line: "Diventi autonomo su vendite, marketing e AI.",
      points: ["93 lezioni pratiche, 7 corsi gratuiti", "Per te, in prima persona", "Per i tuoi dipendenti"],
      cta: { label: "Scopri Academy", href: "/academy" },
    },
  },

  paths: {
    overline: "Cosa ottieni",
    title: "Quello che vuoi davvero: [risultati]",
    line: "Meno punti, più effetto: ecco cosa cambia per te.",
    agency: {
      name: "Agency",
      tagline: "Ti accompagniamo lungo tutto il funnel",
      steps: [
        { icon: "calendar", title: "Call incluse", text: "In base al pacchetto, capiamo la tua situazione." },
        { icon: "search", title: "Analisi del funnel", text: "Vediamo dove perdi clienti e come migliorare." },
        { icon: "share", title: "Social e campagne", text: "Gestiamo i tuoi social, Meta Ads e Google Ads." },
        { icon: "globe", title: "Sito web", text: "Lo rifacciamo, se serve, per farti contattare." },
        { icon: "target", title: "Posizionamento", text: "Ti posizioniamo sul mercato e poi spingiamo." },
        { icon: "workflow", title: "Automazioni e CRM", text: "Automatizziamo il sistema e creiamo il tuo CRM." },
      ], // TODO: conferma copy
      impact: {
        points: [
          { icon: "users", title: "Più contatti", text: "Campagne e social portano richieste ogni mese.", stat: { value: 60, prefix: "30–", label: "lead al mese per cliente" } },
          { icon: "messages", title: "Più clienti", text: "CRM e follow-up li trasformano in vendite.", stat: { value: 3, prefix: "~1 su ", label: "prenota la prova", still: true } },
          { icon: "trending", title: "Più fatturato", text: "Un sistema continuo, che cresce nel tempo.", stat: { value: 25, prefix: "5–", suffix: "K€", label: "al mese generati" } },
        ],
        finale: { icon: "rocket", label: "Crescita", text: "Il tuo business cresce, mese dopo mese." },
      },
      cta: { label: "Tutto su Agency", href: "/agency" },
    } satisfies Path,
    academy: {
      name: "Academy",
      tagline: "Diventi indipendente, passo dopo passo",
      steps: [
        { icon: "graduation", title: "Percorsi pratici", text: "Per te in prima persona o per i tuoi dipendenti." },
        { icon: "trending", title: "Processi di vendita", text: "Impari a gestire contatti, preventivi e chiusure." },
        { icon: "megaphone", title: "Marketing", text: "Capisci come trovare clienti e far rendere le campagne." },
        { icon: "cpu", title: "Intelligenza artificiale", text: "La usi ogni giorno per risparmiare tempo." },
        { icon: "workflow", title: "Costruisci da solo", text: "Crei siti, automazioni e sistemi senza dipendere da nessuno." },
        { icon: "sparkles", title: "Diventi indipendente", text: "Gestisci il tuo business in autonomia." },
      ], // TODO: conferma copy
      impact: {
        meters: ["Vendite", "Marketing", "Intelligenza artificiale", "Automazioni"],
        goal: "Traguardo raggiunto",
        points: [
          { icon: "badge", title: "Autonomia", text: "Gestisci marketing, vendite e AI senza dipendere da nessuno." },
          { icon: "users", title: "Il tuo team al passo", text: "Formi i dipendenti con percorsi pratici, subito applicabili." },
          { icon: "zap", title: "Strumenti tuoi", text: "Costruisci siti, automazioni e sistemi da zero." },
        ],
        finale: { icon: "rocket", label: "Indipendenza", text: "Il tuo business cresce, e le mani sul volante sono le tue." },
      },
      cta: { label: "Tutto su Academy", href: "/academy" },
    } satisfies Path,
  },

  /** Fasce "Prenota ora", riusate in più punti del sito. */
  cta: {
    button: "Prenota ora",
    href: "/contatti",
    perks: [
      { icon: "calendar", label: "Consulenza gratuita" },
      { icon: "clock", label: "30 minuti" },
      { icon: "check", label: "Nessun impegno" },
    ] satisfies Array<{ icon: IconName; label: string }>,
    home: { title: "Sei curioso? Parliamone insieme.", lines: ["Sei curioso?", "Parliamone insieme."], text: "Prenota la tua call gratuita: ti diciamo come far crescere il tuo business." } satisfies CtaContent,
    results: { title: "Vuoi risultati come questi?", lines: ["Vuoi risultati", "come questi?"], text: "Prenota ora la tua call gratuita." } satisfies CtaContent,
    agency: { title: "Vuoi delegarci il marketing?", lines: ["Vuoi delegarci", "il marketing?"], text: "Una call gratuita: capiamo la tua situazione e ti diciamo cosa possiamo fare." } satisfies CtaContent,
    sites: { title: "Vuoi delegarci il tuo sito?", lines: ["Vuoi delegarci", "il tuo sito?"], text: "Una call gratuita: ti diciamo come lo faremmo, e quanto tempo serve." } satisfies CtaContent,
    academy: { title: "Vuoi crescere in autonomia?", lines: ["Vuoi crescere", "in autonomia?"], text: "Prenota ora: ti diciamo da dove iniziare." } satisfies CtaContent,
    generic: { title: "Pronto a far crescere il tuo business?", lines: ["Pronto a far crescere", "il tuo business?"], text: "Prenota ora una call gratuita con il team." } satisfies CtaContent,
  },

  agencyPage: {
    overline: "Agency",
    title: "Ti aiutiamo a ottenere [più clienti] per la tua attività",
    line: "Strategia, social, campagne, siti e automazioni: ci pensiamo noi, dall'inizio ai risultati.",
    pathTitle: "Il tuo funnel, [gestito da noi]",
    pathLine: "Ecco cosa facciamo, step dopo step.",
    servicesTitle: "Ecco i nostri [servizi]",
    servicesLine: "Scegliamo insieme cosa serve davvero al tuo business.",
    services: [
      { icon: "smartphone", title: "Gestione social media", text: "Contenuti curati e pubblicati con costanza." },
      { icon: "click", title: "Meta Ads e Google Ads", text: "Campagne che portano contatti e clienti veri." },
      { icon: "monitor", title: "Siti web", text: "Siti veloci e chiari, pensati per farti contattare." },
      { icon: "database", title: "CRM personale", text: "Un CRM su misura per gestire contatti e vendite." },
      { icon: "workflow", title: "Automazioni su misura", text: "Risposte, contatti e report che si gestiscono da soli." },
      { icon: "code", title: "Applicazioni su misura", text: "Strumenti digitali costruiti sul tuo modo di lavorare." },
      { icon: "film", title: "Video con l'AI", text: "Video professionali creati con l'intelligenza artificiale." },
      { icon: "crosshair", title: "Strategia e posizionamento", text: "Un piano chiaro per farti scegliere dal mercato." },
    ] satisfies Service[], // TODO: conferma copy
    call: {
      overline: "Si parte da qui",
      title: "Prenota una call [gratuita]",
      line: "Nessun impegno: capiamo insieme da dove partire.",
      points: [
        { icon: "messages", title: "Ci racconti la tua situazione", text: "Dove sei oggi e dove vuoi arrivare." },
        { icon: "search", title: "Guardiamo il tuo funnel", text: "Vediamo cosa funziona e cosa si può migliorare." },
        { icon: "rocket", title: "Ti diciamo cosa fare", text: "Un piano chiaro e un pacchetto su misura." },
      ] satisfies Array<{ icon: IconName; title: string; text: string }>,
    },
    showcase: {
      overline: "I nostri lavori",
      title: "Guarda cosa [costruiamo]",
      line: "Siti web e progetti reali, scegli cosa vedere.",
      tabs: { sites: "Siti web", portfolio: "Portfolio" },
      sitesCta: { label: "Tutti i siti web", href: "/agency/siti-web" },
      portfolioCta: { label: "Tutto il portfolio", href: "/agency/portfolio" },
    },
    /** Esempio dimostrativo (profilo social di una palestra): dati INVENTATI, da sostituire con un caso reale. */
    demo: {
      note: "Esempio dimostrativo",
      handle: "elevafitnessclub",
      name: "Eleva Fitness Club",
      category: "Palestra · Benessere · Performance",
      bio: ["Allenati con noi, ogni giorno.", "Corsi · Personal training · Prova gratuita"],
      posts: 128,
      followersStart: 52800,
      following: 310,
      todayGain: 200,
      gainLabel: "oggi",
      weekGain: "+312 follower questa settimana",
      follow: "Segui",
      message: "Messaggio",
      requestsLabel: "Nuove richieste",
      followersLabel: "follower",
      tabs: { profile: "Instagram", campaign: "Campagne" },
      chat: [
        { who: "Marco", text: "Ciao! Vorrei info sugli abbonamenti" },
        { who: "Giulia", text: "Posso prenotare una prova gratuita?" },
        { who: "Luca", text: "Avete corsi la sera?" },
        { who: "Sara", text: "Quanto costa il pacchetto 3 mesi?" },
        { who: "Andrea", text: "Fate anche personal training?" },
      ],
      ads: {
        title: "Campagna Meta Ads",
        name: "Prova gratuita · Eleva Fitness Club",
        status: "Attiva",
        today: "Oggi sono arrivati",
        todayValue: 18,
        todayUnit: "contatti",
        kpis: [
          { label: "Costo a contatto", value: "2,40 €" },
          { label: "Persone raggiunte", value: "9,8 K" },
          { label: "Prove prenotate", value: "6", live: true },
        ],
        bars: [32, 44, 38, 56, 62, 58, 74, 88],
      },
    }, // TODO: dato reale (sostituire con un profilo vero e i risultati reali)
    portfolioCta: { label: "Guarda il portfolio", href: "/agency/portfolio" },
    sitesCta: { label: "Guarda i nostri siti", href: "/agency/siti-web" },
  },
  academyPage: {
    overline: "Academy",
    title: "Diventa [indipendente] sulle migliori strategie di marketing e AI",
    line: "Impari a vendere, fare marketing e usare l'AI da solo.",
    pathTitle: "Il tuo percorso, [step dopo step]",
    pathLine: "Per te in prima persona, o per i tuoi dipendenti.",
    /** I corsi veri della piattaforma Triskell Academy (https://triskellacademy.com): testi e copertine dal sito. */
    courses: {
      overline: "Triskell Academy",
      title: "Corsi [gratuiti] e lezioni pronte",
      line: "Video-corsi pratici, subito applicabili. Registrati e inizi oggi, senza carta.",
      stats: [
        { value: 9, label: "Corsi pubblicati" },
        { value: 93, label: "Lezioni disponibili" },
        { value: 7, label: "Corsi gratuiti" },
      ] satisfies Metric[],
      free: "Gratuito",
      open: "Inizia il corso",
      items: [
        { id: "advertising-ai", title: "Advertising Online nell'era dell'AI", text: "Come l'AI sta cambiando l'advertising: nuove opportunità, strumenti concreti e un metodo per restare un passo avanti." },
        { id: "ai-toolkit", title: "AI Toolkit per la Produttività", text: "Gli strumenti di intelligenza artificiale che fanno la differenza nel lavoro di ogni giorno, con tutorial pronti da applicare." },
        { id: "vibe-coding", title: "Vibe Coding e AI per Siti & App", text: "Dalle idee a siti e app reali con l'AI come copilota, anche senza saper programmare." },
        { id: "claude-da-zero-a-pro", title: "Claude da Zero a Pro", text: "Il percorso completo su Claude: impostarlo da zero, il metodo per smettere di cercare il prompt perfetto, Cowork per il lavoro quotidiano." },
        { id: "chatgpt-e-codex", title: "ChatGPT e Codex al lavoro", text: "Cosa è diventato ChatGPT oltre la chat: le app integrate e Codex, l'agente che lavora sul tuo computer." },
        { id: "ai-news", title: "AI News della Settimana", text: "Le novità dell'intelligenza artificiale: cosa è uscito, perché conta e cosa cambia nella pratica." },
      ].map((c) => ({ ...c, cover: `/academy/${c.id}.webp`, href: "https://triskellacademy.com/" })),
      includes: {
        title: "Cosa troverai nell'Academy",
        items: [
          { icon: "award", title: "Quiz e certificato", text: "Alla fine di ogni corso che lo prevede" },
          { icon: "users", title: "Community e live", text: "Sessioni live aperte quando ci sono novità" },
          { icon: "bot", title: "Assistente AI", text: "Ti orienta sul percorso giusto per te" },
          { icon: "check", title: "Senza carta", text: "Nessun rinnovo automatico, si parte gratis" },
        ] satisfies Array<{ icon: IconName; title: string; text: string }>,
      },
      youtube: {
        title: "Dal nostro canale [YouTube]",
        line: "Tutorial e novità sull'AI, spiegati semplici. Ogni settimana un nuovo video.",
        watch: "Guarda su YouTube",
        channel: { label: "Iscriviti al canale", href: "https://youtube.com/@triskellecosystem" },
        videos: [
          { id: "xjLGnkFWolw", title: "Impara il 97% del Vibe Coding in 18 minuti" },
          { id: "1egPRg9ocqs", title: "Come creare siti web perfetti con Lovable" },
          { id: "gmYb7YF8ulc", title: "Impara il 97% di Claude Cowork in 29 minuti" },
          { id: "MWjuzZ2y5s0", title: "Opus 5 è fenomenale: guarda cosa ho costruito" },
          { id: "2rq3UkuTO98", title: "A che livello di Claude sei? Scoprilo qui" },
          { id: "PW82OYD98Qg", title: "Ho smesso di installare Skill su Claude: ora le creo in 10 minuti" },
        ],
      },
      cta: { label: "Entra nell'Academy", href: "https://triskellacademy.com/" },
      quote: "L'AI ti permette di donare al mondo ogni idea che prima avresti messo nel cassetto.",
      quoteBy: "Tomaso Forno, Founder",
    },
    /** Anteprima di una lezione: dati INVENTATI a scopo dimostrativo. */
    demo: {
      note: "Esempio dimostrativo",
      lesson: "Corsi gratuiti · Triskell Academy",
      modules: ["Processi di vendita", "Marketing", "Intelligenza artificiale", "Automazioni"],
      progress: "Percorso completato",
      badge: "Ora sei autonomo",
    }, // TODO: dato reale
  },
  sitiWeb: {
    overline: "Agency · Siti web",
    title: "Ecco i siti web che [creiamo]",
    line: "Veloci, curati e pensati per far contattare: clicca su un sito per visitarlo.",
    visit: "Apri il sito",
    visitDemo: "Vuoi un sito così?",
    featured: ["sfizi", "mani", "chiodo"],
    items: [
      { id: "lyamflow", name: "LyamFlow", category: "Software · sito incluso", domain: "lyamflow.com", url: "https://lyamflow.com", image: "/sites/lyamflow.jpg" },
      { id: "doubletwenty", name: "The Double Twenty", category: "Brand · Made in Italy", domain: "thedoubletwenty.it", url: "https://thedoubletwenty.it", image: "/sites/doubletwenty.jpg" },
      { id: "nutrex", name: "Nutrex Lab", category: "Sito online", domain: "nutrexlab.it", url: "https://nutrexlab.it", image: "/sites/nutrex.jpg" },
      { id: "uniqueos", name: "Unique OS", category: "Sito online", domain: "unique-os-three.vercel.app", url: "https://unique-os-three.vercel.app", image: "/sites/uniqueos.jpg" },
      { id: "sfizi", name: "Sfizi Partenopei", category: "Ristorazione · Lugano", domain: "sfizipartenopeilugano.ch", url: "https://sfizipartenopeilugano.ch", image: "/sites/sfizi.jpg", tall: "/sites/sfizi-full.jpg" },
      { id: "alleria", name: "Alleria Trattoria Pizzeria", category: "Ristorazione · Lugano", domain: "alleriatrattoriapizzeria.ch", url: "https://alleriatrattoriapizzeria.ch", image: "/sites/alleria.jpg" },
      { id: "chiodo", name: "Ristorante Il Chiodo", category: "Ristorazione", domain: "ristorante-il-chiodo.vercel.app", url: "https://ristorante-il-chiodo.vercel.app", image: "/sites/chiodo.jpg" },
      { id: "aurea", name: "Aurea Wellness", category: "Esempio · Benessere", domain: "aurea-wellness.it", url: "/contatti", image: "/sites/demo.jpg", tall: "/sites/demo-full.jpg", demo: true }, // TODO: sostituire con un sito reale
      { id: "mani", name: "Affittacamere Manì", category: "Ospitalità · Sicilia", domain: "affittacamere-mani.vercel.app", url: "https://affittacamere-mani.vercel.app", image: "/sites/mani.jpg" },
    ] satisfies SiteItem[],
  },

  portfolio: {
    overline: "Agency · Portfolio",
    title: "Progetti e [risultati]",
    line: "Clienti reali, numeri reali.",
    open: "Scopri il case study",
    next: {
      overline: "Il prossimo case study",
      title: "Il prossimo potrebbe essere il tuo.",
      stats: [
        { value: 20, suffix: "+", label: "Progetti clienti" },
        { value: 100, prefix: "+", suffix: "K", label: "Lead generati" },
      ] satisfies Metric[],
      primary: { label: "Vedi tutti i progetti", href: "/agency/portfolio" },
      secondary: { label: "I nostri sistemi AI interni", href: "/agency#servizi" }, // TODO: pagina dedicata ai sistemi AI interni
    },
  },

  contatti: {
    overline: "Contatti",
    title: "Prenota [ora]",
    line: "Una call gratuita per capire insieme da dove partire.",
  },

  results: {
    id: "risultati",
    overline: "Risultati concreti",
    title: "Clienti reali, [numeri reali]",
    line: "Alcuni progetti seguiti da Triskell Ecosystem.",
    all: { label: "Tutti i progetti", href: "/agency/portfolio" },
    items: [
      { id: "forme-fitness", sector: "Fitness & Wellness", place: "Varese", client: "Forme Fitness", tag: "Meta Ads",
        stats: [{ value: "30–60", label: "Lead al mese" }, { value: "5–25K€", label: "Fatturato mensile" }],
        text: "Un sistema pubblicitario continuativo che porta contatti qualificati ogni mese, da tre anni e in crescita.", tone: "lime", icon: "dumbbell", image: "/cases/forme-fitness.webp" },
      { id: "urban-fitness", sector: "Fitness ed EMS", place: "Lecco", client: "Urban Fitness Lecco", tag: "Meta Ads · CRM",
        stats: [{ value: "30–60", label: "Lead al mese" }, { value: "~1 su 3", label: "Prova prenotata" }],
        text: "Da zero a un sistema continuativo di acquisizione clienti: Meta Ads, social, CRM, follow-up e formazione commerciale.", tone: "rose", icon: "zap", image: "/cases/urban-fitness.webp" },
      { id: "forme-at-home", sector: "Digital Platform", place: "Coaching online", client: "ForMe Fitness at Home", tag: "Piattaforma · Area membri",
        stats: [{ value: "Da 0", label: "Punto di partenza" }, { value: "~2,5 anni", label: "Collaborazione" }],
        text: "Da zero a piattaforma digitale: il metodo ForMe portato online, con percorsi in vendita e fatturato ricorrente.", tone: "lime", icon: "app", image: "/cases/forme-at-home.webp" },
      { id: "mela-med", sector: "Local Business Growth", place: "Avellino", client: "Mela Med & Fitness", tag: "ADV · Social · AI",
        stats: [{ value: "3 anni", label: "Collaborazione" }, { value: "200–250€", label: "ADV al mese" }],
        text: "Da studio in crisi a un sistema strutturato di acquisizione clienti, con Irelia AI che segue i contatti.", tone: "azure", icon: "bot", image: "/cases/mela-med.webp" },
      { id: "vip-fit", sector: "Local Fitness Growth", place: "Monza", client: "Vip Fit Monza", tag: "Meta Ads locali",
        stats: [{ value: "500+", label: "Contatti in un anno" }, { value: "~700€", label: "Meta Ads al mese" }],
        text: "Oltre 500 contatti qualificati in un anno con campagne locali su tecnologie per l'allenamento.", tone: "rose", icon: "target", image: "/cases/vip-fit.webp" },
      { id: "gabriele-gatti", sector: "Healthcare Lead Generation", place: "Meda", client: "Gabriele Gatti", tag: "Sito · Landing · Meta Ads",
        stats: [{ value: "10–30", label: "Contatti al mese" }, { value: "~250€", label: "Meta Ads al mese" }],
        text: "Sito WordPress, landing page per la prima visita e Meta Ads locali: le ricerche online diventano richieste di appuntamento.", tone: "cobalt", icon: "heart", image: "/cases/gabriele-gatti.webp" },
      { id: "emme-diffusion", sector: "Education Lead Generation", place: "Genova", client: "Emme Diffusion Academy", tag: "Google Ads",
        stats: [{ value: "20–30", label: "Contatti a campagna" }, { value: "100–200€", label: "Al mese" }],
        text: "Google Ads per promuovere corsi professionali di bellezza, con un budget contenuto.", tone: "gold", icon: "search", image: "/cases/emme-diffusion.webp" },
    ] satisfies CaseStudy[],
  },

  symbol: {
    id: "simbolo",
    overline: "Il simbolo",
    title: "Tre spirali, [una sola energia]",
    line: "Mente, corpo e anima, riletti per il mondo digitale.",
    /** I tre livelli del medaglione, dall'alto in basso (come nel video di riferimento). */
    /** Le tre spirali sono Mente, Corpo e Anima (si illuminano una alla volta); poi il circuito e il cerchio. */
    spirals: [
      { name: "Mente", text: "Strumenti, dati e AI al servizio del business." },
      { name: "Corpo", text: "Persone, relazioni e creatività al centro." },
      { name: "Anima", text: "Visione e innovazione per crescere nel tempo." },
    ],
    layersLabel: "Le tre spirali",
    pillars: [
      { from: "Mente", to: "Digitale", text: "Strumenti, dati e AI al servizio del business.", icon: "cpu" },
      { from: "Corpo", to: "Umano", text: "Persone, relazioni e creatività al centro.", icon: "users" },
      { from: "Anima", to: "Futuro", text: "Visione e innovazione per crescere nel tempo.", icon: "sparkles" },
    ] satisfies Pillar[],
  },

  about: {
    overline: "Chi siamo",
    title: "Competenza costruita [sul campo]",
    line: "Un team che il settore lo ha già vissuto da dentro.",
    more: "Leggi il percorso",
    less: "Chiudi il percorso",
    method: {
      overline: "Come lavoriamo",
      title: "Il nostro [metodo]",
      line: "Quattro passi, dalla prima call ai risultati.",
      steps: [
        { title: "Analisi", text: "Capiamo obiettivi, risorse e opportunità.", icon: "search", points: ["Obiettivi e budget", "Situazione di partenza", "Concorrenti e mercato"] },
        { title: "Strategia", text: "Progettiamo il piano più adatto al tuo business.", icon: "compass", points: ["Canali e messaggi", "Piano e priorità", "Tempi e obiettivi"] },
        { title: "Produzione", text: "Creiamo contenuti, siti, campagne e automazioni.", icon: "clapperboard", points: ["Contenuti e video AI", "Siti e campagne", "Automazioni attive"] },
        { title: "Risultati", text: "Misuriamo, ottimizziamo e scaliamo.", icon: "trending", points: ["Report chiari", "Test e ottimizzazione", "Crescita costante"] },
      ] satisfies Array<{ title: string; text: string; icon: IconName; points: string[] }>,
    }, // TODO: conferma copy
    intro: {
      title: "Il team principale",
      text: "Due fondatori, due competenze: Tomaso guida marketing, advertising e AI; William progetta e costruisce i siti. Scorri per conoscerli da vicino.",
      hint: "Scorri: prima Tomaso, poi William",
      labels: [
        { name: "Tomaso Forno", role: "Founder · Marketing e AI", tone: "azure", side: "left" },
        { name: "William Argintieri", role: "Web Designer & Creative Developer", tone: "red", side: "right" },
      ],
    },
    /** Le due persone: ogni scheda compare mentre si "gira attorno" alla figura scorrendo. Foto in /public/team. */
    people: [
      {
        id: "tomaso",
        name: "Tomaso Forno",
        short: "Tomaso",
        role: "Founder · Marketing e AI",
        tone: "azure",
        layout: "left",
        cutout: "/team/tomaso-cut.webp",
        scene: "/team/tomaso-close.webp",
        camera: [
          { at: 0.0, u: 0.5, v: 0.5, tz: 0, ry: -12, rx: 0, scene: 0 },
          { at: 0.17, u: 0.5, v: 0.5, tz: 60, ry: -6, rx: 0, scene: 0 },
          { at: 0.34, u: 0.48, v: 0.3, tz: 420, ry: 9, rx: 1, scene: 0 },
          { at: 0.46, u: 0.47, v: 0.21, tz: 700, ry: 11, rx: 2, scene: 0 },
          { at: 0.6, u: 0.47, v: 0.2, tz: 760, ry: -5, rx: 2, scene: 0 },
          { at: 0.67, u: 0.5, v: 0.5, tz: 120, ry: 0, rx: 0, scene: 0 },
          { at: 0.78, u: 0.5, v: 0.5, tz: 60, ry: 4, rx: 0, scene: 1 },
          { at: 0.88, u: 0.5, v: 0.5, tz: 110, ry: -4, rx: 0, scene: 1 },
          { at: 1.0, u: 0.5, v: 0.5, tz: 70, ry: 0, rx: 0, scene: 1 },
        ],
        phases: [
          { id: "intro", from: 0.0, to: 0.19, kicker: "Founder", title: "Tomaso Forno", text: "Fondatore di Triskell Ecosystem. Aiuta professionisti e aziende a crescere unendo advertising, intelligenza artificiale e strategia di business online.", tags: ["Advertising", "Intelligenza artificiale", "Business online"] },
          { id: "percorso", from: 0.22, to: 0.43, kicker: "Il percorso", title: "Da più di 10 anni nel settore", text: "Partito dentro le agenzie, ha costruito un metodo basato su funnel, dati e automazioni. Oggi guida il suo progetto.", stats: [{ value: "10+", label: "anni di marketing" }] },
          {
            id: "competenze",
            from: 0.46,
            to: 0.65,
            kicker: "Competenze",
            title: "Esperto in advertising e AI",
            text: "Quello che sa fare, in quattro blocchi.",
            blocks: [
              { title: "Advertising", text: "Meta Ads e Google Ads: campagne che portano contatti veri." },
              { title: "Intelligenza artificiale", text: "Strumenti, prompt e automazioni per il business." },
              { title: "Funnel e CRM", text: "Dal contatto al cliente, seguito da sistemi che lavorano da soli." },
              { title: "Formazione", text: "Academy: corsi pratici e video sul canale YouTube." },
            ],
          },
          { id: "triskell", from: 0.69, to: 0.89, kicker: "In Triskell", title: "Strategia, clienti e metodo", text: "Segue la strategia dei clienti e coordina Agency e Academy.", stats: [{ value: "50+", label: "clienti seguiti" }, { value: "100K+", label: "lead generati" }] },
          { id: "chiusura", from: 0.92, to: 9, kicker: "Il suo contributo", title: "«L'AI ti permette di donare al mondo ogni idea che prima avresti messo nel cassetto.»", text: "In Triskell Ecosystem porta visione, metodo e crescita.", quote: true },
        ],
      },
      {
        id: "william",
        name: "William Argintieri",
        short: "William",
        role: "Web Designer & Creative Developer",
        tone: "red",
        layout: "right",
        cutout: "/team/william-cut.webp",
        scene: "/team/william-close.webp",
        camera: [
          { at: 0.0, u: 0.5, v: 0.42, tz: 260, ry: 12, rx: 0, scene: 0 },
          { at: 0.17, u: 0.5, v: 0.5, tz: 40, ry: 6, rx: 0, scene: 0 },
          { at: 0.34, u: 0.52, v: 0.3, tz: 420, ry: -9, rx: 1, scene: 0 },
          { at: 0.46, u: 0.52, v: 0.2, tz: 700, ry: -11, rx: 2, scene: 0 },
          { at: 0.6, u: 0.52, v: 0.19, tz: 760, ry: 5, rx: 2, scene: 0 },
          { at: 0.67, u: 0.5, v: 0.5, tz: 120, ry: 0, rx: 0, scene: 0 },
          { at: 0.78, u: 0.5, v: 0.5, tz: 60, ry: -4, rx: 0, scene: 1 },
          { at: 0.88, u: 0.5, v: 0.5, tz: 110, ry: 4, rx: 0, scene: 1 },
          { at: 1.0, u: 0.5, v: 0.5, tz: 70, ry: 0, rx: 0, scene: 1 },
        ],
        phases: [
          { id: "intro", from: 0.0, to: 0.19, kicker: "Web Designer & Creative Developer", title: "William Argintieri", text: "Mi occupo dello sviluppo web di Triskell Ecosystem, trasformando idee e progetti in esperienze digitali su misura. Seguo ogni fase, dal primo confronto con il cliente fino alla pubblicazione online." },
          { id: "metodo", from: 0.22, to: 0.43, kicker: "Il metodo", title: "Dal concept all'esperienza digitale", text: "Il mio metodo unisce design, sviluppo e attenzione ai dettagli. Ogni progetto nasce dall'ascolto, prende forma attraverso la creatività e diventa un'esperienza digitale funzionale, intuitiva e riconoscibile." },
          {
            id: "competenze",
            from: 0.46,
            to: 0.65,
            kicker: "Quello che so fare",
            title: "Le mie competenze",
            text: "",
            blocks: [
              { title: "Web Design", text: "Siti su misura, curati in ogni dettaglio e riconoscibili." },
              { title: "Sviluppo Web", text: "Codice pulito, SEO tecnica e prestazioni ottimizzate." },
              { title: "Animazioni & Interazioni", text: "Movimento ed effetti interattivi che raccontano il brand." },
              { title: "Esperienza Utente", text: "Navigazione intuitiva e percorsi progettati per convertire." },
            ],
          },
          { id: "triskell", from: 0.69, to: 0.89, kicker: "In Triskell Ecosystem", title: "Tutta la parte web, dall'idea alla realtà.", text: "Mi occupo della progettazione e dello sviluppo di siti web, landing page e strumenti digitali che valorizzano l'identità dei brand e trasformano la presenza online in opportunità concrete." },
          { id: "chiusura", from: 0.92, to: 9, kicker: "La mia filosofia", title: "«Non costruiamo solo siti web. Costruiamo esperienze digitali.»", text: "In Triskell Ecosystem trasformo le idee in esperienze digitali.", quote: true },
        ],
      },
    ] satisfies Person[], // TODO: conferma testi e numeri (da foto/bio fornite)
  },
  vibeCoding: {
    overline: "Altro · Risorsa gratuita · PDF di 10 pagine",
    title: "Il libretto sul [Vibe Coding]",
    line: "Come si costruiscono siti e app descrivendo all'intelligenza artificiale cosa vuoi ottenere.",
    coverAlt: "Libro «Vibe Coding» in 3D",
    dragHint: "Passa il mouse sul libro per girarlo (o trascinalo) · doppio click per rimetterlo dritto",
    /** Sezione "Da dove partire?": come sul sito originale. */
    guide: {
      overline: "[ 10 ] Vibe Coding · La nostra guida",
      title: "Da dove partire? [Da qui.]",
      text: "Oltre 10 capitoli pratici per costruire app, automazioni e prototipi con l'AI, senza essere uno sviluppatore.",
      price: "5 €",
      bullets: [
        { icon: "briefcase", text: "Gli strumenti: Lovable, Cursor, Codex, Claude, Manus e gli altri" },
        { icon: "workflow", text: "Il flusso di lavoro completo, dall'idea al prodotto vivo" },
        { icon: "users", text: "Nell'Area Membri altre guide: prompt e reel con AI, gestione contatti e lead, video reel per ADV" },
      ] satisfies Array<{ icon: IconName; text: string }>,
      specs: [
        { icon: "book", label: "Guida in PDF", text: "Oltre 10 capitoli, dalla teoria all'azione" },
        { icon: "download", label: "Tua per sempre", text: "Download offline e accesso permanente all'Area Membri" },
        { icon: "zap", label: "Subito tra le mani", text: "Dopo il pagamento ricevi il link via email" },
        { icon: "film", label: "In arrivo", text: "Videocorso, audio overview e slide per capitolo" },
      ] satisfies Array<{ icon: IconName; label: string; text: string }>,
      primary: { label: "Scopri la Guida", href: "https://www.triskellecosystem.com/vibe-coding" },
      secondary: { label: "Leggi l'estratto gratuito", href: "https://www.triskellecosystem.com/risorse/vibe-coding-estratto" },
      skills: {
        overline: "[ Guida pratica · Claude Skills ]",
        title: "Ho smesso di scaricare Skill di Claude. Ora me le costruisco in 10 minuti.",
        link: { label: "Guarda il video", href: "https://www.youtube.com/watch?v=PW82OYD98Qg" },
      },
    },
    badges: ["Gratis", "Senza saper programmare", "Pensato per chi ha un'attività"],
    // TODO: collegare nel nuovo sito il modulo email (estratto PDF) e il checkout; per ora i pulsanti portano al sito originale.
    freeCta: { label: "Scarica l'estratto gratis", href: "https://www.triskellecosystem.com/risorse/vibe-coding-estratto" },
    buyCta: { label: "Leggi il libro completo", href: "https://www.triskellecosystem.com/vibe-coding" },
    ideasTitle: "Il libro in [6 idee]",
    ideasLine: "Leggi i titoli: bastano a farti un'idea. Tocca un punto per aprirlo.",
    ideas: [
      {
        title: "Le idee restano ferme",
        text: "Lo sviluppo tradizionale costa mesi prima di sapere se un'idea funziona. Preventivi, specifiche, passaggi di mano, attese: il costo vero non è solo economico, è tempo, energia e opportunità perse. La complessità tecnica ha reso lo sviluppo un territorio per pochi. Oggi nuovi strumenti stanno abbassando la barriera d'ingresso.",
      },
      {
        title: "Descrivi il risultato, l'AI scrive il codice",
        text: "È il passaggio dalla scrittura del codice all'orchestrazione dell'intento. Invece di dire al computer come fare ogni cosa, riga per riga, descrivi cosa vuoi ottenere. Conta meno la sintassi di un linguaggio, conta di più saper descrivere bene un problema e riconoscere quando la soluzione è giusta.",
      },
      {
        title: "Funziona a giri: chiedi, guardi, correggi",
        text: "Il processo non sparisce: diventa un giro di richieste, verifiche e correzioni che si ripete finché il risultato corrisponde all'obiettivo. Il giudizio finale resta sempre tuo.",
      },
      {
        title: "Lo strumento giusto dipende dalla fase",
        text: "Tre famiglie: dall'idea all'app, editor con l'AI dentro, agenti a cui delegare. I nomi degli strumenti cambiano in fretta, per questo il libro non ti dà «il migliore»: ti insegna a leggere la mappa.",
      },
      {
        title: "Cambiano i numeri di un'attività",
        text: "Il libro riporta una stima di costi di sviluppo più bassi del 20–40%. Tempo: una prima versione in ore o giorni invece che in mesi. Investimento iniziale: meno soldi da impegnare prima di avere risposte dal mercato. Produttività: più tempo su strategia e decisioni. Il vantaggio si sposta dal saper costruire al sapere che cosa vale la pena costruire.",
      },
      {
        title: "Velocità sì, ma con metodo",
        text: "Sicurezza, qualità e privacy non si saltano solo perché si fa prima. L'essere umano resta sempre dove si decide. Controlli prima di mettere online qualcosa. Prima il valore, poi lo strumento.",
      },
    ],
    faqTitle: "Domande [veloci]",
    faq: [
      { q: "L'estratto è davvero gratuito?", a: "Sì. Lasci la tua email e scarichi subito il PDF. Nessun pagamento, nessun abbonamento." },
      { q: "Serve saper programmare?", a: "No. Il libro è scritto per chi non è un programmatore: serve saper descrivere bene quello che vuoi ottenere." },
      { q: "Cosa c'è nel libro completo in più?", a: "Tutti e dieci i capitoli: il processo passo per passo, la mappa degli strumenti per ogni fase, i numeri, i rischi da controllare e il metodo per iniziare." },
      { q: "Come ricevo il libro dopo l'acquisto?", a: "Subito dopo il pagamento ricevi via email il link al PDF, e lo trovi sempre anche nella tua Area Membri Triskell." },
    ],
    disclaimer:
      "Riassunto a scopo informativo del libro «Vibe Coding» (Serie AI & Futuro, Vol. 1, 2026). Le stime economiche sono quelle riportate nel libro e vanno lette come ordini di grandezza, non come garanzie di risultato. I nomi degli strumenti citati sono marchi dei rispettivi proprietari; Triskell Ecosystem non è affiliata a nessuno di loro.",
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
      error: { title: "Qualcosa non ha funzionato", text: "Riprova tra poco, scrivici su WhatsApp o a" },
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
    tagline: "Migliora il tuo business con Triskell Ecosystem.",
    columns: [
      {
        title: "Esplora",
        links: [
          { label: "Home", href: "/" },
          { label: "Agency", href: "/agency" },
          { label: "Academy", href: "/academy" },
          { label: "Chi siamo", href: "/chi-siamo" },
          { label: "Contatti", href: "/contatti" },
        ],
      },
      {
        title: "Altro",
        links: [
          { label: "Siti web", href: "/agency/siti-web" },
          { label: "Portfolio", href: "/agency/portfolio" },
          { label: "Libretto Vibe Coding", href: "/vibe-coding" },
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
      { id: "instagram", label: "Instagram", href: "https://www.instagram.com/triskell_ecosystem" },
      { id: "youtube", label: "YouTube", href: "https://youtube.com/@triskellecosystem" },
      { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/393484301500" },
    ] satisfies Social[],
    legal: "P.IVA 00000000000", // TODO: dato reale (P.IVA / ragione sociale)
    rights: "Tutti i diritti riservati.",
  },

  a11y: {
    scrollProgress: "Avanzamento della pagina",
    home: "Triskell Ecosystem — vai alla home",
    toTop: "Torna su",
  },
};

export type Site = typeof site;
