import type {
    BatchAnalytics,
  } from "../types/analystics.types";
  
  export const batchesAnalytics: BatchAnalytics[] = [
    {
      id: "1",
      batchName: "Comp Sci 2024 - A",
      instructor: "Dr. Robert Chen",
      semester: "Semester 1",
  
      attendancePercent: 94.2,
      absencePercent: 5.8,
  
      avgStudyHours: 24,
  
      avgQuizGrade: "A- (91%)",
  
      activeStudents: 120,
  
      trend: "strong",
    },
  
    {
      id: "2",
      batchName: "Business Admin 2024",
      instructor: "Prof. Sarah Jenkins",
      semester: "Semester 2",
  
      attendancePercent: 72.5,
      absencePercent: 27.5,
  
      avgStudyHours: 12,
  
      avgQuizGrade: "B (82%)",
  
      activeStudents: 80,
  
      trend: "stable",
    },
  
    {
      id: "3",
      batchName: "Mech Engineering V",
      instructor: "Dr. Alan Turing",
      semester: "Semester 1",
  
      attendancePercent: 48,
      absencePercent: 52,
  
      avgStudyHours: 8,
  
      avgQuizGrade: "C (74%)",
  
      activeStudents: 50,
  
      trend: "weak",
    },
  ];