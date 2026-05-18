import type { StudentChatMessage } from "../../types/student.types";

interface ChatMessageBubbleProps {
  message: StudentChatMessage;
}

const ChatMessageBubble = ({ message }: ChatMessageBubbleProps) => {
  return (
    <div className={`flex gap-3 ${message.isCurrentStudent ? "justify-end" : ""}`}>
      {!message.isCurrentStudent ? (
        <img
          src={message.senderAvatarUrl}
          alt={`${message.senderName} avatar`}
          className="size-8 rounded-full object-cover"
        />
      ) : null}

      <div
        className={`max-w-[65%] rounded-2xl px-4 py-3 ${
          message.isCurrentStudent
            ? "bg-blue-600 text-white"
            : "bg-[#0f172a] text-slate-200"
        }`}
      >
        <p className="break-words text-sm leading-6">{message.content}</p>

        <p className="mt-2 text-right text-[10px] opacity-70">
          {message.sentAt}
        </p>
      </div>
    </div>
  );
};

export default ChatMessageBubble;