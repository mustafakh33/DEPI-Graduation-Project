import { GenericRecord } from "../types";

export const adminUser = {
  id: "admin-1",
  name: "Mona Salah",
  email: "admin@unihub.com",
  password: "Admin123!",
  role: "SUPER_ADMIN",
};

export const attendanceTrend = [
  { name: "Week 1", attendance: 82, submissions: 64 },
  { name: "Week 2", attendance: 88, submissions: 71 },
  { name: "Week 3", attendance: 91, submissions: 79 },
  { name: "Week 4", attendance: 89, submissions: 75 },
  { name: "Week 5", attendance: 94, submissions: 83 },
  { name: "Week 6", attendance: 92, submissions: 88 },
];

export const moduleStore: Record<string, GenericRecord[]> = {
  users: [
    { id: "usr-1", name: "Mona Salah", email: "mona@unihub.com", role: "Super Admin", status: "active", phone: "+20 100 222 8899", locale: "en", createdAt: "2026-04-01", updatedAt: "2026-04-20" },
    { id: "usr-2", name: "Omar Adel", email: "omar@unihub.com", role: "Trainer", status: "active", phone: "+20 101 122 8899", locale: "ar", createdAt: "2026-04-03", updatedAt: "2026-04-18" },
    { id: "usr-3", name: "Sara Nabil", email: "sara@unihub.com", role: "Support", status: "invited", phone: "+20 100 322 1899", locale: "en", createdAt: "2026-04-10", updatedAt: "2026-04-10" },
    { id: "usr-4", name: "Ahmed Tarek", email: "ahmed@unihub.com", role: "Community Admin", status: "active", phone: "+20 100 420 1888", locale: "ar", createdAt: "2026-03-28", updatedAt: "2026-04-22" }
  ],
  students: [
    { id: "std-1", name: "Youssef Ali", email: "youssef@student.com", group: "Frontend Cohort A", status: "active", attendanceRate: 95, level: "Advanced", createdAt: "2026-03-01", updatedAt: "2026-04-20" },
    { id: "std-2", name: "Nada Samir", email: "nada@student.com", group: "Data Track B", status: "active", attendanceRate: 88, level: "Intermediate", createdAt: "2026-03-05", updatedAt: "2026-04-19" },
    { id: "std-3", name: "Karim Emad", email: "karim@student.com", group: "Frontend Cohort A", status: "inactive", attendanceRate: 59, level: "Beginner", createdAt: "2026-03-08", updatedAt: "2026-04-10" },
    { id: "std-4", name: "ريم أحمد", email: "reem@student.com", group: "AI Track C", status: "active", attendanceRate: 91, level: "Advanced", createdAt: "2026-03-14", updatedAt: "2026-04-24" }
  ],
  groups: [
    { id: "grp-1", name: "Frontend Cohort A", code: "FE-A", trainer: "Omar Adel", admins: "Mona Salah", studentsCount: 24, status: "active", startDate: "2026-03-01", updatedAt: "2026-04-20" },
    { id: "grp-2", name: "Data Track B", code: "DA-B", trainer: "Yara Fawzy", admins: "Sara Nabil", studentsCount: 19, status: "active", startDate: "2026-03-05", updatedAt: "2026-04-21" },
    { id: "grp-3", name: "AI Track C", code: "AI-C", trainer: "Ahmed Tarek", admins: "Mona Salah", studentsCount: 16, status: "upcoming", startDate: "2026-05-02", updatedAt: "2026-04-24" }
  ],
  sessions: [
    { id: "ses-1", title: "React State Patterns", group: "Frontend Cohort A", trainer: "Omar Adel", date: "2026-04-25", attendance: 23, status: "scheduled", mode: "online", updatedAt: "2026-04-24" },
    { id: "ses-2", title: "SQL Lab Review", group: "Data Track B", trainer: "Yara Fawzy", date: "2026-04-22", attendance: 18, status: "finished", mode: "offline", updatedAt: "2026-04-22" },
    { id: "ses-3", title: "LLM Prompt Engineering", group: "AI Track C", trainer: "Ahmed Tarek", date: "2026-04-24", attendance: 14, status: "live", mode: "online", updatedAt: "2026-04-24" }
  ],
  community: [
    { id: "com-1", title: "April roadmap is live", type: "announcement", author: "Mona Salah", comments: 11, status: "published", updatedAt: "2026-04-24" },
    { id: "com-2", title: "Need help with API assignment", type: "post", author: "Youssef Ali", comments: 7, status: "published", updatedAt: "2026-04-23" },
    { id: "com-3", title: "Code of conduct reminder", type: "announcement", author: "Ahmed Tarek", comments: 3, status: "flagged", updatedAt: "2026-04-21" }
  ],
  tickets: [
    { id: "tic-1", title: "Attendance not updated", requester: "Nada Samir", priority: "high", status: "in_progress", assignee: "Sara Nabil", updatedAt: "2026-04-24" },
    { id: "tic-2", title: "Need group transfer", requester: "Karim Emad", priority: "medium", status: "reopened", assignee: "Mona Salah", updatedAt: "2026-04-23" },
    { id: "tic-3", title: "Survey response missing", requester: "Youssef Ali", priority: "low", status: "resolved", assignee: "Ahmed Tarek", updatedAt: "2026-04-22" }
  ],
  surveys: [
    { id: "sur-1", title: "Session Quality Survey", audience: "Frontend Cohort A", responses: 21, status: "published", updatedAt: "2026-04-22" },
    { id: "sur-2", title: "Trainer Feedback AR", audience: "Data Track B", responses: 15, status: "draft", updatedAt: "2026-04-20" },
    { id: "sur-3", title: "Graduation Pulse Check", audience: "All Students", responses: 67, status: "closed", updatedAt: "2026-04-18" }
  ],
  quizzes: [
    { id: "quiz-1", title: "React Hooks Quiz", group: "Frontend Cohort A", submissions: 22, averageScore: 87, status: "published", updatedAt: "2026-04-23" },
    { id: "quiz-2", title: "SQL Fundamentals", group: "Data Track B", submissions: 16, averageScore: 74, status: "published", updatedAt: "2026-04-20" },
    { id: "quiz-3", title: "Prompting Basics", group: "AI Track C", submissions: 10, averageScore: 81, status: "draft", updatedAt: "2026-04-24" }
  ],
  assessments: [
    { id: "asm-1", title: "Capstone Milestone 1", type: "project", submissions: 12, dueDate: "2026-04-30", status: "published", updatedAt: "2026-04-24" },
    { id: "asm-2", title: "Backend Practical", type: "assignment", submissions: 18, dueDate: "2026-04-27", status: "published", updatedAt: "2026-04-22" },
    { id: "asm-3", title: "Midterm Evaluation", type: "exam", submissions: 0, dueDate: "2026-05-03", status: "draft", updatedAt: "2026-04-19" }
  ]
};

export const ticketReplies = {
  "tic-1": [
    { id: "rep-1", author: "Nada Samir", role: "student", body: "My attendance for SQL Lab still shows absent.", createdAt: "2026-04-24 09:15" },
    { id: "rep-2", author: "Sara Nabil", role: "admin", body: "We are reviewing the session sheet and will update the record.", createdAt: "2026-04-24 09:40" }
  ],
  "tic-2": [
    { id: "rep-3", author: "Karim Emad", role: "student", body: "I need to move to the evening batch.", createdAt: "2026-04-23 11:22" }
  ]
};
