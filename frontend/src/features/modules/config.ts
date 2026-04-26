import { ModuleKey } from "@/lib/types";

export type ModuleField = {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "date" | "textarea" | "number";
  options?: string[];
  required?: boolean;
};

export type ModuleConfig = {
  key: ModuleKey;
  title: string;
  eyebrow: string;
  description: string;
  createLabel: string;
  statuses: string[];
  columns: { key: string; label: string }[];
  fields: ModuleField[];
};

export const moduleConfigs: Record<ModuleKey, ModuleConfig> = {
  users: {
    key: "users",
    title: "Users",
    eyebrow: "Admin users and roles",
    description: "Create and manage internal admin users, trainer accounts, role access, and locale preferences.",
    createLabel: "Add user",
    statuses: ["active", "invited"],
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" },
      { key: "status", label: "Status" },
      { key: "updatedAt", label: "Updated" },
    ],
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "role", label: "Role", type: "select", options: ["Super Admin", "Trainer", "Support", "Community Admin"], required: true },
      { name: "status", label: "Status", type: "select", options: ["active", "invited"], required: true },
      { name: "phone", label: "Phone", type: "text" },
    ],
  },
  students: {
    key: "students",
    title: "Students",
    eyebrow: "Enrollment and attendance",
    description: "Manage student enrollment, attendance performance, academic level, and exportable attendance records.",
    createLabel: "Add student",
    statuses: ["active", "inactive"],
    columns: [
      { key: "name", label: "Student" },
      { key: "email", label: "Email" },
      { key: "group", label: "Group" },
      { key: "attendanceRate", label: "Attendance %" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "name", label: "Student name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "group", label: "Group", type: "text", required: true },
      { name: "attendanceRate", label: "Attendance rate", type: "number" },
      { name: "level", label: "Level", type: "select", options: ["Beginner", "Intermediate", "Advanced"], required: true },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"], required: true },
    ],
  },
  groups: {
    key: "groups",
    title: "Groups",
    eyebrow: "Cohorts and staffing",
    description: "Create groups, assign trainer and admin owners, and track the student load and timeline per cohort.",
    createLabel: "Create group",
    statuses: ["active", "upcoming"],
    columns: [
      { key: "name", label: "Group" },
      { key: "code", label: "Code" },
      { key: "trainer", label: "Trainer" },
      { key: "studentsCount", label: "Students" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "name", label: "Group name", type: "text", required: true },
      { name: "code", label: "Code", type: "text", required: true },
      { name: "trainer", label: "Trainer", type: "text", required: true },
      { name: "admins", label: "Admins", type: "text", required: true },
      { name: "studentsCount", label: "Students count", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["active", "upcoming"], required: true },
    ],
  },
  sessions: {
    key: "sessions",
    title: "Sessions",
    eyebrow: "Delivery calendar",
    description: "Track scheduled, live, and finished sessions with attendance status and trainer ownership.",
    createLabel: "Add session",
    statuses: ["scheduled", "live", "finished"],
    columns: [
      { key: "title", label: "Session" },
      { key: "group", label: "Group" },
      { key: "trainer", label: "Trainer" },
      { key: "date", label: "Date" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "title", label: "Session title", type: "text", required: true },
      { name: "group", label: "Group", type: "text", required: true },
      { name: "trainer", label: "Trainer", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "mode", label: "Mode", type: "select", options: ["online", "offline"], required: true },
      { name: "status", label: "Status", type: "select", options: ["scheduled", "live", "finished"], required: true },
    ],
  },
  community: {
    key: "community",
    title: "Community",
    eyebrow: "Posts and announcements",
    description: "Publish announcements, moderate community posts, and monitor comment activity across batches.",
    createLabel: "Create post",
    statuses: ["published", "flagged"],
    columns: [
      { key: "title", label: "Title" },
      { key: "type", label: "Type" },
      { key: "author", label: "Author" },
      { key: "comments", label: "Comments" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "type", label: "Type", type: "select", options: ["post", "announcement"], required: true },
      { name: "author", label: "Author", type: "text", required: true },
      { name: "comments", label: "Comments count", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["published", "flagged"], required: true },
      { name: "body", label: "Body", type: "textarea" },
    ],
  },
  tickets: {
    key: "tickets",
    title: "Tickets",
    eyebrow: "Support workflow",
    description: "Handle support tickets from students and internal teams with reply threads and resolution tracking.",
    createLabel: "Create ticket",
    statuses: ["in_progress", "resolved", "reopened"],
    columns: [
      { key: "title", label: "Subject" },
      { key: "requester", label: "Requester" },
      { key: "priority", label: "Priority" },
      { key: "assignee", label: "Assignee" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "title", label: "Subject", type: "text", required: true },
      { name: "requester", label: "Requester", type: "text", required: true },
      { name: "priority", label: "Priority", type: "select", options: ["low", "medium", "high"], required: true },
      { name: "assignee", label: "Assignee", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: ["in_progress", "resolved", "reopened"], required: true },
    ],
  },
  surveys: {
    key: "surveys",
    title: "Surveys",
    eyebrow: "Feedback and analytics",
    description: "Create, publish, and analyze surveys across cohorts with audience targeting and response tracking.",
    createLabel: "Create survey",
    statuses: ["draft", "published", "closed"],
    columns: [
      { key: "title", label: "Survey" },
      { key: "audience", label: "Audience" },
      { key: "responses", label: "Responses" },
      { key: "status", label: "Status" },
      { key: "updatedAt", label: "Updated" },
    ],
    fields: [
      { name: "title", label: "Survey title", type: "text", required: true },
      { name: "audience", label: "Audience", type: "text", required: true },
      { name: "responses", label: "Responses", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["draft", "published", "closed"], required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  quizzes: {
    key: "quizzes",
    title: "Quizzes",
    eyebrow: "Learning checks",
    description: "Track quiz lifecycle, submission volume, and average scores for academic performance review.",
    createLabel: "Create quiz",
    statuses: ["draft", "published"],
    columns: [
      { key: "title", label: "Quiz" },
      { key: "group", label: "Group" },
      { key: "submissions", label: "Submissions" },
      { key: "averageScore", label: "Average score" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "title", label: "Quiz title", type: "text", required: true },
      { name: "group", label: "Group", type: "text", required: true },
      { name: "submissions", label: "Submissions", type: "number" },
      { name: "averageScore", label: "Average score", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["draft", "published"], required: true },
    ],
  },
  assessments: {
    key: "assessments",
    title: "Assessments",
    eyebrow: "Assignments and projects",
    description: "Manage assessment release, due dates, grading checkpoints, and submission counts by type.",
    createLabel: "Create assessment",
    statuses: ["draft", "published"],
    columns: [
      { key: "title", label: "Assessment" },
      { key: "type", label: "Type" },
      { key: "submissions", label: "Submissions" },
      { key: "dueDate", label: "Due date" },
      { key: "status", label: "Status" },
    ],
    fields: [
      { name: "title", label: "Assessment title", type: "text", required: true },
      { name: "type", label: "Type", type: "select", options: ["assignment", "project", "exam"], required: true },
      { name: "submissions", label: "Submissions", type: "number" },
      { name: "dueDate", label: "Due date", type: "date" },
      { name: "status", label: "Status", type: "select", options: ["draft", "published"], required: true },
    ],
  },
};
