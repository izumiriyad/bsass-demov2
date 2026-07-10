import Link from "next/link";

export function LegalPage({ title, eyebrow, description, sections }: { title: string; eyebrow: string; description: string; sections: { title: string; body: string }[] }) {
  return (
    <div className="px-3 py-5 sm:px-5">
      <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 bsl-card-glow">
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#9ca3af]">{description}</p>
      </section>
      <section className="mt-5 space-y-3">
        {sections.map((section) => (
          <article key={section.title} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
            <h2 className="text-lg font-black text-[#f0f0f0]">{section.title}</h2>
            <p className="mt-2 text-sm leading-7 text-[#9ca3af]">{section.body}</p>
          </article>
        ))}
      </section>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/support" className="rounded-lg bg-[#008d5b] px-5 py-3 text-sm font-black text-white">Contact Support</Link>
        <Link href="/responsible-gaming" className="rounded-lg bg-[#242628] px-5 py-3 text-sm font-bold text-[#f0f0f0]">Responsible Gaming</Link>
      </div>
    </div>
  );
}
