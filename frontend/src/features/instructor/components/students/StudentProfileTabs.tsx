import type { StudentProfileTab } from "../../types/students.types";

const TABS: { id: StudentProfileTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "academic-history", label: "Academic History" },
  { id: "documents", label: "Documents" },
  { id: "attendance-log", label: "Attendance Log" },
];

interface Props {
  activeTab: StudentProfileTab;
  onTabChange: (tab: StudentProfileTab) => void;
}

export default function StudentProfileTabs({
  activeTab,
  onTabChange,
}: Props) {
  return (
    <nav className="student-profile-tabs" aria-label="Student sections">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={activeTab === tab.id ? "active" : ""}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
