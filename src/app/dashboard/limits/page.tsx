import type { Metadata } from "next";
import { AlertTriangle, Clock, PauseCircle, Shield } from "lucide-react";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Responsible Gaming Limits" };

const limits = [
  { label: "Daily deposit limit", value: "৳20,000", helper: "Maximum add-money amount per 24 hours" },
  { label: "Weekly loss limit", value: "৳35,000", helper: "Stops play once net loss reaches this value" },
  { label: "Session reminder", value: "60 min", helper: "Reminder toast after continuous play" },
];

export default async function LimitsPage() {
  const user = await getSessionUser();
  if (!user) return null;
  return (
    <div className="space-y-5">
      <div><h1 className="text-xl font-bold text-[#f0f0f0] sm:text-2xl">Responsible Gaming Limits</h1><p className="text-sm text-[#9ca3af]">Safety controls for Bangladesh users before real-money backend integration.</p></div>
      <div className="rounded-xl border border-[#ffdf19]/25 bg-[#ffdf19]/5 p-4 text-sm leading-6 text-[#d8d2bf]"><AlertTriangle className="mb-2 text-[#ffdf19]" /> Set limits before you play. If gambling stops being fun, take a break and contact support.</div>
      <section className="grid gap-3 md:grid-cols-3">{limits.map((item)=><article key={item.label} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4"><p className="text-xs font-semibold uppercase text-[#9ca3af]">{item.label}</p><p className="mt-2 text-2xl font-black text-[#ffdf19]">{item.value}</p><p className="mt-2 text-xs leading-5 text-[#9ca3af]">{item.helper}</p></article>)}</section>
      <section className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4"><div className="mb-4 flex items-center gap-3"><Shield className="text-[#008d5b]"/><div><h2 className="text-lg font-black text-[#f0f0f0]">Update Limits</h2><p className="text-xs text-[#9ca3af]">Changes that increase limits should include cooling-off periods in production.</p></div></div><form className="grid gap-4 md:grid-cols-3"><label className="space-y-1.5"><span className="text-sm font-semibold text-[#9ca3af]">Daily deposit</span><input type="number" className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] outline-none focus:border-[#008d5b]" placeholder="20000" /></label><label className="space-y-1.5"><span className="text-sm font-semibold text-[#9ca3af]">Weekly loss</span><input type="number" className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] outline-none focus:border-[#008d5b]" placeholder="35000" /></label><label className="space-y-1.5"><span className="text-sm font-semibold text-[#9ca3af]">Session reminder</span><select className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] outline-none focus:border-[#008d5b]"><option>30 minutes</option><option>60 minutes</option><option>90 minutes</option><option>120 minutes</option></select></label><button type="button" className="md:col-span-3 rounded-lg bg-[#008d5b] px-5 py-3 text-sm font-black text-white">Save Responsible Gaming Limits</button></form></section>
      <section className="grid gap-3 md:grid-cols-2"><article className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4"><Clock className="text-[#ffdf19]"/><h3 className="mt-3 font-black text-[#f0f0f0]">24-hour cooling-off</h3><p className="mt-2 text-sm leading-6 text-[#9ca3af]">Temporarily lock deposits and gameplay for one day.</p><button className="mt-3 rounded-lg bg-[#242628] px-4 py-2 text-sm font-bold text-[#f0f0f0]">Start Cooling-off</button></article><article className="rounded-xl border border-[#ef4444]/30 bg-[#ef4444]/5 p-4"><PauseCircle className="text-[#ef4444]"/><h3 className="mt-3 font-black text-[#f0f0f0]">Self-exclusion</h3><p className="mt-2 text-sm leading-6 text-[#9ca3af]">Production backend should immediately block login/deposit/gameplay for selected duration.</p><button className="mt-3 rounded-lg bg-[#ef4444] px-4 py-2 text-sm font-bold text-white">Request Self-exclusion</button></article></section>
    </div>
  );
}
