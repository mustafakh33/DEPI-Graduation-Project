export type TrendStatus =
  | "strong"
  | "rising"
  | "stable"
  | "warning"
  | "critical";

export interface BatchAnalytics {
  id: string;
  batchName: string;
  batchIcon: string;
  batchIconColor: string;
  instructor: string;
  department: string;
  semester: string;
  attendancePercent: number;
  absencePercent: number;
  avgStudyHours: number;
  avgQuizGrade: string;
  quizScore: number;
  activeStudents: number;
  trend: TrendStatus;
}

export interface AnalyticsStatCard {
  label: string;
  value: string;
  delta: string;
  deltaVariant: "positive" | "negative" | "neutral";
}

export interface AnalyticsStats {
  cards: AnalyticsStatCard[];
}

export interface AnalyticsFiltersState {
  semester: string;
  department: string;
  search: string;
}
