type Message = {
  id: string | number;
  sender: string;
  text: string;
  time: string;
};

export default function MessageBubble({ message }: { message: Message }) {
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