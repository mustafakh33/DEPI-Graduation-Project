import type { SubjectDashboardData } from "../types/instructorDashboard.types";

export const instructorSubjects = [
  { id: "data-structures", name: "Data Structures" },
  { id: "operating-systems", name: "Operating Systems" },
  { id: "artificial-intelligence", name: "Artificial Intelligence" },
  { id: "computer-networks", name: "Computer Networks" },
] as const;

const weekAttendance = [
  { day: "MON", attended: 88, absent: 12 },
  { day: "TUE", attended: 92, absent: 8 },
  { day: "WED", attended: 85, absent: 15 },
  { day: "THU", attended: 94, absent: 6 },
  { day: "FRI", attended: 78, absent: 22 },
  { day: "SAT", attended: 70, absent: 30 },
  { day: "SUN", attended: 65, absent: 35 },
];

function sessionStartSoon(): string {
  return new Date(Date.now() + 5 * 60 * 1000).toISOString();
}

export const subjectDashboardData: Record<string, SubjectDashboardData> = {
  "data-structures": {
    subject: { id: "data-structures", name: "Data Structures" },
    metrics: [
      { label: "Total Students", value: "124", trend: "+2%", trendDirection: "up" },
      { label: "Attendance Rate", value: "92%", trend: "-1%", trendDirection: "down" },
      { label: "Avg. Quiz Score", value: "85/100", trend: "+5%", trendDirection: "up" },
      { label: "Submissions", value: "94%", trend: "+0%", trendDirection: "neutral" },
      { label: "Study Hours", value: "6.5h", trend: "+1.2h", trendDirection: "up" },
    ],
    attendance: weekAttendance,
    topStudents: [
      { id: "8", name: "Karim Nabil", score: 99.2, rank: 1 },
      { id: "2", name: "Ahmed Ali", score: 97.8, rank: 2 },
      { id: "3", name: "Sara Mohamed", score: 96.4, rank: 3 },
      { id: "10", name: "Tarek Mostafa", score: 95.1, rank: 4 },
      { id: "6", name: "Nour El-Din", score: 94.3, rank: 5 },
    ],
    progress: {
      quizAverage: 78.4,
      quizCourse: "Data Structures 101",
      submissionsDone: 112,
      submissionsTotal: 124,
      assignmentLabel: "Assignment #4 — Linked Lists",
    },
    upcomingSession: {
      id: "ds-live-1",
      title: "Live Lecture: Recursion & Divide and Conquer",
      lectureNumber: "#14",
      startsAt: sessionStartSoon(),
      meetingLink: "https://meet.google.com/uni-ds-recursion",
      enrolledStudents: 124,
    },
  },
  "operating-systems": {
    subject: { id: "operating-systems", name: "Operating Systems" },
    metrics: [
      { label: "Total Students", value: "98", trend: "+1%", trendDirection: "up" },
      { label: "Attendance Rate", value: "89%", trend: "+2%", trendDirection: "up" },
      { label: "Avg. Quiz Score", value: "81/100", trend: "+3%", trendDirection: "up" },
      { label: "Submissions", value: "91%", trend: "-2%", trendDirection: "down" },
      { label: "Study Hours", value: "5.8h", trend: "+0.6h", trendDirection: "up" },
    ],
    attendance: weekAttendance.map((d) => ({
      ...d,
      attended: d.attended - 4,
      absent: d.absent + 4,
    })),
    topStudents: [
      { id: "7", name: "Mariam Saleh", score: 98.5, rank: 1 },
      { id: "13", name: "Salma Fathy", score: 96.2, rank: 2 },
      { id: "14", name: "Mahmoud Reda", score: 95.0, rank: 3 },
      { id: "5", name: "Omar Farouk", score: 93.8, rank: 4 },
      { id: "4", name: "Layla Mahmoud", score: 92.1, rank: 5 },
    ],
    progress: {
      quizAverage: 74.2,
      quizCourse: "Operating Systems",
      submissionsDone: 89,
      submissionsTotal: 98,
      assignmentLabel: "Assignment #3 — Process Scheduling",
    },
    upcomingSession: {
      id: "os-live-1",
      title: "Lab: Memory Management & Paging",
      lectureNumber: "#09",
      startsAt: sessionStartSoon(),
      meetingLink: "https://meet.google.com/uni-os-memory",
      enrolledStudents: 98,
    },
  },
  "artificial-intelligence": {
    subject: { id: "artificial-intelligence", name: "Artificial Intelligence" },
    metrics: [
      { label: "Total Students", value: "86", trend: "+4%", trendDirection: "up" },
      { label: "Attendance Rate", value: "94%", trend: "+1%", trendDirection: "up" },
      { label: "Avg. Quiz Score", value: "88/100", trend: "+6%", trendDirection: "up" },
      { label: "Submissions", value: "96%", trend: "+3%", trendDirection: "up" },
      { label: "Study Hours", value: "7.2h", trend: "+2.1h", trendDirection: "up" },
    ],
    attendance: weekAttendance.map((d) => ({
      ...d,
      attended: d.attended + 2,
      absent: Math.max(0, d.absent - 2),
    })),
    topStudents: [
      { id: "1", name: "Alex Johnson", score: 99.8, rank: 1 },
      { id: "11", name: "Dina Ashraf", score: 98.1, rank: 2 },
      { id: "9", name: "Hana Ibrahim", score: 97.4, rank: 3 },
      { id: "3", name: "Sara Mohamed", score: 96.0, rank: 4 },
      { id: "2", name: "Ahmed Ali", score: 95.5, rank: 5 },
    ],
    progress: {
      quizAverage: 82.6,
      quizCourse: "Artificial Intelligence",
      submissionsDone: 83,
      submissionsTotal: 86,
      assignmentLabel: "Project — Neural Network Basics",
    },
    upcomingSession: {
      id: "ai-live-1",
      title: "Workshop: Supervised Learning Pipelines",
      lectureNumber: "#11",
      startsAt: sessionStartSoon(),
      meetingLink: "https://meet.google.com/uni-ai-ml",
      enrolledStudents: 86,
    },
  },
  "computer-networks": {
    subject: { id: "computer-networks", name: "Computer Networks" },
    metrics: [
      { label: "Total Students", value: "110", trend: "+0%", trendDirection: "neutral" },
      { label: "Attendance Rate", value: "90%", trend: "-1%", trendDirection: "down" },
      { label: "Avg. Quiz Score", value: "83/100", trend: "+2%", trendDirection: "up" },
      { label: "Submissions", value: "92%", trend: "+1%", trendDirection: "up" },
      { label: "Study Hours", value: "6.1h", trend: "+0.4h", trendDirection: "up" },
    ],
    attendance: weekAttendance,
    topStudents: [
      { id: "10", name: "Tarek Mostafa", score: 98.0, rank: 1 },
      { id: "8", name: "Karim Nabil", score: 96.7, rank: 2 },
      { id: "6", name: "Nour El-Din", score: 95.9, rank: 3 },
      { id: "12", name: "Youssef Hassan", score: 94.2, rank: 4 },
      { id: "2", name: "Ahmed Ali", score: 93.5, rank: 5 },
    ],
    progress: {
      quizAverage: 76.8,
      quizCourse: "Computer Networks",
      submissionsDone: 101,
      submissionsTotal: 110,
      assignmentLabel: "Assignment #5 — TCP/IP Analysis",
    },
    upcomingSession: {
      id: "cn-live-1",
      title: "Live Lecture: Routing Protocols Deep Dive",
      lectureNumber: "#12",
      startsAt: sessionStartSoon(),
      meetingLink: "https://meet.google.com/uni-cn-routing",
      enrolledStudents: 110,
    },
  },
};

export function getSubjectDashboard(
  subjectId: string
): SubjectDashboardData | undefined {
  return subjectDashboardData[subjectId];
}
