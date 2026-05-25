export type StudyGroupStatus = "stable" | "help_requested" | "idle";

export type SessionsViewMode = "grid" | "list";

export interface StudyGroupSession {
  id: string;
  subjectId: string;
  batchLabel: string;
  name: string;
  status: StudyGroupStatus;
  studentCount: number;
  activeLabel: string;
  isLive: boolean;
  meetingLink: string;
  helpTopic?: string;
}

export interface ClassroomLogEntry {
  id: string;
  message: string;
  timeAgo: string;
  variant?: "default" | "urgent";
}

export interface UpcomingMentorSession {
  id: string;
  title: string;
  startsIn: string;
}

export interface CreateSessionForm {
  name: string;
  date: string;
  time: string;
  batchId: string;
  description: string;
}

export interface MentorSessionBatchOption {
  id: string;
  label: string;
}
