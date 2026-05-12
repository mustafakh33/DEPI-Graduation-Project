export default function ChatSidebar({ conversations }) {
    return (
      <div className="chat-sidebar">
        <h2>Messages</h2>
  
        <input
          className="search-input"
          placeholder="Search conversations..."
        />
  
        {conversations.map((conversation) => (
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