import type {
    UpcomingLecture,
    UpcomingSession,
    SessionActivity,
  } from "../types/liveSessions.types";
  
  export const upcomingSession: UpcomingSession =
  {
    id: "1",
  
    title: "Quantum Mechanics",
  
    batchName: "Batch: Alpha-2024",
  
    lectureNumber: "#14",
  
    startsAt:
      "2026-05-12T16:00:00",
  
    enrolledStudents: 120,
  };
  
  export const sessionActivity: SessionActivity =
  {
    attendedSuccessfully: true,
  
    attendanceRate: 89,
  };
  
  export const upcomingLectures:
    UpcomingLecture[] = [
    {
      id: "1",
  
      date: "OCT 24",
  
      title:
        "Statistical Mechanics",
  
      batchName:
        "Batch Gamma-X",
  
      lectureNumber: "#08",
  
      time: "10:30 AM",
  
      enrolledStudents: 45,
    },
  
    {
      id: "2",
  
      date: "OCT 25",
  
      title:
        "Fluid Dynamics Masterclass",
  
      batchName:
        "Batch Beta-Y",
  
      lectureNumber: "#22",
  
      time: "02:00 PM",
  
      enrolledStudents: 82,
    },
  ];