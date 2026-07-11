"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { Send, PhoneCall, X } from "lucide-react";

const QUICK_MESSAGES = [
  "Deposit not credited",
  "Withdrawal delay",
  "Bonus not received",
  "Account verification",
  "Game not loading",
  "Other issue",
];

type Msg = { from: "user" | "support"; text: string; time: string };

const now = () => new Date().toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" });

const AUTO_REPLIES: Record<string, string> = {
  "Deposit not credited": "Please provide your Transaction ID (TxID) and the amount. Our finance team will check and credit within 15 minutes.",
  "Withdrawal delay": "Withdrawals are processed within 30 minutes. If it's been longer, please share your withdrawal reference number and we'll escalate immediately.",
  "Bonus not received": "Please share your registered mobile number and the deposit amount. We'll verify and manually credit the bonus within 5 minutes.",
  "Account verification": "Please upload your NID (front + back) in Dashboard → Verification. Our KYC team reviews within 2–24 hours. For faster review, WhatsApp us your photos.",
  "Game not loading": "Please try: 1) Clear browser cache, 2) Disable VPN, 3) Try a different browser. If the issue persists, share the game name and your browser/device.",
  "Other issue": "Please describe your issue and we'll connect you to the right team member immediately.",
};

export default function LiveChatPage() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [messages, setMessages] = useState<Msg[]>([
    { from: "support", text: "🙏 Welcome to BSL Gaming Support! আমরা আপনাকে সাহায্য করতে প্রস্তুত। How can I help you today?", time: now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!user) { openModal("login"); return; }
    if (!text.trim()) return;

    const userMsg: Msg = { from: "user", text, time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = AUTO_REPLIES[text] || "Thank you for contacting BSL Gaming Support! A live agent will join this chat in under 5 minutes. Your ticket ID: #BSL-" + Math.floor(Math.random() * 9000 + 1000);
      setMessages((m) => [...m, { from: "support", text: reply, time: now() }]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px-64px)] px-0 sm:px-0 lg:px-0">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-[#2a2c30] bg-[#1b1c1e] px-4 py-3 flex-shrink-0">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#008d5b] to-[#005c3c] text-lg">
            🎧
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 rounded-full border-2 border-[#1b1c1e] bg-[#22c55e]" />
        </div>
        <div>
          <p className="text-sm font-black text-white">BSL Gaming Support</p>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[10px] text-[#22c55e] font-bold">12 agents online · Avg. 8 min response</span>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <a href="https://wa.me/01XXXXXXXXX" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2a2c30] bg-[#242628] text-sm transition hover:border-[#22c55e]/40 hover:text-[#22c55e]">
            💬
          </a>
          <a href="https://t.me/bslgaming" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2a2c30] bg-[#242628] text-sm transition hover:border-[#3b82f6]/40">
            ✈️
          </a>
        </div>
      </div>

      {/* Quick message chips */}
      <div className="border-b border-[#2a2c30] bg-[#121315] px-3 py-2 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {QUICK_MESSAGES.map((q) => (
            <button key={q} onClick={() => send(q)} className="shrink-0 rounded-full border border-[#2a2c30] bg-[#1b1c1e] px-3 py-1.5 text-[10px] font-bold text-[#9ca3af] hover:border-[#ffdf19]/30 hover:text-white transition whitespace-nowrap">
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#0d0f10]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
            {msg.from === "support" && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#008d5b] to-[#005c3c] text-xs">🎧</div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
              msg.from === "user"
                ? "rounded-tr-md bg-gradient-to-br from-[#008d5b] to-[#005c3c] text-white"
                : "rounded-tl-md bg-[#1b1c1e] border border-[#2a2c30] text-[#e0e0e0]"
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[9px] mt-1 ${msg.from === "user" ? "text-white/50 text-right" : "text-[#6b7280]"}`}>{msg.time}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#008d5b] to-[#005c3c] text-xs">🎧</div>
            <div className="rounded-2xl rounded-tl-md bg-[#1b1c1e] border border-[#2a2c30] px-4 py-3">
              <div className="flex gap-1 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9ca3af] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-[#9ca3af] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-[#9ca3af] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#2a2c30] bg-[#1b1c1e] px-3 py-3 flex-shrink-0">
        {!user ? (
          <button onClick={() => openModal("login")} className="w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400]">
            Login to Start Chatting →
          </button>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white placeholder:text-[#6b7280] outline-none focus:border-[#ffdf19]/50"
            />
            <button type="submit" disabled={!input.trim()} className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008d5b] text-white transition hover:bg-[#00a86d] disabled:opacity-40">
              <Send size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
