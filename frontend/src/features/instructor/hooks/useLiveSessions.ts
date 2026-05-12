import { useEffect, useState } from "react";

import {
  upcomingLectures,
  upcomingSession,
  sessionActivity,
} from "../data/liveSessions.mock";

export const useLiveSessions = () => {
  const [timeLeft, setTimeLeft] =
    useState(0);

  const [canJoin, setCanJoin] =
    useState(false);

  useEffect(() => {
    const target =
      new Date(
        upcomingSession.startsAt
      ).getTime();

    const interval = setInterval(() => {

      const now = Date.now();

      const difference =
        target - now;

      if (difference <= 0) {

        setCanJoin(true);

        setTimeLeft(0);

        clearInterval(interval);

        return;
      }

      setTimeLeft(difference);

    }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  return {
    upcomingSession,

    sessionActivity,

    upcomingLectures,

    timeLeft,

    canJoin,
  };
};