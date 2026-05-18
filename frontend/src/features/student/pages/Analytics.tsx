import AnalyticsMetricCard from "../components/analytics/AnalyticsMetricCard";
import HabitInsightCard from "../components/analytics/HabitInsightCard";
import WeeklyStudyHoursCard from "../components/analytics/WeeklyStudyHoursCard";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import StudentPageHeader from "../components/shared/StudentPageHeader";
import { useAnalytics } from "../hooks/useAnalytics";

const Analytics = () => {
  const analytics = useAnalytics();

  return (
    <StudentPageContainer>
      <div className="space-y-8">
        <StudentPageHeader
          eyebrow="Performance Analytics"
          title="Track your learning performance"
          description="Review your attendance, absence, quiz scores, assignment scores, and weekly study activity."
        />

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