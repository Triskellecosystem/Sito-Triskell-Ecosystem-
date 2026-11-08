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

export interface Path {
  name: string;
  tagline: string;
  steps: PathStep[];
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
  text: string;
}

export interface ProcessStep {
  title: string;
  text: string;
  icon: IconName;
  /** 3 punti brevi: cosa succede in questo step. */
  points: string[];
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
  headline: string;
  bio: string;
  facts: Array<{ value: string; label: string }>;
  /** Tappe del percorso professionale, mostrate "ad espansione". */
  curriculum: string[];
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
      { label: "Home", href: "/" },
      {
        label: "Agency",
        href: "/agency",
        children: [
          { label: "Agency", href: "/agency", hint: "Deleghi tutto a noi" },
          { label: "Siti web", href: "/agency/siti-web", hint: "I siti realizzati da William" },
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
    overline: "Marketing · AI · Automazioni",
    titleLines: ["Più clienti.", "Più guadagni."],
    titleAccent: "Tutto automatizzato.",
    subtitle: "Fai crescere il tuo business: lo facciamo noi, o ti insegniamo come.",
    primaryCta: { label: "Scopri Agency", href: "/agency" },
    secondaryCta: { label: "Scopri Academy", href: "/academy" },
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

  ecosystem: {
    overline: "L'ecosistema",
    title: "Cos'è [Triskell Ecosystem]?",
    description:
      "Triskell Ecosystem è un ecosistema che unisce marketing, intelligenza artificiale, automazioni e formazione. Ti aiutiamo a trovare più clienti, a far lavorare meglio la tua azienda e a crescere: puoi delegarci tutto, oppure imparare a farlo da solo.", // TODO: conferma copy
    sectorsLabel: "I nostri settori",
    sectors: [
      { label: "Marketing", icon: "megaphone" },
      { label: "Intelligenza artificiale", icon: "cpu" },
      { label: "Automazioni", icon: "workflow" },
      { label: "Formazione", icon: "graduation" },
    ] satisfies Array<{ label: string; icon: IconName }>,
    nodeLabel: "Triskell Ecosystem",
    nodeHint: "Due rami principali",
    or: "oppure",
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
      points: ["Percorsi pratici su marketing e AI", "Per te, in prima persona", "Per i tuoi dipendenti"],
      cta: { label: "Scopri Academy", href: "/academy" },
    },
  },

  paths: {
    overline: "Passo dopo passo",
    title: "Cosa ottieni, [step dopo step]",
    line: "Agency o Academy: ecco cosa succede, in modo semplice.",
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
      { icon: "zap", label: "Piano su misura" },
    ] satisfies Array<{ icon: IconName; label: string }>,
    home: { title: "Sei curioso?", text: "Parliamone insieme: troviamo la soluzione migliore per te." } satisfies CtaContent,
    results: { title: "Vuoi risultati come questi?", text: "Prenota ora la tua call gratuita." } satisfies CtaContent,
    agency: { title: "Vuoi delegarci tutto il lato marketing?", text: "Prenota una call gratuita: capiamo la tua situazione e ti diciamo cosa possiamo fare." } satisfies CtaContent,
    academy: { title: "Vuoi far crescere la tua attività in modo indipendente?", text: "Prenota ora: ti diciamo da dove iniziare." } satisfies CtaContent,
    generic: { title: "Pronto a far crescere il tuo business?", text: "Prenota ora una call gratuita con il team." } satisfies CtaContent,
  },

