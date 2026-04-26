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

export type StatusTone = "default" | "success" | "warning" | "danger" | "info";

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
    tone: StatusTone;
  }[];
  attendanceTrend: { name: string; attendance: number; submissions: number }[];
  distribution: { name: string; value: number }[];
  ticketsBreakdown: { name: string; value: number }[];
};

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type EntityRecord = {
  id: string;
  name?: string;
  title?: string;
  email?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
};

export type ModuleResponse = PaginatedResponse<EntityRecord>;

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};
