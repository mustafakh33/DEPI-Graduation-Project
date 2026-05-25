import { Calendar, Phone, Video } from "lucide-react";

interface Props {
  name: string;
  majorLabel: string;
  isOnline: boolean;
  onScheduleMeeting: () => void;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ChatHeader({
  name,
  majorLabel,
  isOnline,
  onScheduleMeeting,
}: Props) {
  return (
    <header className="chat-thread__header">
      <div className="chat-thread__student">
        <span className="chat-thread__avatar" aria-hidden>
          {initials(name)}
        </span>
        <div>
          <div className="chat-thread__name-row">
            <h2>{name}</h2>
            <span
              className={
                isOnline
                  ? "chat-thread__status chat-thread__status--online"
                  : "chat-thread__status"
              }
            >
              {isOnline ? "ACTIVE ONLINE" : "OFFLINE"}
            </span>
          </div>
          <p>{majorLabel}</p>
        </div>
      </div>

      <div className="chat-thread__actions">
        <button type="button" className="chat-icon-btn" aria-label="Video call">
          <Video size={18} />
        </button>
        <button type="button" className="chat-icon-btn" aria-label="Voice call">
          <Phone size={18} />
        </button>
        <button
          type="button"
          className="chat-schedule-btn"
          onClick={onScheduleMeeting}
        >
          <Calendar size={16} aria-hidden />
          Schedule Meeting
        </button>
      </div>
    </header>
  );
}
