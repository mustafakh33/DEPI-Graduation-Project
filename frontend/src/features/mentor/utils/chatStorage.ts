/**
 * Chat sidebar persistence and file helpers for the mentor Chat section.
 *
 * - `loadSavedNotes` / `persistNotes` — localStorage key `mentor-student-notes`
 * - `formatFileSize`, `inferRecentFileType` — attachment display
 */
const NOTES_STORAGE_KEY = "mentor-student-notes";

export function loadSavedNotes(): Record<string, string> {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

export function persistNotes(notes: Record<string, string>): void {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function inferRecentFileType(
  fileName: string
): "pdf" | "doc" | "sheet" {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".pdf")) return "pdf";
  if (/\.(xlsx?|csv)$/.test(lower)) return "sheet";
  return "doc";
}
