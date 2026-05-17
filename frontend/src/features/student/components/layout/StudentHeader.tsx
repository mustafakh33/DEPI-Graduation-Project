import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Clock,
  Coffee,
  FileText,
  LogIn,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StudentStats } from "../../types/student.types";
import StudentTopStats from "./StudentTopStats";

interface StudentHeaderProps {
  stats: StudentStats;
}

type StudentNotificationType =
  | "signup"
  | "login"
  | "quiz"
  | "assignment"
  | "break"
  | "live-session";

interface StudentNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: StudentNotificationType;
  isRead: boolean;
  createdAt: number;
}

const STUDENT_NOTIFICATIONS_STORAGE_KEY = "student-notifications";

const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getDefaultNotifications = (): StudentNotification[] => [
  {
    id: "live-session-demo",
    title: "Live session started",
    description:
      "Demo: Your instructor has started a live session for your group. Meet link: https://meet.google.com/gmu-hjka-irf",
    time: "Now",
    type: "live-session",
    isRead: false,
    createdAt: Date.now(),
  },
  {
    id: "signup",
    title: "Account created",
    description: "You signed up successfully to Uni Hub.",
    time: getCurrentTime(),
    type: "signup",
    isRead: false,
    createdAt: Date.now() - 1000 * 60 * 20,
  },
  {
    id: "login",
    title: "Login activity",
    description: "You logged in successfully.",
    time: getCurrentTime(),
    type: "login",
    isRead: false,
    createdAt: Date.now() - 1000 * 60 * 10,
  },
  {
    id: "quiz",
    title: "Quiz reminder",
    description: "You have a quiz scheduled tomorrow.",
    time: "Tomorrow",
    type: "quiz",
    isRead: false,
    createdAt: Date.now() - 1000 * 60 * 5,
  },
  {
    id: "assignment",
    title: "Assignment deadline",
    description: "Your next assignment deadline is coming soon.",
    time: "Soon",
    type: "assignment",
    isRead: false,
    createdAt: Date.now() - 1000 * 60,
  },
];

const getStoredNotifications = (): StudentNotification[] => {
  const savedNotifications = localStorage.getItem(
    STUDENT_NOTIFICATIONS_STORAGE_KEY
  );

  if (!savedNotifications) {
    return [];
  }

  try {
    return JSON.parse(savedNotifications) as StudentNotification[];
  } catch {
    return [];
  }
};

const saveStoredNotifications = (notifications: StudentNotification[]) => {
  localStorage.setItem(
    STUDENT_NOTIFICATIONS_STORAGE_KEY,
    JSON.stringify(notifications)
  );
};

const StudentHeader = ({ stats }: StudentHeaderProps) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [storedNotifications, setStoredNotifications] = useState<
    StudentNotification[]
  >(getStoredNotifications);

  const defaultNotifications = useMemo(() => getDefaultNotifications(), []);

  const notifications = useMemo(() => {
    return [...storedNotifications, ...defaultNotifications].sort(
      (firstNotification, secondNotification) =>
        secondNotification.createdAt - firstNotification.createdAt
    );
  }, [defaultNotifications, storedNotifications]);

  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.isRead
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== STUDENT_NOTIFICATIONS_STORAGE_KEY) {
        return;
      }

      setStoredNotifications(getStoredNotifications());
    };

    window.addEventListener("storage", handleStorageChange);

    const refreshInterval = window.setInterval(() => {
      setStoredNotifications(getStoredNotifications());
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.clearInterval(refreshInterval);
    };
  }, []);

  const handleToggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);

    const unreadStoredNotifications = storedNotifications.some(
      (notification) => !notification.isRead
    );

    if (unreadStoredNotifications) {
      const updatedNotifications = storedNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));

      setStoredNotifications(updatedNotifications);
      saveStoredNotifications(updatedNotifications);
    }
  };

  const getNotificationIcon = (type: StudentNotification["type"]) => {
    if (type === "live-session") {
      return <Video className="size-4 text-cyan-300" />;
    }

    if (type === "signup") {
      return <Sparkles className="size-4 text-blue-300" />;
    }

    if (type === "login") {
      return <LogIn className="size-4 text-emerald-300" />;
    }

    if (type === "quiz") {
      return <Clock className="size-4 text-purple-300" />;
    }

    if (type === "break") {
      return <Coffee className="size-4 text-yellow-300" />;
    }

    return <FileText className="size-4 text-orange-300" />;
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-end border-b border-border bg-background px-4 md:px-8">
      <div className="flex items-center gap-4">
        <StudentTopStats stats={stats} />

        <div className="relative">
          <Button
            type="button"
            variant="headerIcon"
            size="icon"
            aria-label="Notifications"
            onClick={handleToggleNotifications}
            className="relative transition hover:scale-105"
          >
            <Bell className="size-5" />

            {hasUnreadNotifications ? (
              <span className="absolute right-1.5 top-1.5 size-2.5 rounded-full border border-background bg-red-500" />
            ) : null}
          </Button>

          {isNotificationsOpen ? (
            <div className="absolute right-0 top-12 z-50 w-[360px] rounded-2xl border border-slate-800 bg-[#0f172a] p-4 text-white shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold">Notifications</h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Latest updates for your learning journey.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="flex size-8 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="max-h-[360px] space-y-2 overflow-y-auto pr-1">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex gap-3 rounded-2xl p-3 transition hover:bg-white/10 ${
                        notification.isRead ? "bg-white/5" : "bg-blue-600/15"
                      }`}
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/15">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-white">
                            {notification.title}
                          </p>

                          <span className="shrink-0 text-[10px] text-slate-500">
                            {notification.time}
                          </span>
                        </div>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl bg-white/5 p-4 text-center text-xs text-slate-400">
                    No notifications yet.
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;