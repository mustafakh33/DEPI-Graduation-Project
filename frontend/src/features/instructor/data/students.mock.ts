import type {
  InstructorStudent,
  StudentProfile,
} from "../types/students.types";

export const instructorBatches = [
  "All Batches",
  "Alpha-2024",
  "Beta-Y",
  "Gamma-X",
] as const;

export const instructorStudents: InstructorStudent[] = [
  { id: "1", name: "Alex Johnson", studentId: "STU-9402", batchName: "Alpha-2024", status: "active" },
  { id: "2", name: "Ahmed Ali", studentId: "STU-1001", batchName: "Alpha-2024", status: "active" },
  { id: "3", name: "Sara Mohamed", studentId: "STU-1002", batchName: "Alpha-2024", status: "active" },
  { id: "4", name: "Layla Mahmoud", studentId: "STU-1004", batchName: "Gamma-X", status: "active" },
  { id: "5", name: "Omar Farouk", studentId: "STU-1005", batchName: "Gamma-X", status: "at_risk" },
  { id: "6", name: "Nour El-Din", studentId: "STU-1006", batchName: "Beta-Y", status: "active" },
  { id: "7", name: "Mariam Saleh", studentId: "STU-1007", batchName: "Beta-Y", status: "active" },
  { id: "8", name: "Karim Nabil", studentId: "STU-1008", batchName: "Beta-Y", status: "active" },
  { id: "9", name: "Hana Ibrahim", studentId: "STU-1009", batchName: "Gamma-X", status: "active" },
  { id: "10", name: "Tarek Mostafa", studentId: "STU-1010", batchName: "Alpha-2024", status: "active" },
  { id: "11", name: "Dina Ashraf", studentId: "STU-1011", batchName: "Gamma-X", status: "at_risk" },
  { id: "12", name: "Youssef Hassan", studentId: "STU-1003", batchName: "Alpha-2024", status: "inactive" },
  { id: "13", name: "Salma Fathy", studentId: "STU-1012", batchName: "Beta-Y", status: "active" },
  { id: "14", name: "Mahmoud Reda", studentId: "STU-1013", batchName: "Beta-Y", status: "active" },
];

const defaultKpis = (
  attendance: number,
  assignments: number,
  quiz: number
): StudentProfile["kpis"] => [
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
    footnote: quiz < 70 ? "Below average (avg 75%)" : "Above class average",
    trendVariant: quiz < 70 ? "warning" : "positive",
  },
];

const defaultTrend: StudentProfile["performanceTrend"] = [
  { month: "Jan", score: 68 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 75 },
  { month: "Apr", score: 82, highlighted: true },
  { month: "May", score: 78 },
  { month: "Jun", score: 80 },
];

function buildProfile(student: InstructorStudent): StudentProfile {
  const seed = Number(student.id);
  const attendance = 88 + (seed % 8);
  const assignments = 80 + (seed % 12);
  const quiz = 55 + (seed % 40);

  return {
    ...student,
    major: "Computer Science",
    term: "Fall 2023 Semester",
    tabs: ["Overview", "Academic History", "Documents", "Attendance Log"],
    kpis: defaultKpis(attendance, assignments, quiz),
    performanceTrend: defaultTrend,
    advisorNotes: [
      {
        date: "Jan 12, 2024",
        content:
          student.status === "at_risk"
            ? "Student flagged for low quiz performance. Recommend weekly check-ins and supplemental materials before mid-terms."
            : "Showing strong practical skills in lab sessions. Needs more focus on theoretical concepts for upcoming mid-terms.",
      },
    ],
  };
}

export const studentProfiles: Record<string, StudentProfile> =
  Object.fromEntries(
    instructorStudents.map((s) => [s.id, buildProfile(s)])
  );

export function getStudentProfile(id: string): StudentProfile | undefined {
  return studentProfiles[id];
}
