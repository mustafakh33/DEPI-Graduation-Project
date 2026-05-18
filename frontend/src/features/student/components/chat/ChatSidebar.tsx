import { MessageCircle, Search } from "lucide-react";
import type { StudentChatContact } from "../../types/student.types";
import ChatContactItem from "./ChatContactItem";

interface ChatSidebarProps {
  contacts: StudentChatContact[];
  selectedContactId?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSelectContact: (contactId: string) => void;
}

const ChatSidebar = ({
  contacts,
  selectedContactId,
  searchValue,
  onSearchChange,
  onSelectContact,
}: ChatSidebarProps) => {
  return (
    <aside className="flex min-h-0 flex-col border-r border-slate-800 bg-[#0b1120]">
      <div className="shrink-0 border-b border-slate-800 p-5">
        <div className="flex items-center gap-2">
          <MessageCircle className="size-5 text-blue-400" />

          <div>
            <h1 className="text-xl font-bold text-white">Chat</h1>
            <p className="mt-1 text-xs text-slate-400">
              Instructor, mentor, and your group members.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#111827] px-3 py-2">
          <Search className="size-4 text-slate-500" />

          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search chats..."
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {contacts.map((contact) => (
          <ChatContactItem
            key={contact.id}
            contact={contact}
            isSelected={contact.id === selectedContactId}
            onSelect={onSelectContact}
          />
        ))}
      </div>
    </aside>
  );
};

export default ChatSidebar;