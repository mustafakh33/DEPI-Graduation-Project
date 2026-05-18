import { Eye, X } from "lucide-react";
import type { LessonMaterial } from "../../types/student.types";
import MaterialViewer from "./MaterialViewer";

interface LessonMaterialSectionProps {
  material: LessonMaterial;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const LessonMaterialSection = ({
  material,
  isOpen,
  onToggle,
  onClose,
}: LessonMaterialSectionProps) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-[#101827] p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
        Material
      </p>

      <div className="mt-3 flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-white">{material.title}</h2>

          <p className="mt-1 text-sm text-slate-400">
            {material.description}
          </p>

          <p className="mt-2 text-xs text-slate-500">{material.fileName}</p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          {isOpen ? (
            <>
              <X className="size-4" />
              Close PDF
            </>
          ) : (
            <>
              <Eye className="size-4" />
              Open PDF
            </>
          )}
        </button>
      </div>

      {isOpen && <MaterialViewer material={material} onClose={onClose} />}
    </section>
  );
};

export default LessonMaterialSection;