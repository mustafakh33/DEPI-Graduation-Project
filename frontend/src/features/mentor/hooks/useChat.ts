import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  chatConversations,
  chatThreads,
  defaultActiveStudentId,
  quickReplies,
  recentFilesByStudent,
  upcomingSessionByStudent,
} from "../data/mockChatData";
import { mentorSubjects } from "../data/DashMockData";
import { getMentorStudentProfile } from "../data/mentorStudents.mock";
import type { ChatMessage, ChatRecentFile } from "../types/chat.types";
import type { Student } from "../types/mentor.types";
import {
  formatFileSize,
  inferRecentFileType,
  loadSavedNotes,
  persistNotes,
} from "../utils/chatStorage";

function getStudentGpa(studentId: string): number {
  for (const subject of mentorSubjects) {
    const match = subject.students.find((s) => String(s.id) === studentId);
    if (match) return match.gpa;
  }
  return 3.9;
}

function profileToChatStudent(
  profile: NonNullable<ReturnType<typeof getMentorStudentProfile>>,
  majorLabel?: string,
  isOnline = true
): Student & { majorLabel: string; isOnline: boolean } {
  return {
    id: Number(profile.id),
    studentId: profile.studentId,
    name: profile.name,
    major: profile.major,
    year: profile.term,
    attendanceRate: profile.kpis[0]?.value ?? 0,
    gpa: getStudentGpa(profile.id),
    risk: profile.status === "at_risk",
    majorLabel:
      majorLabel ?? `${profile.major.toUpperCase()} · ${profile.term}`,
    isOnline,
  };
}

function defaultThreadFor(studentId: string): ChatMessage[] {
  return [
    { id: `d-${studentId}`, type: "system", text: "TODAY" },
    {
      id: `m-${studentId}-1`,
      type: "text",
      sender: "student",
      text: "Hi! I wanted to follow up on our last conversation.",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    },
  ];
}

function nextMessageId(messages: ChatMessage[]): string {
  return `local-${Date.now()}-${messages.length}`;
}

function lastMessagePreview(messages: ChatMessage[]): string | undefined {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message.type === "text") {
      const text = message.text.trim();
      if (!text) continue;
      return text.length > 48 ? `${text.slice(0, 48)}...` : text;
    }
    if (message.type === "file") {
      return `Shared ${message.fileName}`;
    }
  }
  return undefined;
}

