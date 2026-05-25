import React, { createContext, useContext, useEffect, useState } from "react";

import type {
  ActivityEntity,
  AdminBatch,
  AdminBatchDraft,
  AdminCourse,
  AdminCourseDraft,
  AdminFeedbackItem,
  AdminPortalState,
  AdminSession,
  AdminSessionDraft,
  FeedbackStatus,
  ManagedUser,
  ManagedUserDraft,
} from "@/features/admin/types/admin.types";
import type { Role } from "@/types/global.types";

const storageKey = "unihub-admin-portal-v2";

const defaultState: AdminPortalState = {
  platformName: "UniHub Control Center",
  users: [
    {
      id: "admin-root",
      name: "Platform Admin",
      email: "admin@unihub.edu",
      phone: "+20 100 000 1000",
      role: "admin",
      status: "active",
      lastActiveAt: "2026-05-25T17:45:00.000Z",
      notes: "Owns full access to every module.",
      cvFileName: "",
      cvUploadedAt: null,
      cvReviewStatus: "not_required",
    },
    {
      id: "inst-salma",
      name: "Dr. Salma Adel",
      email: "salma.adel@unihub.edu",
      phone: "+20 100 000 1001",
      role: "instructor",
      status: "active",
      lastActiveAt: "2026-05-25T15:20:00.000Z",
      notes: "Frontend lead for Batch FE-24.",
      cvFileName: "salma-adel-cv.pdf",
      cvUploadedAt: "2026-05-20T09:00:00.000Z",
      cvReviewStatus: "approved",
    },
    {
      id: "inst-youssef",
      name: "Eng. Youssef Nabil",
      email: "youssef.nabil@unihub.edu",
      phone: "+20 100 000 1002",
      role: "instructor",
      status: "active",
      lastActiveAt: "2026-05-24T19:05:00.000Z",
      notes: "Teaches backend and database tracks.",
      cvFileName: "youssef-nabil-cv.pdf",
      cvUploadedAt: "2026-05-18T11:30:00.000Z",
      cvReviewStatus: "approved",
    },
    {
      id: "mentor-mariam",
      name: "Mariam Hassan",
      email: "mariam.hassan@unihub.edu",
      phone: "+20 100 000 1003",
      role: "mentor",
      status: "active",
      lastActiveAt: "2026-05-25T16:30:00.000Z",
      notes: "Mentor for struggling students in FE-24.",
      cvFileName: "",
      cvUploadedAt: null,
      cvReviewStatus: "not_required",
    },
    {
      id: "mentor-karim",
      name: "Karim Wael",
      email: "karim.wael@unihub.edu",
      phone: "+20 100 000 1004",
      role: "mentor",
      status: "pending",
      lastActiveAt: "2026-05-22T11:00:00.000Z",
      notes: "Awaiting final approval.",
      cvFileName: "",
      cvUploadedAt: null,
      cvReviewStatus: "not_required",
    },
    {
      id: "student-nour",
      name: "Nour Emad",
      email: "nour.emad@unihub.edu",
      phone: "+20 100 000 1005",
      role: "student",
      status: "active",
      lastActiveAt: "2026-05-25T18:00:00.000Z",
      notes: "Top performer in assignments.",
      cvFileName: "",
      cvUploadedAt: null,
      cvReviewStatus: "not_required",
    },
    {
      id: "student-omar",
      name: "Omar Tarek",
      email: "omar.tarek@unihub.edu",
      phone: "+20 100 000 1006",
      role: "student",
      status: "active",
      lastActiveAt: "2026-05-25T13:00:00.000Z",
      notes: "Needs extra support on quizzes.",
      cvFileName: "",
      cvUploadedAt: null,
      cvReviewStatus: "not_required",
    },
    {
      id: "student-lina",
      name: "Lina Ahmed",
      email: "lina.ahmed@unihub.edu",
      phone: "+20 100 000 1007",
      role: "student",
      status: "inactive",
      lastActiveAt: "2026-05-19T09:15:00.000Z",
      notes: "Temporarily paused due to attendance issue.",
      cvFileName: "",
      cvUploadedAt: null,
      cvReviewStatus: "not_required",
    },
  ],
  batches: [
    {
      id: "batch-fe24",
      code: "FE-24",
      title: "Frontend React Batch",
      track: "Frontend Development",
      schedule: "Sun / Tue 7:00 PM",
      capacity: 40,
      status: "active",
      mentorId: "mentor-mariam",
      instructorIds: ["inst-salma"],
      studentIds: ["student-nour", "student-omar"],
    },
    {
      id: "batch-be24",
      code: "BE-24",
      title: "Backend Node Batch",
      track: "Backend Development",
      schedule: "Mon / Wed 8:00 PM",
      capacity: 35,
      status: "planning",
      mentorId: "mentor-karim",
      instructorIds: ["inst-youssef"],
      studentIds: ["student-lina"],
    },
  ],
  courses: [
    {
      id: "course-react",
      title: "Advanced React",
      track: "Frontend Development",
      description: "Routing, state management, and production-ready components.",
      status: "live",
      instructorId: "inst-salma",
      batchIds: ["batch-fe24"],
    },
    {
      id: "course-node",
      title: "Node.js API Design",
      track: "Backend Development",
      description: "REST APIs, auth flows, and deployment basics.",
      status: "live",
      instructorId: "inst-youssef",
      batchIds: ["batch-be24"],
    },
    {
      id: "course-sql",
      title: "SQL Foundations",
      track: "Backend Development",
      description: "Relational modeling and query optimization.",
      status: "draft",
      instructorId: "inst-youssef",
      batchIds: ["batch-be24"],
    },
  ],
  sessions: [
    {
      id: "session-1",
      title: "React State Patterns",
      room: "Zoom A",
      scheduledAt: "2026-05-26T17:00:00.000Z",
      status: "scheduled",
      notes: "Focus on forms and dashboard state.",
      batchId: "batch-fe24",
      courseId: "course-react",
      instructorId: "inst-salma",
      mentorId: "mentor-mariam",
    },
    {
      id: "session-2",
      title: "Node Auth Workshop",
      room: "Lab 3",
      scheduledAt: "2026-05-27T18:00:00.000Z",
      status: "scheduled",
      notes: "JWT, refresh tokens, and role guards.",
      batchId: "batch-be24",
      courseId: "course-node",
      instructorId: "inst-youssef",
      mentorId: "mentor-karim",
    },
    {
      id: "session-3",
      title: "Emergency Progress Review",
      room: "Meeting Room",
      scheduledAt: "2026-05-25T12:00:00.000Z",
      status: "completed",
      notes: "Reviewed missing submissions.",
      batchId: "batch-fe24",
      courseId: "course-react",
      instructorId: "inst-salma",
      mentorId: "mentor-mariam",
    },
  ],
  feedback: [
    {
      id: "feedback-1",
      authorName: "Nour Emad",
      role: "student",
      type: "feature",
      status: "new",
      createdAt: "2026-05-25T14:20:00.000Z",
      message: "Need an easier way to review old recordings.",
    },
    {
      id: "feedback-2",
      authorName: "Dr. Salma Adel",
      role: "instructor",
      type: "support",
      status: "reviewed",
      createdAt: "2026-05-24T21:00:00.000Z",
      message: "Bulk upload for grades would save time before evaluations.",
    },
    {
      id: "feedback-3",
      authorName: "Mariam Hassan",
      role: "mentor",
      type: "bug",
      status: "resolved",
      createdAt: "2026-05-23T10:10:00.000Z",
      message: "The mentor notes page was dropping the latest update.",
    },
  ],
  activities: [
    {
      id: "activity-1",
      entity: "users",
      message: "Platform Admin approved mentor Karim Wael.",
      createdAt: "2026-05-25T09:00:00.000Z",
    },
    {
      id: "activity-2",
      entity: "sessions",
      message: "React State Patterns session moved to Zoom A.",
      createdAt: "2026-05-25T11:30:00.000Z",
    },
    {
      id: "activity-3",
      entity: "courses",
      message: "SQL Foundations draft was added for Backend batch.",
      createdAt: "2026-05-24T18:45:00.000Z",
    },
  ],
};

