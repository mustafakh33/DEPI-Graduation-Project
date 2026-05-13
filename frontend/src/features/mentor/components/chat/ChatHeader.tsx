import type { Student } from "../../types/mentor.types";

export default function ChatHeader({ student }: { student: Student }) {
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