"use client";

import { useState, useEffect } from "react";
import { Download, X, Gift, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function WelcomeModal() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // for animation

  useEffect(() => {
    // Check if it's the very first time they are visiting
    const hasVisited = localStorage.getItem("bsl_welcome_seen");
    if (!hasVisited) {
      // Delay slightly for effect
      const timer = setTimeout(() => {
        setShow(true);
        setTimeout(() => setIsVisible(true), 10);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShow(false);
      localStorage.setItem("bsl_welcome_seen", "true");
    }, 300);
  };

  if (!show) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm transition-opacity duration-300",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className={cn(
        "relative w-full max-w-md overflow-hidden rounded-3xl border border-[#ffdf19]/30 bg-gradient-to-b from-[#1b1c1e] to-[#121315] shadow-[0_0_50px_rgba(255,223,25,0.15)] transition-all duration-300 transform",
        isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
      )}>
        {/* Close Button */}
        <button 
          onClick={handleDismiss} 
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-[#9ca3af] hover:bg-black/80 hover:text-white transition"
        >
          <X size={18} />
        </button>

        {/* Hero Image Area */}
        <div className="relative h-48 w-full bg-gradient-to-br from-[#008d5b] to-[#00a86d] overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnPgo8cmVjdCB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPScjZmZmJyBmaWxsLW9wYWNpdHk9JzAuMScvPgo8cGF0aCBkPSdNMCAwaDh2OEgweicgZmlsbD0nbm9uZScvPgo8cGF0aCBkPSdNMCA0bDQtNCA0IDR2NGwtNC00LTQgNHonIGZpbGw9JyNmZmYnIGZpbGwtb3BhY2l0eT0nMC4wNScvPgo8L3N2Zz4=')]"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#ffdf19] shadow-[0_0_30px_rgba(255,223,25,0.5)] mb-3">
              <Gift size={40} className="text-[#241a05] animate-bounce-slow" />
              <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-[10px] font-black text-white shadow-lg rotate-12">
                FREE
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1b1c1e] to-transparent"></div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 pt-2 text-center relative z-10">
          <h2 className="text-2xl font-black text-white uppercase tracking-wide">
            Get <span className="text-gold-gradient text-3xl">৳500</span> Free
          </h2>
          <p className="mt-2 text-sm text-[#9ca3af] px-4">
            Download the official BSL Gaming App right now and instantly receive a ৳500 welcome bonus on your first login.
          </p>

          <div className="mt-8 space-y-3">
            <Link 
              href="/app-download" 
              onClick={handleDismiss}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ffdf19] to-[#f4a700] py-4 text-base font-black uppercase tracking-wide text-[#241a05] shadow-[0_10px_25px_rgba(255,223,25,0.3)] transition hover:brightness-110 active:scale-[.98]"
            >
              <Download size={20} className="animate-pulse" />
              Download App Now
            </Link>
            
            <button 
              onClick={handleDismiss}
              className="w-full rounded-xl border border-[#2a2c30] bg-transparent py-3 text-sm font-bold text-[#6b7280] transition hover:bg-[#242628] hover:text-[#f0f0f0]"
            >
              Continue on Web Browser
            </button>
          </div>
          
          <p className="mt-4 flex items-center justify-center gap-1 text-[10px] text-[#6b7280]">
            <Smartphone size={12} /> Available for iOS & Android
          </p>
        </div>
      </div>
    </div>
  );
}
