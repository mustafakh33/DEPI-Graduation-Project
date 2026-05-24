import { Pause, Play } from "lucide-react";
import SoloFocusGlassCard from "./SoloFocusGlassCard";

interface SoloFocusTimerCardProps {
  sessionTime: string;
  breakCount: number;
  isSessionRunning: boolean;
  hasSessionProgress: boolean;
  hasSelectedMaterials: boolean;
  timerWarning: string;
  autoBreakMessage: string;
  onToggleTimer: () => void;
}

const SoloFocusTimerCard = ({
  sessionTime,
  breakCount,
  isSessionRunning,
  hasSessionProgress,
  hasSelectedMaterials,
  timerWarning,
  autoBreakMessage,
  onToggleTimer,
}: SoloFocusTimerCardProps) => {
  const sessionButtonLabel = isSessionRunning
    ? "Take Break"
    : hasSessionProgress
      ? "Resume Session"
      : "Start Session";

  return (
    <SoloFocusGlassCard className="w-full max-w-[440px] text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
        Current Session Time
      </p>

      <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
        {sessionTime}
      </h1>

      <button
        type="button"
        onClick={onToggleTimer}
        disabled={!hasSelectedMaterials && !isSessionRunning}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold transition ${
          !hasSelectedMaterials && !isSessionRunning
            ? "cursor-not-allowed bg-slate-500/70 text-slate-200"
            : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
        }`}
      >
        {isSessionRunning ? (
          <Pause className="size-5" />
        ) : (
          <Play className="size-5" />
        )}

        {sessionButtonLabel}
      </button>

      {autoBreakMessage ? (
        <div className="mt-3 rounded-xl bg-yellow-400/15 px-3 py-3 text-left">
          <p className="text-xs font-bold text-yellow-200">
            {autoBreakMessage}
          </p>

          <p className="mt-1 text-[11px] leading-5 text-yellow-100/80">
            Your current session time is still not approved until you pass the
            quiz.
          </p>
        </div>
      ) : timerWarning ? (
        <p className="mt-3 rounded-xl bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-200">
          {timerWarning}
        </p>
      ) : !hasSelectedMaterials ? (
        <p className="mt-3 rounded-xl bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-100">
          Choose a material first to unlock the timer.
        </p>
      ) : null}

      <div className="mt-4 text-xs text-slate-200">
        <span>Breaks: {breakCount}</span>
      </div>
    </SoloFocusGlassCard>
  );
};

export default SoloFocusTimerCard;