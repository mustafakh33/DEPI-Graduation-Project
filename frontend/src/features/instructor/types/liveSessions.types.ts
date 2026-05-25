export interface UpcomingSession {
  id: string;
  title: string;
  batchName: string;
  lectureNumber: string;
  startsAt: string;
  enrolledStudents: number;
  meetingLink: string;
}

export interface SessionActivity {
  attendedSuccessfully: boolean;
  attendanceRate: number;
}

export interface UpcomingLecture {
  id: string;
  month: string;
  day: string;
  title: string;
  batchName: string;
  lectureNumber: string;
  time: string;
  enrolledStudents: number;
}

export interface TopPerformer {
  id: string;
  name: string;
  status: "active" | "idle";
}

export interface RewardStudentForm {
  batch: string;
  student: string;
  coins: number;
  reason: string;
}
