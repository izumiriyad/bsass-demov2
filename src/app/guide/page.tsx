import type { Metadata } from "next";
import Link from "next/link";
import { guideSteps } from "@/components/bsl/trust-sections";

export const metadata: Metadata = { title: "New Member Guide" };

export default function GuidePage() {
  return <div className="px-3 py-5 sm:px-5"><section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">শুরু করুন</p><h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">New Member Guide</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-[#9ca3af]">Step-by-step onboarding for Bangladesh users: account, OTP, verification, deposit, responsible play and support.</p></section><section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{guideSteps.map((step, index)=><article key={step.title} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5"><span className="text-4xl">{step.emoji}</span><p className="mt-4 text-xs font-black text-[#ffdf19]">STEP {index+1}</p><h2 className="mt-1 text-xl font-black text-[#f0f0f0]">{step.title} <span className="text-sm text-[#9ca3af]">{step.bn}</span></h2><p className="mt-3 text-sm leading-6 text-[#9ca3af]">{step.body}</p></article>)}</section><div className="mt-5 flex flex-wrap gap-3"><Link href="/register" className="rounded-lg bg-[#ffdf19] px-5 py-3 text-sm font-black text-[#241a05]">Create Account</Link><Link href="/support" className="rounded-lg bg-[#242628] px-5 py-3 text-sm font-bold text-[#f0f0f0]">Need Help?</Link></div></div>;
}
