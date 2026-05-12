import type {
    AnalyticsFiltersState,
  } from "../../types/analystics.types";
  
  interface Props {
    filters: AnalyticsFiltersState;
  
    setFilters: React.Dispatch<
      React.SetStateAction<AnalyticsFiltersState>
    >;
  }
  
  export default function AnalyticsFilters({
    filters,
    setFilters,
  }: Props) {
    return (
      <div className="analytics-filters">
  
        <input
          type="text"
          placeholder="Search batches..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
            }))
          }
        />
  
        <select
          value={filters.semester}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              semester: e.target.value,
            }))
          }
        >
          <option>
            All Semesters
          </option>
  
          <option>
            Semester 1
          </option>
  
          <option>
            Semester 2
          </option>
        </select>
  
        <select
          value={filters.batch}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              batch: e.target.value,
            }))
          }
        >
          <option>
            All Batches
          </option>
  
          <option>
            Comp Sci 2024 - A
          </option>
  
          <option>
            Business Admin 2024
          </option>
        </select>
  
      </div>
    );
  }