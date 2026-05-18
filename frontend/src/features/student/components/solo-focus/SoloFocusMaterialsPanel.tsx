import { FileText } from "lucide-react";
import type { SoloStudyMaterial } from "../../types/student.types";

interface SoloFocusMaterialsPanelProps {
  availableMaterials: SoloStudyMaterial[];
  selectedMaterials: SoloStudyMaterial[];
  onSelectMaterial: (material: SoloStudyMaterial) => void;
}

const SoloFocusMaterialsPanel = ({
  availableMaterials,
  selectedMaterials,
  onSelectMaterial,
}: SoloFocusMaterialsPanelProps) => {
  return (
    <div>
      <p className="mb-4 text-xs leading-5 text-slate-300">
        These materials are collected from your opened roadmap lessons. Choose
        one to add it to your session.
      </p>

      <div className="max-h-[300px] space-y-2 overflow-y-auto pr-1">
        {availableMaterials.length > 0 ? (
          availableMaterials.map((material) => {
            const isSelected = selectedMaterials.some(
              (item) => item.id === material.id
            );

            return (
              <button
                key={material.id}
                type="button"
                onClick={() => onSelectMaterial(material)}
                className="flex w-full items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-left transition hover:bg-cyan-400/15"
              >
                <FileText className="size-5 shrink-0 text-cyan-300" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {material.lessonTitle}
                  </p>

                  <p className="truncate text-xs text-slate-300">
                    {material.fileName}
                  </p>
                </div>

                {isSelected ? (
                  <span className="rounded-full bg-cyan-400 px-2 py-1 text-[10px] font-bold text-slate-950">
                    Added
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-cyan-300">
                    Add
                  </span>
                )}
              </button>
            );
          })
        ) : (
          <div className="rounded-2xl bg-white/10 p-4 text-center text-sm text-slate-300">
            No opened lessons yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SoloFocusMaterialsPanel;