export type CourseStatus = "in-progress" | "completed" | "not-started";

export interface StudentStats {
  rank: number;
  streakDays: number;
  studyHours: number;
  coins: number;
}

export interface WeeklyGoal {
  targetHours: number;
  completedHours: number;
  percentage: number;
}

export interface CurrentCourse {
  id: string;
  title: string;
  status: CourseStatus;
  progress: number;
  lastLessonPath: string;
}

export interface StudentDashboardData {
  studentName: string;
  weeklyGoal: WeeklyGoal;
  stats: StudentStats;
  currentCourse: CurrentCourse;
}
export type RoadmapLessonStatus = "completed" | "active" | "locked";

export interface RoadmapLesson {
  id: string;
  title: string;
  description: string;
  status: RoadmapLessonStatus;
}

export interface RoadmapModule {
  id: string;
  title: string;
  lessons: RoadmapLesson[];
}

export interface RoadmapData {
  trackId: string;
  trackTitle: string;
  modules: RoadmapModule[];
}
export interface UpcomingSession {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  durationMinutes: number;
  meetingUrl: string;
}

export interface RecordedSession {
  id: string;
  title: string;
  description: string;
  moduleTitle: string;
  durationMinutes: number;
  recordedAt: string;
  thumbnailUrl: string;
  materialPath: string;
}

export interface SessionsData {
  trackId: string;
  trackTitle: string;
  upcomingSession: UpcomingSession;
  recordings: RecordedSession[];
}
export interface AnalyticsMetric {
  id: string;
  title: string;
  value: string;
  percentage: number;
  helperText: string;
}

export interface StudyHourDay {
  day: string;
  hours: number;
}

export interface AnalyticsData {
  metrics: AnalyticsMetric[];
  weeklyStudyHours: StudyHourDay[];
  studyDays: string[];
}
export type AssignmentStatus = "open" | "missed" | "submitted" | "graded";

export interface StudentAssignment {
  id: string;
  assignmentNumber: number;
  isPublished: boolean;
  title: string;
  lessonId: string;
  lessonTitle: string;
  trackId: string;
  description: string;
  publishedAt: string;
  deadline: string;
  status: AssignmentStatus;
  grade?: number;
  totalGrade?: number;
  assignmentPath: string;
  gradePath?: string;
}
export interface StudentQuiz {
  id: string;
  quizNumber: number;
  title: string;
  lessonId: string;
  lessonTitle: string;
  trackId: string;
  description: string;
  scheduledAt: string;
  durationMinutes: number;
  totalGrade: number;
  score?: number;
  hasAttempted: boolean;
  isPublished: boolean;
  quizPath: string;
}
export type RankingStatus = "rising" | "stable";

export interface RankingStudent {
  id: string;
  name: string;
  avatarUrl: string;
  coins: number;
  previousCoins: number;
  trackId: string;
  groupName: string;
  isCurrentStudent?: boolean;
}

export interface RankedStudent extends RankingStudent {
  rank: number;
  status: RankingStatus;
}

export interface RankingData {
  currentStudent: RankedStudent;
  topStudents: RankedStudent[];
  rankedStudents: RankedStudent[];
  coinsToNextRank: number;
}
export interface LessonMaterial {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
}

export interface StudentSupportPerson {
  id: string;
  name: string;
  role: "instructor" | "mentor";
  avatarUrl?: string;
  chatPath: string;
}

export interface StudentLessonDetails {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  material: LessonMaterial;
  instructor: StudentSupportPerson;
  mentor: StudentSupportPerson;
}
export interface SoloStudyTask {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface SoloStudyMaterial {
  id: string;
  lessonTitle: string;
  fileName: string;
  fileUrl: string;
}

export interface SoloFocusStats {
  weeklySeconds: number;
  dailySeconds: number;
  breakCount: number;
  streakDays: number;
  isRunning: boolean;
  lastStartedAt: number | null;
  lastStudyDate: string | null;
  currentDayKey: string;
  currentWeekKey: string;
}

export type SoloFocusActivePanel =
  | "note"
  | "calendar"
  | "materials"
  | "quiz"
  | null;

export type SoloFocusMusicTrackId = "lofi" | "rain";