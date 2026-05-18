import { Crown } from "lucide-react";
import type { StudentChatContact } from "../../types/student.types";

interface ChatContactItemProps {
  contact: StudentChatContact;
  isSelected: boolean;
  onSelect: (contactId: string) => void;
}

const getRoleLabel = (role: StudentChatContact["role"]) => {
  if (role === "instructor") return "Instructor";
  if (role === "mentor") return "Mentor";
  return "Student";
};

const ChatContactItem = ({
  contact,
  isSelected,
  onSelect,
}: ChatContactItemProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(contact.id)}
      className={`mb-2 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
        isSelected ? "bg-blue-600/20" : "hover:bg-white/5"
      }`}
    >
      <div className="relative shrink-0">
        <img
          src={contact.avatarUrl}
          alt={`${contact.name} avatar`}
          className="size-12 rounded-2xl object-cover"
        />

        <span
          className={`absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-[#0b1120] ${
            contact.isOnline ? "bg-emerald-400" : "bg-red-500"
          }`}
        />

        {contact.isGroupLeader ? (
          <span className="absolute -left-2 -top-2 flex size-5 items-center justify-center rounded-full bg-yellow-400 text-slate-950">
            <Crown className="size-3" />
          </span>
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-bold text-white">
            {contact.name}
          </p>

          <span className="shrink-0 text-[10px] text-slate-500">
            {contact.lastMessageAt}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-xs text-slate-400">
            {contact.lastMessage}
          </p>

          {contact.unreadCount ? (
            <span className="flex size-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {contact.unreadCount}
            </span>
          ) : null}
        </div>

        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
          {getRoleLabel(contact.role)}
        </p>
      </div>
    </button>
  );
};

export default ChatContactItem;