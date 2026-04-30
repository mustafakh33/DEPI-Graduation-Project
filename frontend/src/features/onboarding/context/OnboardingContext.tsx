import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  placementQuestions,
  type PlacementQuestion,
} from "@/features/onboarding/data/questions";

export type TrackId =
  | "web-development"
  | "ai-data-science"
  | "mobile-development"
  | "cybersecurity";

export type OnboardingUser = {
  email: string;
  name: string;
};

export type SelectedTrack = {
  id: TrackId;
  title: string;
};

export type ScheduleState = {
  days: string[];
  preferredTime: string;
  weeklyCommitment: number;
};

export type TestResultState = {
  level: "Beginner" | "Intermediate" | "Advanced";
  score: number;
  total: number;
};

type OnboardingState = {
  completed: boolean;
  result: TestResultState | null;
  schedule: ScheduleState | null;
  selectedTrack: SelectedTrack | null;
  testAnswers: Record<string, string>;
  testEndsAt: number | null;
  testQuestions: PlacementQuestion[];
  user: OnboardingUser | null;
};

type OnboardingContextValue = OnboardingState & {
  answerQuestion: (questionId: string, answerId: string) => void;
  completeOnboarding: () => void;
  completeSignup: (user: OnboardingUser) => void;
  resetOnboarding: () => void;
  saveSchedule: (schedule: ScheduleState) => void;
  selectTrack: (track: SelectedTrack) => void;
  startPlacementTest: () => void;
  submitPlacementTest: () => TestResultState;
};

const STORAGE_KEY = "unihub:onboarding";
const TEST_DURATION_MS = 30 * 60 * 1000;

const initialState: OnboardingState = {
  completed: false,
  result: null,
  schedule: null,
  selectedTrack: null,
  testAnswers: {},
  testEndsAt: null,
  testQuestions: [],
  user: null,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

function shuffleArray<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function prepareQuestions() {
  return shuffleArray(placementQuestions).map((question) => ({
    ...question,
    answers: shuffleArray(question.answers),
  }));
}

function calculateLevel(
  score: number,
  total: number,
): TestResultState["level"] {
  const percentage = score / total;

  if (percentage >= 0.75) {
    return "Advanced";
  }

  if (percentage >= 0.45) {
    return "Intermediate";
  }

  return "Beginner";
}

function loadStoredState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? ({ ...initialState, ...JSON.parse(stored) } as OnboardingState)
      : initialState;
  } catch {
    return initialState;
  }
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(loadStoredState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const completeSignup = useCallback((user: OnboardingUser) => {
    setState((current) => ({ ...current, user }));
  }, []);

  const selectTrack = useCallback((track: SelectedTrack) => {
    setState((current) => ({ ...current, selectedTrack: track }));
  }, []);

  const saveSchedule = useCallback((schedule: ScheduleState) => {
    setState((current) => ({ ...current, schedule }));
  }, []);

  const startPlacementTest = useCallback(() => {
    setState((current) => ({
      ...current,
      result: null,
      testAnswers: {},
      testEndsAt: Date.now() + TEST_DURATION_MS,
      testQuestions: prepareQuestions(),
    }));
  }, []);

  const answerQuestion = useCallback((questionId: string, answerId: string) => {
    setState((current) => ({
      ...current,
      testAnswers: {
        ...current.testAnswers,
        [questionId]: answerId,
      },
    }));
  }, []);

  const submitPlacementTest = useCallback(() => {
    let score = 0;

    state.testQuestions.forEach((question) => {
      const selectedAnswerId = state.testAnswers[question.id];
      const selectedAnswer = question.answers.find(
        (answer) => answer.id === selectedAnswerId,
      );

      if (selectedAnswer?.isCorrect) {
        score += 1;
      }
    });

    const result: TestResultState = {
      level: calculateLevel(
        score,
        state.testQuestions.length || placementQuestions.length,
      ),
      score,
      total: state.testQuestions.length || placementQuestions.length,
    };

    setState((current) => ({
      ...current,
      result,
      testEndsAt: null,
    }));

    return result;
  }, [state.testAnswers, state.testQuestions]);

  const completeOnboarding = useCallback(() => {
    setState((current) => ({ ...current, completed: true }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      ...state,
      answerQuestion,
      completeOnboarding,
      completeSignup,
      resetOnboarding,
      saveSchedule,
      selectTrack,
      startPlacementTest,
      submitPlacementTest,
    }),
    [
      answerQuestion,
      completeOnboarding,
      completeSignup,
      resetOnboarding,
      saveSchedule,
      selectTrack,
      startPlacementTest,
      state,
      submitPlacementTest,
    ],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  }

  return context;
}