interface UserAssignments {
  batchIds: string[];
  courseIds: string[];
}

interface AdminPortalContextValue extends AdminPortalState {
  saveUser: (draft: ManagedUserDraft) => void;
  deleteUser: (userId: string) => void;
  toggleUserStatus: (userId: string) => void;
  reviewInstructorCv: (userId: string, decision: "approved" | "rejected") => void;
  saveBatch: (draft: AdminBatchDraft) => void;
  deleteBatch: (batchId: string) => void;
  saveCourse: (draft: AdminCourseDraft) => void;
  deleteCourse: (courseId: string) => void;
  saveSession: (draft: AdminSessionDraft) => void;
  deleteSession: (sessionId: string) => void;
  updateFeedbackStatus: (feedbackId: string, status: FeedbackStatus) => void;
  updatePlatformName: (name: string) => void;
  resetPortalState: () => void;
  getUserAssignments: (userId: string) => UserAssignments;
  getUserById: (userId: string | null) => ManagedUser | undefined;
  getBatchById: (batchId: string | null) => AdminBatch | undefined;
  getCourseById: (courseId: string | null) => AdminCourse | undefined;
  getSessionsForBatch: (batchId: string) => AdminSession[];
  getFeedbackSummary: () => { label: string; count: number }[];
  getUsersByRole: (role: Role) => ManagedUser[];
}

