import type { Role } from "@/types/global.types";

export type ManagedUserStatus = "active" | "inactive" | "pending";
export type InstructorCvStatus = "not_required" | "pending" | "approved" | "rejected";
export type BatchStatus = "active" | "planning" | "archived";
export type CourseStatus = "draft" | "live" | "archived";
export type SessionStatus = "scheduled" | "live" | "completed" | "cancelled";
export type FeedbackStatus = "new" | "reviewed" | "resolved";
export type FeedbackType = "bug" | "feature" | "support";
export type ActivityEntity = "users" | "batches" | "courses" | "sessions" | "feedback" | "settings";

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: ManagedUserStatus;
  lastActiveAt: string;
  notes: string;
  cvFileName: string;
  cvUploadedAt: string | null;
  cvReviewStatus: InstructorCvStatus;
}

export interface AdminBatch {
  id: string;
  code: string;
  title: string;
  track: string;
  schedule: string;
  capacity: number;
  status: BatchStatus;
  mentorId: string | null;
  instructorIds: string[];
  studentIds: string[];
}

export interface AdminCourse {
  id: string;
  title: string;
  track: string;
  description: string;
  status: CourseStatus;
  instructorId: string | null;
  batchIds: string[];
}

export interface AdminSession {
  id: string;
  title: string;
  room: string;
  scheduledAt: string;
  status: SessionStatus;
  notes: string;
  batchId: string;
  courseId: string | null;
  instructorId: string | null;
  mentorId: string | null;
}

export interface AdminFeedbackItem {
  id: string;
  authorName: string;
  role: Role;
  message: string;
  type: FeedbackType;
  status: FeedbackStatus;
  createdAt: string;
}

export interface AdminActivity {
  id: string;
  entity: ActivityEntity;
  message: string;
  createdAt: string;
}

export interface AdminPortalState {
  platformName: string;
  users: ManagedUser[];
  batches: AdminBatch[];
  courses: AdminCourse[];
  sessions: AdminSession[];
  feedback: AdminFeedbackItem[];
  activities: AdminActivity[];
}

export interface ManagedUserDraft {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: ManagedUserStatus;
  notes: string;
  batchIds: string[];
  courseIds: string[];
  cvFileName: string;
  cvUploadedAt: string | null;
  cvReviewStatus: InstructorCvStatus;
}

export interface AdminBatchDraft {
  id?: string;
  code: string;
  title: string;
  track: string;
  schedule: string;
  capacity: number;
  status: BatchStatus;
  mentorId: string | null;
  instructorIds: string[];
  studentIds: string[];
}

export interface AdminCourseDraft {
  id?: string;
  title: string;
  track: string;
  description: string;
  status: CourseStatus;
  instructorId: string | null;
  batchIds: string[];
}

export interface AdminSessionDraft {
  id?: string;
  title: string;
  room: string;
  scheduledAt: string;
  status: SessionStatus;
  notes: string;
  batchId: string;
  courseId: string | null;
  instructorId: string | null;
  mentorId: string | null;
}
