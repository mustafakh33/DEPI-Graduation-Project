import { mentorSubjects } from "./DashMockData";
import type {
  ClassroomLogEntry,
  MentorSessionBatchOption,
  StudyGroupSession,
  UpcomingMentorSession,
} from "../types/mentorSessions.types";

const BATCH_LABELS = ["A", "B", "C", "D"] as const;

const STATUS_BY_SUBJECT: Record<string, StudyGroupSession["status"]> = {
  "data-structures": "stable",
  "operating-systems": "help_requested",
  "computer-networks": "stable",
};

const ACTIVE_LABEL_BY_SUBJECT: Record<string, string> = {
  "data-structures": "45m active",
  "operating-systems": "3m waiting",
  "computer-networks": "1h 10m active",
};

function subjectToStudyGroup(
  subject: (typeof mentorSubjects)[number],
  index: number
): StudyGroupSession {
  const batchLabel = `Batch ${BATCH_LABELS[index] ?? String.fromCharCode(65 + index)}`;
  const status = STATUS_BY_SUBJECT[subject.id] ?? "stable";

  return {
    id: `group-${subject.id}`,
    subjectId: subject.id,
    batchLabel,
    name: `${batchLabel} - ${subject.name}`,
    status,
    studentCount: subject.students.length,
    activeLabel: ACTIVE_LABEL_BY_SUBJECT[subject.id] ?? "20m active",
    isLive: status !== "idle",
    meetingLink: subject.upcomingSession.meetingLink,
    helpTopic:
      status === "help_requested" ? "Lab 4.2 — process synchronization" : undefined,
  };
}

const mentorStudyGroups = mentorSubjects.map(subjectToStudyGroup);

/** Extra cohort for idle / observe-only state in the grid. */
const supplementalGroup: StudyGroupSession = {
  id: "group-graphic-design",
  subjectId: "graphic-design",
  batchLabel: "Batch D",
  name: "Batch D - Graphic Design",
  status: "idle",
  studentCount: 15,
  activeLabel: "12m active",
  isLive: false,
  meetingLink: "https://meet.google.com/mentor-graphic-design",
};

export const activeStudyGroups: StudyGroupSession[] = [
  ...mentorStudyGroups,
  supplementalGroup,
];

export const classroomLogs: ClassroomLogEntry[] = [
  {
    id: "log-1",
    message:
      "New lecture materials uploaded to Batch A by Dr. Sarah (12m ago)",
    timeAgo: "12m ago",
  },
  {
    id: "log-2",
    message:
      "Batch B requested urgent assistance for 'Lab 4.2' (3m ago)",
    timeAgo: "3m ago",
    variant: "urgent",
  },
  {
    id: "log-3",
    message: "Batch C started a group review session (18m ago)",
    timeAgo: "18m ago",
  },
  {
    id: "log-4",
    message: "Batch D study room opened — low activity (25m ago)",
    timeAgo: "25m ago",
  },
];

export const upcomingMentorSession: UpcomingMentorSession = {
  id: "upcoming-seminar",
  title: "Seminar: Quantum Computing Basics",
  startsIn: "15m",
};

export const sessionBatchOptions: MentorSessionBatchOption[] = [
  ...mentorSubjects.map((subject) => ({
    id: subject.id,
    label: subject.name,
  })),
  { id: "graphic-design", label: "Graphic Design" },
];
