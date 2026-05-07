export default function MessageInput() {
    return (
      <div className="message-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          className="message-input"
        />
  
        <button className="send-btn">
          Send
        </button>
      </div>
    );
  }