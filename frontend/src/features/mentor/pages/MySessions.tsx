/**
 * My Sessions — `/mentor/my-sessions`
 *
 * Active study groups (grid/list), classroom logs, create-session form, upcoming alert.
 *
 * @see ../README.md#section-my-sessions
 */
import ActiveSessionsSection from "../components/sessions/ActiveSessionsSection";
import ClassroomLogs from "../components/sessions/ClassroomLogs";
import CreateSessionPanel from "../components/sessions/CreateSessionPanel";
import SessionsPageHeader from "../components/sessions/SessionsPageHeader";
import UpcomingSessionAlert from "../components/sessions/UpcomingSessionAlert";
import { useMentorSessions } from "../hooks/useMentorSessions";
import "../style/sessions.css";

export default function MySessions() {
  const {
    viewMode,
    setViewMode,
    allGroups,
    helpGroup,
    logs,
    upcoming,
    batchOptions,
    form,
    updateForm,
    createSession,
    createdNotice,
    observeRoom,
    joinDiscussion,
  } = useMentorSessions();

  return (
    <div className="mentor-sessions-page">
      <SessionsPageHeader viewMode={viewMode} onViewModeChange={setViewMode} />

      <div className="mentor-sessions-layout">
        <div className="mentor-sessions-main">
          <ActiveSessionsSection
            groups={allGroups}
            helpGroupId={helpGroup?.id}
            viewMode={viewMode}
            onObserve={observeRoom}
            onJoin={joinDiscussion}
          />
          <ClassroomLogs logs={logs} />
        </div>

        <div className="mentor-sessions-sidebar">
          <CreateSessionPanel
            form={form}
            batchOptions={batchOptions}
            notice={createdNotice}
            onChange={updateForm}
            onSubmit={createSession}
          />
          <UpcomingSessionAlert session={upcoming} />
        </div>
      </div>
    </div>
  );
}
