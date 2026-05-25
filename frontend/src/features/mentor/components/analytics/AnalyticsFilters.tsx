import { Search, SlidersHorizontal } from "lucide-react";
import {
  analyticsDepartments,
  analyticsSemesters,
} from "../../data/analytics.mock";
import type { AnalyticsFiltersState } from "../../types/analystics.types";

interface Props {
  filters: AnalyticsFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<AnalyticsFiltersState>>;
  onResetFilters: () => void;
}

export default function AnalyticsFilters({
  filters,
  setFilters,
  onResetFilters,
}: Props) {
  return (
    <div className="analytics-filters">
      <div className="analytics-filters__search">
        <Search size={18} className="analytics-filters__search-icon" aria-hidden />
        <input
          type="search"
          placeholder="Search batches by name or instructor..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
            }))
          }
          aria-label="Search batches"
        />
      </div>

      <select
        className="analytics-filters__select"
        value={filters.semester}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            semester: e.target.value,
          }))
        }
        aria-label="Filter by semester"
      >
        {analyticsSemesters.map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>

      <select
        className="analytics-filters__select"
        value={filters.department}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            department: e.target.value,
          }))
        }
        aria-label="Filter by department"
      >
        {analyticsDepartments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="analytics-filters__icon-btn"
        aria-label="Reset filters"
        onClick={onResetFilters}
      >
        <SlidersHorizontal size={18} />
      </button>
    </div>
  );
}
