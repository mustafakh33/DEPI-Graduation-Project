import { X } from "lucide-react";
import type { SoloFocusActivePanel } from "../../types/student.types";

interface SoloFocusPanelHeaderProps {
  activePanel: SoloFocusActivePanel;
  onClose: () => void;
}

const getPanelLabel = (activePanel: SoloFocusActivePanel) => {
  if (activePanel === "note") return "Study Note";
  if (activePanel === "calendar") return "Study Calendar";
  if (activePanel === "materials") return "Study Materials";
  return "Session Quiz";
};

const getPanelTitle = (activePanel: SoloFocusActivePanel) => {
  if (activePanel === "note") return "Write your notes";
  if (activePanel === "calendar") return "Plan your study day";
  if (activePanel === "materials") return "Choose material";
  return "Pass the quiz to save your time";
};

const SoloFocusPanelHeader = ({
  activePanel,
  onClose,
}: SoloFocusPanelHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
          {getPanelLabel(activePanel)}
        </p>

        <h2 className="mt-1 text-xl font-bold">
          {getPanelTitle(activePanel)}
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex size-9 items-center justify-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20 hover:text-white"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};

export default SoloFocusPanelHeader;