const AdminPortalContext = createContext<AdminPortalContextValue | undefined>(undefined);

function uniqueIds(ids: string[]) {
  return Array.from(new Set(ids.filter(Boolean)));
}

function addActivity(state: AdminPortalState, entity: ActivityEntity, message: string) {
  return [
    {
      id: crypto.randomUUID(),
      entity,
      message,
      createdAt: new Date().toISOString(),
    },
    ...state.activities,
  ].slice(0, 25);
}

function loadInitialState() {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return defaultState;
  }

  try {
    return JSON.parse(raw) as AdminPortalState;
  } catch {
    return defaultState;
  }
}

function removeUserAssignmentsFromBatches(batches: AdminBatch[], userId: string) {
  return batches.map((batch) => ({
    ...batch,
    mentorId: batch.mentorId === userId ? null : batch.mentorId,
    instructorIds: batch.instructorIds.filter((id) => id !== userId),
    studentIds: batch.studentIds.filter((id) => id !== userId),
  }));
}

function assignUserToBatches(
  batches: AdminBatch[],
  role: Role,
  userId: string,
  batchIds: string[],
) {
  const selectedIds = new Set(batchIds);

  return batches.map((batch) => {
    const clearedBatch = {
      ...batch,
      mentorId: batch.mentorId === userId ? null : batch.mentorId,
      instructorIds: batch.instructorIds.filter((id) => id !== userId),
      studentIds: batch.studentIds.filter((id) => id !== userId),
    };

    if (!selectedIds.has(batch.id)) {
      return clearedBatch;
    }

    if (role === "mentor") {
      return { ...clearedBatch, mentorId: userId };
    }

    if (role === "instructor") {
      return {
        ...clearedBatch,
        instructorIds: uniqueIds([...clearedBatch.instructorIds, userId]),
      };
    }

    if (role === "student") {
      return {
        ...clearedBatch,
        studentIds: uniqueIds([...clearedBatch.studentIds, userId]),
      };
    }

    return clearedBatch;
  });
}

