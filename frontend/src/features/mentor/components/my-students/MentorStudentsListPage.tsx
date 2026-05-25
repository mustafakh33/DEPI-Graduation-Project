import StudentsPagination from "@/features/instructor/components/students/StudentsPagination";
import "@/features/instructor/styles/students.css";
import { useMentorStudentsList } from "../../hooks/useMentorStudentsList";
import MentorStudentsFilters from "./MentorStudentsFilters";
import MentorStudentsTable from "./MentorStudentsTable";

export default function MentorStudentsListPage() {
  const {
    search,
    setSearch,
    subject,
    setSubject,
    subjects,
    paginatedItems,
    page,
    setPage,
    totalPages,
    total,
    pageSize,
  } = useMentorStudentsList();

  return (
    <div className="students-page">
      <header className="students-page-header">
        <div>
          <h1>Students</h1>
          <p>Roster and performance for your enrolled classes.</p>
        </div>
      </header>

      <div className="students-card">
        <MentorStudentsFilters
          search={search}
          onSearchChange={setSearch}
          subject={subject}
          onSubjectChange={setSubject}
          subjects={subjects}
        />

        <MentorStudentsTable students={paginatedItems} />

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
