import { PenSquare, Search } from "lucide-react";
import type { ChatConversation } from "../../types/chat.types";

interface Props {
  conversations: ChatConversation[];
  activeStudentId: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (studentId: string) => void;
  getUnreadCount: (studentId: string, base?: number) => number;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ChatSidebar({
  conversations,
  activeStudentId,
  search,
  onSearchChange,
  onSelect,
  getUnreadCount,
}: Props) {
  return (
    <aside className="chat-inbox">
      <div className="chat-inbox__header">
        <h2>Messages</h2>
        <button
          type="button"
          className="chat-inbox__compose"
          aria-label="Compose message"
          onClick={() => onSearchChange("")}
        >
          <PenSquare size={18} />
        </button>
      </div>

      <div className="chat-inbox__search">
        <Search size={16} aria-hidden />
        <input
          type="search"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <ul className="chat-inbox__list">
        {conversations.length === 0 ? (
          <li className="chat-inbox__empty">No conversations found.</li>
        ) : (
          conversations.map((conversation) => {
            const unread = getUnreadCount(
              conversation.studentId,
              conversation.unreadCount
            );
            const isActive = conversation.studentId === activeStudentId;

            return (
              <li key={conversation.studentId}>
                <button
                  type="button"
                  className={
                    isActive
                      ? "chat-inbox__item chat-inbox__item--active"
                      : "chat-inbox__item"
                  }
                  onClick={() => onSelect(conversation.studentId)}
                >
                  <span className="chat-inbox__avatar" aria-hidden>
                    {initials(conversation.name)}
                  </span>
                  <span className="chat-inbox__body">
                    <span className="chat-inbox__row">
                      <strong>{conversation.name}</strong>
                      <time>{conversation.timestamp}</time>
                    </span>
                    <span className="chat-inbox__preview">{conversation.preview}</span>
                  </span>
                  {unread > 0 ? (
                    <span className="chat-inbox__badge">{unread}</span>
                  ) : null}
                </button>
              </li>
            );
          })
        )}
      </ul>
    </aside>
  );
}
