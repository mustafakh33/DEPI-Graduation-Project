import { useState } from "react";

import {
  assignmentStudents,
} from "../data/grading.mock";

export const useAssignmentGrading =
  () => {
    const [students, setStudents] =
      useState(
        assignmentStudents
      );

    const updateScore = (
      id: string,
      score: number
    ) => {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === id
            ? {
                ...student,
                score,
              }
            : student
        )
      );
    };

    const saveGrade = (
      id: string
    ) => {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === id
            ? {
                ...student,
                saved: true,
              }
            : student
        )
      );
    };

    return {
      students,

      updateScore,

      saveGrade,
    };
  };