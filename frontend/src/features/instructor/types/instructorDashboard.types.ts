export interface InstructorSubject {
  id: string;
  name: string;
}

export interface SubjectMetric {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
}

export interface AttendanceDay {
  day: string;
  attended: number;
  absent: number;
}

export interface SubjectTopStudent {
  id: string;
  name: string;
  score: number;
  rank: number;
}

export interface SubjectProgress {
  quizAverage: number;
  quizCourse: string;
  submissionsDone: number;
  submissionsTotal: number;
  assignmentLabel: string;
}

export interface SubjectUpcomingSession {
  id: string;
  title: string;
  lectureNumber: string;
  startsAt: string;
  meetingLink: string;
  enrolledStudents: number;
}

export interface SubjectDashboardData {
  subject: InstructorSubject;
  metrics: SubjectMetric[];
  attendance: AttendanceDay[];
  topStudents: SubjectTopStudent[];
  progress: SubjectProgress;
  upcomingSession: SubjectUpcomingSession;
}
