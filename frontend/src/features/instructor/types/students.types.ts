export type StudentStatus = "active" | "at_risk" | "inactive";

export interface InstructorStudent {
  id: string;
  name: string;
  studentId: string;
  batchName: string;
  status: StudentStatus;
  avatar?: string;
}

export interface StudentKpi {
  label: string;
  value: number;
  variant: "blue" | "red";
  trend?: string;
  trendVariant?: "positive" | "negative" | "neutral" | "warning";
  footnote?: string;
}

export interface PerformanceMonth {
  month: string;
  score: number;
  highlighted?: boolean;
}

export interface AdvisorNote {
  date: string;
  content: string;
}

export interface StudentProfile extends InstructorStudent {
  major: string;
  term: string;
  tabs: string[];
  kpis: StudentKpi[];
  performanceTrend: PerformanceMonth[];
  advisorNote: AdvisorNote;
}

export type StudentProfileTab =
  | "overview"
  | "academic-history"
  | "documents"
  | "attendance-log";
