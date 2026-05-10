import type { StudentQuiz } from "../../types/student.types";

interface PreviousQuizCardProps {
  quiz: StudentQuiz;
}

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const PreviousQuizCard = ({ quiz }: PreviousQuizCardProps) => {
  const score = quiz.hasAttempted ? quiz.score ?? 0 : 0;
  const isPassed = score >= quiz.totalGrade / 2;

  const cardStyle = isPassed
    ? {
        border: "border-emerald-500/40",
        badge: "bg-emerald-500/10 text-emerald-400",
        grade: "text-emerald-400",
        label: "Passed",
      }
    : {
        border: "border-red-500/40",
        badge: "bg-red-500/10 text-red-400",
        grade: "text-red-400",
        label: quiz.hasAttempted ? "Needs Improvement" : "Missed",
      };

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-[#111827] p-5 shadow-sm ${cardStyle.border}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Quiz {quiz.quizNumber}
          </p>

          <h3 className="mt-2 text-xl font-bold text-white">{quiz.title}</h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {quiz.description}
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Related lesson:{" "}
            <span className="font-semibold text-slate-300">
              {quiz.lessonTitle}
            </span>
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${cardStyle.badge}`}
        >
          {cardStyle.label}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-400 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Quiz Date
          </p>
          <p className="mt-1 font-semibold text-slate-200">
            {formatDateTime(quiz.scheduledAt)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Duration
          </p>
          <p className="mt-1 font-semibold text-slate-200">
            {quiz.durationMinutes} minutes
          </p>
        </div>
      </div>

      <p className={`mt-auto pt-5 text-sm font-semibold ${cardStyle.grade}`}>
        Score: {score}/{quiz.totalGrade}
      </p>
    </article>
  );
};

export default PreviousQuizCard;