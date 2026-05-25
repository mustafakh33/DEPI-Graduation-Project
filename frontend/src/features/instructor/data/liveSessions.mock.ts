import type {
  UpcomingLecture,
  UpcomingSession,
  SessionActivity,
  TopPerformer,
} from "../types/liveSessions.types";

export const upcomingSession: UpcomingSession = {
  id: "1",
  title: "Quantum Mechanics",
  batchName: "Batch: Alpha-2024",
  lectureNumber: "#14",
  startsAt: "2026-05-26T16:00:00",
  enrolledStudents: 120,
  meetingLink: "https://meet.google.com/abc-defg-hij",
};

export const sessionActivity: SessionActivity = {
  attendedSuccessfully: true,
  attendanceRate: 89,
};

export const topPerformers: TopPerformer[] = [
  { id: "1", name: "Alex Johnson", status: "active" },
  { id: "2", name: "Sarah Williams", status: "idle" },
];

export const upcomingLectures: UpcomingLecture[] = [
  {
    id: "1",
    month: "OCT",
    day: "24",
    title: "Statistical Mechanics & Probability",
    batchName: "BATCH: GAMMA-X",
    lectureNumber: "#08",
    time: "10:30 AM",
    enrolledStudents: 45,
  },
  {
    id: "2",
    month: "OCT",
    day: "25",
    title: "Fluid Dynamics Masterclass",
    batchName: "BATCH: BETA-Y",
    lectureNumber: "#22",
    time: "02:00 PM",
    enrolledStudents: 82,
  },
  {
    id: "3",
    month: "OCT",
    day: "27",
    title: "Thermodynamics Review",
    batchName: "BATCH: ALPHA-2024",
    lectureNumber: "#15",
    time: "04:00 PM",
    enrolledStudents: 67,
  },
];
