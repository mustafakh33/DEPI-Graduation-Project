export function paginate<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  const sliced = items.slice(start, start + pageSize);

  return {
    items: sliced,
    page,
    pageSize,
    total: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
  };
}
