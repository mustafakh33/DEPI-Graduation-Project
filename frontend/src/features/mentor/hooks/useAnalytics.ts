import { useEffect, useMemo, useState } from "react";
import {
  analyticsSummaryDeltas,
  batchesAnalytics,
} from "../data/analytics.mock";
import type {
  AnalyticsFiltersState,
  AnalyticsStats,
} from "../types/analystics.types";

const PAGE_SIZE = 7;

function gpaLetterFromScore(score: number): string {
  if (score >= 93) return "A";
  if (score >= 90) return "A-";
  if (score >= 87) return "B+";
  if (score >= 82) return "B";
  if (score >= 78) return "B-";
  if (score >= 74) return "C+";
  return "C";
}

export const useAnalytics = () => {
  const [filters, setFilters] = useState<AnalyticsFiltersState>({
    semester: "All Semesters",
    department: "All Departments",
    search: "",
  });
  const [page, setPage] = useState(1);

  const filteredBatches = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return batchesAnalytics.filter((batch) => {
      const matchesSemester =
        filters.semester === "All Semesters" ||
        batch.semester === filters.semester;

      const matchesDepartment =
        filters.department === "All Departments" ||
        batch.department === filters.department;

      const matchesSearch =
        !query ||
        batch.batchName.toLowerCase().includes(query) ||
        batch.instructor.toLowerCase().includes(query);

      return matchesSemester && matchesDepartment && matchesSearch;
    });
  }, [filters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredBatches.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedBatches = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredBatches.slice(start, start + PAGE_SIZE);
  }, [filteredBatches, page]);

  const stats: AnalyticsStats = useMemo(() => {
    const count = filteredBatches.length;

    const avgAttendance =
      count > 0
        ? filteredBatches.reduce((sum, b) => sum + b.attendancePercent, 0) /
          count
        : 0;

    const avgStudyHours =
      count > 0
        ? filteredBatches.reduce((sum, b) => sum + b.avgStudyHours, 0) / count
        : 0;

    const avgQuizScore =
      count > 0
        ? filteredBatches.reduce((sum, b) => sum + b.quizScore, 0) / count
        : 0;

    return {
      cards: [
        {
          label: "Active Batches",
          value: String(count),
          delta: analyticsSummaryDeltas.activeBatches,
          deltaVariant: "positive",
        },
        {
          label: "Avg. Attendance",
          value: `${avgAttendance.toFixed(1)}%`,
          delta: analyticsSummaryDeltas.avgAttendance,
          deltaVariant: "negative",
        },
        {
          label: "Avg. Quiz Grade",
          value: gpaLetterFromScore(avgQuizScore),
          delta: analyticsSummaryDeltas.avgQuizGrade,
          deltaVariant: "positive",
        },
        {
          label: "Avg. Study Hours",
          value: `${avgStudyHours.toFixed(1)}h`,
          delta: analyticsSummaryDeltas.avgStudyHours,
          deltaVariant: "neutral",
        },
      ],
    };
  }, [filteredBatches]);

  const exportReport = () => {
    const rows = filteredBatches.map(
      (b) =>
        `${b.batchName},${b.instructor},${b.attendancePercent}%,${b.absencePercent}%,${b.avgStudyHours}h,${b.avgQuizGrade},${b.trend}`
    );
    const csv = [
      "Batch,Instructor,Attendance,Absence,Study Hours,Quiz Grade,Trend",
      ...rows,
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "batch-performance-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setFilters({
      semester: "All Semesters",
      department: "All Departments",
      search: "",
    });
  };

  return {
    filters,
    setFilters,
    stats,
    filteredBatches,
    paginatedBatches,
    page,
    setPage,
    pageSize: PAGE_SIZE,
    totalBatches: batchesAnalytics.length,
    totalFiltered: filteredBatches.length,
    totalPages,
    exportReport,
    resetFilters,
  };
};
