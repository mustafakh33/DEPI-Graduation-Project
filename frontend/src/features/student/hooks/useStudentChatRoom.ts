import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CURRENT_STUDENT_CHAT_ID, useStudentChat } from "./useStudentChat";
import type {
  StudentChatContact,
  StudentChatMessage,
} from "../types/student.types";

const CHAT_MESSAGES_STORAGE_KEY = "student-chat-messages";
const CHAT_CONTACTS_STORAGE_KEY = "student-chat-contacts";

const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getSavedMessages = (
  defaultMessages: StudentChatMessage[]
): StudentChatMessage[] => {
  const savedMessages = localStorage.getItem(CHAT_MESSAGES_STORAGE_KEY);

  if (!savedMessages) {
    return defaultMessages;
  }

  try {
    return JSON.parse(savedMessages) as StudentChatMessage[];
  } catch {
    return defaultMessages;
  }
};

const getSavedContacts = (
  defaultContacts: StudentChatContact[]
): StudentChatContact[] => {
  const savedContacts = localStorage.getItem(CHAT_CONTACTS_STORAGE_KEY);

  if (!savedContacts) {
    return defaultContacts;
  }

  try {
    const parsedContacts = JSON.parse(savedContacts) as StudentChatContact[];

    return defaultContacts.map((contact) => {
      const savedContact = parsedContacts.find((item) => item.id === contact.id);

      return savedContact ? { ...contact, ...savedContact } : contact;
    });
  } catch {
    return defaultContacts;
  }
};

export const useStudentChatRoom = () => {
  const chatData = useStudentChat();
  const [searchParams, setSearchParams] = useSearchParams();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [contacts, setContacts] = useState<StudentChatContact[]>(() =>
    getSavedContacts(chatData.contacts)
  );

  const [messages, setMessages] = useState<StudentChatMessage[]>(() =>
    getSavedMessages(chatData.messages)
  );

  const initialContactId =
    searchParams.get("contactId") ?? contacts[0]?.id ?? "";

  const [selectedContactId, setSelectedContactId] =
    useState<string>(initialContactId);

  const [newMessage, setNewMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const selectedContact =
    contacts.find((contact) => contact.id === selectedContactId) ?? contacts[0];

  const selectedMessages = messages.filter(
    (message) => message.contactId === selectedContact?.id
  );

  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      const aTime = a.lastMessageAt ?? "";
      const bTime = b.lastMessageAt ?? "";

      return bTime.localeCompare(aTime);
    });

  useEffect(() => {
    localStorage.setItem(CHAT_MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(CHAT_CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedMessages.length, selectedContactId]);

  useEffect(() => {
    const contactIdFromUrl = searchParams.get("contactId");

    if (contactIdFromUrl) {
      setSelectedContactId(contactIdFromUrl);
    }
  }, [searchParams]);

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
    setSearchParams({ contactId });
  };

  const updateContactAfterMessage = (
    contactId: string,
    content: string,
    time: string
  ) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              lastMessage: content,
              lastMessageAt: time,
              unreadCount: 0,
            }
          : contact
      )
    );
  };

  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();

    if (!trimmedMessage || !selectedContact) {
      return;
    }

    const sentAt = getCurrentTime();

    const message: StudentChatMessage = {
      id: `message-${Date.now()}`,
      contactId: selectedContact.id,
      senderId: CURRENT_STUDENT_CHAT_ID,
      senderName: "You",
      senderAvatarUrl: "https://i.pravatar.cc/100?img=5",
      content: trimmedMessage,
      sentAt,
      type: "text",
      isCurrentStudent: true,
    };

    setMessages((prev) => [...prev, message]);
    updateContactAfterMessage(selectedContact.id, trimmedMessage, sentAt);
    setNewMessage("");
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage((prev) => `${prev}${emoji}`);
    setShowEmojiPicker(false);
  };

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile || !selectedContact) {
      return;
    }

    const sentAt = getCurrentTime();
    const content = `📎 Shared file: ${selectedFile.name}`;

    const fileMessage: StudentChatMessage = {
      id: `message-${Date.now()}`,
      contactId: selectedContact.id,
      senderId: CURRENT_STUDENT_CHAT_ID,
      senderName: "You",
      senderAvatarUrl: "https://i.pravatar.cc/100?img=5",
      content,
      sentAt,
      type: "file",
      isCurrentStudent: true,
    };

    setMessages((prev) => [...prev, fileMessage]);
    updateContactAfterMessage(selectedContact.id, content, sentAt);

    event.target.value = "";
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  return {
    filteredContacts,
    selectedContact,
    selectedMessages,
    selectedContactId,
    searchValue,
    newMessage,
    showEmojiPicker,
    fileInputRef,
    messagesEndRef,
    setSearchValue,
    setNewMessage,
    handleSelectContact,
    handleSendMessage,
    handleEmojiClick,
    handleAttachFile,
    handleFileChange,
    toggleEmojiPicker,
  };
};