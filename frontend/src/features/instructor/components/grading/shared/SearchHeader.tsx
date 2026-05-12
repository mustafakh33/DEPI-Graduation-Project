interface Props {
    search: string;
  
    setSearch: (
      value: string
    ) => void;
  
    sort?: string;
  
    setSort?: (
      value: string
    ) => void;
  }
  
  export default function SearchHeader({
    search,
  
    setSearch,
  
    sort,
  
    setSort,
  }: Props) {
    return (
      <div className="table-header">
  
        <input
          type="text"
          placeholder="Search by student name or ID"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
  
        {sort && setSort && (
          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
          >
            <option value="highest">
              Highest Score
            </option>
  
            <option value="lowest">
              Lowest Score
            </option>
  
          </select>
        )}
  
      </div>
    );
  }