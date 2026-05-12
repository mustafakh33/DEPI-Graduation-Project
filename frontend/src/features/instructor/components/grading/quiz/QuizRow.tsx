import type {
    QuizStudent,
  } from "../../../types/grading.types";
  
  import ScoreBar from "../shared/ScoreBar";
  
  interface Props {
    student: QuizStudent;
  }
  
  export default function QuizRow({
    student,
  }: Props) {
    return (
      <tr>
  
        <td>
          #{student.rank}
        </td>
  
        <td className="student-cell">
  
          <div className="student-avatar">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.studentName}
              />
            ) : (
              <div className="avatar-placeholder" />
            )}
          </div>
  
          <div>
            <h4>{student.studentName}</h4>
  
            <span>
              {student.studentId}
            </span>
          </div>
  
        </td>
  
        <td>
          {student.submissionDate}
        </td>
  
        <td>
  
          {student.status ===
          "absent" ? (
            "No Data"
          ) : (
            <ScoreBar
              score={student.score}
            />
          )}
  
        </td>
  
        <td>
  
          <span
            className={`status-badge ${student.status}`}
          >
            {student.status}
          </span>
  
        </td>
  
        <td>
  
          <button className="view-btn">
            View Answers
          </button>
  
        </td>
  
      </tr>
    );
  }