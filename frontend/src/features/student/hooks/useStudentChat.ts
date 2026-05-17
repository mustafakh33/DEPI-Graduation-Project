import { useGroupStudyRoom } from "@/features/student/hooks/useGroupStudyRoom";
import { useLessonDetails } from "@/features/student/hooks/useLessonDetails";
import type {
  StudentChatContact,
  StudentChatData,
  StudentChatMessage,
} from "@/features/student/types/student.types";

export const CURRENT_STUDENT_CHAT_ID = "current-student";

const getInitialMessage = (
  contact: StudentChatContact
): StudentChatMessage => ({
  id: `message-${contact.id}-1`,
  contactId: contact.id,
  senderId: contact.id,
  senderName: contact.name,
  senderAvatarUrl: contact.avatarUrl,
  content:
    contact.role === "instructor"
      ? "Hello, you can ask me about lectures, materials, and assignments."
      : contact.role === "mentor"
        ? "Hi, I’m here to help you stay on track and solve any learning blockers."
        : "Hey, ready to study together?",
  sentAt: "10:30 AM",
  type: "text",
});

export const useStudentChat = (): StudentChatData => {
  const groupRoom = useGroupStudyRoom();
  const lessonDetails = useLessonDetails("chat-default-lesson");

  const instructorContact: StudentChatContact = {
    id: lessonDetails.instructor.id,
    name: lessonDetails.instructor.name,
    role: "instructor",
    avatarUrl:
      lessonDetails.instructor.avatarUrl ?? "https://i.pravatar.cc/100?img=33",
    isOnline: true,
    lastMessage: "Ask me anything about the lesson.",
    lastMessageAt: "10:30 AM",
  };

  const mentorContact: StudentChatContact = {
    id: lessonDetails.mentor.id,
    name: lessonDetails.mentor.name,
    role: "mentor",
    avatarUrl:
      lessonDetails.mentor.avatarUrl ?? "https://i.pravatar.cc/100?img=47",
    isOnline: true,
    lastMessage: "Let’s keep your progress consistent.",
    lastMessageAt: "10:25 AM",
  };

  const studentContacts: StudentChatContact[] = groupRoom.members
    .filter((member) => member.id !== groupRoom.currentStudent.id)
    .map((member) => ({
      id: member.id,
      name: member.name,
      role: "student",
      avatarUrl: member.avatarUrl,
      isOnline: member.isOnline,
      lastMessage: member.isLeader
        ? "I can organize the next study meeting."
        : "Let’s study together.",
      lastMessageAt: member.isLeader ? "10:20 AM" : "10:10 AM",
      isGroupLeader: member.isLeader,
    }));

  const contacts = [instructorContact, mentorContact, ...studentContacts];

  return {
    contacts,
    messages: contacts.map(getInitialMessage),
  };
};