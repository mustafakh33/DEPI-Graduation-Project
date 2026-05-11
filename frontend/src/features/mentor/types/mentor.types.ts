export interface Student {
    id: number;
    name: string;
  
    major: string;
    year: string;
  
    attendanceRate: number;
  
    gpa: number;
  
    risk: boolean;
  
    image?: string;
  }
  
  export interface Batch {
    id: string;
  
    name: string;
  
    attendance: number;
  
    absence: number;
  
    students: Student[];
  }
  
  export interface BatchTabsProps {
    batches: Batch[];
  
    selectedBatchId: string;
  
    onSelect: (id: string) => void;
  }
  
  export interface StatsCardsProps {
    totalStudents: number;
  
    attendance: number;
  
    absence: number;
  }
  
  export interface StudentGridProps {
    students: Student[];
  }
  
  export interface StudentCardProps {
    student: Student;
  }
  
  export interface RiskStudentsProps {
    students: Student[];
  }
  
  export interface TopPerformersProps {
    students: Student[];
  }