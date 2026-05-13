import { useChat } from "../hooks/useChat";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";
import StudentInfoPanel from "../components/chat/StudentInfoPanel";

import "../style/Chat.css";

export default function ChatPage() {
  const { conversations, messages, student } = useChat();

  return (
    <div className="chat-page">
      {/* LEFT */}
      <ChatSidebar conversations={conversations} />

      {/* CENTER */}
      <div className="chat-main">
        <ChatHeader student={student} />

        <div className="messages-container">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>

        <MessageInput />
      </div>

      {/* RIGHT */}
      <StudentInfoPanel student={student} />
    </div>
  );
}
