import { ClipboardCheck } from "lucide-react";
import type { SoloStudyMaterial } from "../../types/student.types";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizResult {
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
}

interface SoloFocusQuizPanelProps {
  passingScore: number;
  sessionTime: string;
  quizMaterials: SoloStudyMaterial[];
  quizQuestions: QuizQuestion[];
  quizAnswers: Record<string, string>;
  quizResult: QuizResult | null;
  quizWarning: string;
  onAnswerChange: (questionId: string, answer: string) => void;
  onSubmitQuiz: () => void;
  onApproveSessionHours: () => void;
  onRetrySession: () => void;
  onDiscardSessionHours: () => void;
}

const SoloFocusQuizPanel = ({
  passingScore,
  sessionTime,
  quizMaterials,
  quizQuestions,
  quizAnswers,
  quizResult,
  quizWarning,
  onAnswerChange,
  onSubmitQuiz,
  onApproveSessionHours,
  onRetrySession,
  onDiscardSessionHours,
}: SoloFocusQuizPanelProps) => {
  return (
    <div>
      <div className="mb-4 rounded-2xl bg-white/10 p-4">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="size-6 text-cyan-300" />

          <div>
            <p className="text-sm font-bold text-white">Session Quiz</p>

            <p className="mt-1 text-xs leading-5 text-slate-300">
              You must score at least {passingScore}% to save {sessionTime} as
              approved study time.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        {quizMaterials.map((material) => (
          <div key={material.id} className="rounded-xl bg-white/10 px-4 py-3">
            <p className="text-xs font-semibold text-white">
              {material.lessonTitle}
            </p>

            <p className="mt-1 text-[10px] text-slate-300">
              {material.fileName}
            </p>
          </div>
        ))}
      </div>

      {quizResult ? (
        <div
          className={`rounded-2xl p-4 ${
            quizResult.passed ? "bg-emerald-500/15" : "bg-red-500/15"
          }`}
        >
          <p
            className={`text-sm font-bold ${
              quizResult.passed ? "text-emerald-200" : "text-red-200"
            }`}
          >
            Your score: {quizResult.score}%
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-300">
            You answered {quizResult.correctAnswers} of{" "}
            {quizResult.totalQuestions} questions correctly.
          </p>

          {quizResult.passed ? (
            <div className="mt-4">
              <p className="text-xs leading-5 text-emerald-100">
                Great job. Your session time will now be saved to your approved
                weekly hours.
              </p>

              <button
                type="button"
                onClick={onApproveSessionHours}
                className="mt-4 w-full rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Save Hours & Finish Session
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <p className="text-xs leading-5 text-red-100">
                You did not pass. This session time will not be added to your
                approved hours unless you study again and pass.
              </p>

              <button
                type="button"
                onClick={onRetrySession}
                className="w-full rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Retry Session
              </button>

              <button
                type="button"
                onClick={onDiscardSessionHours}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Exit Without Saving
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-h-[360px] space-y-4 overflow-y-auto pr-1">
          {quizQuestions.map((question, questionIndex) => (
            <div key={question.id} className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm font-bold text-white">
                {questionIndex + 1}. {question.question}
              </p>

              <div className="mt-3 space-y-2">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={quizAnswers[question.id] === option}
                      onChange={() => onAnswerChange(question.id, option)}
                    />

                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {quizWarning ? (
            <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-200">
              {quizWarning}
            </p>
          ) : null}

          <button
            type="button"
            onClick={onSubmitQuiz}
            className="w-full rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default SoloFocusQuizPanel;