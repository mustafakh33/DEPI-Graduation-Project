import { Save } from "lucide-react";

interface SoloFocusNotePanelProps {
  note: string;
  onNoteChange: (value: string) => void;
}

const SoloFocusNotePanel = ({
  note,
  onNoteChange,
}: SoloFocusNotePanelProps) => {
  return (
    <div>
      <textarea
        value={note}
        onChange={(event) => onNoteChange(event.target.value)}
        placeholder="Write anything you want to remember..."
        className="min-h-[220px] w-full resize-none rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-400 focus:border-cyan-300"
      />

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
        <Save className="size-4 text-cyan-300" />
        Saved automatically
      </div>
    </div>
  );
};

export default SoloFocusNotePanel;