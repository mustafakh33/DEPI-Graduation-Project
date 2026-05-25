import { Map } from "lucide-react";
import { Link } from "react-router-dom";
import SoloFocusBreakModal from "../components/solo-focus/SoloFocusBreakModal";
import SoloFocusMaterialViewerModal from "../components/solo-focus/SoloFocusMaterialViewerModal";
import SoloFocusMaterialsCard from "../components/solo-focus/SoloFocusMaterialsCard";
import SoloFocusMusicCard from "../components/solo-focus/SoloFocusMusicCard";
import SoloFocusPanelModal from "../components/solo-focus/SoloFocusPanelModal";
import SoloFocusQuickActionsCard from "../components/solo-focus/SoloFocusQuickActionsCard";
import SoloFocusStatsCard from "../components/solo-focus/SoloFocusStatsCard";
import SoloFocusTasksCard from "../components/solo-focus/SoloFocusTasksCard";
import SoloFocusTimerCard from "../components/solo-focus/SoloFocusTimerCard";
import { useSoloFocusRoom } from "../hooks/useSoloFocusRoom";

const SoloFocusRoom = () => {
  const soloFocus = useSoloFocusRoom();

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/Main.png')" }}
    >
      <div className="min-h-screen bg-black/25 px-6 py-6">
        <div className="mx-auto mb-4 flex max-w-6xl items-center justify-between">
          <Link
            to="/student/roadmap"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950/35 px-4 py-2 text-xs font-semibold text-cyan-100 backdrop-blur-md transition hover:bg-slate-950/50"
          >
            <Map className="size-4" />
            Back to Roadmap
          </Link>

          <button
            type="button"
            onClick={soloFocus.openSessionQuiz}
            className="rounded-xl bg-red-500/80 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-500"
          >
            End Session
          </button>
        </div>

        <div className="mx-auto grid min-h-[calc(100vh-96px)] max-w-6xl items-center gap-5 lg:grid-cols-[230px_1fr_230px]">
          <aside className="space-y-4">
            <SoloFocusStatsCard
              weeklyHours={soloFocus.weeklyHours}
              dailyHours={soloFocus.dailyHours}
              focusStats={soloFocus.focusStats}
            />

            <SoloFocusMusicCard
              musicTracks={soloFocus.musicTracks}
              activeTrack={soloFocus.activeTrack}
              onToggleMusic={soloFocus.handleToggleMusic}
            />
          </aside>

          <section className="flex flex-col items-center justify-center gap-4">
            <SoloFocusTimerCard
              sessionTime={soloFocus.formattedSessionTime}
              breakCount={soloFocus.focusStats.breakCount}
              isSessionRunning={soloFocus.isSessionRunning}
              hasSessionProgress={soloFocus.hasSessionProgress}
              hasSelectedMaterials={soloFocus.hasSelectedMaterials}
              timerWarning={soloFocus.timerWarning}
              autoBreakMessage={soloFocus.autoBreakMessage}
              onToggleTimer={soloFocus.handleToggleTimer}
            />

            <SoloFocusMaterialsCard
              selectedMaterials={soloFocus.selectedMaterials}
              onOpenMaterialsPanel={() => soloFocus.handleOpenPanel("materials")}
              onOpenMaterial={soloFocus.handleOpenMaterial}
            />
          </section>

          <aside className="space-y-4">
            <SoloFocusTasksCard
              tasks={soloFocus.tasks}
              newTask={soloFocus.newTask}
              onNewTaskChange={soloFocus.setNewTask}
              onAddTask={soloFocus.handleAddTask}
              onToggleTask={soloFocus.handleToggleTask}
              onRemoveTask={soloFocus.handleRemoveTask}
            />

            <SoloFocusQuickActionsCard
              onOpenPanel={soloFocus.handleOpenPanel}
            />
          </aside>
        </div>
      </div>

      {soloFocus.openedMaterial ? (
        <SoloFocusMaterialViewerModal
          material={soloFocus.openedMaterial}
          onClose={soloFocus.handleCloseMaterial}
        />
      ) : null}

      {soloFocus.activePanel ? (
        <SoloFocusPanelModal
          activePanel={soloFocus.activePanel}
          note={soloFocus.note}
          selectedDate={soloFocus.selectedDate}
          selectedDayPlan={soloFocus.selectedDayPlan}
          availableMaterials={soloFocus.availableMaterials}
          selectedMaterials={soloFocus.selectedMaterials}
          passingScore={soloFocus.passingScore}
          sessionTime={soloFocus.formattedSessionTime}
          quizMaterials={soloFocus.quizMaterials}
          quizQuestions={soloFocus.quizQuestions}
          quizAnswers={soloFocus.quizAnswers}
          quizResult={soloFocus.quizResult}
          quizWarning={soloFocus.quizWarning}
          onClose={soloFocus.handleClosePanel}
          onNoteChange={soloFocus.setNote}
          onSelectedDateChange={soloFocus.setSelectedDate}
          onCalendarPlanChange={soloFocus.handleCalendarPlanChange}
          onSelectMaterial={soloFocus.handleSelectMaterial}
          onAnswerChange={soloFocus.handleAnswerChange}
          onSubmitQuiz={soloFocus.handleSubmitQuiz}
          onApproveSessionHours={soloFocus.approveSessionHours}
          onRetryQuiz={soloFocus.retryQuiz}
          onContinueStudying={soloFocus.continueStudyingAfterFailedQuiz}
          onDiscardSessionHours={soloFocus.discardSessionHours}
        />
      ) : null}

      {soloFocus.isBreakModalOpen ? (
        <SoloFocusBreakModal
          onClose={soloFocus.handleCloseBreakModal}
          onResume={soloFocus.handleResumeFromBreak}
        />
      ) : null}
    </main>
  );
};

export default SoloFocusRoom;