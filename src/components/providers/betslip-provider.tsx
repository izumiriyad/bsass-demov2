"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "./auth-provider";
import { useModal } from "./modal-provider";
import { formatBDT } from "@/lib/utils";

export interface BetSlipSelection {
  id: string;
  event: string;
  market: string;
  label: string;
  odd: number;
}

interface BetSlipContextValue {
  selections: BetSlipSelection[];
  addSelection: (selection: BetSlipSelection) => void;
  removeSelection: (id: string) => void;
  clearSelections: () => void;
  isSelected: (id: string) => boolean;
}

const BetSlipContext = createContext<BetSlipContextValue | null>(null);

export function BetSlipProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<BetSlipSelection[]>([]);

  const value = useMemo<BetSlipContextValue>(() => ({
    selections,
    addSelection: (selection) => {
      setSelections((current) => {
        if (current.some((item) => item.id === selection.id)) return current;
        return [...current, selection].slice(-10);
      });
    },
    removeSelection: (id) => setSelections((current) => current.filter((item) => item.id !== id)),
    clearSelections: () => setSelections([]),
    isSelected: (id) => selections.some((item) => item.id === id),
  }), [selections]);

  return <BetSlipContext.Provider value={value}>{children}<BetSlipDrawer /></BetSlipContext.Provider>;
}

export function useBetSlip() {
  const ctx = useContext(BetSlipContext);
  if (!ctx) throw new Error("useBetSlip must be used within BetSlipProvider");
  return ctx;
}

function BetSlipDrawer() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const { selections, removeSelection, clearSelections } = useBetSlip();
  const [open, setOpen] = useState(false);
  const [stake, setStake] = useState(100);

  const totalOdds = selections.reduce((acc, item) => acc * item.odd, selections.length ? 1 : 0);
  const possibleReturn = selections.length ? stake * totalOdds : 0;

  const placeBet = () => {
    if (!user) {
      openModal("login");
      return;
    }
    if (!selections.length) {
      toast.error("Please select at least one market");
      return;
    }
    if (stake < 20) {
      toast.error("Minimum stake is ৳20");
      return;
    }
    if (stake > user.balance) {
      toast.error("Insufficient balance");
      return;
    }
    toast.success("Bet slip submitted", {
      description: `${selections.length} selection(s), stake ${formatBDT(stake)}, possible return ${formatBDT(possibleReturn)}.`
    });
    clearSelections();
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-36 right-4 z-40 rounded-full border border-[#ffdf19]/40 bg-[#1b1c1e] px-4 py-3 text-sm font-black text-[#ffdf19] shadow-2xl transition hover:scale-105 sm:bottom-24"
        aria-label="Open bet slip"
      >
        Bet Slip {selections.length ? <span className="ml-1 rounded-full bg-[#ffdf19] px-1.5 py-0.5 text-[10px] text-[#241a05]">{selections.length}</span> : null}
      </button>
    );
  }

  return (
    <aside className="fixed bottom-0 right-0 z-[70] max-h-[88vh] w-full overflow-hidden rounded-t-2xl border border-[#2a2c30] bg-[#1b1c1e] shadow-2xl sm:bottom-4 sm:right-4 sm:w-[390px] sm:rounded-2xl" aria-label="Bet slip">
      <div className="flex items-center justify-between border-b border-[#2a2c30] p-4">
        <div>
          <h2 className="text-base font-black text-[#f0f0f0]">Bet Slip</h2>
          <p className="text-xs text-[#9ca3af]">Single / multi selection preview</p>
        </div>
        <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-[#9ca3af] hover:bg-[#242628] hover:text-white" aria-label="Close bet slip"><X size={18} /></button>
      </div>

      <div className="max-h-[42vh] space-y-2 overflow-y-auto p-4">
        {selections.length ? selections.map((item) => (
          <div key={item.id} className="rounded-xl border border-[#2a2c30] bg-[#121315] p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#f0f0f0]">{item.event}</p>
                <p className="mt-1 text-xs text-[#9ca3af]">{item.market} • {item.label}</p>
              </div>
              <button onClick={() => removeSelection(item.id)} className="text-[#ef4444] hover:text-red-300" aria-label="Remove selection"><Trash2 size={16} /></button>
            </div>
            <p className="mt-2 text-right text-sm font-black text-[#ffdf19]">@ {item.odd.toFixed(2)}</p>
          </div>
        )) : (
          <div className="rounded-xl border border-dashed border-[#3a3d42] bg-[#121315] p-6 text-center">
            <p className="text-3xl">🎫</p>
            <p className="mt-2 text-sm font-bold text-[#f0f0f0]">No selections yet</p>
            <p className="mt-1 text-xs text-[#9ca3af]">Choose odds from Sportsbook to build your bet slip.</p>
            <Link href="/sports" onClick={() => setOpen(false)} className="mt-3 inline-flex rounded-lg bg-[#242628] px-3 py-2 text-xs font-bold text-[#ffdf19]">Go to Sports</Link>
          </div>
        )}
      </div>

      <div className="border-t border-[#2a2c30] p-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1"><span className="text-xs font-semibold text-[#9ca3af]">Stake</span><input type="number" min={20} value={stake} onChange={(e) => setStake(Number(e.target.value))} className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-3 py-2 text-[#f0f0f0] outline-none focus:border-[#008d5b]" /></label>
          <div className="space-y-1"><p className="text-xs font-semibold text-[#9ca3af]">Possible return</p><p className="rounded-lg bg-[#121315] px-3 py-2 text-sm font-black text-[#22c55e]">{formatBDT(possibleReturn)}</p></div>
        </div>
        <div className="mt-3 flex gap-2"><button onClick={placeBet} className="flex-1 rounded-lg bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-4 py-2.5 text-sm font-black text-[#241a05]">Place Bet</button><button onClick={clearSelections} className="rounded-lg bg-[#242628] px-4 py-2.5 text-sm font-bold text-[#f0f0f0]">Clear</button></div>
      </div>
    </aside>
  );
}
