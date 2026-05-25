import { useMemo, useState } from "react";
import {
  mentorRosterStudents,
  mentorSubjectFilters,
} from "../data/mentorStudents.mock";
import { useTablePagination } from "@/features/instructor/hooks/useTablePagination";

export function useMentorStudentsList() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState<string>(mentorSubjectFilters[0]);

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();

    return mentorRosterStudents.filter((student) => {
      const matchesSubject =
        subject === "All Subjects" || student.batchName === subject;
      const matchesSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.studentId.toLowerCase().includes(q);

      return matchesSubject && matchesSearch;
    });
  }, [search, subject]);

  const pagination = useTablePagination(
    filteredStudents,
    `${search}-${subject}`
  );

  return {
    search,
    setSearch,
    subject,
    setSubject,
    subjects: mentorSubjectFilters,
    filteredStudents,
    ...pagination,
  };
}
