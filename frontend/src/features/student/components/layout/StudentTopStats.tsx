import type { StudentStats } from "../../types/student.types";

interface StudentTopStatsProps {
  stats: StudentStats;
}

const StudentTopStats = ({ stats }: StudentTopStatsProps) => {
  return (
    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
      <span className="uppercase text-primary">Rank #{stats.rank}</span>

      <span>🔥 {stats.streakDays} days</span>

      <span>⏱ {stats.studyHours}h</span>

      <span>🟠 {stats.coins}</span>

      <button
        type="button"
        className="h-8 w-8 overflow-hidden rounded-full bg-muted"
        aria-label="Open profile menu"
      >
        <img
          src="https://i.pravatar.cc/80?img=5"
          alt="Student avatar"
          className="h-full w-full object-cover"
        />
      </button>
    </div>
  );
};

export default StudentTopStats;