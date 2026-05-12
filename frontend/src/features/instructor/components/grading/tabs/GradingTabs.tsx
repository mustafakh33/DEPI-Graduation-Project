interface Props {
    activeTab:
      | "quiz"
      | "assignment"
      | "project";
  
    setActiveTab: (
      tab:
        | "quiz"
        | "assignment"
        | "project"
    ) => void;
  }
  
  export default function GradingTabs({
    activeTab,
  
    setActiveTab,
  }: Props) {
    return (
      <div className="grading-tabs">
  
        <button
          className={
            activeTab === "quiz"
              ? "active-tab"
              : ""
          }
          onClick={() =>
            setActiveTab("quiz")
          }
        >
          Quiz Grading
        </button>
  
        <button
          className={
            activeTab ===
            "assignment"
              ? "active-tab"
              : ""
          }
          onClick={() =>
            setActiveTab(
              "assignment"
            )
          }
        >
          Assignments
        </button>
  
        <button
          className={
            activeTab ===
            "project"
              ? "active-tab"
              : ""
          }
          onClick={() =>
            setActiveTab("project")
          }
        >
          Final Projects
        </button>
  
      </div>
    );
  }