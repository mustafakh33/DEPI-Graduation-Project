import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  sort?: string;
  setSort?: (value: string) => void;
  placeholder?: string;
}

export default function SearchHeader({
  search,
  setSearch,
  sort,
  setSort,
  placeholder = "Search students by name or ID...",
}: Props) {
  return (
    <div className="table-header">
      <div className="table-search">
        <Search size={18} className="table-search-icon" aria-hidden />
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {sort && setSort && (
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="highest">Highest Score</option>
          <option value="lowest">Lowest Score</option>
        </select>
      )}
    </div>
  );
}
