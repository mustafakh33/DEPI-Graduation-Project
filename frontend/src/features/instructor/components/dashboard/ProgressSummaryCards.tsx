import type { SubjectProgress } from "../../types/instructorDashboard.types";

interface Props {
  progress: SubjectProgress;
}

export default function ProgressSummaryCards({ progress }: Props) {
  const submissionPct = Math.round(
    (progress.submissionsDone / progress.submissionsTotal) * 100
  );

  return (
    <div className="dashboard-progress-row">
      <article className="dashboard-progress-card dashboard-progress-card--quiz">
        <p className="dashboard-progress-card__label">Latest Quiz Average</p>
        <p className="dashboard-progress-card__value">
          {progress.quizAverage.toFixed(1)}%
        </p>
        <div className="dashboard-progress-card__bar">
          <span style={{ width: `${progress.quizAverage}%` }} />
        </div>
        <p className="dashboard-progress-card__footnote">{progress.quizCourse}</p>
      </article>

      <article className="dashboard-progress-card dashboard-progress-card--submission">
        <p className="dashboard-progress-card__label">Submission Progress</p>
        <p className="dashboard-progress-card__value">
          {progress.submissionsDone}/{progress.submissionsTotal}
        </p>
        <div className="dashboard-progress-card__bar">
          <span style={{ width: `${submissionPct}%` }} />
        </div>
        <p className="dashboard-progress-card__footnote">
          {progress.assignmentLabel}
        </p>
      </article>
    </div>
  );
}
