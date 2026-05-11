export default function RiskStudents({ students }) {
    return (
      <div className="risk-card">
  
        <h3>Risk Warning</h3>
  
        {students.map((student) => (
          <div
            key={student.id}
            className="risk-student"
          >
            <div>
              <h4>{student.name}</h4>
              <p>
                Attendance {student.attendanceRate}%
              </p>
            </div>
          </div>
        ))}
  
      </div>
    );
  }