  agencyPage: {
    overline: "Agency",
    title: "Non pensare a niente: [deleghi tutto a noi]",
    line: "Strategia, social, campagne, siti e automazioni: ci pensiamo noi dall'inizio ai risultati.",
    pathTitle: "Il tuo funnel, [gestito da noi]",
    pathLine: "Ecco cosa facciamo, step dopo step.",
    servicesTitle: "Cosa possiamo fare [per te]",
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
      handle: "palestra.esempio",
      name: "Palestra Esempio",
      category: "Palestra · Fitness",
      stats: [
        { value: "128", label: "post" },
        { value: "12,4 K", label: "follower" },
        { value: "310", label: "seguiti" },
      ],
      gain: "+312 follower questa settimana",
      requestsLabel: "Richieste oggi",
      chat: [
        { who: "Marco", text: "Ciao! Vorrei info sugli abbonamenti" },
        { who: "Giulia", text: "Posso prenotare una prova gratuita?" },
        { who: "Luca", text: "Avete corsi la sera?" },
        { who: "Sara", text: "Quanto costa il pacchetto 3 mesi?" },
      ],
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
    videosTitle: "Guarda i [tutorial]",
    videosLine: "Video pratici su marketing, AI e automazioni.",
    /** Anteprima di una lezione: dati INVENTATI a scopo dimostrativo. */
    demo: {
      note: "Esempio dimostrativo",
      lesson: "Lezione 3 · Il funnel di vendita",
      modules: ["Processi di vendita", "Marketing", "Intelligenza artificiale", "Automazioni"],
      progress: "Percorso completato",
      badge: "Ora sei autonomo",
    }, // TODO: dato reale
  },
  sitiWeb: {
    overline: "Agency · Siti web",
    title: "Siti web firmati [William]",
    line: "I siti realizzati dal nostro web developer.",
    soon: "Presto online",
    visit: "Visita il sito",
    items: [
      { name: "Sito da pubblicare", category: "Fitness", url: null },
      { name: "Sito da pubblicare", category: "Wellness", url: null },
      { name: "Sito da pubblicare", category: "Servizi", url: null },
      { name: "Sito da pubblicare", category: "Attività locale", url: null },
      { name: "Sito da pubblicare", category: "E-commerce", url: null },
      { name: "Sito da pubblicare", category: "Professionista", url: null },
    ] satisfies Array<{ name: string; category: string; url: string | null }>, // TODO: dato reale (nome, settore, link e screenshot di ogni sito)
  },

  portfolio: {
    overline: "Agency · Portfolio",
    title: "Progetti e [risultati]",
    line: "Alcuni lavori, con i loro numeri.",
  },

  contatti: {
    overline: "Contatti",
    title: "Prenota [ora]",
    line: "Una call gratuita per capire insieme da dove partire.",
  },

