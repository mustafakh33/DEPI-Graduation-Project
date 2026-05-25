import { useCallback, useMemo, useState } from "react";
import {
  activeStudyGroups,
  classroomLogs,
  sessionBatchOptions,
  upcomingMentorSession,
} from "../data/mentorSessions.mock";
import type {
  CreateSessionForm,
  SessionsViewMode,
  StudyGroupSession,
} from "../types/mentorSessions.types";

const emptyForm = (): CreateSessionForm => ({
  name: "",
  date: "",
  time: "",
  batchId: sessionBatchOptions[0]?.id ?? "",
  description: "",
});

export function useMentorSessions() {
  const [viewMode, setViewMode] = useState<SessionsViewMode>("grid");
  const [form, setForm] = useState<CreateSessionForm>(emptyForm);
  const [createdNotice, setCreatedNotice] = useState<string | null>(null);

  const liveGroups = useMemo(
    () => activeStudyGroups.filter((group) => group.isLive),
    []
  );

  const helpGroup = useMemo(
    () => activeStudyGroups.find((g) => g.status === "help_requested"),
    []
  );

  const updateForm = useCallback(
    (patch: Partial<CreateSessionForm>) => {
      setForm((prev) => ({ ...prev, ...patch }));
      setCreatedNotice(null);
    },
    []
  );

  const observeRoom = useCallback((group: StudyGroupSession) => {
    window.open(group.meetingLink, "_blank", "noopener,noreferrer");
  }, []);

  const joinDiscussion = useCallback((group: StudyGroupSession) => {
    window.open(group.meetingLink, "_blank", "noopener,noreferrer");
  }, []);

  const createSession = useCallback(() => {
    const trimmedName = form.name.trim();
    if (!trimmedName || !form.date || !form.time || !form.batchId) {
      setCreatedNotice("Please fill in session name, date, time, and batch.");
      return;
    }

    const batch = sessionBatchOptions.find((b) => b.id === form.batchId);
    setCreatedNotice(
      `Session "${trimmedName}" scheduled for ${batch?.label ?? "batch"} on ${form.date} at ${form.time}. Students will be notified.`
    );
    setForm(emptyForm());
    window.setTimeout(() => setCreatedNotice(null), 4000);
  }, [form]);

  return {
    viewMode,
    setViewMode,
    liveGroups,
    helpGroup,
    allGroups: activeStudyGroups,
    logs: classroomLogs,
    upcoming: upcomingMentorSession,
    batchOptions: sessionBatchOptions,
    form,
    updateForm,
    createSession,
    createdNotice,
    observeRoom,
    joinDiscussion,
  };
}
