import { useCallback, useEffect, useState } from "react";
import { getStudentProfile } from "../data/students.mock";
import type {
  AdvisorNote,
  StudentProfileTab,
  StudentStatus,
} from "../types/students.types";
import { formatAdvisorNoteDate } from "../utils/advisorNotes";

export function useStudentProfile(studentId: string | undefined) {
  const baseProfile = studentId ? getStudentProfile(studentId) : undefined;

  const [status, setStatus] = useState<StudentStatus | undefined>(
    baseProfile?.status
  );
  const [advisorNotes, setAdvisorNotes] = useState<AdvisorNote[]>(
    baseProfile?.advisorNotes ?? []
  );
  const [activeTab, setActiveTab] = useState<StudentProfileTab>("overview");

  useEffect(() => {
    const next = studentId ? getStudentProfile(studentId) : undefined;
    if (next) {
      setStatus(next.status);
      setAdvisorNotes(next.advisorNotes);
      setActiveTab("overview");
    }
  }, [studentId]);

  const profile = baseProfile
    ? {
        ...baseProfile,
        status: status ?? baseProfile.status,
        advisorNotes,
      }
    : undefined;

  const isAtRisk = profile?.status === "at_risk";

  const putAtRisk = useCallback(() => {
    setStatus("at_risk");
  }, []);

  const clearRisk = useCallback(() => {
    setStatus("active");
  }, []);

  const addAdvisorNote = useCallback((content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return false;

    setAdvisorNotes((prev) => [
      { date: formatAdvisorNoteDate(), content: trimmed },
      ...prev,
    ]);
    return true;
  }, []);

  return {
    profile,
    activeTab,
    setActiveTab,
    isAtRisk,
    putAtRisk,
    clearRisk,
    addAdvisorNote,
  };
}
