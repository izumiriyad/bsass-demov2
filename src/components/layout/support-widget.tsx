"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Phone, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SupportWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-50 lg:bottom-6 lg:right-6 flex flex-col items-end">
      {open && (
        <div className="mb-4 w-72 overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] shadow-[0_15px_40px_rgba(0,0,0,0.8)] origin-bottom-right animate-in zoom-in-95">
          <div className="bg-gradient-to-br from-[#008d5b] to-[#00a86d] p-4 text-white flex justify-between items-start relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Headphones size={100} />
            </div>
            <div className="relative z-10">
              <h3 className="font-black text-lg leading-none tracking-tight">BSL Live Support</h3>
              <p className="text-xs opacity-90 mt-1 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                We reply in under 3 mins
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full bg-black/20 p-1.5 hover:bg-black/30 transition relative z-10">
              <X size={16} />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <Link href="https://wa.me/8801700000000" target="_blank" className="flex items-center gap-3 rounded-xl bg-[#25D366]/10 p-3 text-[#25D366] transition hover:bg-[#25D366]/20 active:scale-95">
              <Phone size={20} />
              <div>
                <p className="text-sm font-bold">WhatsApp</p>
                <p className="text-[11px]">Chat with an agent</p>
              </div>
            </Link>
            <Link href="https://t.me/bslsupport" target="_blank" className="flex items-center gap-3 rounded-xl bg-[#0088cc]/10 p-3 text-[#0088cc] transition hover:bg-[#0088cc]/20 active:scale-95">
              <Send size={20} />
              <div>
                <p className="text-sm font-bold">Telegram</p>
                <p className="text-[11px]">@bslsupport</p>
              </div>
            </Link>
            <Link href="/live-chat" className="flex items-center gap-3 rounded-xl bg-[#ffdf19]/10 p-3 text-[#ffdf19] transition hover:bg-[#ffdf19]/20 active:scale-95">
              <MessageCircle size={20} />
              <div>
                <p className="text-sm font-bold">Live Web Chat</p>
                <p className="text-[11px]">Direct website chat</p>
              </div>
            </Link>
          </div>
        </div>
      )}
      <button 
        onClick={() => setOpen(!open)}
        className={cn(
          "group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#008d5b] to-[#00a86d] p-3 text-white shadow-[0_10px_25px_rgba(0,141,91,0.4)] transition-all hover:scale-105 active:scale-95",
          open ? "pr-3" : "pr-5"
        )}
      >
        <div className="relative">
          {open ? <X size={24} /> : <MessageCircle size={24} />}
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffdf19] opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ffdf19]"></span>
            </span>
          )}
        </div>
        {!open && <span className="font-bold text-sm tracking-wide">Live Chat</span>}
      </button>
    </div>
  );
}
