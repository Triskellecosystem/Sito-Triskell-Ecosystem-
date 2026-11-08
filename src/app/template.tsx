/** Transizione di pagina fluida: solo CSS (nessuna dipendenza da JS, LCP immediato). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[page-in_0.6s_var(--ease-out-expo)_both]">{children}</div>;
}
