import { Bell, Search } from "lucide-react";
import SubjectTabs from "./SubjectTabs";
import type { MentorSubject } from "../../types/mentor.types";

interface Props {
  subjects: MentorSubject[];
  selectedSubjectId: string;
  onSelectSubject: (id: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function DashboardHeader({
  subjects,
  selectedSubjectId,
  onSelectSubject,
  searchQuery,
  onSearchChange,
}: Props) {
  return (
    <header className="mentor-dashboard-header">
      <div className="mentor-dashboard-toolbar">
        <SubjectTabs
          subjects={subjects}
          selectedSubjectId={selectedSubjectId}
          onSelect={onSelectSubject}
        />

        <div className="dashboard-actions">
          <div className="dashboard-search-wrap">
            <Search size={18} className="dashboard-search-icon" aria-hidden />
            <input
              type="search"
              placeholder="Search student..."
              className="dashboard-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search students"
            />
          </div>
          <button type="button" className="notification-btn" aria-label="Notifications">
            <Bell size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
