/**
 * Conoscenza dell'assistente Triskello: costruita dai contenuti reali del sito (site.ts).
 * Serve due cose: il "system prompt" per il modello AI (route /api/assistant) e una versione di riserva a regole
 * (`localAnswer`) che risponde in modo sensato anche senza chiave AI o se il servizio non risponde.
 * Regola d'oro: niente numeri, prezzi o promesse inventati; per tutto il resto si rimanda al team.
 */
import { site } from "@/content/site";

export const ASSISTANT_NAME = "Triskello";

export const GREETING = `Ciao! Sono ${ASSISTANT_NAME}, l'assistente AI di Triskell Ecosystem. Ti aiuterò a muoverti all'interno del sito. Se hai qualche domanda sarò lieto di aiutarti.`;

export const QUICK_REPLIES = ["Cosa fate?", "Voglio più clienti", "Parlami dell'Academy", "Come ti contatto?"];

const services = site.agencyPage.services.map((s) => s.title).join(", ");
const phone = site.brand.phone;
const mail = site.brand.email;

export function systemPrompt(): string {
  return `Sei ${ASSISTANT_NAME}, il simpatico assistente AI (un piccolo robot) del sito di Triskell Ecosystem. Parli sempre in italiano, con tono caldo, chiaro e professionale, in risposte brevi (massimo 4-5 frasi). Aiuti i visitatori a capire cosa offre Triskell Ecosystem e a muoversi nel sito.

CHI SIAMO. Triskell Ecosystem unisce marketing, intelligenza artificiale, automazioni e formazione. Slogan: "${site.brand.slogan}". Fondatore: Tomaso Forno (marketing, advertising e AI, oltre 10 anni di esperienza, oltre 50 clienti seguiti, oltre 100K lead generati, oltre 5 milioni di euro di budget pubblicitario gestito). Web designer e creative developer: William Argintieri (fondatore di LyamFlow, si occupa dei siti). Più di 70 progetti per clienti.

DUE STRADE. 1) Agency: ci pensiamo noi a far crescere la tua attività. Servizi: ${services}. 2) Academy (triskellacademy.com): imparare in prima persona o far imparare i dipendenti; corsi gratuiti su AI, marketing, vibe coding, Claude, ChatGPT e Codex. Si possono anche combinare.

PAGINE DEL SITO (usa link in formato [testo](/percorso)): [Agency](/agency), [Academy](/academy), [Siti web](/agency/siti-web), [Portfolio e casi clienti](/agency/portfolio), [Chi siamo](/chi-siamo), [Risorse gratuite](/risorse), [Libretto Vibe Coding](/vibe-coding), [Blog](/blog), [Prenota una call](/contatti), [Privacy](/privacy), [Cookie](/cookie).

CONTATTI. Email ${mail}; WhatsApp ${phone}; Instagram @triskell_ecosystem; YouTube @triskellecosystem. La prima call è gratuita (30 minuti, senza impegno).

REGOLE. Non inventare MAI prezzi, tariffe, tempi, risultati o garanzie: i costi dipendono dagli obiettivi e si definiscono dopo la call gratuita. Se non sai una cosa o la domanda è fuori tema, dillo con gentilezza e proponi di scrivere al team (WhatsApp o email) o di prenotare la call. Non dare consulenza legale, medica o finanziaria. Non chiedere dati sensibili. Se chiedono chi sei: sei un assistente AI, non una persona.`;
}

interface Rule {
  re: RegExp;
  answer: string;
}

