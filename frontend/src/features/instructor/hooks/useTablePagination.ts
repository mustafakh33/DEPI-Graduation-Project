/**
 * Client-side table pagination (page size 7).
 *
 * Shared by instructor students/quiz grading and mentor students/analytics.
 * Resets to page 1 when `resetKey` changes (e.g. filter string).
 */
import { useEffect, useMemo, useState } from "react";

/** Default rows per page across instructor and mentor tables. */
export const GRADING_PAGE_SIZE = 7;

export function useTablePagination<T>(
  items: T[],
  resetKey: string | number = items.length
) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  const totalPages = Math.max(
    1,
    Math.ceil(items.length / GRADING_PAGE_SIZE)
  );
  const currentPage = Math.min(page, totalPages);

  const paginatedItems = useMemo(
    () =>
      items.slice(
        (currentPage - 1) * GRADING_PAGE_SIZE,
        currentPage * GRADING_PAGE_SIZE
      ),
    [items, currentPage]
  );

  return {
    paginatedItems,
    page: currentPage,
    setPage,
    totalPages,
    total: items.length,
    pageSize: GRADING_PAGE_SIZE,
  };
}
