import type { StudentQuiz } from "../../types/student.types";

interface UpcomingQuizCardProps {
  quiz: StudentQuiz;
}

const QUIZ_ENTRY_WINDOW_MINUTES = 5;

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

const isQuizEntryOpen = (scheduledAt: string) => {
  const now = new Date().getTime();
  const quizStartTime = new Date(scheduledAt).getTime();
  const quizEntryCloseTime =
    quizStartTime + QUIZ_ENTRY_WINDOW_MINUTES * 60 * 1000;

  return now >= quizStartTime && now <= quizEntryCloseTime;
};

const getQuizEntryMessage = (scheduledAt: string) => {
  const now = new Date().getTime();
  const quizStartTime = new Date(scheduledAt).getTime();
  const quizEntryCloseTime =
    quizStartTime + QUIZ_ENTRY_WINDOW_MINUTES * 60 * 1000;

  if (now < quizStartTime) {
    return "Quiz entry is not available yet.";
  }

  if (now > quizEntryCloseTime) {
    return "Quiz entry window has closed.";
  }

  return "Quiz entry is open now.";
};

const UpcomingQuizCard = ({ quiz }: UpcomingQuizCardProps) => {
  const canStartQuiz = isQuizEntryOpen(quiz.scheduledAt);
  const entryMessage = getQuizEntryMessage(quiz.scheduledAt);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-blue-500/40 bg-[#111827] p-5 shadow-sm">
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

      <div className="mt-5 grid gap-3 text-sm text-slate-400 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Starts At
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

      <div className="mt-auto pt-5">
        <p
          className={`mb-3 text-sm font-semibold ${
            canStartQuiz ? "text-emerald-400" : "text-blue-400"
          }`}
        >
          {entryMessage}
        </p>

        <button
          type="button"
          disabled={!canStartQuiz}
          onClick={() => {
            if (canStartQuiz) {
              window.location.href = quiz.quizPath;
            }
          }}
          className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
            canStartQuiz
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "cursor-not-allowed bg-slate-800 text-slate-500"
          }`}
        >
          Start Quiz
        </button>
      </div>
    </article>
  );
};

export default UpcomingQuizCard;