import type {
  AssignmentStudent,
  ProjectStudent,
  QuizStudent,
} from "../types/grading.types";

const quizStudents: QuizStudent[] = [
  {
    id: "1",
    rank: 1,
    studentName: "Ahmed Ali",
    studentId: "STD-1001",
    submissionDate: "12 May 2026",
    score: 96,
    status: "completed",
  },
  {
    id: "2",
    rank: 2,
    studentName: "Sara Mohamed",
    studentId: "STD-1002",
    submissionDate: "12 May 2026",
    score: 88,
    status: "completed",
  },
  {
    id: "3",
    rank: 3,
    studentName: "Youssef Hassan",
    studentId: "STD-1003",
    submissionDate: "-",
    score: 0,
    status: "absent",
  },
];

const assignmentStudents: AssignmentStudent[] = [
  {
    id: "1",
    studentName: "Ahmed Ali",
    studentId: "STD-1001",
    status: "submitted",
    fileName: "assignment_1.zip",
    score: 18,
    saved: false,
  },
  {
    id: "2",
    studentName: "Sara Mohamed",
    studentId: "STD-1002",
    status: "submitted",
    fileName: "react_project.pdf",
    score: 15,
    saved: false,
  },
  {
    id: "3",
    studentName: "Youssef Hassan",
    studentId: "STD-1003",
    status: "not_submitted",
    fileName: "No File",
    score: 0,
    saved: false,
  },
];

const projectStudents: ProjectStudent[] = [
  {
    id: "1",
    studentName: "Ahmed Ali",
    studentId: "STD-1001",
    status: "submitted",
    fileName: "final_project.zip",
    score: 90,
    saved: false,
  },
  {
    id: "2",
    studentName: "Sara Mohamed",
    studentId: "STD-1002",
    status: "submitted",
    fileName: "ai_dashboard.fig",
    score: 84,
    saved: false,
  },
  {
    id: "3",
    studentName: "Youssef Hassan",
    studentId: "STD-1003",
    status: "not_submitted",
    fileName: "No File",
    score: 0,
    saved: false,
  },
];

export const gradingMock = {
  quizStudents,
  assignmentStudents,
  projectStudents,
};

export {
  quizStudents,
  assignmentStudents,
  projectStudents,
};
