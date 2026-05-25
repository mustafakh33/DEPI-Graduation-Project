export type ChatMessageSender = "student" | "mentor";

export interface ChatTextMessage {
  id: string;
  type: "text";
  sender: ChatMessageSender;
  text: string;
  time: string;
  read?: boolean;
}

export interface ChatFileMessage {
  id: string;
  type: "file";
  sender: ChatMessageSender;
  fileName: string;
  fileSize: string;
  time: string;
  downloadUrl?: string;
}

export interface ChatSystemMessage {
  id: string;
  type: "system";
  text: string;
}

export type ChatMessage =
  | ChatTextMessage
  | ChatFileMessage
  | ChatSystemMessage;

export interface ChatConversation {
  studentId: string;
  name: string;
  preview: string;
  timestamp: string;
  unreadCount?: number;
  status: "online" | "offline";
  majorLabel: string;
}

export interface ChatRecentFile {
  id: string;
  name: string;
  type: "pdf" | "doc" | "sheet";
  sharedAt: string;
}

export interface ChatUpcomingSession {
  title: string;
  scheduledAt: string;
  meetingLink: string;
}

export interface QuickReply {
  id: string;
  label: string;
  text: string;
}
