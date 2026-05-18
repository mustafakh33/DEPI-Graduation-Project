import { Phone, Video } from "lucide-react";
import type { StudentChatContact } from "../../types/student.types";

interface ChatHeaderProps {
  contact: StudentChatContact;
}

const getRoleLabel = (role: StudentChatContact["role"]) => {
  if (role === "instructor") return "Instructor";
  if (role === "mentor") return "Mentor";
  return "Student";
};

const ChatHeader = ({ contact }: ChatHeaderProps) => {
  return (
    <div className="shrink-0 border-b border-slate-800 p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={contact.avatarUrl}
              alt={`${contact.name} avatar`}
              className="size-12 rounded-2xl object-cover"
            />

            <span
              className={`absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-[#111827] ${
                contact.isOnline ? "bg-emerald-400" : "bg-red-500"
              }`}
            />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-white">
              {contact.name}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {getRoleLabel(contact.role)}
              {contact.isOnline ? " • Online" : " • Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-blue-600 hover:text-white"
            title="Voice call"
          >
            <Phone className="size-4" />
          </button>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-blue-600 hover:text-white"
            title="Video call"
          >
            <Video className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;