import { useCallback, useEffect, useState } from "react";
import { getStudentProfile } from "../data/students.mock";
import type { StudentProfileTab, StudentStatus } from "../types/students.types";

export function useStudentProfile(studentId: string | undefined) {
  const baseProfile = studentId ? getStudentProfile(studentId) : undefined;

  const [status, setStatus] = useState<StudentStatus | undefined>(
    baseProfile?.status
  );
  const [activeTab, setActiveTab] = useState<StudentProfileTab>("overview");

  useEffect(() => {
    const next = studentId ? getStudentProfile(studentId) : undefined;
    if (next) {
      setStatus(next.status);
      setActiveTab("overview");
    }
  }, [studentId]);

  const profile = baseProfile
    ? { ...baseProfile, status: status ?? baseProfile.status }
    : undefined;

  const isAtRisk = profile?.status === "at_risk";

  const putAtRisk = useCallback(() => {
    setStatus("at_risk");
  }, []);

  const clearRisk = useCallback(() => {
    setStatus("active");
  }, []);

  return {
    profile,
    activeTab,
    setActiveTab,
    isAtRisk,
    putAtRisk,
    clearRisk,
  };
}
