interface StudentWelcomeSectionProps {
  studentName: string;
  weeklyGoalPercentage: number;
}

const StudentWelcomeSection = ({
  studentName,
  weeklyGoalPercentage,
}: StudentWelcomeSectionProps) => {
  const isDoingWell = weeklyGoalPercentage >= 50;

  const motivationMessage = isDoingWell
    ? "Keep up the momentum to maintain your top rank!"
    : "Try to study more this week to improve your rank and reach your goal.";

  return (
    <section className="mb-6">
      <h1 className="text-2xl font-bold text-foreground">
        Welcome back, {studentName}! 👋
      </h1>

      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        You've completed {weeklyGoalPercentage}% of your weekly goals.{" "}
        {motivationMessage}
      </p>
    </section>
  );
};

export default StudentWelcomeSection;