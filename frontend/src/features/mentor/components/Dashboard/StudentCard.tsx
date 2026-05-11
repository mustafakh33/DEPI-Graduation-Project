import type {

    StudentCardProps,
  
  } from "../../types/mentor.types";
  
  export default function StudentCard({
  
    student,
  
  }: StudentCardProps) {
  
    return (
      <div className="student-card">
  
        <div className="student-image-placeholder">
  
          {student.image ? (
            <img
              src={student.image}
              alt={student.name}
            />
          ) : (
            <div className="empty-image">
              Add Photo
            </div>
          )}
  
        </div>
  
        <h3>{student.name}</h3>
  
        <p>
          {student.major} • {student.year}
        </p>
  
        <button className="view-profile-btn">
          View Profile
        </button>
  
      </div>
    );
  }