import { useState } from "react";

import {
  projectStudents,
} from "../data/grading.mock";

export const useProjectGrading =
  () => {
    const [students, setStudents] =
      useState(
        projectStudents
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