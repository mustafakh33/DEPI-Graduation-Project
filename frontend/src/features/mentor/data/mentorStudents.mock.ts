import { mentorSubjects } from "./DashMockData";
import type { StudentProfile } from "@/features/instructor/types/students.types";
import type { MentorRosterStudent } from "../types/mentorStudents.types";

export const mentorSubjectFilters = [
  "All Subjects",
  ...mentorSubjects.map((s) => s.name),
] as const;

function mapStatus(risk: boolean): MentorRosterStudent["status"] {
  return risk ? "at_risk" : "active";
}

function normalizeStudentId(raw: string): string {
  return raw.startsWith("STU") ? raw : `STU-${raw}`;
}

export const mentorRosterStudents: MentorRosterStudent[] = mentorSubjects.flatMap(
  (subject) =>
    subject.students.map((student) => ({
      id: String(student.id),
      name: student.name,
      studentId: normalizeStudentId(student.studentId),
      batchName: subject.name,
      status: mapStatus(student.risk),
    }))
);

const defaultTrend: StudentProfile["performanceTrend"] = [
  { month: "Jan", score: 68 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 75 },
  { month: "Apr", score: 82, highlighted: true },
  { month: "May", score: 78 },
  { month: "Jun", score: 80 },
];

function buildMentorProfile(student: MentorRosterStudent): StudentProfile {
  const seed = Number(student.id) || 1;
  const attendance = 88 + (seed % 8);
  const assignments = 80 + (seed % 12);
  const quiz = 55 + (seed % 40);

  return {
    id: student.id,
    name: student.name,
    studentId: student.studentId,
    batchName: student.batchName,
    status: student.status,
    major: "Computer Science",
    term: "Fall 2023 Semester",
    tabs: ["Overview", "Academic History", "Documents", "Attendance Log"],
    kpis: [
      {
        label: "Attendance",
        value: attendance,
        variant: "blue",
        trend: "+2.4% this month",
        trendVariant: "positive",
      },
      {
        label: "Assignments",
        value: assignments,
        variant: "blue",
        footnote: "On track",
        trendVariant: "neutral",
      },
      {
        label: "Quiz Grades",
        value: quiz,
        variant: quiz < 70 ? "red" : "blue",
        footnote:
          quiz < 70 ? "Below average (avg 75%)" : "Above class average",
        trendVariant: quiz < 70 ? "warning" : "positive",
      },
      {
        label: "Study Hours",
        value: Math.min(95, 60 + (seed % 30)),
        variant: "blue",
        footnote: `${10 + (seed % 6)} hrs/wk`,
        trendVariant: "positive",
      },
    ],
    performanceTrend: defaultTrend,
    advisorNotes: [
      {
        date: "Jan 12, 2024",
        content:
          student.status === "at_risk"
            ? "Student flagged for low quiz performance. Recommend weekly check-ins before mid-terms."
            : "Showing strong practical skills in lab sessions. Needs more focus on theoretical concepts for upcoming mid-terms.",
      },
    ],
  };
}

export const mentorStudentProfiles: Record<string, StudentProfile> =
  Object.fromEntries(
    mentorRosterStudents.map((s) => [s.id, buildMentorProfile(s)])
  );

export function getMentorStudentProfile(
  id: string
): StudentProfile | undefined {
  return mentorStudentProfiles[id];
}