const RULES: Rule[] = [
  { re: /\b(ciao|salve|buongiorno|buonasera|hey|ehi)\b/i, answer: "Ciao! Dimmi pure cosa cerchi: posso spiegarti cosa facciamo, accompagnarti verso l'Agency o l'Academy, o aiutarti a prenotare una call gratuita." },
  { re: /(chi (sei|siete)|come ti chiami|sei (un )?(robot|umano|persona)|bot)/i, answer: `Sono ${ASSISTANT_NAME}, l'assistente AI di Triskell Ecosystem: un piccolo robot che ti aiuta a orientarti nel sito. Per tutto il resto, c'è il team vero, che trovi in [Chi siamo](/chi-siamo).` },
  { re: /(prezz|costo|costi|quanto costa|tariff|preventiv|budget)/i, answer: "I costi dipendono dai tuoi obiettivi e da cosa serve davvero, quindi non do cifre a caso: ti prepariamo un piano con costi chiari dopo una call. La prima è gratuita e senza impegno: [prenotala qui](/contatti)." },
  { re: /(cosa fate|che cosa fate|di cosa vi occupate|servizi|cosa offrite|cos'è triskell|cos è triskell)/i, answer: `Triskell Ecosystem unisce marketing, intelligenza artificiale, automazioni e formazione. Con l'[Agency](/agency) ci pensiamo noi: ${services}. Con l'[Academy](/academy) impari a farlo da solo. Puoi anche combinare le due strade.` },
  { re: /(clienti|lead|contatti|vendite|fatturato|crescere|crescita|pubblicit|ads|meta|google ads|campagn|marketing)/i, answer: "Per portare più clienti lavoriamo su campagne Meta Ads e Google Ads, social, siti, CRM e automazioni che seguono i contatti fino alla vendita. Guarda i [casi clienti](/agency/portfolio) con numeri reali, poi [prenota una call gratuita](/contatti): ti diciamo cosa possiamo fare nel tuo caso." },
  { re: /(academy|corso|corsi|formazione|imparare|lezion|dipendenti|certificat|quiz)/i, answer: "L'[Academy](/academy) ha corsi pratici e gratuiti su AI, marketing, vibe coding, Claude, ChatGPT e Codex, per te o per i tuoi dipendenti, con quiz e certificato dove previsto. Entri direttamente da [triskellacademy.com](https://triskellacademy.com/)." },
  { re: /(sito|siti|web|landing|sviluppo|william|lyamflow)/i, answer: "I siti li cura William: veloci, curati e pensati per farti contattare. Guarda quelli che abbiamo creato in [Siti web](/agency/siti-web): clicchi su uno e lo visiti. Se vuoi il tuo, [prenota una call](/contatti)." },
  { re: /(portfolio|casi|esempi|risultat|referenz|progetti|lavori)/i, answer: "Nel [Portfolio](/agency/portfolio) trovi 7 casi di clienti reali (fitness, wellness, salute, formazione): clicca su uno per vedere da dove siamo partiti, cosa abbiamo fatto e i risultati." },
  { re: /(prenot|call|consulenz|appuntament|parlare|chiamat)/i, answer: `Puoi prenotare una [call gratuita](/contatti): 30 minuti, senza impegno. Se preferisci, scrivici su WhatsApp al ${phone} o a ${mail}.` },
  { re: /(contatt|whatsapp|telefon|numero|email|mail|instagram|youtube|social|seguirv)/i, answer: `Ecco come trovarci: WhatsApp ${phone}, email ${mail}, Instagram @triskell_ecosystem, YouTube @triskellecosystem. Tutti i recapiti sono anche in fondo a [Chi siamo](/chi-siamo).` },
  { re: /(blog|articol|risors|guide gratuit)/i, answer: "Nel [Blog](/blog) trovi approfondimenti su AI, business e innovazione; nelle [Risorse gratuite](/risorse) tutorial, prompt, workflow e guide rapide dietro i nostri video." },
  { re: /(vibe|libr|guida|pdf|ebook|app senza programmare|codice)/i, answer: "Il [Libretto Vibe Coding](/vibe-coding) è una guida in PDF di oltre 10 capitoli per costruire siti e app con l'AI senza saper programmare: puoi anche leggere un estratto gratuito." },
  { re: /(tomaso|tommaso|founder|fondatore|team|chi siamo)/i, answer: "Il team principale è formato da Tomaso Forno (marketing, advertising e AI, da più di 10 anni nel settore) e William Argintieri (web design e sviluppo). Li conosci meglio in [Chi siamo](/chi-siamo)." },
  { re: /(privacy|dati personali|cookie|gdpr)/i, answer: "Trovi tutto nella [Privacy Policy](/privacy) e nella [Cookie Policy](/cookie). Se hai una richiesta sui tuoi dati scrivici a " + mail + "." },
  { re: /(grazie|perfetto|ottimo|ok\b)/i, answer: "Di niente! Se ti serve altro sono qui. Quando vuoi, puoi [prenotare una call gratuita](/contatti)." },
];

export function localAnswer(question: string): string {
  const q = question.trim();
  for (const r of RULES) if (r.re.test(q)) return r.answer;
  return `Non sono sicuro di aver capito, ma posso aiutarti a orientarti: [Agency](/agency) se vuoi delegarci il marketing, [Academy](/academy) se vuoi imparare, [Portfolio](/agency/portfolio) per vedere i risultati. Per una risposta su misura scrivici su WhatsApp al ${phone} o [prenota una call gratuita](/contatti).`;
}
