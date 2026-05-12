export interface QuizStudent {
    id: string;
  
    rank: number;
  
    studentName: string;
  
    studentId: string;
  
    submissionDate: string;
  
    score: number;
  
    status:
      | "completed"
      | "absent";
  
    avatar?: string;
  }
  
  export interface AssignmentStudent {
    id: string;
  
    studentName: string;
  
    studentId: string;
  
    status:
      | "submitted"
      | "not_submitted";
  
    fileName: string;
  
    score: number;
  
    saved: boolean;
  
    avatar?: string;
  }
  
  export interface ProjectStudent {
    id: string;
  
    studentName: string;
  
    studentId: string;
  
    status:
      | "submitted"
      | "not_submitted";
  
    fileName: string;
  
    score: number;
  
    saved: boolean;
  
    avatar?: string;
  }