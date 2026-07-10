"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function PWAInstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("bsl-install-dismissed") === "yes") return;
    const handler = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!event) return;
    await event.prompt();
    await event.userChoice;
    setVisible(false);
    setEvent(null);
  };

  const dismiss = () => {
    window.localStorage.setItem("bsl-install-dismissed", "yes");
    setVisible(false);
  };

  if (!visible || !event) return null;

  return (
    <div className="fixed bottom-40 left-4 right-4 z-[62] mx-auto max-w-md rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 shadow-2xl sm:left-auto sm:right-6" role="dialog" aria-label="Install BSL Gaming app">
      <button onClick={dismiss} className="absolute right-3 top-3 text-[#9ca3af] hover:text-white" aria-label="Dismiss install prompt"><X size={16} /></button>
      <div className="flex gap-3 pr-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ffdf19]/10 text-[#ffdf19]"><Download size={22} /></div>
        <div>
          <h3 className="text-sm font-black text-[#f0f0f0]">Install BSL Gaming</h3>
          <p className="mt-1 text-xs leading-5 text-[#9ca3af]">Add the Bangladesh BDT gaming app to your home screen for faster access.</p>
          <div className="mt-3 flex gap-2"><button onClick={install} className="rounded-lg bg-[#ffdf19] px-3 py-2 text-xs font-black text-[#241a05]">Install App</button><button onClick={dismiss} className="rounded-lg bg-[#242628] px-3 py-2 text-xs font-bold text-[#f0f0f0]">Not now</button></div>
        </div>
      </div>
    </div>
  );
}
