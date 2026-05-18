import { X } from "lucide-react";
import type { SoloStudyMaterial } from "../../types/student.types";

interface SoloFocusMaterialViewerModalProps {
  material: SoloStudyMaterial;
  onClose: () => void;
}

const SoloFocusMaterialViewerModal = ({
  material,
  onClose,
}: SoloFocusMaterialViewerModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="flex h-[92vh] w-full max-w-6xl flex-col rounded-[28px] border border-white/15 bg-slate-950/95 text-white shadow-2xl">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Material Viewer
            </p>

            <h2 className="mt-1 truncate text-lg font-bold text-white">
              {material.lessonTitle}
            </h2>

            <p className="mt-1 truncate text-xs text-slate-300">
              {material.fileName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20 hover:text-white"
            aria-label="Close material viewer"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 bg-slate-950">
          <iframe
            src={material.fileUrl}
            title={material.lessonTitle}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SoloFocusMaterialViewerModal;