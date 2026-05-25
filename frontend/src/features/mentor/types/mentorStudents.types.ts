export type MentorStudentStatus = "active" | "at_risk" | "inactive";

export interface MentorRosterStudent {
  id: string;
  name: string;
  studentId: string;
  batchName: string;
  status: MentorStudentStatus;
}
