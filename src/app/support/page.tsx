"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { CheckCircle2, Clock, MessageSquare, Plus } from "lucide-react";

const DEMO_TICKETS = [
  { id: "#BSL-2891", subject: "Withdrawal pending for 2 hours", category: "Withdrawal", status: "Resolved", date: "Today, 9:14 AM", msgs: 4 },
  { id: "#BSL-2750", subject: "Bonus not credited after deposit", category: "Bonus", status: "Pending", date: "Yesterday", msgs: 2 },
  { id: "#BSL-2610", subject: "Account verification (NID upload)", category: "Account", status: "Resolved", date: "3 days ago", msgs: 6 },
];

const CATEGORIES = ["Account", "Deposit", "Withdrawal", "Bonus", "Game Issue", "Technical", "Other"];

export default function SupportPage() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [tab, setTab] = useState<"new" | "tickets">("new");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { openModal("login"); return; }
    setSubmitted(true);
    toast.success("Ticket submitted! We'll respond within 15 minutes via live chat.");
    setTimeout(() => setTab("tickets"), 2000);
  };

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b1c1e] to-[#242628] border border-[#2a2c30] p-6">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#ffdf19]/5 blur-xl" />
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19] mb-1">24/7 Support</p>
          <h1 className="text-2xl font-black text-white">Customer Support</h1>
          <p className="mt-2 text-sm text-[#9ca3af]">Submit a ticket and our team will respond within 15 minutes.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 px-3 py-1 text-xs font-bold text-[#22c55e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" /> 12 agents online
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 px-3 py-1 text-xs font-bold text-[#3b82f6]">
              ⚡ Avg. 8 min response
            </span>
          </div>
        </div>
      </div>

      {/* Quick contact */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "WhatsApp", emoji: "💬", note: "Fastest", color: "#22c55e" },
          { label: "Telegram", emoji: "✈️", note: "24/7", color: "#3b82f6" },
          { label: "Live Chat", emoji: "🎧", note: "On site", color: "#ffdf19" },
          { label: "Email", emoji: "📧", note: "2-4hr", color: "#6366f1" },
        ].map((c) => (
          <button
            key={c.label}
            className="flex flex-col items-center gap-2 rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 text-center transition hover:border-[#ffdf19]/30 hover:-translate-y-0.5"
          >
            <span className="text-3xl">{c.emoji}</span>
            <div>
              <p className="text-xs font-black text-white">{c.label}</p>
              <p className="text-[10px]" style={{ color: c.color }}>{c.note}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#2a2c30]">
        {[
          { id: "new", label: "New Ticket", icon: <Plus size={14} /> },
          { id: "tickets", label: "My Tickets", icon: <MessageSquare size={14} /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as "new" | "tickets")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-black border-b-2 transition ${
              tab === t.id
                ? "border-[#ffdf19] text-[#ffdf19]"
                : "border-transparent text-[#6b7280] hover:text-white"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* New ticket form */}
      {tab === "new" && (
        <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle2 size={48} className="text-[#22c55e]" />
              <p className="text-lg font-black text-white">Ticket Submitted!</p>
              <p className="text-sm text-[#9ca3af]">Ticket #BSL-2892 created. We'll reply within 15 minutes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#9ca3af]">Category</label>
                  <select required className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white outline-none focus:border-[#ffdf19]/50">
                    <option value="">Select a category...</option>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#9ca3af]">Priority</label>
                  <select className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white outline-none focus:border-[#ffdf19]/50">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent (Withdrawal blocked)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#9ca3af]">Subject</label>
                <input required type="text" placeholder="Brief summary of your issue..." className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white placeholder:text-[#6b7280] outline-none focus:border-[#ffdf19]/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#9ca3af]">Description</label>
                <textarea required rows={5} placeholder="Describe your issue in detail. Include transaction IDs, amounts, and any error messages..." className="w-full resize-none rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white placeholder:text-[#6b7280] outline-none focus:border-[#ffdf19]/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#9ca3af]">Your Mobile Number</label>
                <input type="tel" placeholder="01XXXXXXXXX" className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white placeholder:text-[#6b7280] outline-none focus:border-[#ffdf19]/50" />
              </div>
              <button type="submit" className="w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3.5 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110 active:scale-[.98]">
                Submit Ticket →
              </button>
            </form>
          )}
        </div>
      )}

      {/* Ticket list */}
      {tab === "tickets" && (
        <div>
          {!user ? (
            <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-8 text-center">
              <p className="text-sm text-[#9ca3af] mb-3">Login to view your support tickets</p>
              <button onClick={() => openModal("login")} className="rounded-xl bg-[#ffdf19] px-5 py-2.5 text-sm font-black text-[#241a05]">Login</button>
            </div>
          ) : (
            <div className="space-y-3">
              {DEMO_TICKETS.map((t) => (
                <div key={t.id} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold text-[#6b7280]">{t.id}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${t.status === "Resolved" ? "bg-[#22c55e]/10 text-[#22c55e]" : "bg-[#f59e0b]/10 text-[#f59e0b]"}`}>
                          {t.status === "Resolved" ? <><CheckCircle2 size={9} className="inline mr-0.5" />{t.status}</> : <><Clock size={9} className="inline mr-0.5" />{t.status}</>}
                        </span>
                      </div>
                      <p className="text-sm font-black text-white">{t.subject}</p>
                      <p className="text-[10px] text-[#6b7280] mt-0.5">{t.category} · {t.date}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-[#6b7280] shrink-0">
                      <MessageSquare size={12} /> {t.msgs}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
