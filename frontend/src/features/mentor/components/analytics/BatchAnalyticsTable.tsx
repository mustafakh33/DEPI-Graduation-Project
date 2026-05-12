import type {
    BatchAnalytics,
  } from "../../types/analystics.types";
  
  interface Props {
    batches: BatchAnalytics[];
  }
  
  export default function BatchAnalyticsTable({
    batches,
  }: Props) {
    return (
      <div className="analytics-table-container">
  
        <table className="analytics-table">
  
          <thead>
            <tr>
              <th>Batch Name</th>
  
              <th>Attendance %</th>
  
              <th>Avg Study Hrs</th>
  
              <th>Quiz Grades</th>
  
              <th>Trend</th>
            </tr>
          </thead>
  
          <tbody>
  
            {batches.map((batch) => (
              <tr key={batch.id}>
  
                <td>
                  <div>
                    <h4>{batch.batchName}</h4>
  
                    <p>{batch.instructor}</p>
                  </div>
                </td>
  
                <td>
                  {batch.attendancePercent}%
                </td>
  
                <td>
                  {batch.avgStudyHours}h / wk
                </td>
  
                <td>
                  {batch.avgQuizGrade}
                </td>
  
                <td>
                  <span
                    className={`trend-badge trend-${batch.trend}`}
                  >
                    {batch.trend}
                  </span>
                </td>
  
              </tr>
            ))}
  
          </tbody>
  
        </table>
  
      </div>
    );
  }