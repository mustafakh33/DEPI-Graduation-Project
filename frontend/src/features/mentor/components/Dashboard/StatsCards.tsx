export default function StatsCards({
    totalStudents,
    attendance,
    absence,
  }) {
    return (
      <div className="stats-grid">
  
        <div className="stat-card">
          <h4>Total Students</h4>
          <h2>{totalStudents}</h2>
        </div>
  
        <div className="stat-card">
          <h4>Attendance %</h4>
          <h2>{attendance}%</h2>
        </div>
  
        <div className="stat-card">
          <h4>Absence %</h4>
          <h2>{absence}%</h2>
        </div>
  
      </div>
    );
  }