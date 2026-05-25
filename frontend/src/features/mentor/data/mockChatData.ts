import type {
  ChatConversation,
  ChatMessage,
  ChatRecentFile,
  ChatUpcomingSession,
  QuickReply,
} from "../types/chat.types";

export const quickReplies: QuickReply[] = [
  {
    id: "transcript",
    label: "Review Transcript",
    text: "I've reviewed your transcript. Let's discuss the next steps in our meeting.",
  },
  {
    id: "analytics",
    label: "Share Analytics",
    text: "I'm sharing the latest analytics report with you. Please review before our session.",
  },
  {
    id: "quick",
    label: "Quick Reply",
    text: "Thanks for reaching out! I'll get back to you shortly.",
  },
];

const defaultThread: ChatMessage[] = [
  { id: "d1", type: "system", text: "TODAY" },
  {
    id: "m1",
    type: "text",
    sender: "student",
    text: "Hello! I've finished reviewing the analytics you sent over. The enrollment trends look very promising for the CS department.",
    time: "9:12 AM",
  },
  {
    id: "m2",
    type: "text",
    sender: "mentor",
    text: "That's great to hear, Sarah. I'm glad the data was helpful. Did you have any questions about the mid-term projections?",
    time: "9:15 AM",
    read: true,
  },
  {
    id: "sys1",
    type: "system",
    text: "System: Sarah Williams shared a new file.",
  },
  {
    id: "f1",
    type: "file",
    sender: "student",
    fileName: "AI_Enrollment_Trends.pdf",
    fileSize: "2.4 MB",
    time: "9:18 AM",
  },
  {
    id: "m3",
    type: "text",
    sender: "mentor",
    text: "I've downloaded the PDF. I'll review it before our research review tomorrow.",
    time: "9:22 AM",
    read: true,
  },
];

export const chatThreads: Record<string, ChatMessage[]> = {
  "8": defaultThread,
  "1": [
    { id: "d1", type: "system", text: "TODAY" },
    {
      id: "m1",
      type: "text",
      sender: "student",
      text: "Can we reschedule our session to Thursday afternoon?",
      time: "10:30 AM",
    },
    {
      id: "m2",
      type: "text",
      sender: "mentor",
      text: "Thursday at 2 PM works for me. I'll send a calendar invite.",
      time: "10:45 AM",
      read: true,
    },
  ],
  "4": [
    { id: "d1", type: "system", text: "TODAY" },
    {
      id: "m1",
      type: "text",
      sender: "student",
      text: "I'm struggling with the operating systems assignment. Any tips?",
      time: "8:50 AM",
    },
  ],
  "7": [
    { id: "d1", type: "system", text: "YESTERDAY" },
    {
      id: "m1",
      type: "text",
      sender: "mentor",
      text: "Great progress on the lab work this week. Keep it up!",
      time: "4:15 PM",
      read: true,
    },
  ],
  "9": [
    { id: "d1", type: "system", text: "MON" },
    {
      id: "m1",
      type: "text",
      sender: "student",
      text: "Submitted the revised project draft.",
      time: "11:00 AM",
    },
  ],
  "6": [
    { id: "d1", type: "system", text: "MON" },
    {
      id: "m1",
      type: "text",
      sender: "student",
      text: "Thank you for the feedback!",
      time: "2:30 PM",
    },
  ],
};

export const chatConversations: ChatConversation[] = [
  {
    studentId: "8",
    name: "Sarah Williams",
    preview: "The analytics report looks great...",
    timestamp: "Just now",
    status: "online",
    majorLabel: "COMPUTER SCIENCE · YEAR 1",
  },
  {
    studentId: "1",
    name: "Alex Johnson",
    preview: "Can we reschedule our session?",
    timestamp: "10:45 AM",
    status: "online",
    majorLabel: "COMPUTER SCIENCE · YEAR 2",
  },
  {
    studentId: "4",
    name: "Marcus Wright",
    preview: "I'm stuck on the OS assignment...",
    timestamp: "10:12 AM",
    unreadCount: 2,
    status: "offline",
    majorLabel: "COMPUTER SCIENCE · YEAR 1",
  },
  {
    studentId: "7",
    name: "Karim Nabil",
    preview: "Great progress on the lab work...",
    timestamp: "Yesterday",
    status: "offline",
    majorLabel: "COMPUTER SCIENCE · YEAR 2",
  },
  {
    studentId: "9",
    name: "Ahmed Ali",
    preview: "Submitted the revised project draft.",
    timestamp: "Mon",
    status: "offline",
    majorLabel: "COMPUTER SCIENCE · YEAR 2",
  },
  {
    studentId: "6",
    name: "Isabella Garcia",
    preview: "Thank you for the feedback!",
    timestamp: "Mon",
    status: "offline",
    majorLabel: "COMPUTER SCIENCE · YEAR 3",
  },
];

export const recentFilesByStudent: Record<string, ChatRecentFile[]> = {
  "8": [
    {
      id: "rf1",
      name: "AI_Enrollment_Trends.pdf",
      type: "pdf",
      sharedAt: "Today, 9:18 AM",
    },
    {
      id: "rf2",
      name: "Midterm_Project_Brief.docx",
      type: "doc",
      sharedAt: "Yesterday",
    },
    {
      id: "rf3",
      name: "Attendance_Summary_Q1.xlsx",
      type: "sheet",
      sharedAt: "Jan 10",
    },
  ],
};

export const upcomingSessionByStudent: Record<string, ChatUpcomingSession> = {
  "8": {
    title: "Weekly Research Review",
    scheduledAt: "Tomorrow at 2:00 PM",
    meetingLink: "https://meet.google.com/mentor-research-review",
  },
  "1": {
    title: "1:1 Mentoring Check-in",
    scheduledAt: "Thursday at 2:00 PM",
    meetingLink: "https://meet.google.com/mentor-checkin",
  },
};

export const defaultActiveStudentId = "8";

/** @deprecated Legacy shape for useChat fallback */
export const mockChatData = {
  student: {
    id: 8,
    studentId: "202408",
    name: "Sarah Williams",
    major: "Computer Science",
    year: "Senior",
    gpa: 3.9,
    attendanceRate: 92,
    risk: false,
  },
  conversations: chatConversations.map((c) => ({
    id: c.studentId,
    name: c.name,
    message: c.preview,
    active: c.studentId === defaultActiveStudentId,
  })),
  messages: [],
};
