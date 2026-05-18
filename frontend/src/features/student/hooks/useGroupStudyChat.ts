import { useEffect, useRef, useState } from "react";
import type { GroupStudyMessage, GroupStudyMember } from "../types/student.types";

const GROUP_CHAT_STORAGE_KEY = "group-study-room-chat-messages";

const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getSavedMessages = (
  defaultMessages: GroupStudyMessage[]
): GroupStudyMessage[] => {
  const savedMessages = localStorage.getItem(GROUP_CHAT_STORAGE_KEY);

  if (!savedMessages) {
    return defaultMessages;
  }

  try {
    return JSON.parse(savedMessages) as GroupStudyMessage[];
  } catch {
    return defaultMessages;
  }
};

interface UseGroupStudyChatParams {
  defaultMessages: GroupStudyMessage[];
  currentStudent: GroupStudyMember;
  meetUrl: string;
  isCurrentStudentLeader: boolean;
}

export const useGroupStudyChat = ({
  defaultMessages,
  currentStudent,
  meetUrl,
  isCurrentStudentLeader,
}: UseGroupStudyChatParams) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<GroupStudyMessage[]>(() =>
    getSavedMessages(defaultMessages)
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    localStorage.setItem(GROUP_CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOpenMeet = () => {
    if (!isCurrentStudentLeader) {
      return;
    }

    window.open(meetUrl, "_blank", "noopener,noreferrer");

    const meetMessage: GroupStudyMessage = {
      id: `message-${Date.now()}`,
      senderId: currentStudent.id,
      senderName: currentStudent.name,
      senderAvatarUrl: currentStudent.avatarUrl,
      content: `I created the study meeting. Join here: ${meetUrl}`,
      sentAt: getCurrentTime(),
      isCurrentStudent: true,
    };

    setMessages((prev) => [...prev, meetMessage]);
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage: GroupStudyMessage = {
      id: `message-${Date.now()}`,
      senderId: currentStudent.id,
      senderName: currentStudent.name,
      senderAvatarUrl: currentStudent.avatarUrl,
      content: trimmedMessage,
      sentAt: getCurrentTime(),
      isCurrentStudent: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => `${prev}${emoji}`);
    setShowEmojiPicker(false);
  };

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const fileMessage: GroupStudyMessage = {
      id: `message-${Date.now()}`,
      senderId: currentStudent.id,
      senderName: currentStudent.name,
      senderAvatarUrl: currentStudent.avatarUrl,
      content: `📎 Shared file: ${selectedFile.name}`,
      sentAt: getCurrentTime(),
      isCurrentStudent: true,
    };

    setMessages((prev) => [...prev, fileMessage]);
    event.target.value = "";
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  return {
    message,
    messages,
    showEmojiPicker,
    fileInputRef,
    messagesEndRef,
    setMessage,
    handleOpenMeet,
    handleSendMessage,
    handleEmojiClick,
    handleAttachFile,
    handleFileChange,
    toggleEmojiPicker,
  };
};