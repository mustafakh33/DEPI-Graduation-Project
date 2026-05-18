import type { RefObject } from "react";
import type { StudentChatMessage } from "../../types/student.types";
import ChatMessageBubble from "./ChatMessageBubble";

interface ChatMessageListProps {
  messages: StudentChatMessage[];
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

const ChatMessageList = ({ messages, messagesEndRef }: ChatMessageListProps) => {
  return (
    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6">
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;