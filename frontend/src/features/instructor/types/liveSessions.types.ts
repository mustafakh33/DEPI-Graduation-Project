export interface UpcomingSession {
    id: string;
  
    title: string;
  
    batchName: string;
  
    lectureNumber: string;
  
    startsAt: string;
  
    enrolledStudents: number;
  }
  
  export interface SessionActivity {
    attendedSuccessfully: boolean;
  
    attendanceRate: number;
  }
  
  export interface UpcomingLecture {
    id: string;
  
    date: string;
  
    title: string;
  
    batchName: string;
  
    lectureNumber: string;
  
    time: string;
  
    enrolledStudents: number;
  }
  
  export interface RewardStudentForm {
    batch: string;
  
    student: string;
  
    coins: number;
  
    reason: string;
  }