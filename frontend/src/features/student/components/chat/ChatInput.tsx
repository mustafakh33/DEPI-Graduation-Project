import { Paperclip, Send, Smile } from "lucide-react";
import type { RefObject } from "react";

interface ChatInputProps {
  newMessage: string;
  emojis: string[];
  showEmojiPicker: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onToggleEmojiPicker: () => void;
  onEmojiClick: (emoji: string) => void;
  onAttachFile: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatInput = ({
  newMessage,
  emojis,
  showEmojiPicker,
  fileInputRef,
  onMessageChange,
  onSendMessage,
  onToggleEmojiPicker,
  onEmojiClick,
  onAttachFile,
  onFileChange,
}: ChatInputProps) => {
  return (
    <div className="relative shrink-0 border-t border-slate-800 p-4">
      {showEmojiPicker ? (
        <div className="absolute bottom-20 left-4 z-20 grid grid-cols-5 gap-2 rounded-2xl border border-slate-700 bg-[#0f172a] p-3 shadow-2xl">
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

      <div className="flex items-center gap-2 rounded-2xl bg-[#0f172a] p-2">
        <button
          type="button"
          onClick={onToggleEmojiPicker}
          className="flex size-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <Smile className="size-4" />
        </button>

        <button
          type="button"
          onClick={onAttachFile}
          className="flex size-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <Paperclip className="size-4" />
        </button>

        <input
          value={newMessage}
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
  );
};

export default ChatInput;