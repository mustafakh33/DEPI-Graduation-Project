import type { WeeklyGoal } from "../../types/student.types";
import CourseProgressBar from "./CourseProgressBar";

interface WeeklyGoalCardProps {
  weeklyGoal: WeeklyGoal;
}

const WeeklyGoalCard = ({ weeklyGoal }: WeeklyGoalCardProps) => {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            Weekly Goal
          </p>

          <h2 className="mt-1 text-xl font-bold text-foreground">
            {weeklyGoal.completedHours}h / {weeklyGoal.targetHours}h completed
          </h2>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {weeklyGoal.percentage}%
        </span>
      </div>

      <CourseProgressBar progress={weeklyGoal.percentage} />
    </section>
  );
};

export default WeeklyGoalCard;