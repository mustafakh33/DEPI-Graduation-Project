import { useRef } from "react";
import { Image, Mic, Paperclip, Send, Smile } from "lucide-react";
import type { QuickReply } from "../../types/chat.types";

interface Props {
  studentName: string;
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onAttachFile: (file: File) => void;
  quickReplies: QuickReply[];
  onQuickReply: (text: string) => void;
}

export default function MessageInput({
  studentName,
  draft,
  onDraftChange,
  onSend,
  onAttachFile,
  quickReplies,
  onQuickReply,
}: Props) {
  const firstName = studentName.split(" ")[0];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    Array.from(fileList).forEach((file) => onAttachFile(file));
  };

  return (
    <div className="chat-composer">
      <div className="chat-quick-actions">
        {quickReplies.map((reply) => (
          <button
            key={reply.id}
            type="button"
            className="chat-quick-actions__pill"
            onClick={() => onQuickReply(reply.text)}
          >
            {reply.label}
          </button>
        ))}
      </div>

      <div className="chat-composer__box">
        <textarea
          rows={3}
          placeholder={`Type your message to ${firstName}...`}
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="chat-composer__toolbar">
          <div className="chat-composer__tools">
            <input
              ref={fileInputRef}
              type="file"
              className="chat-composer__file-input"
              multiple
              onChange={(e) => {
                handleFilesSelected(e.target.files);
                e.target.value = "";
              }}
            />
            <input
              ref={imageInputRef}
              type="file"
              className="chat-composer__file-input"
              accept="image/*"
              multiple
              onChange={(e) => {
                handleFilesSelected(e.target.files);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              aria-label="Attach file"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip size={18} />
            </button>
            <button type="button" aria-label="Insert emoji">
              <Smile size={18} />
            </button>
            <button
              type="button"
              aria-label="Upload image"
              onClick={() => imageInputRef.current?.click()}
            >
              <Image size={18} />
            </button>
            <button type="button" aria-label="Voice message">
              <Mic size={18} />
            </button>
          </div>
          <span className="chat-composer__hint">Press Enter to send</span>
          <button
            type="button"
            className="chat-composer__send"
            aria-label="Send message"
            onClick={onSend}
            disabled={!draft.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
