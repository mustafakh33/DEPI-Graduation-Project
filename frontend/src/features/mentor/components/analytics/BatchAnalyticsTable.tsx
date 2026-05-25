import {
  ChevronLeft,
  ChevronRight,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { BatchAnalytics, TrendStatus } from "../../types/analystics.types";

interface Props {
  batches: BatchAnalytics[];
  page: number;
  pageSize: number;
  totalFiltered: number;
  totalBatches: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function attendanceClass(value: number): string {
  if (value >= 90) return "analytics-metric--high";
  if (value >= 75) return "analytics-metric--mid";
  return "analytics-metric--low";
}

function trendMeta(trend: TrendStatus): {
  label: string;
  Icon: typeof TrendingUp;
} {
  switch (trend) {
    case "strong":
      return { label: "STRONG", Icon: TrendingUp };
    case "rising":
      return { label: "RISING", Icon: TrendingUp };
    case "critical":
      return { label: "CRITICAL", Icon: TrendingDown };
    case "warning":
      return { label: "WARNING", Icon: TrendingDown };
    default:
      return { label: "STABLE", Icon: Minus };
  }
}

export default function BatchAnalyticsTable({
  batches,
  page,
  pageSize,
  totalFiltered,
  totalBatches,
  totalPages,
  onPageChange,
}: Props) {
  const showingFrom = totalFiltered === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = Math.min(page * pageSize, totalFiltered);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    0,
    5
  );

  return (
    <section className="analytics-table-section">
      <div className="analytics-table-container">
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Batch Name</th>
              <th>Attendance %</th>
              <th>Absence %</th>
              <th>Avg Study Hrs</th>
              <th>Quiz Grades</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {batches.length === 0 ? (
              <tr>
                <td colSpan={6} className="analytics-table__empty">
                  No batches match your filters.
                </td>
              </tr>
            ) : (
              batches.map((batch) => {
                const { label, Icon } = trendMeta(batch.trend);

                return (
                  <tr key={batch.id}>
                    <td>
                      <div className="analytics-batch-cell">
                        <span
                          className="analytics-batch-icon"
                          style={{ backgroundColor: batch.batchIconColor }}
                          aria-hidden
                        >
                          {batch.batchIcon}
                        </span>
                        <span>
                          <strong>{batch.batchName}</strong>
                          <span>{batch.instructor}</span>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`analytics-metric ${attendanceClass(batch.attendancePercent)}`}
                      >
                        {batch.attendancePercent}%
                      </span>
                    </td>
                    <td className="analytics-muted">{batch.absencePercent}%</td>
                    <td>{batch.avgStudyHours}h / wk</td>
                    <td>
                      <span
                        className={`analytics-grade ${attendanceClass(batch.quizScore)}`}
                      >
                        {batch.avgQuizGrade}
                      </span>
                    </td>
                    <td>
                      <span className={`analytics-trend analytics-trend--${batch.trend}`}>
                        <Icon size={14} aria-hidden />
                        {label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <footer className="analytics-table-footer">
        <p>
          Showing {showingFrom}–{showingTo} of {totalFiltered} batches
          {totalFiltered < totalBatches ? ` (${totalBatches} total)` : ""}
        </p>
        <nav className="analytics-pagination" aria-label="Batch table pagination">
          <button
            type="button"
            className="analytics-pagination__btn"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={
                pageNumber === page
                  ? "analytics-pagination__btn analytics-pagination__btn--active"
                  : "analytics-pagination__btn"
              }
              onClick={() => onPageChange(pageNumber)}
              aria-label={`Page ${pageNumber}`}
              aria-current={pageNumber === page ? "page" : undefined}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            className="analytics-pagination__btn"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      </footer>
    </section>
  );
}
