import type { SessionsViewMode } from "../../types/mentorSessions.types";

interface Props {
  viewMode: SessionsViewMode;
  onViewModeChange: (mode: SessionsViewMode) => void;
}

export default function SessionsPageHeader({
  viewMode,
  onViewModeChange,
}: Props) {
  return (
    <header className="mentor-sessions-header">
      <div className="mentor-sessions-header__text">
        <nav className="mentor-sessions-breadcrumb" aria-label="Breadcrumb">
          <span>Uni Hub</span>
          <span aria-hidden>›</span>
          <span>Sessions</span>
        </nav>
        <h1>Sessions &amp; Classrooms</h1>
        <p>
          Monitor active classrooms in real-time or schedule future learning
          modules for your students.
        </p>
      </div>

      <div className="mentor-sessions-view-toggle" role="group" aria-label="View mode">
        <button
          type="button"
          className={
            viewMode === "grid"
              ? "mentor-sessions-view-toggle__btn mentor-sessions-view-toggle__btn--active"
              : "mentor-sessions-view-toggle__btn"
          }
          onClick={() => onViewModeChange("grid")}
        >
          Grid View
        </button>
        <button
          type="button"
          className={
            viewMode === "list"
              ? "mentor-sessions-view-toggle__btn mentor-sessions-view-toggle__btn--active"
              : "mentor-sessions-view-toggle__btn"
          }
          onClick={() => onViewModeChange("list")}
        >
          List View
        </button>
      </div>
    </header>
  );
}
