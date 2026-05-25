import { useStudentsList } from "../../hooks/useStudentsList";
import StudentsFilters from "./StudentsFilters";
import StudentsPagination from "./StudentsPagination";
import StudentsTable from "./StudentsTable";
import "../../styles/students.css";

export default function StudentsListPage() {
  const {
    search,
    setSearch,
    batch,
    setBatch,
    batches,
    paginatedItems,
    page,
    setPage,
    totalPages,
    total,
    pageSize,
  } = useStudentsList();

  return (
    <div className="students-page">
      <header className="students-page-header">
        <div>
          <h1>Students</h1>
          <p>Roster and performance for your enrolled classes.</p>
        </div>
      </header>

      <div className="students-card">
        <StudentsFilters
          search={search}
          onSearchChange={setSearch}
          batch={batch}
          onBatchChange={setBatch}
          batches={batches}
        />

        <StudentsTable students={paginatedItems} />

        <StudentsPagination
          total={total}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
