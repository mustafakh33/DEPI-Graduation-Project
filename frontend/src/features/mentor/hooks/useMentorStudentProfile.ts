import { useEffect, useState } from "react";
import { getMentorStudentProfile } from "../data/mentorStudents.mock";
import type { StudentProfileTab } from "@/features/instructor/types/students.types";

export function useMentorStudentProfile(studentId: string | undefined) {
  const baseProfile = studentId
    ? getMentorStudentProfile(studentId)
    : undefined;

  const [activeTab, setActiveTab] = useState<StudentProfileTab>("overview");

  useEffect(() => {
    if (baseProfile) {
      setActiveTab("overview");
    }
  }, [studentId]);

  return {
    profile: baseProfile,
    activeTab,
    setActiveTab,
  };
}
