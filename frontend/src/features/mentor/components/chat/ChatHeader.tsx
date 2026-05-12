export default function ChatHeader({ student }) {
    return (
      <div className="chat-header">
        <div>
          <h2>{student.name}</h2>
          <p>{student.major}</p>
        </div>
  
        <button className="meeting-btn">
          Schedule Meeting
        </button>
      </div>
    );
  }