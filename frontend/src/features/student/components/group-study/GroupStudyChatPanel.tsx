import { Paperclip, Send, Smile } from "lucide-react";
import type { RefObject } from "react";
import type { GroupStudyMessage } from "../../types/student.types";
import GroupStudyMessageBubble from "./GroupStudyMessageBubble";

interface GroupStudyChatPanelProps {
  messages: GroupStudyMessage[];
  message: string;
  emojis: string[];
  showEmojiPicker: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onToggleEmojiPicker: () => void;
  onEmojiClick: (emoji: string) => void;
  onAttachFile: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GroupStudyChatPanel = ({
  messages,
  message,
  emojis,
  showEmojiPicker,
  fileInputRef,
  messagesEndRef,
  onMessageChange,
  onSendMessage,
  onToggleEmojiPicker,
  onEmojiClick,
  onAttachFile,
  onFileChange,
}: GroupStudyChatPanelProps) => {
  return (
    <aside className="flex min-h-0 flex-col overflow-hidden rounded-[28px] border border-slate-800 bg-[#0f172a] shadow-2xl">
      <div className="shrink-0 border-b border-slate-800 p-5">
        <p className="text-sm font-bold text-white">Live Room Chat</p>

        <p className="mt-1 text-xs text-slate-400">
          Send messages, emojis, files, and share the meeting code here.
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((chatMessage) => (
          <GroupStudyMessageBubble
            key={chatMessage.id}
            message={chatMessage}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="relative shrink-0 border-t border-slate-800 p-4">
        {showEmojiPicker ? (
          <div className="absolute bottom-20 left-4 z-20 grid grid-cols-4 gap-2 rounded-2xl border border-slate-700 bg-[#111827] p-3 shadow-2xl">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => onEmojiClick(emoji)}
                className="flex size-9 items-center justify-center rounded-xl text-lg transition hover:bg-slate-800"
              >
                {emoji}
              </button>
            ))}
          </div>
        ) : null}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={onFileChange}
        />

        <div className="flex items-center gap-2 rounded-2xl bg-[#111827] p-2">
          <button
            type="button"
            onClick={onToggleEmojiPicker}
            className="flex size-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <Smile className="size-4" />
          </button>

          <button
            type="button"
            onClick={onAttachFile}
            className="flex size-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <Paperclip className="size-4" />
          </button>

          <input
            value={message}
            onChange={(event) => onMessageChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSendMessage();
              }
            }}
            placeholder="Type a message..."
            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500"
          />

          <button
            type="button"
            onClick={onSendMessage}
            className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default GroupStudyChatPanel;