import UpcomingQuizCard from "../components/quizzes/UpcomingQuizCard";
import PreviousQuizCard from "../components/quizzes/PreviousQuizCard";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import { useQuizzes } from "../hooks/useQuizzes";

const isQuizFinished = (scheduledAt: string) => {
  const now = new Date().getTime();
  const quizStartTime = new Date(scheduledAt).getTime();

  return now > quizStartTime + 5 * 60 * 1000;
};

const Quizzes = () => {
  const quizzes = useQuizzes();

  const upcomingQuizzes = quizzes.filter(
    (quiz) => !quiz.hasAttempted && !isQuizFinished(quiz.scheduledAt)
  );

  const previousQuizzes = quizzes.filter(
    (quiz) => quiz.hasAttempted || isQuizFinished(quiz.scheduledAt)
  );

  return (
    <StudentPageContainer>
      <div className="space-y-8">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Quizzes
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Track Quizzes
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            View upcoming quizzes, enter available quiz windows, and review your
            previous quiz scores.
          </p>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Upcoming Quizzes
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Available Quiz Cards
            </h2>
          </div>

          {upcomingQuizzes.length > 0 ? (
            <div className="grid gap-5 xl:grid-cols-2">
              {upcomingQuizzes.map((quiz) => (
                <UpcomingQuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 text-sm text-slate-400">
              No upcoming quizzes are available right now.
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Previous Quizzes
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Quiz Results
            </h2>
          </div>

          {previousQuizzes.length > 0 ? (
            <div className="grid gap-5 xl:grid-cols-2">
              {previousQuizzes.map((quiz) => (
                <PreviousQuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 text-sm text-slate-400">
              No previous quizzes yet.
            </div>
          )}
        </section>
      </div>
    </StudentPageContainer>
  );
};

export default Quizzes;