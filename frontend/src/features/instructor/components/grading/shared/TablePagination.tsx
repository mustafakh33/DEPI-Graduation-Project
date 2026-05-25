interface Props {
  total: number;
  page: number;
  pageSize?: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TablePagination({
  total,
  page,
  pageSize = 7,
  totalPages,
  onPageChange,
}: Props) {
  if (total === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="grading-pagination">
      <p className="grading-pagination-info">
        Showing {start}-{end} of {total} Students
      </p>

      <div className="grading-pagination-controls">
        <button
          type="button"
          className="page-btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            className={`page-btn ${n === page ? "page-btn--active" : ""}`}
            onClick={() => onPageChange(n)}
            aria-label={`Page ${n}`}
            aria-current={n === page ? "page" : undefined}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          className="page-btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}
