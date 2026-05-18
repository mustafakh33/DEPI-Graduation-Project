import type { GroupStudyMessage } from "../../types/student.types";

interface GroupStudyMessageBubbleProps {
  message: GroupStudyMessage;
}

const GroupStudyMessageBubble = ({
  message,
}: GroupStudyMessageBubbleProps) => {
  return (
    <div
      className={`flex gap-3 ${message.isCurrentStudent ? "justify-end" : ""}`}
    >
      {!message.isCurrentStudent ? (
        <img
          src={message.senderAvatarUrl}
          alt={`${message.senderName} avatar`}
          className="size-8 rounded-full object-cover"
        />
      ) : null}

      <div
        className={`max-w-[260px] rounded-2xl px-4 py-3 ${
          message.isCurrentStudent
            ? "bg-blue-600 text-white"
            : "bg-[#111827] text-slate-200"
        }`}
      >
        <div className="mb-1 flex items-center justify-between gap-3">
          <span className="text-xs font-bold">{message.senderName}</span>

          <span className="text-[10px] opacity-70">{message.sentAt}</span>
        </div>

        <p className="break-words text-xs leading-5">{message.content}</p>
      </div>
    </div>
  );
};

export default GroupStudyMessageBubble;