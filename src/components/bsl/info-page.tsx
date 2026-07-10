import Link from "next/link";

interface InfoPageProps { title: string; eyebrow: string; emoji: string; description: string; cards: { title: string; body: string; emoji: string }[]; cta?: string; }

export function InfoPage({ title, eyebrow, emoji, description, cards, cta = "Get Started" }: InfoPageProps) {
  return (
    <div className="px-3 py-5 sm:px-5 sm:py-7">
      <section className="relative overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 bsl-card-glow sm:p-8">
        <div className="absolute right-6 top-6 text-8xl opacity-20">{emoji}</div>
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#fbb70b]">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-black uppercase leading-tight text-[#f0f0f0] sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#9ca3af]">{description}</p>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/register" className="rounded-lg bg-gradient-to-b from-[#ffdd57] to-[#f4a700] px-5 py-3 text-sm font-black text-[#241a05]">{cta}</Link><Link href="/support" className="rounded-lg border border-[#3a3831] bg-[#242628] px-5 py-3 text-sm font-bold text-[#f0f0f0]">Contact Support</Link></div>
      </section>
      <section className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => <article key={card.title} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5 transition hover:-translate-y-1 hover:border-[#fbb70b]/60"><span className="text-3xl">{card.emoji}</span><h2 className="mt-3 text-lg font-black text-[#f0f0f0]">{card.title}</h2><p className="mt-2 text-sm leading-6 text-[#9ca3af]">{card.body}</p></article>)}
      </section>
    </div>
  );
}
