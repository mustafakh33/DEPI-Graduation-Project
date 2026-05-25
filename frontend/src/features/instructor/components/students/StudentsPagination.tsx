interface Props {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function StudentsPagination({
  total,
  page,
  pageSize,
  totalPages,
  onPageChange,
}: Props) {
  if (total === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="students-pagination">
      <p>
        Showing {start}-{end} of {total} students
      </p>
      <div className="students-pagination-controls">
        <button
          type="button"
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
            className={n === page ? "active" : ""}
            onClick={() => onPageChange(n)}
            aria-current={n === page ? "page" : undefined}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
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
