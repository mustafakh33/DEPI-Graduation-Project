import { mentorSubjects } from "./DashMockData";
import type { BatchAnalytics, TrendStatus } from "../types/analystics.types";
import type { MentorSubject } from "../types/mentor.types";

const SUBJECT_INSTRUCTORS: Record<string, string> = {
  "data-structures": "Dr. Robert Chen",
  "operating-systems": "Prof. Sarah Jenkins",
  "computer-networks": "Dr. Alan Turing",
};

const SUBJECT_SEMESTERS: Record<string, string> = {
  "data-structures": "Fall 2024",
  "operating-systems": "Fall 2024",
  "computer-networks": "Spring 2025",
};

const BATCH_COLORS = [
  "#2563eb",
  "#7c3aed",
  "#0891b2",
  "#059669",
  "#d97706",
  "#dc2626",
];

function batchIconFromName(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function gpaToQuizLabel(gpa: number): string {
  if (gpa >= 3.85) return "A (94%)";
  if (gpa >= 3.7) return "A- (91%)";
  if (gpa >= 3.5) return "B+ (87%)";
  if (gpa >= 3.2) return "B (82%)";
  if (gpa >= 2.8) return "B- (78%)";
  if (gpa >= 2.4) return "C+ (74%)";
  return "C (70%)";
}

function avgGpa(students: MentorSubject["students"]): number {
  if (students.length === 0) return 3.2;
  return (
    students.reduce((sum, student) => sum + student.gpa, 0) / students.length
  );
}

function avgStudyHours(students: MentorSubject["students"]): number {
  if (students.length === 0) return 18;
  const base =
    students.reduce((sum, student) => sum + student.attendanceRate, 0) /
    students.length;
  return Math.round((base / 4.2) * 10) / 10;
}

function trendFromAttendance(
  attendance: number,
  atRiskCount: number
): TrendStatus {
  if (attendance < 65 || atRiskCount >= 2) return "critical";
  if (attendance < 75 || atRiskCount >= 1) return "warning";
  if (attendance >= 92) return "strong";
  if (attendance >= 86) return "rising";
  return "stable";
}

function subjectToBatchAnalytics(
  subject: MentorSubject,
  index: number
): BatchAnalytics {
  const gpa = avgGpa(subject.students);
  const atRiskCount = subject.students.filter((s) => s.risk).length;

  return {
    id: subject.id,
    batchName: `${subject.name} 2024`,
    batchIcon: batchIconFromName(subject.name),
    batchIconColor: BATCH_COLORS[index % BATCH_COLORS.length],
    instructor: SUBJECT_INSTRUCTORS[subject.id] ?? "Dr. Robert Chen",
    department: "Computer Science",
    semester: SUBJECT_SEMESTERS[subject.id] ?? "Fall 2024",
    attendancePercent: subject.attendance,
    absencePercent: subject.absence,
    avgStudyHours: avgStudyHours(subject.students),
    avgQuizGrade: gpaToQuizLabel(gpa),
    quizScore: Math.round(gpa * 25),
    activeStudents: subject.students.length,
    trend: trendFromAttendance(subject.attendance, atRiskCount),
  };
}

/** Additional cohorts for analytics table & pagination (mentor roster stays in DashMockData). */
const supplementalBatches: Omit<BatchAnalytics, "id">[] = [
  {
    batchName: "Comp Sci 2024 - B",
    batchIcon: "CS",
    batchIconColor: "#2563eb",
    instructor: "Dr. Robert Chen",
    department: "Computer Science",
    semester: "Fall 2024",
    attendancePercent: 88.4,
    absencePercent: 11.6,
    avgStudyHours: 22,
    avgQuizGrade: "B+ (87%)",
    quizScore: 87,
    activeStudents: 118,
    trend: "rising",
  },
  {
    batchName: "Software Eng. 2024",
    batchIcon: "SE",
    batchIconColor: "#7c3aed",
    instructor: "Prof. Maya Ortiz",
    department: "Computer Science",
    semester: "Fall 2024",
    attendancePercent: 91.2,
    absencePercent: 8.8,
    avgStudyHours: 26,
    avgQuizGrade: "A- (91%)",
    quizScore: 91,
    activeStudents: 96,
    trend: "strong",
  },
  {
    batchName: "Database Systems 2024",
    batchIcon: "DB",
    batchIconColor: "#0891b2",
    instructor: "Dr. James Wu",
    department: "Computer Science",
    semester: "Spring 2025",
    attendancePercent: 85.6,
    absencePercent: 14.4,
    avgStudyHours: 20,
    avgQuizGrade: "B (82%)",
    quizScore: 82,
    activeStudents: 84,
    trend: "stable",
  },
  {
    batchName: "Business Admin 2024",
    batchIcon: "BA",
    batchIconColor: "#d97706",
    instructor: "Prof. Sarah Jenkins",
    department: "Business",
    semester: "Fall 2024",
    attendancePercent: 72.5,
    absencePercent: 27.5,
    avgStudyHours: 12,
    avgQuizGrade: "B (82%)",
    quizScore: 82,
    activeStudents: 80,
    trend: "warning",
  },
  {
    batchName: "Mech Engineering V",
    batchIcon: "ME",
    batchIconColor: "#dc2626",
    instructor: "Dr. Alan Turing",
    department: "Engineering",
    semester: "Fall 2024",
    attendancePercent: 48,
    absencePercent: 52,
    avgStudyHours: 8,
    avgQuizGrade: "C+ (74%)",
    quizScore: 74,
    activeStudents: 50,
    trend: "critical",
  },
  {
    batchName: "AI & ML Foundations",
    batchIcon: "AI",
    batchIconColor: "#059669",
    instructor: "Dr. Helena Hills",
    department: "Computer Science",
    semester: "Spring 2025",
    attendancePercent: 93.8,
    absencePercent: 6.2,
    avgStudyHours: 28,
    avgQuizGrade: "A (94%)",
    quizScore: 94,
    activeStudents: 72,
    trend: "strong",
  },
  {
    batchName: "Web Development 2024",
    batchIcon: "WD",
    batchIconColor: "#2563eb",
    instructor: "Prof. Nina Patel",
    department: "Computer Science",
    semester: "Fall 2024",
    attendancePercent: 87.1,
    absencePercent: 12.9,
    avgStudyHours: 19,
    avgQuizGrade: "B+ (86%)",
    quizScore: 86,
    activeStudents: 105,
    trend: "rising",
  },
  {
    batchName: "Cybersecurity Lab",
    batchIcon: "CY",
    batchIconColor: "#7c3aed",
    instructor: "Dr. Omar Hassan",
    department: "Computer Science",
    semester: "Spring 2025",
    attendancePercent: 90.4,
    absencePercent: 9.6,
    avgStudyHours: 24,
    avgQuizGrade: "A- (90%)",
    quizScore: 90,
    activeStudents: 64,
    trend: "strong",
  },
  {
    batchName: "Discrete Math 2024",
    batchIcon: "DM",
    batchIconColor: "#0891b2",
    instructor: "Dr. Robert Chen",
    department: "Computer Science",
    semester: "Fall 2024",
    attendancePercent: 79.3,
    absencePercent: 20.7,
    avgStudyHours: 16,
    avgQuizGrade: "B- (78%)",
    quizScore: 78,
    activeStudents: 92,
    trend: "warning",
  },
  {
    batchName: "Cloud Computing 2025",
    batchIcon: "CC",
    batchIconColor: "#059669",
    instructor: "Prof. Sarah Jenkins",
    department: "Computer Science",
    semester: "Spring 2025",
    attendancePercent: 92.6,
    absencePercent: 7.4,
    avgStudyHours: 25,
    avgQuizGrade: "A- (92%)",
    quizScore: 92,
    activeStudents: 58,
    trend: "rising",
  },
  {
    batchName: "Finance Analytics",
    batchIcon: "FA",
    batchIconColor: "#d97706",
    instructor: "Prof. Leo Martin",
    department: "Business",
    semester: "Fall 2024",
    attendancePercent: 81.2,
    absencePercent: 18.8,
    avgStudyHours: 14,
    avgQuizGrade: "B (81%)",
    quizScore: 81,
    activeStudents: 67,
    trend: "stable",
  },
  {
    batchName: "Civil Structures IV",
    batchIcon: "CE",
    batchIconColor: "#dc2626",
    instructor: "Dr. Alan Turing",
    department: "Engineering",
    semester: "Spring 2025",
    attendancePercent: 76.8,
    absencePercent: 23.2,
    avgStudyHours: 15,
    avgQuizGrade: "B- (77%)",
    quizScore: 77,
    activeStudents: 44,
    trend: "warning",
  },
  {
    batchName: "Human-Computer Interaction",
    batchIcon: "HC",
    batchIconColor: "#7c3aed",
    instructor: "Dr. Helena Hills",
    department: "Computer Science",
    semester: "Fall 2024",
    attendancePercent: 89.5,
    absencePercent: 10.5,
    avgStudyHours: 21,
    avgQuizGrade: "B+ (88%)",
    quizScore: 88,
    activeStudents: 76,
    trend: "stable",
  },
  {
    batchName: "Mobile Apps Studio",
    batchIcon: "MA",
    batchIconColor: "#2563eb",
    instructor: "Prof. Nina Patel",
    department: "Computer Science",
    semester: "Spring 2025",
    attendancePercent: 94.1,
    absencePercent: 5.9,
    avgStudyHours: 27,
    avgQuizGrade: "A (93%)",
    quizScore: 93,
    activeStudents: 48,
    trend: "strong",
  },
  {
    batchName: "Marketing Strategy 2024",
    batchIcon: "MK",
    batchIconColor: "#d97706",
    instructor: "Prof. Leo Martin",
    department: "Business",
    semester: "Fall 2024",
    attendancePercent: 68.4,
    absencePercent: 31.6,
    avgStudyHours: 11,
    avgQuizGrade: "C+ (73%)",
    quizScore: 73,
    activeStudents: 88,
    trend: "critical",
  },
  {
    batchName: "Robotics Practicum",
    batchIcon: "RO",
    batchIconColor: "#059669",
    instructor: "Dr. James Wu",
    department: "Engineering",
    semester: "Spring 2025",
    attendancePercent: 86.7,
    absencePercent: 13.3,
    avgStudyHours: 23,
    avgQuizGrade: "B+ (85%)",
    quizScore: 85,
    activeStudents: 36,
    trend: "rising",
  },
  {
    batchName: "Compilers & Runtimes",
    batchIcon: "CR",
    batchIconColor: "#0891b2",
    instructor: "Dr. Omar Hassan",
    department: "Computer Science",
    semester: "Fall 2024",
    attendancePercent: 83.9,
    absencePercent: 16.1,
    avgStudyHours: 18,
    avgQuizGrade: "B (80%)",
    quizScore: 80,
    activeStudents: 52,
    trend: "stable",
  },
  {
    batchName: "Entrepreneurship Hub",
    batchIcon: "EN",
    batchIconColor: "#d97706",
    instructor: "Prof. Maya Ortiz",
    department: "Business",
    semester: "Spring 2025",
    attendancePercent: 77.5,
    absencePercent: 22.5,
    avgStudyHours: 13,
    avgQuizGrade: "B- (76%)",
    quizScore: 76,
    activeStudents: 41,
    trend: "warning",
  },
  {
    batchName: "Parallel Computing",
    batchIcon: "PC",
    batchIconColor: "#7c3aed",
    instructor: "Dr. James Wu",
    department: "Computer Science",
    semester: "Fall 2024",
    attendancePercent: 90.8,
    absencePercent: 9.2,
    avgStudyHours: 26,
    avgQuizGrade: "A- (91%)",
    quizScore: 91,
    activeStudents: 39,
    trend: "strong",
  },
  {
    batchName: "Thermodynamics II",
    batchIcon: "TH",
    batchIconColor: "#dc2626",
    instructor: "Dr. Alan Turing",
    department: "Engineering",
    semester: "Fall 2024",
    attendancePercent: 71.2,
    absencePercent: 28.8,
    avgStudyHours: 10,
    avgQuizGrade: "C (72%)",
    quizScore: 72,
    activeStudents: 55,
    trend: "critical",
  },
  {
    batchName: "Ethics in Technology",
    batchIcon: "ET",
    batchIconColor: "#2563eb",
    instructor: "Dr. Helena Hills",
    department: "Computer Science",
    semester: "Spring 2025",
    attendancePercent: 88.9,
    absencePercent: 11.1,
    avgStudyHours: 17,
    avgQuizGrade: "B+ (86%)",
    quizScore: 86,
    activeStudents: 63,
    trend: "rising",
  },
];

const mentorBatches = mentorSubjects.map(subjectToBatchAnalytics);

const extraBatches: BatchAnalytics[] = supplementalBatches.map((batch, index) => ({
  ...batch,
  id: `supplemental-${index + 1}`,
}));

export const batchesAnalytics: BatchAnalytics[] = [
  ...mentorBatches,
  ...extraBatches,
];

export const analyticsSemesters = [
  "All Semesters",
  ...Array.from(new Set(batchesAnalytics.map((b) => b.semester))).sort(),
];

export const analyticsDepartments = [
  "All Departments",
  ...Array.from(new Set(batchesAnalytics.map((b) => b.department))).sort(),
];

export const analyticsSummaryDeltas = {
  activeBatches: "+2.4%",
  avgAttendance: "-1.2%",
  avgQuizGrade: "+0.8%",
  avgStudyHours: "Stable",
} as const;
