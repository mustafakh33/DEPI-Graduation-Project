import { CheckCircle, ClipboardClock, Users } from "lucide-react";
import { useState } from "react";
import StatCard from "../shared/StateCard";
import SearchHeader from "../shared/SearchHeader";
import TablePagination from "../shared/TablePagination";
import AssignmentTable from "./AssignmentTable";
import { useAssignmentGrading } from "../../../hooks/useAssignmentGrading";
import { useTablePagination } from "../../../hooks/useTablePagination";

export default function AssignmentSection() {
  const { students, updateScore, saveGrade } = useAssignmentGrading();
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    `${student.studentName} ${student.studentId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const submittedCount = students.filter((s) => s.status === "submitted").length;
  const pendingCount = students.filter(
    (s) => s.status === "submitted" && !s.saved
  ).length;

  const {
    paginatedItems,
    page,
    setPage,
    totalPages,
    total,
    pageSize,
  } = useTablePagination(filteredStudents, search);

  return (
    <div className="submission-grading-section">
      <div className="stats-grid stats-grid--3">
        <StatCard
          title="Total Students"
          value={String(students.length)}
          icon={<Users size={20} />}
          iconVariant="blue"
        />

        <StatCard
          title="Submitted"
          value={`${submittedCount} / ${students.length}`}
          icon={<CheckCircle size={20} />}
          iconVariant="green"
        />

        <StatCard
          title="Pending Review"
          value={String(pendingCount)}
          icon={<ClipboardClock size={20} />}
          iconVariant="amber"
        />
      </div>

      <div className="table-card">
        <SearchHeader
          search={search}
          setSearch={setSearch}
          placeholder="Search students by name or ID..."
        />

        <AssignmentTable
          students={paginatedItems}
          updateScore={updateScore}
          saveGrade={saveGrade}
        />

        <TablePagination
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
