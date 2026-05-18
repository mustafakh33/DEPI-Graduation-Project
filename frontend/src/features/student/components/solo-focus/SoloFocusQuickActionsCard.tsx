import { CalendarDays, StickyNote } from "lucide-react";
import type { SoloFocusActivePanel } from "../../types/student.types";
import SoloFocusGlassCard from "./SoloFocusGlassCard";

interface SoloFocusQuickActionsCardProps {
  onOpenPanel: (panel: SoloFocusActivePanel) => void;
}

const SoloFocusQuickActionsCard = ({
  onOpenPanel,
}: SoloFocusQuickActionsCardProps) => {
  return (
    <SoloFocusGlassCard>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
        Quick Actions
      </p>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onOpenPanel("note")}
          className="rounded-xl bg-white/10 p-4 text-center transition hover:bg-white/15"
        >
          <StickyNote className="mx-auto size-6 text-cyan-300" />
          <p className="mt-2 text-xs font-semibold">Note</p>
        </button>

        <button
          type="button"
          onClick={() => onOpenPanel("calendar")}
          className="rounded-xl bg-white/10 p-4 text-center transition hover:bg-white/15"
        >
          <CalendarDays className="mx-auto size-6 text-cyan-300" />
          <p className="mt-2 text-xs font-semibold">Calendar</p>
        </button>
      </div>
    </SoloFocusGlassCard>
  );
};

export default SoloFocusQuickActionsCard;