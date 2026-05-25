/**
 * Instructor dashboard state: active subject, derived dashboard payload,
 * live-session countdown, and join within 15 minutes of start.
 *
 * @see ../data/instructorDashboard.mock.ts
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getSubjectDashboard,
  instructorSubjects,
} from "../data/instructorDashboard.mock";

const JOIN_WINDOW_MS = 15 * 60 * 1000;

export function useInstructorDashboard() {
  const [activeSubjectId, setActiveSubjectId] = useState<string>(
    instructorSubjects[0].id
  );
  const [timeLeft, setTimeLeft] = useState(0);
  const [canJoin, setCanJoin] = useState(false);

  const dashboard = useMemo(
    () => getSubjectDashboard(activeSubjectId),
    [activeSubjectId]
  );

  const sessionStartsAt = dashboard?.upcomingSession.startsAt;

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
    if (!dashboard || !canJoin) return;
    window.open(dashboard.upcomingSession.meetingLink, "_blank", "noopener");
  }, [canJoin, dashboard]);

  return {
    subjects: instructorSubjects,
    activeSubjectId,
    setActiveSubjectId,
    dashboard,
    timeLeft,
    canJoin,
    joinSession,
  };
}
