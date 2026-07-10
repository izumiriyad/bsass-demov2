"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Keyboard, X } from "lucide-react";
import { useModal } from "./modal-provider";

const shortcuts = [
  { key: "g then h", action: "Go home" },
  { key: "g then s", action: "Open Sports" },
  { key: "g then c", action: "Open Casino" },
  { key: "g then d", action: "Open Dashboard" },
  { key: "/", action: "Open game search" },
  { key: "?", action: "Show shortcuts" },
];

export function KeyboardShortcuts() {
  const router = useRouter();
  const { openModal } = useModal();
  const [open, setOpen] = useState(false);
  const [prefix, setPrefix] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "?") { event.preventDefault(); setOpen((v) => !v); return; }
      if (event.key === "/") { event.preventDefault(); router.push("/games"); return; }
      if (event.key.toLowerCase() === "g") { setPrefix(true); window.setTimeout(() => setPrefix(false), 1200); return; }
      if (!prefix) return;
      const key = event.key.toLowerCase();
      if (key === "h") router.push("/");
      if (key === "s") router.push("/sports");
      if (key === "c") router.push("/casino");
      if (key === "d") router.push("/dashboard");
      if (key === "l") openModal("login");
      setPrefix(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openModal, prefix, router]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
      <div className="w-full max-w-md rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5 shadow-2xl">
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Keyboard className="text-[#ffdf19]"/><h2 className="text-lg font-black text-[#f0f0f0]">Keyboard Shortcuts</h2></div><button onClick={() => setOpen(false)} className="text-[#9ca3af] hover:text-white" aria-label="Close shortcuts"><X size={18}/></button></div>
        <div className="mt-4 space-y-2">{shortcuts.map((item)=><div key={item.key} className="flex items-center justify-between rounded-lg bg-[#121315] px-3 py-2"><kbd className="rounded bg-[#242628] px-2 py-1 text-xs font-black text-[#ffdf19]">{item.key}</kbd><span className="text-sm text-[#d8d2bf]">{item.action}</span></div>)}</div>
      </div>
    </div>
  );
}
