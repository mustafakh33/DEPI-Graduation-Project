import { Bell, Coffee } from "lucide-react";

interface SoloFocusBreakModalProps {
  onClose: () => void;
  onResume: () => void;
}

const SoloFocusBreakModal = ({
  onClose,
  onResume,
}: SoloFocusBreakModalProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-[28px] border border-yellow-300/30 bg-slate-950 p-6 text-white shadow-2xl shadow-yellow-500/10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-yellow-300 text-slate-950">
          <Coffee className="size-8" />
        </div>

        <div className="mt-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">
            Break Reminder
          </p>

          <h2 className="mt-3 text-2xl font-black text-white">
            Time for a break
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Your focus timer has been paused automatically. Take a short break,
            then resume when you are ready.
          </p>
        </div>

        <div className="mt-5 rounded-2xl bg-yellow-300/10 p-4">
          <div className="flex items-start gap-3">
            <Bell className="mt-0.5 size-5 shrink-0 text-yellow-300" />

            <p className="text-xs leading-5 text-yellow-100">
              This reminder appears above the material viewer and other panels
              so you do not miss that the timer has stopped.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Take Break
          </button>

          <button
            type="button"
            onClick={onResume}
            className="rounded-2xl bg-yellow-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-yellow-200"
          >
            Resume Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoloFocusBreakModal;