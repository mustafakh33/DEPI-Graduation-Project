export type TrendStatus =
  | "weak"
  | "stable"
  | "strong";

export interface BatchAnalytics {
  id: string;

  batchName: string;

  instructor: string;

  semester: string;

  attendancePercent: number;

  absencePercent: number;

  avgStudyHours: number;

  avgQuizGrade: string;

  activeStudents: number;

  trend: TrendStatus;
}

export interface AnalyticsStats {
  avgAttendance: number;

  avgQuizGrade: string;

  avgStudyHours: number;

  totalActiveStudents: number;
}

export interface AnalyticsFiltersState {
  semester: string;

  batch: string;

  search: string;
}