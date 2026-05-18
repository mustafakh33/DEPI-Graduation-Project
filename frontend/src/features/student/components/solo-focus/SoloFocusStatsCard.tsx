import type { SoloFocusStats } from "../../types/student.types";
import SoloFocusGlassCard from "./SoloFocusGlassCard";
import SoloFocusStatRow from "./SoloFocusStatRow";

interface SoloFocusStatsCardProps {
  weeklyHours: string;
  dailyHours: string;
  focusStats: SoloFocusStats;
}

const SoloFocusStatsCard = ({
  weeklyHours,
  dailyHours,
  focusStats,
}: SoloFocusStatsCardProps) => {
  return (
    <SoloFocusGlassCard>
      <p className="text-sm font-bold text-white">Solo Focus Room</p>

      <p className="mt-2 text-[11px] leading-5 text-slate-200">
        Your approved hours only count after passing the session quiz.
      </p>

      <div className="mt-4 space-y-2">
        <SoloFocusStatRow
          label="Approved Weekly Hours"
          value={`${weeklyHours}h`}
        />

        <SoloFocusStatRow label="Today Approved" value={`${dailyHours}h`} />

        <SoloFocusStatRow
          label="Focus Streak"
          value={`${focusStats.streakDays} Days`}
        />
      </div>
    </SoloFocusGlassCard>
  );
};

export default SoloFocusStatsCard;