/**
 * Mentor dashboard state: subject selection, student search/filter,
 * risk/top lists, session countdown, and join window (15 min).
 *
 * @see ../data/DashMockData.ts
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { mentorSubjects } from "../data/DashMockData";

const JOIN_WINDOW_MS = 15 * 60 * 1000;

export const useMentorDashboard = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    mentorSubjects[0].id
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [canJoin, setCanJoin] = useState(false);

  const selectedSubject = useMemo(
    () => mentorSubjects.find((s) => s.id === selectedSubjectId),
    [selectedSubjectId]
  );

  const students = useMemo(() => {
    const list = selectedSubject?.students ?? [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        s.major.toLowerCase().includes(q)
    );
  }, [searchQuery, selectedSubject]);

  const topPerformers = useMemo(() => {
    const list = selectedSubject?.students ?? [];
    return [...list]
      .filter((s) => !s.risk)
      .sort((a, b) => b.gpa - a.gpa)
      .slice(0, 3);
  }, [selectedSubject]);

  const riskStudents = useMemo(() => {
    const list = selectedSubject?.students ?? [];
    return list.filter((s) => s.risk);
  }, [selectedSubject]);

  const sessionStartsAt = selectedSubject?.upcomingSession.startsAt;

  useEffect(() => {
    if (!sessionStartsAt) return;

    const target = new Date(sessionStartsAt).getTime();

    const tick = () => {
      const difference = target - Date.now();
      if (difference <= 0) {
        setTimeLeft(0);
        setCanJoin(true);
        return;
      }
      setTimeLeft(difference);
      setCanJoin(difference <= JOIN_WINDOW_MS);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [sessionStartsAt]);

  const joinSession = useCallback(() => {
    if (!selectedSubject || !canJoin) return;
    window.open(
      selectedSubject.upcomingSession.meetingLink,
      "_blank",
      "noopener"
    );
  }, [canJoin, selectedSubject]);

  return {
    subjects: mentorSubjects,
    selectedSubject,
    selectedSubjectId,
    setSelectedSubjectId,
    students,
    topPerformers,
    riskStudents,
    searchQuery,
    setSearchQuery,
    timeLeft,
    canJoin,
    joinSession,
  };
};