export const useChat = () => {
  const { studentId: routeStudentId } = useParams();
  const navigate = useNavigate();

  const activeStudentId = routeStudentId ?? defaultActiveStudentId;

  const [conversationSearch, setConversationSearch] = useState("");
  const [threads, setThreads] = useState<Record<string, ChatMessage[]>>(
    () => ({ ...chatThreads })
  );
  const [draft, setDraft] = useState("");
  const [notesByStudent, setNotesByStudent] = useState<Record<string, string>>(
    () => loadSavedNotes()
  );
  const [savedNotesSnapshot, setSavedNotesSnapshot] = useState<
    Record<string, string>
  >(() => loadSavedNotes());
  const [noteSaveFeedback, setNoteSaveFeedback] = useState<string | null>(null);
  const [recentFilesByStudentState, setRecentFilesByStudentState] = useState<
    Record<string, ChatRecentFile[]>
  >(() => ({ ...recentFilesByStudent }));
  const [readState, setReadState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!routeStudentId) {
      navigate(`/mentor/chat/${defaultActiveStudentId}`, { replace: true });
    }
  }, [routeStudentId, navigate]);

  const activeConversation = useMemo(
    () =>
      chatConversations.find((c) => c.studentId === activeStudentId) ??
      chatConversations[0],
    [activeStudentId]
  );

  const student = useMemo(() => {
    const profile = getMentorStudentProfile(activeStudentId);
    if (profile) {
      return profileToChatStudent(
        profile,
        activeConversation?.majorLabel,
        activeConversation?.status === "online"
      );
    }
    return {
      id: Number(activeStudentId),
      studentId: "STU-0000",
      name: activeConversation?.name ?? "Student",
      major: "Computer Science",
      year: "Senior",
      attendanceRate: 0,
      gpa: getStudentGpa(activeStudentId),
      risk: false,
      majorLabel: activeConversation?.majorLabel ?? "COMPUTER SCIENCE",
      isOnline: activeConversation?.status === "online",
    };
  }, [activeStudentId, activeConversation]);

  const conversationsWithRoster = useMemo(
    () =>
      chatConversations.map((conversation) => {
        const profile = getMentorStudentProfile(conversation.studentId);
        const thread =
          threads[conversation.studentId] ??
          defaultThreadFor(conversation.studentId);
        const preview = lastMessagePreview(thread) ?? conversation.preview;

        return {
          ...conversation,
          name: profile?.name ?? conversation.name,
          preview,
        };
      }),
    [threads]
  );

  const filteredConversations = useMemo(() => {
    const q = conversationSearch.trim().toLowerCase();
    if (!q) return conversationsWithRoster;
    return conversationsWithRoster.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q)
    );
  }, [conversationSearch, conversationsWithRoster]);

  const messages = threads[activeStudentId] ?? defaultThreadFor(activeStudentId);

  const privateNote = notesByStudent[activeStudentId] ?? "";

  const recentFiles = recentFilesByStudentState[activeStudentId] ?? [];

  const isNoteDirty =
    (privateNote ?? "") !== (savedNotesSnapshot[activeStudentId] ?? "");

  const upcomingSession = upcomingSessionByStudent[activeStudentId];

  const selectConversation = useCallback(
    (studentId: string) => {
      setReadState((prev) => ({ ...prev, [studentId]: true }));
      navigate(`/mentor/chat/${studentId}`);
    },
    [navigate]
  );

  const sendMessage = useCallback(() => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    setThreads((prev) => {
      const current = prev[activeStudentId] ?? defaultThreadFor(activeStudentId);
      return {
        ...prev,
        [activeStudentId]: [
          ...current,
          {
            id: nextMessageId(current),
            type: "text",
            sender: "mentor",
            text: trimmed,
            time,
            read: true,
          },
        ],
      };
    });
    setDraft("");
  }, [activeStudentId, draft]);

  const applyQuickReply = useCallback((text: string) => {
    setDraft(text);
  }, []);

  const setPrivateNote = useCallback(
    (value: string) => {
      setNoteSaveFeedback(null);
      setNotesByStudent((prev) => ({
        ...prev,
        [activeStudentId]: value,
      }));
    },
    [activeStudentId]
  );

  const savePrivateNote = useCallback(() => {
    const trimmed = privateNote.trim();
    const next = { ...notesByStudent, [activeStudentId]: trimmed };
    setNotesByStudent(next);
    setSavedNotesSnapshot(next);
    persistNotes(next);
    setNoteSaveFeedback("Note saved");
    window.setTimeout(() => setNoteSaveFeedback(null), 2500);
  }, [activeStudentId, notesByStudent, privateNote]);

  const attachFile = useCallback(
    (file: File) => {
      const time = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const downloadUrl = URL.createObjectURL(file);
      const messageId = `file-${Date.now()}`;

      setThreads((prev) => {
        const current =
          prev[activeStudentId] ?? defaultThreadFor(activeStudentId);
        return {
          ...prev,
          [activeStudentId]: [
            ...current,
            {
              id: messageId,
              type: "file",
              sender: "mentor",
              fileName: file.name,
              fileSize: formatFileSize(file.size),
              time,
              downloadUrl,
            },
          ],
        };
      });

      const sharedAt = "Just now";
      const newRecentFile: ChatRecentFile = {
        id: `rf-${messageId}`,
        name: file.name,
        type: inferRecentFileType(file.name),
        sharedAt,
      };

      setRecentFilesByStudentState((prev) => ({
        ...prev,
        [activeStudentId]: [newRecentFile, ...(prev[activeStudentId] ?? [])],
      }));
    },
    [activeStudentId]
  );

  const joinSession = useCallback(() => {
    const link = upcomingSession?.meetingLink;
    if (link) window.open(link, "_blank", "noopener");
  }, [upcomingSession]);

  const scheduleMeeting = useCallback(() => {
    window.alert(
      `Meeting request sent to ${student.name}. They will receive a calendar invite shortly.`
    );
  }, [student.name]);

  const downloadFile = useCallback(
    (fileName: string, downloadUrl?: string) => {
      if (downloadUrl) {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName;
        link.click();
        return;
      }
      window.alert(`Downloading ${fileName}…`);
    },
    []
  );

  const getUnreadCount = useCallback(
    (studentId: string, base?: number) => {
      if (readState[studentId] || studentId === activeStudentId) return 0;
      return base ?? 0;
    },
    [activeStudentId, readState]
  );

  return {
    activeStudentId,
    student,
    activeConversation,
    conversations: filteredConversations,
    conversationSearch,
    setConversationSearch,
    messages,
    draft,
    setDraft,
    sendMessage,
    quickReplies,
    applyQuickReply,
    selectConversation,
    privateNote,
    setPrivateNote,
    savePrivateNote,
    isNoteDirty,
    noteSaveFeedback,
    attachFile,
    recentFiles,
    upcomingSession,
    joinSession,
    scheduleMeeting,
    downloadFile,
    getUnreadCount,
  };
};
