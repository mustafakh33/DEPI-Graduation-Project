export function toCsv(records: Record<string, unknown>[]) {
  if (!records.length) {
    return "";
  }

  const headers = Object.keys(records[0]);
  const rows = records.map((record) =>
    headers
      .map((header) => {
        const value = record[header];
        const text = value === null || value === undefined ? "" : String(value);
        return `"${text.replace(/"/g, '""')}"`;
      })
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}
