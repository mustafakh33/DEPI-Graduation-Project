import { ChevronDown, Search } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  subject: string;
  onSubjectChange: (value: string) => void;
  subjects: readonly string[];
}

export default function MentorStudentsFilters({
  search,
  onSearchChange,
  subject,
  onSubjectChange,
  subjects,
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
        <select value={subject} onChange={(e) => onSubjectChange(e.target.value)}>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s === "All Subjects" ? "Filter by subject" : s}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="students-select-icon" aria-hidden />
      </div>
    </div>
  );
}
