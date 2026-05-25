export interface Student {
  id: number;
  studentId: string;
  name: string;
  major: string;
  year: string;
  attendanceRate: number;
  gpa: number;
  risk: boolean;
  riskReason?: string;
  image?: string;
}

export interface MentorUpcomingSession {
  id: string;
  title: string;
  subjectName: string;
  startsAt: string;
  meetingLink: string;
}

export interface MentorSubject {
  id: string;
  name: string;
  attendance: number;
  absence: number;
  students: Student[];
  upcomingSession: MentorUpcomingSession;
}

export interface SubjectTabsProps {
  subjects: MentorSubject[];
  selectedSubjectId: string;
  onSelect: (id: string) => void;
}

export interface StatsCardsProps {
  totalStudents: number;
  attendance: number;
  absence: number;
}

export interface StudentGridProps {
  students: Student[];
}

export interface StudentCardProps {
  student: Student;
}

export interface RiskStudentsProps {
  students: Student[];
}

export interface TopPerformersProps {
  students: Student[];
}

export interface DashboardUpcomingSessionProps {
  session: MentorUpcomingSession;
  timeLeft: number;
  canJoin: boolean;
  onJoin: () => void;
}

// Legacy alias for analytics/other features still using "batches"
export type Batch = MentorSubject;
