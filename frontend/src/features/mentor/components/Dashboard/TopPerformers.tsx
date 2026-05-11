export default function TopPerformers({ students }) {
    return (
      <div className="top-card">
  
        <h3>Top Performers</h3>
  
        {students.map((student) => (
          <div
            key={student.id}
            className="top-student"
          >
            <div>
              <h4>{student.name}</h4>
  
              <p>
                GPA {student.gpa}
              </p>
            </div>
          </div>
        ))}
  
      </div>
    );
  }