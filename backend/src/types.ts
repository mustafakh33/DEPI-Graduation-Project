export type ModuleKey =
  | "users"
  | "students"
  | "groups"
  | "sessions"
  | "community"
  | "tickets"
  | "surveys"
  | "quizzes"
  | "assessments";

export type GenericRecord = {
  id: string;
  [key: string]: unknown;
};

export type ModuleDefinition = {
  key: ModuleKey;
  singular: string;
  searchFields: string[];
  statusField?: string;
  records: GenericRecord[];
};

export type DashboardSummary = {
  headline: {
    totalStudents: number;
    activeGroups: number;
    liveSessions: number;
    openTickets: number;
  };
  growth: {
    label: string;
    value: number;
    tone: "success" | "warning" | "info";
  }[];
  attendanceTrend: { name: string; attendance: number; submissions: number }[];
  distribution: { name: string; value: number }[];
  ticketsBreakdown: { name: string; value: number }[];
};

export type AuthenticatedRequestUser = {
  id: string;
  email: string;
  role: string;
  name: string;
};
