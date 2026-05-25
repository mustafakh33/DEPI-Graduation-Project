import { ChevronDown, Search } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  batch: string;
  onBatchChange: (value: string) => void;
  batches: readonly string[];
}

export default function StudentsFilters({
  search,
  onSearchChange,
  batch,
  onBatchChange,
  batches,
}: Props) {
  return (
    <div className="students-filters">
      <div className="students-search">
        <Search size={18} className="students-search-icon" aria-hidden />
        <input
          type="search"
          placeholder="Search by name or student ID..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="students-batch-select">
        <select value={batch} onChange={(e) => onBatchChange(e.target.value)}>
          {batches.map((b) => (
            <option key={b} value={b}>
              {b === "All Batches" ? "Filter by batch" : b}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="students-select-icon" aria-hidden />
      </div>
    </div>
  );
}
