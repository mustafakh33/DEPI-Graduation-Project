import { CheckCheck, Download, FileText } from "lucide-react";
import type { ChatMessage } from "../../types/chat.types";

interface Props {
  message: ChatMessage;
  studentName: string;
  onDownloadFile?: (fileName: string, downloadUrl?: string) => void;
}

function studentInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MessageBubble({
  message,
  studentName,
  onDownloadFile,
}: Props) {
  if (message.type === "system") {
    if (message.text === "TODAY" || message.text === "YESTERDAY") {
      return (
        <div className="chat-date-divider">
          <span>{message.text}</span>
        </div>
      );
    }
    return (
      <div className="chat-system-msg">
        <span>{message.text}</span>
      </div>
    );
  }

  if (message.type === "file") {
    const isMentor = message.sender === "mentor";
    return (
      <div
        className={
          isMentor ? "chat-msg-row chat-msg-row--mentor" : "chat-msg-row chat-msg-row--student"
        }
      >
        {!isMentor ? (
          <span className="chat-msg-avatar" aria-hidden>
            {studentInitials(studentName)}
          </span>
        ) : null}
        <div className="chat-file-card">
          <FileText size={28} className="chat-file-card__icon" aria-hidden />
          <div>
            <strong>{message.fileName}</strong>
            <span>{message.fileSize}</span>
          </div>
          <button
            type="button"
            className="chat-file-card__download"
            aria-label={`Download ${message.fileName}`}
            onClick={() =>
              onDownloadFile?.(message.fileName, message.downloadUrl)
            }
          >
            <Download size={18} />
          </button>
          <time>{message.time}</time>
        </div>
      </div>
    );
  }

  const isMentor = message.sender === "mentor";

  return (
    <div
      className={
        isMentor ? "chat-msg-row chat-msg-row--mentor" : "chat-msg-row chat-msg-row--student"
      }
    >
      {!isMentor ? (
        <span className="chat-msg-avatar" aria-hidden>
          {studentInitials(studentName)}
        </span>
      ) : null}
      <div className={isMentor ? "chat-bubble chat-bubble--mentor" : "chat-bubble chat-bubble--student"}>
        <p>{message.text}</p>
        <footer>
          <time>{message.time}</time>
          {isMentor && message.read ? (
            <CheckCheck size={14} className="chat-read-receipt" aria-label="Read" />
          ) : null}
        </footer>
      </div>
    </div>
  );
}
