import StatCard from "../shared/StateCard";

import SearchHeader from "../shared/SearchHeader";

import ProjectTable from "./ProjectTable";

import {
  useProjectGrading,
} from "../../../hooks/useProjectGrading";

import { useState } from "react";

export default function ProjectSection() {
  const {
    students,

    updateScore,

    saveGrade,
  } = useProjectGrading();

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
          title="Projects"
          value="24"
        />

        <StatCard
          title="Submission Rate"
          value="79%"
        />

        <StatCard
          title="Pending Review"
          value="8"
        />

      </div>

      <div className="table-card">

        <SearchHeader
          search={search}
          setSearch={setSearch}
        />

        <ProjectTable
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