  process: {
    overline: "Il nostro metodo",
    title: "Come [lavoriamo]",
    line: "Quattro passi, dalla prima call ai risultati.",
    steps: [
      { title: "Analisi", text: "Capiamo obiettivi, risorse e opportunità.", icon: "search", points: ["Obiettivi e budget", "Situazione di partenza", "Concorrenti e mercato"] }, // TODO: conferma copy
      { title: "Strategia", text: "Progettiamo il piano più adatto al tuo business.", icon: "compass", points: ["Canali e messaggi", "Piano e priorità", "Tempi e obiettivi"] },
      { title: "Produzione", text: "Creiamo contenuti, siti e automazioni.", icon: "clapperboard", points: ["Contenuti e video AI", "Siti e campagne", "Automazioni attive"] },
      { title: "Risultati", text: "Misuriamo, ottimizziamo e scaliamo.", icon: "trending", points: ["Report chiari", "Test e ottimizzazione", "Crescita costante"] },
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
    soon: "In arrivo",
    play: "Guarda il video",
    tutorials: [
      { title: "AI per il tuo business", tag: "Tutorial", duration: "—", youtubeId: null }, // TODO: dato reale (titolo e ID YouTube)
      { title: "Video con l'intelligenza artificiale", tag: "Tutorial", duration: "—", youtubeId: null }, // TODO: dato reale
      { title: "Automazioni senza codice", tag: "Percorso", duration: "—", youtubeId: null }, // TODO: dato reale
    ] satisfies Tutorial[],
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
    overline: "Chi siamo",
    title: "Competenza costruita [sul campo]",
    line: "Un team che il settore lo ha già vissuto da dentro.",
    more: "Leggi il percorso",
    less: "Chiudi il percorso",
    team: [
      {
        name: "Tomaso",
        role: "Founder · Marketing e strategia",
        headline: "10 anni di marketing, partito dentro le agenzie",
        bio: "Ha imparato il mestiere sul campo: prima per altre agenzie, poi ha deciso di costruire qualcosa di suo.",
        facts: [
          { value: "10", label: "anni di esperienza" },
          { value: "50+", label: "clienti gestiti" },
          { value: "10.000 €", label: "al giorno in campagne" },
        ],
        curriculum: [
          "Inizia a lavorare nel marketing digitale per altre agenzie",
          "Gestisce campagne politiche, anche da 10.000 € al giorno",
          "Segue più di 50 clienti in contemporanea",
          "Mette a punto un metodo basato su funnel, dati e automazioni",
          "Decide di creare qualcosa di suo: nasce Triskell Ecosystem",
        ],
        initials: "T",
      },
      {
        name: "William",
        role: "Web developer",
        headline: "Siti veloci, curati e pensati per far contattare",
        bio: "Costruisce siti, CRM e strumenti su misura, con un occhio fisso a velocità e risultati.",
        facts: [
          { value: "5+", label: "anni di sviluppo web" },
          { value: "40+", label: "siti realizzati" },
          { value: "100", label: "obiettivo performance" },
        ],
        curriculum: [
          "Inizia a sviluppare siti web per professionisti e attività locali",
          "Passa a progetti più strutturati: e-commerce e applicazioni",
          "Si specializza in performance, SEO tecnica e accessibilità",
          "Costruisce CRM e automazioni su misura per i clienti",
          "Oggi cura tutta la parte tecnica di Triskell Ecosystem",
        ],
        initials: "W",
      },
    ] satisfies TeamMember[], // TODO: dato reale (curriculum, numeri e foto: testi segnaposto da correggere)
  },
  vibeCoding: {
    overline: "Altro · Risorsa gratuita · PDF di 10 pagine",
    title: "Il libretto sul [Vibe Coding]",
    line: "Come si costruiscono siti e app descrivendo all'intelligenza artificiale cosa vuoi ottenere.",
    coverAlt: "Copertina del libro «Vibe Coding»",
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
    stepsTitle: "Prova il percorso, [passo per passo]",
    stepsLine: "Tocca un passo per vedere cosa fai tu e cosa fa l'AI.",
    youLabel: "Cosa fai tu",
    aiLabel: "Cosa fa l'AI",
    steps: [
      { n: "Idea", you: "Definisci obiettivo, contesto e vincoli: per chi è, cosa deve fare, cosa non deve fare.", ai: "Niente, per ora: qui decidi tu.", ex: "Esempio: «Un modulo di prenotazione per il mio studio, 4 fasce orarie al giorno»." },
      { n: "Richiesta", you: "Descrivi il risultato che vuoi, con parole semplici e precise.", ai: "Interpreta che cosa intendi.", ex: "Più la richiesta è chiara, migliore è la prima versione." },
      { n: "Prima versione", you: "Guardi cosa è uscito.", ai: "Costruisce struttura e codice.", ex: "In minuti, non in settimane: è qui che il Vibe Coding fa la differenza." },
      { n: "Revisione", you: "Dai indicazioni, chiedi modifiche.", ai: "Corregge e migliora.", ex: "«Il pulsante più grande, aggiungi il campo telefono»: si ripete finché serve." },
      { n: "Verifica", you: "Controlli qualità, sicurezza, coerenza.", ai: "Aiuta a trovare gli errori.", ex: "È il passaggio che non si salta: il giudizio resta tuo." },
      { n: "Online", you: "Metti online per davvero.", ai: "Prepara il rilascio.", ex: "Dall'idea al prodotto usabile, con meno intermediari." },
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
      { id: "instagram", label: "Instagram", href: "https://www.instagram.com/" }, // TODO: profilo reale
      { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" }, // TODO: profilo reale
      { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/" }, // TODO: profilo reale
      { id: "youtube", label: "YouTube", href: "https://www.youtube.com/" }, // TODO: profilo reale
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
