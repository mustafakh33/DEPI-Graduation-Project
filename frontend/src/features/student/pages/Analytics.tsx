import AnalyticsMetricCard from "../components/analytics/AnalyticsMetricCard";
import HabitInsightCard from "../components/analytics/HabitInsightCard";
import WeeklyStudyHoursCard from "../components/analytics/WeeklyStudyHoursCard";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import { useAnalytics } from "../hooks/useAnalytics";

const Analytics = () => {
  const analytics = useAnalytics();

  return (
    <StudentPageContainer>
      <div className="space-y-8">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Performance Analytics
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Track your learning performance
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Review your attendance, absence, quiz scores, assignment scores, and
            weekly study activity.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {analytics.metrics.map((metric) => (
            <AnalyticsMetricCard key={metric.id} metric={metric} />
          ))}
        </section>

        <WeeklyStudyHoursCard studyHours={analytics.weeklyStudyHours} />

        <HabitInsightCard studyDays={analytics.studyDays} />
      </div>
    </StudentPageContainer>
  );
};

export default Analytics;