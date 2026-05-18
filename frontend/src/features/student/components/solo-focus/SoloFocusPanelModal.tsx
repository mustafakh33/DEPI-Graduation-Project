import type {
  SoloFocusActivePanel,
  SoloStudyMaterial,
} from "../../types/student.types";
import SoloFocusCalendarPanel from "./SoloFocusCalendarPanel";
import SoloFocusMaterialsPanel from "./SoloFocusMaterialsPanel";
import SoloFocusNotePanel from "./SoloFocusNotePanel";
import SoloFocusPanelHeader from "./SoloFocusPanelHeader";
import SoloFocusQuizPanel from "./SoloFocusQuizPanel";

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

interface SoloFocusPanelModalProps {
  activePanel: SoloFocusActivePanel;
  note: string;
  selectedDate: string;
  selectedDayPlan: string;
  availableMaterials: SoloStudyMaterial[];
  selectedMaterials: SoloStudyMaterial[];
  passingScore: number;
  sessionTime: string;
  quizMaterials: SoloStudyMaterial[];
  quizQuestions: QuizQuestion[];
  quizAnswers: Record<string, string>;
  quizResult: QuizResult | null;
  quizWarning: string;
  onClose: () => void;
  onNoteChange: (value: string) => void;
  onSelectedDateChange: (value: string) => void;
  onCalendarPlanChange: (value: string) => void;
  onSelectMaterial: (material: SoloStudyMaterial) => void;
  onAnswerChange: (questionId: string, answer: string) => void;
  onSubmitQuiz: () => void;
  onApproveSessionHours: () => void;
  onRetrySession: () => void;
  onDiscardSessionHours: () => void;
}

const SoloFocusPanelModal = ({
  activePanel,
  note,
  selectedDate,
  selectedDayPlan,
  availableMaterials,
  selectedMaterials,
  passingScore,
  sessionTime,
  quizMaterials,
  quizQuestions,
  quizAnswers,
  quizResult,
  quizWarning,
  onClose,
  onNoteChange,
  onSelectedDateChange,
  onCalendarPlanChange,
  onSelectMaterial,
  onAnswerChange,
  onSubmitQuiz,
  onApproveSessionHours,
  onRetrySession,
  onDiscardSessionHours,
}: SoloFocusPanelModalProps) => {
  if (!activePanel) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[28px] border border-white/15 bg-slate-950/80 p-5 text-white shadow-2xl backdrop-blur-xl">
        <SoloFocusPanelHeader activePanel={activePanel} onClose={onClose} />

        {activePanel === "note" ? (
          <SoloFocusNotePanel note={note} onNoteChange={onNoteChange} />
        ) : activePanel === "calendar" ? (
          <SoloFocusCalendarPanel
            selectedDate={selectedDate}
            selectedDayPlan={selectedDayPlan}
            onSelectedDateChange={onSelectedDateChange}
            onCalendarPlanChange={onCalendarPlanChange}
          />
        ) : activePanel === "materials" ? (
          <SoloFocusMaterialsPanel
            availableMaterials={availableMaterials}
            selectedMaterials={selectedMaterials}
            onSelectMaterial={onSelectMaterial}
          />
        ) : (
          <SoloFocusQuizPanel
            passingScore={passingScore}
            sessionTime={sessionTime}
            quizMaterials={quizMaterials}
            quizQuestions={quizQuestions}
            quizAnswers={quizAnswers}
            quizResult={quizResult}
            quizWarning={quizWarning}
            onAnswerChange={onAnswerChange}
            onSubmitQuiz={onSubmitQuiz}
            onApproveSessionHours={onApproveSessionHours}
            onRetrySession={onRetrySession}
            onDiscardSessionHours={onDiscardSessionHours}
          />
        )}
      </div>
    </div>
  );
};

export default SoloFocusPanelModal;