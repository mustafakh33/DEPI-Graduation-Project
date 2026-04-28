import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Clock, Flag, ArrowRight, SkipForward, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/store/onboarding/OnboardingContext";

function formatRemainingTime(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function ActiveTest() {
  const navigate = useNavigate();
  const { answerQuestion, submitPlacementTest, testAnswers, testEndsAt, testQuestions } = useOnboarding();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [remainingTime, setRemainingTime] = useState(() => testEndsAt ? testEndsAt - Date.now() : 0);

  const currentQuestion = testQuestions[currentQuestionIndex];
  const selectedAnswer = currentQuestion ? testAnswers[currentQuestion.id] ?? "" : "";
  const isLastQuestion = currentQuestionIndex === testQuestions.length - 1;
  const progressPercent = useMemo(
    () => testQuestions.length ? ((currentQuestionIndex + 1) / testQuestions.length) * 100 : 0,
    [currentQuestionIndex, testQuestions.length]
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
    return () => window.removeEventListener("popstate", preventBackNavigation);
  }, []);

  useEffect(() => {
    if (!testEndsAt) return;
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

  if (!currentQuestion) return <Navigate replace to="/placement-intro" />;

  const handleNext = () => {
    if (!selectedAnswer) return;
    if (isLastQuestion) submitAndNavigate();
    else setCurrentQuestionIndex((current) => current + 1);
  };

  const handleSkip = () => {
    if (isLastQuestion) submitAndNavigate();
    else setCurrentQuestionIndex((current) => current + 1);
  };

  const handleFlag = () => {
    setFlaggedQuestions((current) =>
      current.includes(currentQuestion.id)
        ? current.filter((questionId) => questionId !== currentQuestion.id)
        : [...current, currentQuestion.id]
    );
  };

  const isFlagged = flaggedQuestions.includes(currentQuestion.id);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-400">
              Question {currentQuestionIndex + 1} of {testQuestions.length}
            </span>
            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${remainingTime < 300000 ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-white/5 border-white/10 text-gray-300'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono font-medium tracking-wider">
              {formatRemainingTime(remainingTime)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Question Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-400">
                {currentQuestion.category}
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold leading-relaxed text-white">
                {currentQuestion.prompt}
              </h1>
              {currentQuestion.code && (
                <div className="mt-6 rounded-xl border border-white/10 bg-[#0d0d0d] overflow-hidden">
                  <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/10">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                  </div>
                  <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
                    <code>{currentQuestion.code}</code>
                  </pre>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Answers Area */}
        <div className="w-full lg:w-[400px] flex flex-col">
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`answers-${currentQuestion.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, staggerChildren: 0.1 }}
              >
                {currentQuestion.answers.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => answerQuestion(currentQuestion.id, option.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 mb-3 group ${
                        isSelected 
                          ? 'bg-blue-500/10 border-blue-500 ring-1 ring-blue-500/50 text-white' 
                          : 'bg-black/40 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-500 group-hover:border-gray-400'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="leading-relaxed">{option.text}</span>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="sticky bottom-0 z-50 w-full bg-black/80 backdrop-blur-xl border-t border-white/10 py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Button
            onClick={handleFlag}
            variant="ghost"
            className={`h-12 px-6 rounded-xl transition-colors ${isFlagged ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Flag className={`w-4 h-4 mr-2 ${isFlagged ? 'fill-current' : ''}`} />
            {isFlagged ? 'Flagged' : 'Flag for review'}
          </Button>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="h-12 px-6 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
            >
              Skip
              <SkipForward className="w-4 h-4 ml-2" />
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-white text-black hover:bg-gray-200 h-12 px-8 rounded-xl font-semibold group transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLastQuestion ? 'Submit Test' : 'Next Question'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
