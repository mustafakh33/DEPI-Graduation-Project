type Conversation = {
  id: string | number;
  name: string;
  message: string;
  active?: boolean;
};

export default function ChatSidebar({ conversations }: { conversations: Conversation[] }) {
  return (
    <div className="chat-sidebar">
      <h2>Messages</h2>

      <input
        className="search-input"
        placeholder="Search conversations..."
      />

      {conversations.map((conversation: Conversation) => (
        <div
          key={conversation.id}
          className={`conversation-item ${
            conversation.active ? "active-conversation" : ""
          }`}
        >
          <div className="avatar" />

          <div>
            <h4>{conversation.name}</h4>
            <p>{conversation.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}