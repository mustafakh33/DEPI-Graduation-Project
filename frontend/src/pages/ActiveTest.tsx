import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router";

import { ActiveTestFooter } from "@/components/active-test/ActiveTestFooter";
import { ActiveTestHeader } from "@/components/active-test/ActiveTestHeader";
import { AnswerPanel } from "@/components/active-test/AnswerPanel";
import { QuestionPanel } from "@/components/active-test/QuestionPanel";
import { useOnboarding } from "@/store/onboarding/OnboardingContext";

function formatRemainingTime(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function ActiveTest() {
  const navigate = useNavigate();
  const {
    answerQuestion,
    submitPlacementTest,
    testAnswers,
    testEndsAt,
    testQuestions,
  } = useOnboarding();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [, setFlaggedQuestions] = useState<string[]>([]);
  const [remainingTime, setRemainingTime] = useState(() =>
    testEndsAt ? testEndsAt - Date.now() : 0,
  );

  const currentQuestion = testQuestions[currentQuestionIndex];
  const selectedAnswer = currentQuestion
    ? testAnswers[currentQuestion.id] ?? ""
    : "";
  const isLastQuestion = currentQuestionIndex === testQuestions.length - 1;
  const progressPercent = useMemo(
    () =>
      testQuestions.length
        ? ((currentQuestionIndex + 1) / testQuestions.length) * 100
        : 0,
    [currentQuestionIndex, testQuestions.length],
  );

  const submitAndNavigate = useCallback(() => {
    submitPlacementTest();
    navigate("/result", { replace: true });
  }, [navigate, submitPlacementTest]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const preventBackNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", preventBackNavigation);

    return () => {
      window.removeEventListener("popstate", preventBackNavigation);
    };
  }, []);

  useEffect(() => {
    if (!testEndsAt) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const nextRemainingTime = testEndsAt - Date.now();
      setRemainingTime(nextRemainingTime);

      if (nextRemainingTime <= 0) {
        window.clearInterval(intervalId);
        submitAndNavigate();
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [submitAndNavigate, testEndsAt]);

  if (!currentQuestion) {
    return <Navigate replace to="/placement-intro" />;
  }

  const handleNext = () => {
    if (!selectedAnswer) {
      return;
    }

    if (isLastQuestion) {
      submitAndNavigate();
      return;
    }

    setCurrentQuestionIndex((current) => current + 1);
  };

  const handleSkip = () => {
    if (isLastQuestion) {
      submitAndNavigate();
      return;
    }

    setCurrentQuestionIndex((current) => current + 1);
  };

  const handleFlag = () => {
    setFlaggedQuestions((current) =>
      current.includes(currentQuestion.id)
        ? current.filter((questionId) => questionId !== currentQuestion.id)
        : [...current, currentQuestion.id],
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#11131b] font-body-md text-[#e1e2ed]">
      <ActiveTestHeader
        currentQuestion={currentQuestionIndex + 1}
        formattedTime={formatRemainingTime(remainingTime)}
        progressPercent={progressPercent}
        totalQuestions={testQuestions.length}
      />

      <main className="mx-auto w-full max-w-container-max flex-1 px-gutter pb-32 pt-24 md:px-margin">
        <div className="grid grid-cols-1 gap-stack-lg lg:grid-cols-12">
          <QuestionPanel question={currentQuestion} />
          <AnswerPanel
            onSelectAnswer={(answerId) =>
              answerQuestion(currentQuestion.id, answerId)
            }
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
          />
        </div>
      </main>

      <ActiveTestFooter
        canGoNext={Boolean(selectedAnswer)}
        isLastQuestion={isLastQuestion}
        onFlag={handleFlag}
        onNext={handleNext}
        onSkip={handleSkip}
      />
    </div>
  );
}
