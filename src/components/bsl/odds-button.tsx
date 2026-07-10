"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useBetSlip } from "@/components/providers/betslip-provider";

export function OddsButton({ label, odd, event, market = "Match Winner" }: { label: string; odd: number; event: string; market?: string }) {
  const { addSelection, removeSelection, isSelected } = useBetSlip();
  const id = `${event}-${market}-${label}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const selected = isSelected(id);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => {
        if (selected) {
          removeSelection(id);
          toast.info("Selection removed from bet slip");
          return;
        }
        addSelection({ id, event, market, label, odd });
        toast.success("Selection added to bet slip", {
          description: `${event} • ${label} @ ${odd.toFixed(2)}`,
        });
      }}
      className={cn(
        "rounded-md border px-3 py-2 text-center transition focus-visible:outline-[#ffdf19]",
        selected
          ? "border-[#ffdf19] bg-[#ffdf19]/15"
          : "border-[#2a2c30] bg-[#242628] hover:border-[#008d5b] hover:bg-[#008d5b]/10"
      )}
    >
      <p className="text-[9px] uppercase text-[#6b7280]">{label}</p>
      <p className="text-sm font-bold text-[#f0f0f0]">{odd.toFixed(2)}</p>
    </button>
  );
}
