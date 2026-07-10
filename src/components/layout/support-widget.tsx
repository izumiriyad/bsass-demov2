"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SupportWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-50 lg:bottom-6 lg:right-6">
      {open && (
        <div className="mb-4 w-72 overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] shadow-2xl origin-bottom-right animate-in zoom-in-95">
          <div className="bg-gradient-to-r from-[#008d5b] to-[#00a86d] p-4 text-white flex justify-between items-center">
            <div>
              <h3 className="font-black text-sm">24/7 Support</h3>
              <p className="text-xs opacity-90">Usually replies in 3 minutes</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full bg-black/20 p-1 hover:bg-black/30">
              <X size={16} />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <Link href="https://wa.me/8801700000000" target="_blank" className="flex items-center gap-3 rounded-xl bg-[#25D366]/10 p-3 text-[#25D366] transition hover:bg-[#25D366]/20">
              <Phone size={20} />
              <div>
                <p className="text-sm font-bold">WhatsApp</p>
                <p className="text-xs">Tap to message</p>
              </div>
            </Link>
            <Link href="https://t.me/bslsupport" target="_blank" className="flex items-center gap-3 rounded-xl bg-[#0088cc]/10 p-3 text-[#0088cc] transition hover:bg-[#0088cc]/20">
              <Send size={20} />
              <div>
                <p className="text-sm font-bold">Telegram</p>
                <p className="text-xs">@bslsupport</p>
              </div>
            </Link>
            <Link href="/live-chat" className="flex items-center gap-3 rounded-xl bg-[#ffdf19]/10 p-3 text-[#ffdf19] transition hover:bg-[#ffdf19]/20">
              <MessageCircle size={20} />
              <div>
                <p className="text-sm font-bold">Live Chat</p>
                <p className="text-xs">Chat on website</p>
              </div>
            </Link>
          </div>
        </div>
      )}
      <button 
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#008d5b] to-[#00a86d] text-white shadow-lg transition-transform hover:scale-105 active:scale-95",
          open && "rotate-12"
        )}
      >
        {open ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
