import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Self Assessment" };

const questions = [
  "Do you ever play longer than planned?",
  "Do you chase losses after a losing bet?",
  "Do you hide betting activity from family or friends?",
  "Have you borrowed money to continue playing?",
  "Do you feel stressed when you cannot bet?",
  "Have betting expenses affected bills or savings?",
];

export default function SelfAssessmentPage() {
  return (
    <div className="px-3 py-5 sm:px-5">
      <section className="rounded-2xl border border-[#ffdf19]/30 bg-[#ffdf19]/5 p-6">
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Responsible Gaming</p>
        <h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">Self Assessment</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#9ca3af]">A responsible-gaming checklist UI. This is not medical advice; if gambling causes stress or harm, take a break and contact support or a qualified professional.</p>
      </section>
      <section className="mt-5 space-y-3">
        {questions.map((question, index) => (
          <article key={question} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
            <p className="text-xs font-black text-[#ffdf19]">Question {index + 1}</p>
            <h2 className="mt-2 text-lg font-black text-[#f0f0f0]">{question}</h2>
            <div className="mt-4 flex gap-2"><button className="rounded-lg bg-[#242628] px-4 py-2 text-sm font-bold text-[#f0f0f0]">No</button><button className="rounded-lg bg-[#ef4444]/15 px-4 py-2 text-sm font-bold text-[#ef4444]">Yes</button></div>
          </article>
        ))}
      </section>
      <div className="mt-5 flex flex-wrap gap-3"><Link href="/dashboard/limits" className="rounded-lg bg-[#008d5b] px-5 py-3 text-sm font-black text-white">Set Limits</Link><Link href="/account-closure" className="rounded-lg bg-[#ef4444] px-5 py-3 text-sm font-black text-white">Self-exclusion</Link><Link href="/support" className="rounded-lg bg-[#242628] px-5 py-3 text-sm font-bold text-[#f0f0f0]">Talk to Support</Link></div>
    </div>
  );
}
