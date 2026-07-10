"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppInstallBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const dismissed = localStorage.getItem("app-banner-dismissed");
    if (isMobile && !dismissed) {
      setShow(true);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("app-banner-dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed top-[72px] left-0 right-0 z-40 flex items-center justify-between bg-gradient-to-r from-[#008d5b] to-[#00a86d] px-4 py-2 text-white shadow-md animate-in slide-in-from-top-2">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
          <Download size={20} className="animate-bounce text-[#ffdf19]" />
        </div>
        <div>
          <p className="text-sm font-bold">Install BSL App</p>
          <p className="text-[10px] opacity-90">Get ৳500 Free Bonus on Login!</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <a href="/app-download" className="rounded-md bg-[#ffdf19] px-3 py-1.5 text-xs font-black text-[#241a05] shadow-lg transition hover:bg-[#f5a400]">
          INSTALL
        </a>
        <button onClick={handleDismiss} className="text-white/60 hover:text-white">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
