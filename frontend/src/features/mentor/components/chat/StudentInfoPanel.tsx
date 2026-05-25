import { FileSpreadsheet, FileText } from "lucide-react";
import type { ChatRecentFile, ChatUpcomingSession } from "../../types/chat.types";

interface Props {
  name: string;
  studentId: string;
  year: string;
  gpa: number;
  recentFiles: ChatRecentFile[];
  upcomingSession?: ChatUpcomingSession;
  privateNote: string;
  onNoteChange: (value: string) => void;
  onSaveNote: () => void;
  isNoteDirty: boolean;
  noteSaveFeedback: string | null;
  onJoinSession: () => void;
  onDownloadFile: (fileName: string, downloadUrl?: string) => void;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function fileIcon(type: ChatRecentFile["type"]) {
  if (type === "sheet") return <FileSpreadsheet size={18} />;
  return <FileText size={18} />;
}

export default function StudentInfoPanel({
  name,
  studentId,
  year,
  gpa,
  recentFiles,
  upcomingSession,
  privateNote,
  onNoteChange,
  onSaveNote,
  isNoteDirty,
  noteSaveFeedback,
  onJoinSession,
  onDownloadFile,
}: Props) {
  const yearLabel = year.toLowerCase().includes("year")
    ? year.replace(/semester/i, "").trim()
    : year;

  return (
    <aside className="chat-profile-panel">
      <div className="chat-profile-panel__hero">
        <span className="chat-profile-panel__avatar" aria-hidden>
          {initials(name)}
        </span>
        <h3>{name}</h3>
        <p className="chat-profile-panel__id">Student ID: {studentId}</p>
        <div className="chat-profile-panel__badges">
          <span className="chat-badge chat-badge--blue">{yearLabel}</span>
          <span className="chat-badge chat-badge--green">HONORS</span>
          <span className="chat-badge chat-badge--muted">{gpa.toFixed(1)} GPA</span>
        </div>
      </div>

      {recentFiles.length > 0 ? (
        <section className="chat-profile-panel__section">
          <h4>Recent Files</h4>
          <ul>
            {recentFiles.map((file) => (
              <li key={file.id}>
                <button
                  type="button"
                  className="chat-file-row"
                  onClick={() => onDownloadFile(file.name)}
                >
                  <span className="chat-file-row__icon">{fileIcon(file.type)}</span>
                  <span className="chat-file-row__meta">
                    <strong>{file.name}</strong>
                    <span>{file.sharedAt}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {upcomingSession ? (
        <section className="chat-profile-panel__section">
          <h4>Upcoming Sessions</h4>
          <div className="chat-session-card">
            <strong>{upcomingSession.title}</strong>
            <p>{upcomingSession.scheduledAt}</p>
            <button type="button" className="chat-session-card__join" onClick={onJoinSession}>
              JOIN ROOM
            </button>
          </div>
        </section>
      ) : null}

      <section className="chat-profile-panel__section chat-profile-panel__notes">
        <h4>NOTES</h4>
        <textarea
          placeholder="Add a private note about this student..."
          value={privateNote}
          onChange={(e) => onNoteChange(e.target.value)}
        />
        <div className="chat-notes-actions">
          {noteSaveFeedback ? (
            <span className="chat-notes-feedback" role="status">
              {noteSaveFeedback}
            </span>
          ) : null}
          <button
            type="button"
            className="chat-notes-save-btn"
            onClick={onSaveNote}
            disabled={!isNoteDirty}
          >
            Save Note
          </button>
        </div>
      </section>
    </aside>
  );
}
