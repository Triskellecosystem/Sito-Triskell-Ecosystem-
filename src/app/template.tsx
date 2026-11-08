/**
 * Transizione di pagina fluida: solo CSS (nessuna dipendenza da JS, LCP immediato).
 * `backwards` (non `both`): a fine animazione non resta alcun transform sul contenitore,
 * altrimenti romperebbe `position: fixed` (pin GSAP, header) dei discendenti.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[page-in_0.6s_var(--ease-out-expo)_backwards]">{children}</div>;
}
