import type {
    ProjectStudent,
  } from "../../../types/grading.types";
  
  import SaveGradeButton from "../shared/SaveGradeButton";
  
  interface Props {
    student: ProjectStudent;
  
    onScoreChange: (
      score: number
    ) => void;
  
    onSave: () => void;
  }
  
  export default function ProjectRow({
    student,
  
    onScoreChange,
  
    onSave,
  }: Props) {
    return (
      <tr>
  
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
  
          <span
            className={`status-badge ${student.status}`}
          >
            {student.status}
          </span>
  
        </td>
  
        <td>
          <button className="file-btn">
            Open File
          </button>
        </td>
  
        <td>
  
          <input
            type="number"
            value={student.score}
            max={100}
            onChange={(e) =>
              onScoreChange(
                Number(
                  e.target.value
                )
              )
            }
            className="score-input"
          />
  
        </td>
  
        <td>
  
          <SaveGradeButton
            saved={student.saved}
            onClick={onSave}
          />
  
        </td>
  
      </tr>
    );
  }