function assignUserToCourses(courses: AdminCourse[], role: Role, userId: string, courseIds: string[]) {
  const selectedIds = new Set(courseIds);

  return courses.map((course) => {
    const clearedCourse = {
      ...course,
      instructorId: course.instructorId === userId ? null : course.instructorId,
    };

    if (role !== "instructor" || !selectedIds.has(course.id)) {
      return clearedCourse;
    }

    return { ...clearedCourse, instructorId: userId };
  });
}

export function AdminPortalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminPortalState>(loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const getUserAssignments = (userId: string) => {
    const batchIds = state.batches
      .filter(
        (batch) =>
          batch.mentorId === userId ||
          batch.instructorIds.includes(userId) ||
          batch.studentIds.includes(userId),
      )
      .map((batch) => batch.id);
    const courseIds = state.courses
      .filter((course) => course.instructorId === userId)
      .map((course) => course.id);

    return { batchIds, courseIds };
  };

  const saveUser = (draft: ManagedUserDraft) => {
    setState((current) => {
      const userId = draft.id ?? crypto.randomUUID();
      const currentUser = current.users.find((user) => user.id === userId);
      const isInstructor = draft.role === "instructor";
      const hasNewCv = isInstructor && draft.cvFileName.trim().length > 0;
      const cvReviewStatus = isInstructor
        ? hasNewCv
          ? draft.cvReviewStatus === "approved" || draft.cvReviewStatus === "rejected"
            ? draft.cvReviewStatus
            : "pending"
          : currentUser?.cvReviewStatus ?? "pending"
        : "not_required";
      const status = isInstructor
        ? cvReviewStatus === "approved"
          ? draft.status === "pending"
            ? "active"
            : draft.status
          : "pending"
        : draft.status;
      const nextUser: ManagedUser = {
        id: userId,
        name: draft.name.trim(),
        email: draft.email.trim().toLowerCase(),
        phone: draft.phone.trim(),
        role: draft.role,
        status,
        notes: draft.notes.trim(),
        lastActiveAt: new Date().toISOString(),
        cvFileName: isInstructor ? draft.cvFileName.trim() : "",
        cvUploadedAt: isInstructor
          ? hasNewCv
            ? draft.cvUploadedAt ?? new Date().toISOString()
            : currentUser?.cvUploadedAt ?? null
          : null,
        cvReviewStatus,
      };
      const exists = current.users.some((user) => user.id === userId);
      const users = exists
        ? current.users.map((user) => (user.id === userId ? nextUser : user))
        : [nextUser, ...current.users];
      const batches = assignUserToBatches(
        removeUserAssignmentsFromBatches(current.batches, userId),
        draft.role,
        userId,
        draft.batchIds,
      );
      const courses = assignUserToCourses(current.courses, draft.role, userId, draft.courseIds);

      return {
        ...current,
        users,
        batches,
        courses,
        activities: addActivity(
          current,
          "users",
          exists ? `Updated ${nextUser.name} (${nextUser.role}).` : `Added ${nextUser.name} as ${nextUser.role}.`,
        ),
      };
    });
  };

  const reviewInstructorCv = (userId: string, decision: "approved" | "rejected") => {
    setState((current) => {
      const targetUser = current.users.find((user) => user.id === userId);
      if (!targetUser || targetUser.role !== "instructor") {
        return current;
      }

      const nextStatus = decision === "approved" ? "active" : "pending";

      return {
        ...current,
        users: current.users.map((user) =>
          user.id === userId
            ? {
                ...user,
                status: nextStatus,
                cvReviewStatus: decision,
                lastActiveAt: new Date().toISOString(),
              }
            : user,
        ),
        activities: addActivity(
          current,
          "users",
          `${decision === "approved" ? "Approved" : "Rejected"} CV for ${targetUser.name}.`,
        ),
      };
    });
  };

  const deleteUser = (userId: string) => {
    setState((current) => {
      const user = current.users.find((item) => item.id === userId);
      if (!user) {
        return current;
      }

      return {
        ...current,
        users: current.users.filter((item) => item.id !== userId),
        batches: removeUserAssignmentsFromBatches(current.batches, userId),
        courses: current.courses.map((course) => ({
          ...course,
          instructorId: course.instructorId === userId ? null : course.instructorId,
        })),
        sessions: current.sessions.map((session) => ({
          ...session,
          instructorId: session.instructorId === userId ? null : session.instructorId,
          mentorId: session.mentorId === userId ? null : session.mentorId,
        })),
        activities: addActivity(current, "users", `Removed ${user.name} from the platform.`),
      };
    });
  };

  const toggleUserStatus = (userId: string) => {
    setState((current) => {
      const targetUser = current.users.find((user) => user.id === userId);
      if (!targetUser) {
        return current;
      }

      const nextStatus =
        targetUser.status === "active"
          ? "inactive"
          : targetUser.role === "instructor" && targetUser.cvReviewStatus !== "approved"
            ? "pending"
            : "active";

      return {
        ...current,
        users: current.users.map((user) =>
          user.id === userId
            ? { ...user, status: nextStatus, lastActiveAt: new Date().toISOString() }
            : user,
        ),
        activities: addActivity(
          current,
          "users",
          `${targetUser.name} is now ${nextStatus}.`,
        ),
      };
    });
  };

  const saveBatch = (draft: AdminBatchDraft) => {
    setState((current) => {
      const batchId = draft.id ?? crypto.randomUUID();
      const nextBatch: AdminBatch = {
        id: batchId,
        code: draft.code.trim(),
        title: draft.title.trim(),
        track: draft.track.trim(),
        schedule: draft.schedule.trim(),
        capacity: Number(draft.capacity) || 0,
        status: draft.status,
        mentorId: draft.mentorId || null,
        instructorIds: uniqueIds(draft.instructorIds),
        studentIds: uniqueIds(draft.studentIds),
      };
      const exists = current.batches.some((batch) => batch.id === batchId);

      return {
        ...current,
        batches: exists
          ? current.batches.map((batch) => (batch.id === batchId ? nextBatch : batch))
          : [nextBatch, ...current.batches],
        activities: addActivity(
          current,
          "batches",
          exists ? `Updated batch ${nextBatch.code}.` : `Created batch ${nextBatch.code}.`,
        ),
      };
    });
  };

  const deleteBatch = (batchId: string) => {
    setState((current) => {
      const batch = current.batches.find((item) => item.id === batchId);
      if (!batch) {
        return current;
      }

      return {
        ...current,
        batches: current.batches.filter((item) => item.id !== batchId),
        courses: current.courses.map((course) => ({
          ...course,
          batchIds: course.batchIds.filter((id) => id !== batchId),
        })),
        sessions: current.sessions.filter((session) => session.batchId !== batchId),
        activities: addActivity(current, "batches", `Deleted batch ${batch.code}.`),
      };
    });
  };

  const saveCourse = (draft: AdminCourseDraft) => {
    setState((current) => {
      const courseId = draft.id ?? crypto.randomUUID();
      const nextCourse: AdminCourse = {
        id: courseId,
        title: draft.title.trim(),
        track: draft.track.trim(),
        description: draft.description.trim(),
        status: draft.status,
        instructorId: draft.instructorId || null,
        batchIds: uniqueIds(draft.batchIds),
      };
      const exists = current.courses.some((course) => course.id === courseId);

      return {
        ...current,
        courses: exists
          ? current.courses.map((course) => (course.id === courseId ? nextCourse : course))
          : [nextCourse, ...current.courses],
        activities: addActivity(
          current,
          "courses",
          exists ? `Updated course ${nextCourse.title}.` : `Added course ${nextCourse.title}.`,
        ),
      };
    });
  };

  const deleteCourse = (courseId: string) => {
    setState((current) => {
      const course = current.courses.find((item) => item.id === courseId);
      if (!course) {
        return current;
      }

      return {
        ...current,
        courses: current.courses.filter((item) => item.id !== courseId),
        sessions: current.sessions.map((session) => ({
          ...session,
          courseId: session.courseId === courseId ? null : session.courseId,
        })),
        activities: addActivity(current, "courses", `Deleted course ${course.title}.`),
      };
    });
  };

  const saveSession = (draft: AdminSessionDraft) => {
    setState((current) => {
      const sessionId = draft.id ?? crypto.randomUUID();
      const nextSession: AdminSession = {
        id: sessionId,
        title: draft.title.trim(),
        room: draft.room.trim(),
        scheduledAt: draft.scheduledAt,
        status: draft.status,
        notes: draft.notes.trim(),
        batchId: draft.batchId,
        courseId: draft.courseId || null,
        instructorId: draft.instructorId || null,
        mentorId: draft.mentorId || null,
      };
      const exists = current.sessions.some((session) => session.id === sessionId);

      return {
        ...current,
        sessions: exists
          ? current.sessions.map((session) => (session.id === sessionId ? nextSession : session))
          : [nextSession, ...current.sessions],
        activities: addActivity(
          current,
          "sessions",
          exists ? `Updated session ${nextSession.title}.` : `Scheduled session ${nextSession.title}.`,
        ),
      };
    });
  };

  const deleteSession = (sessionId: string) => {
    setState((current) => {
      const session = current.sessions.find((item) => item.id === sessionId);
      if (!session) {
        return current;
      }

      return {
        ...current,
        sessions: current.sessions.filter((item) => item.id !== sessionId),
        activities: addActivity(current, "sessions", `Deleted session ${session.title}.`),
      };
    });
  };

  const updateFeedbackStatus = (feedbackId: string, status: FeedbackStatus) => {
    setState((current) => {
      const feedback = current.feedback.find((item) => item.id === feedbackId);
      if (!feedback) {
        return current;
      }

      return {
        ...current,
        feedback: current.feedback.map((item) =>
          item.id === feedbackId ? { ...item, status } : item,
        ),
        activities: addActivity(
          current,
          "feedback",
          `Marked feedback from ${feedback.authorName} as ${status}.`,
        ),
      };
    });
  };

  const updatePlatformName = (name: string) => {
    setState((current) => ({
      ...current,
      platformName: name.trim() || defaultState.platformName,
      activities: addActivity(current, "settings", "Updated platform settings."),
    }));
  };

  const resetPortalState = () => {
    setState(defaultState);
  };

  const getUserById = (userId: string | null) => state.users.find((user) => user.id === userId);
  const getBatchById = (batchId: string | null) => state.batches.find((batch) => batch.id === batchId);
  const getCourseById = (courseId: string | null) =>
    state.courses.find((course) => course.id === courseId);
  const getSessionsForBatch = (batchId: string) =>
    state.sessions.filter((session) => session.batchId === batchId);
  const getFeedbackSummary = () => {
    const items: AdminFeedbackItem["status"][] = ["new", "reviewed", "resolved"];
    return items.map((status) => ({
      label: status,
      count: state.feedback.filter((item) => item.status === status).length,
    }));
  };
  const getUsersByRole = (role: Role) => state.users.filter((user) => user.role === role);

  return (
    <AdminPortalContext.Provider
      value={{
        ...state,
        saveUser,
        deleteUser,
        toggleUserStatus,
        reviewInstructorCv,
        saveBatch,
        deleteBatch,
        saveCourse,
        deleteCourse,
        saveSession,
        deleteSession,
        updateFeedbackStatus,
        updatePlatformName,
        resetPortalState,
        getUserAssignments,
        getUserById,
        getBatchById,
        getCourseById,
        getSessionsForBatch,
        getFeedbackSummary,
        getUsersByRole,
      }}
    >
      {children}
    </AdminPortalContext.Provider>
  );
}

export function useAdminPortal() {
  const context = useContext(AdminPortalContext);
  if (!context) {
    throw new Error("useAdminPortal must be used inside AdminPortalProvider");
  }

  return context;
}
