import { BookOpen, Eye, FileText, Plus } from "lucide-react";
import type { SoloStudyMaterial } from "../../types/student.types";
import SoloFocusGlassCard from "./SoloFocusGlassCard";

interface SoloFocusMaterialsCardProps {
  selectedMaterials: SoloStudyMaterial[];
  onOpenMaterialsPanel: () => void;
  onOpenMaterial: (material: SoloStudyMaterial) => void;
}

const SoloFocusMaterialsCard = ({
  selectedMaterials,
  onOpenMaterialsPanel,
  onOpenMaterial,
}: SoloFocusMaterialsCardProps) => {
  return (
    <SoloFocusGlassCard className="w-full max-w-[440px]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-cyan-300" />
          <p className="text-sm font-bold text-white">Study Materials</p>
        </div>

        <button
          type="button"
          onClick={onOpenMaterialsPanel}
          className="inline-flex items-center gap-1 rounded-xl bg-cyan-400 px-3 py-2 text-[11px] font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          <Plus className="size-3" />
          Add
        </button>
      </div>

      {selectedMaterials.length > 0 ? (
        <div className="space-y-2">
          {selectedMaterials.map((material) => (
            <div
              key={material.id}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5"
            >
              <FileText className="size-4 shrink-0 text-cyan-300" />

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">
                  {material.lessonTitle}
                </p>

                <p className="truncate text-[10px] text-slate-300">
                  {material.fileName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenMaterial(material)}
                className="text-cyan-300 transition hover:text-cyan-100"
                title="Open material"
              >
                <Eye className="size-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={onOpenMaterialsPanel}
          className="flex min-h-[95px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/10 p-4 text-center transition hover:border-cyan-300 hover:bg-cyan-400/10"
        >
          <FileText className="size-7 text-cyan-300" />

          <p className="mt-2 text-sm font-semibold text-white">
            Choose material from roadmap
          </p>

          <p className="mt-1 text-[11px] text-slate-300">
            Select from opened lessons in your track.
          </p>
        </button>
      )}
    </SoloFocusGlassCard>
  );
};

export default SoloFocusMaterialsCard;