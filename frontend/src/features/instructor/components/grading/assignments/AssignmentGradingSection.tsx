import StatCard from "../shared/StateCard";
import SearchHeader from "../shared/SearchHeader";
import AssignmentTable from "./AssignmentTable";
import {useAssignmentGrading,} from "../../../hooks/useAssignmentGrading";
import { useState } from "react";
export default function AssignmentSection() {
  const {
    students,

    updateScore,

    saveGrade,
  } = useAssignmentGrading();

  const [search, setSearch] =
    useState("");

  const filteredStudents =
    students.filter((student) =>
      student.studentName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div>

      <div className="stats-grid">

        <StatCard
          title="Assignments"
          value="12"
        />

        <StatCard
          title="Submission Rate"
          value="84%"
        />

        <StatCard
          title="Pending Review"
          value="15"
        />

      </div>

      <div className="table-card">

        <SearchHeader
          search={search}
          setSearch={setSearch}
        />

        <AssignmentTable
          students={
            filteredStudents
          }
          updateScore={
            updateScore
          }
          saveGrade={saveGrade}
        />

      </div>

    </div>
  );
}