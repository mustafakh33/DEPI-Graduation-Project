import { X } from "lucide-react";
import type { LessonMaterial } from "../../types/student.types";

interface MaterialViewerProps {
  material: LessonMaterial;
  onClose: () => void;
}

const MaterialViewer = ({ material, onClose }: MaterialViewerProps) => {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Material Viewer
          </p>

          <h3 className="mt-1 text-sm font-semibold text-white">
            {material.title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex size-9 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label="Close material viewer"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="h-[650px] bg-slate-950">
        <iframe
          src={material.fileUrl}
          title={material.title}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default MaterialViewer;