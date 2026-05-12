import { useParams } from "react-router-dom";
import { mockChatData } from "../data/mockChatData";

export const useChat = () => {
  const { studentId } = useParams();

  const student = mockChatData.student;

  const conversations = mockChatData.conversations;

  const messages = mockChatData.messages;

  return {
    studentId,
    student,
    conversations,
    messages,
  };
};