import { getCurrentTime } from "./soloFocusTime";

export const STUDENT_NOTIFICATIONS_STORAGE_KEY = "student-notifications";

export interface StudentNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "break" | "quiz" | "assignment" | "login" | "signup";
  isRead: boolean;
  createdAt: number;
}

export const createBreakNotification = (): StudentNotification => {
  return {
    id: `break-${Date.now()}`,
    title: "Time for a break",
    description:
      "Your focus timer has been paused automatically. Take a short break or resume when you are ready.",
    time: getCurrentTime(),
    type: "break",
    isRead: false,
    createdAt: Date.now(),
  };
};

export const saveStudentNotification = (
  notification: StudentNotification
) => {
  const savedNotifications = localStorage.getItem(
    STUDENT_NOTIFICATIONS_STORAGE_KEY
  );

  let notifications: StudentNotification[] = [];

  if (savedNotifications) {
    try {
      notifications = JSON.parse(savedNotifications) as StudentNotification[];
    } catch {
      notifications = [];
    }
  }

  localStorage.setItem(
    STUDENT_NOTIFICATIONS_STORAGE_KEY,
    JSON.stringify([notification, ...notifications])
  );
};

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    return;
  }

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
};

export const showBrowserBreakNotification = () => {
  if (!("Notification" in window)) {
    return;
  }

  if (Notification.permission !== "granted") {
    return;
  }

  new Notification("Time for a break", {
    body: "Your focus timer has been paused automatically.",
  });
};

export const exitFullScreenIfActive = async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  } catch {
    // Fullscreen exit is optional.
  }
};