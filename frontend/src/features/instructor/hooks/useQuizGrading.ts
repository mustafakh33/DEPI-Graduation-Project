import { useState } from "react";

import { gradingMock } from "../data/grading.mock";

export const useQuizGrading =
  () => {
    const [search, setSearch] =
      useState("");

    const [sort, setSort] =
      useState("highest");

    const filteredStudents =
      [...gradingMock.quizStudents]
        .filter((student) => {
          const q = search.toLowerCase();
          return (
            student.studentName.toLowerCase().includes(q) ||
            student.studentId.toLowerCase().includes(q)
          );
        })
        .sort((a, b) =>
          sort === "highest"
            ? b.score - a.score
            : a.score - b.score
        );

    return {
      search,

      setSearch,

      sort,

      setSort,

      filteredStudents,
    };
  };