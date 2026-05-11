import StudentCard from "./StudentCard";

export default function StudentGrid({ students }) {
  return (
    <div className="students-grid">

      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
        />
      ))}

    </div>
  );
}