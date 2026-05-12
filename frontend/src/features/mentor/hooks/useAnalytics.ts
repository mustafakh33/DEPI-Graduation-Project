import { useMemo, useState } from "react";

import { batchesAnalytics } from "../data/analytics.mock";

import type {
  AnalyticsFiltersState,
} from "../types/analystics.types";

export const useAnalytics = () => {
  const [filters, setFilters] =
    useState<AnalyticsFiltersState>({
      semester: "All Semesters",
      batch: "All Batches",
      search: "",
    });

  const filteredBatches = useMemo(() => {
    return batchesAnalytics.filter((batch) => {

      const matchesSemester =
        filters.semester === "All Semesters" ||
        batch.semester === filters.semester;

      const matchesBatch =
        filters.batch === "All Batches" ||
        batch.batchName === filters.batch;

      const matchesSearch =
        batch.batchName
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      return (
        matchesSemester &&
        matchesBatch &&
        matchesSearch
      );
    });
  }, [filters]);

  const stats = useMemo(() => {

    const totalAttendance =
      filteredBatches.reduce(
        (sum, batch) =>
          sum + batch.attendancePercent,
        0
      );

    const totalStudyHours =
      filteredBatches.reduce(
        (sum, batch) =>
          sum + batch.avgStudyHours,
        0
      );

    const totalStudents =
      filteredBatches.reduce(
        (sum, batch) =>
          sum + batch.activeStudents,
        0
      );

    return {
      avgAttendance:
        filteredBatches.length > 0
          ? (
              totalAttendance /
              filteredBatches.length
            ).toFixed(1)
          : 0,

      avgStudyHours:
        filteredBatches.length > 0
          ? (
              totalStudyHours /
              filteredBatches.length
            ).toFixed(1)
          : 0,

      avgQuizGrade: "B+",

      totalActiveStudents: totalStudents,
    };
  }, [filteredBatches]);

  return {
    filters,
    setFilters,

    stats,

    filteredBatches,
  };
};