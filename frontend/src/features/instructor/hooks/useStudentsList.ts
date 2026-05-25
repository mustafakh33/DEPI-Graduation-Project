import { useMemo, useState } from "react";
import {
  instructorBatches,
  instructorStudents,
} from "../data/students.mock";
import { useTablePagination } from "./useTablePagination";

export function useStudentsList() {
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState<string>(instructorBatches[0]);

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();

    return instructorStudents.filter((student) => {
      const matchesBatch =
        batch === "All Batches" || student.batchName === batch;
      const matchesSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.studentId.toLowerCase().includes(q);

      return matchesBatch && matchesSearch;
    });
  }, [search, batch]);

  const pagination = useTablePagination(
    filteredStudents,
    `${search}-${batch}`
  );

  return {
    search,
    setSearch,
    batch,
    setBatch,
    batches: instructorBatches,
    filteredStudents,
    ...pagination,
  };
}
