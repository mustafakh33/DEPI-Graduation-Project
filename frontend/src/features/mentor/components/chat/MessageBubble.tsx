export default function MessageBubble({ message }) {
    return (
      <div
        className={`message-wrapper ${
          message.sender === "mentor"
            ? "mentor-message"
            : "student-message"
        }`}
      >
        <div className="message-bubble">
          <p>{message.text}</p>
          <small>{message.time}</small>
        </div>
      </div>
    );
  }