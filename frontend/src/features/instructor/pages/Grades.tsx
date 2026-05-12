import { useState } from "react";
import GradingTabs from "../components/grading/tabs/GradingTabs";
import QuizGradingSection from "../components/grading/quiz/QuizGradingSection";
import AssignmentSection from "../components/grading/assignments/AssignmentGradingSection";
import ProjectSection from "../components/grading/projects/ProjectGradingSection";
import "../styles/grading.css";

export default function GradingPage() {
  const [activeTab, setActiveTab] =
    useState<
      "quiz" |
      "assignment" |
      "project"
    >("quiz");

  return (
    <div className="grading-page">

      <GradingTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "quiz" && (
        <QuizGradingSection />
      )}

      {activeTab ===
        "assignment" && (
        <AssignmentSection />
      )}

      {activeTab ===
        "project" && (
        <ProjectSection />
      )}

    </div>
  );
}