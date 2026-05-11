interface Props {
    stats: {
      avgAttendance: number | string;
  
      avgQuizGrade: string;
  
      avgStudyHours: number | string;
  
      totalActiveStudents: number;
    };
  }
  
  export default function AnalyticsStats({
    stats,
  }: Props) {
    return (
      <div className="analytics-stats">
  
        <div className="analytics-card">
          <h4>Active Students</h4>
          <h2>
            {stats.totalActiveStudents}
          </h2>
        </div>
  
        <div className="analytics-card">
          <h4>Avg Attendance</h4>
          <h2>
            {stats.avgAttendance}%
          </h2>
        </div>
  
        <div className="analytics-card">
          <h4>Avg Quiz Grade</h4>
          <h2>
            {stats.avgQuizGrade}
          </h2>
        </div>
  
        <div className="analytics-card">
          <h4>Avg Study Hours</h4>
          <h2>
            {stats.avgStudyHours}h
          </h2>
        </div>
  
      </div>
    );
  }