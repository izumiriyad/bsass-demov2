import type { Metadata } from "next";
import { Activity, BarChart3, PieChart, Target } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { formatBDT } from "@/lib/utils";

export const metadata: Metadata = { title: "Analytics" };

const daily = [42, 68, 51, 83, 57, 91, 74];
const categories = [
  { label: "Sports", value: 45, color: "#22c55e" },
  { label: "Casino", value: 24, color: "#f43f5e" },
  { label: "Slots", value: 21, color: "#a855f7" },
  { label: "Crash", value: 10, color: "#ffdf19" },
];

export default async function AnalyticsPage() {
  const user = await getSessionUser();
  if (!user) return null;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#f0f0f0] sm:text-2xl">Account Analytics</h1>
        <p className="text-sm text-[#9ca3af]">Frontend charts for staking, category split, wallet flow and responsible-gaming insight.</p>
      </div>

      <section className="grid gap-3 md:grid-cols-4">
        {[
          { label: "Weekly Stake", value: formatBDT(18450), icon: BarChart3, color: "#ffdf19" },
          { label: "Net Result", value: formatBDT(3260), icon: Activity, color: "#22c55e" },
          { label: "Top Category", value: "Sports", icon: Target, color: "#3b82f6" },
          { label: "Risk Score", value: "Low", icon: PieChart, color: "#008d5b" },
        ].map((stat) => { const Icon = stat.icon; return <article key={stat.label} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4"><Icon style={{color:stat.color}}/><p className="mt-3 text-xs text-[#9ca3af]">{stat.label}</p><p className="mt-1 text-xl font-black text-[#f0f0f0]">{stat.value}</p></article>; })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_.7fr]">
        <article className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <h2 className="text-sm font-black uppercase text-[#f0f0f0]">7-Day Activity</h2>
          <div className="mt-6 flex h-64 items-end gap-3 rounded-xl bg-[#121315] p-4">
            {daily.map((value, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-lg bg-gradient-to-t from-[#008d5b] to-[#ffdf19]" style={{height:`${value}%`}} /><span className="text-xs font-bold text-[#9ca3af]">D{index+1}</span></div>)}
          </div>
        </article>
        <article className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <h2 className="text-sm font-black uppercase text-[#f0f0f0]">Category Split</h2>
          <div className="mt-5 space-y-4">{categories.map((cat)=><div key={cat.label}><div className="mb-1 flex justify-between text-sm"><span className="font-bold text-[#f0f0f0]">{cat.label}</span><span className="text-[#9ca3af]">{cat.value}%</span></div><div className="h-2 rounded-full bg-[#121315]"><div className="h-full rounded-full" style={{width:`${cat.value}%`,background:cat.color}} /></div></div>)}</div>
        </article>
      </section>
    </div>
  );
}
