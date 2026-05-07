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