import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Video,
  Crown,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { CURRENT_STUDENT_CHAT_ID, useStudentChat } from "../hooks/useStudentChat";
import type {
  StudentChatContact,
  StudentChatMessage,
} from "../types/student.types";

const CHAT_MESSAGES_STORAGE_KEY = "student-chat-messages";
const CHAT_CONTACTS_STORAGE_KEY = "student-chat-contacts";

const emojis = ["😀", "😂", "👏", "🔥", "💪", "✅", "📚", "💙", "❤️", "✨"];

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

const Chat = () => {
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

  const getRoleLabel = (role: StudentChatContact["role"]) => {
    if (role === "instructor") return "Instructor";
    if (role === "mentor") return "Mentor";
    return "Student";
  };

  return (
    <main className="h-[calc(100vh-96px)] overflow-hidden text-white">
      <section className="grid h-full overflow-hidden rounded-[28px] border border-slate-800 bg-[#0f172a] shadow-2xl lg:grid-cols-[340px_1fr]">
        <aside className="flex min-h-0 flex-col border-r border-slate-800 bg-[#0b1120]">
          <div className="shrink-0 border-b border-slate-800 p-5">
            <div className="flex items-center gap-2">
              <MessageCircle className="size-5 text-blue-400" />

              <div>
                <h1 className="text-xl font-bold text-white">Chat</h1>
                <p className="mt-1 text-xs text-slate-400">
                  Instructor, mentor, and your group members.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#111827] px-3 py-2">
              <Search className="size-4 text-slate-500" />

              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search chats..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {filteredContacts.map((contact) => {
              const isSelected = contact.id === selectedContact?.id;

              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => handleSelectContact(contact.id)}
                  className={`mb-2 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                    isSelected
                      ? "bg-blue-600/20"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={contact.avatarUrl}
                      alt={`${contact.name} avatar`}
                      className="size-12 rounded-2xl object-cover"
                    />

                    <span
                      className={`absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-[#0b1120] ${
                        contact.isOnline ? "bg-emerald-400" : "bg-red-500"
                      }`}
                    />

                    {contact.isGroupLeader ? (
                      <span className="absolute -left-2 -top-2 flex size-5 items-center justify-center rounded-full bg-yellow-400 text-slate-950">
                        <Crown className="size-3" />
                      </span>
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-bold text-white">
                        {contact.name}
                      </p>

                      <span className="shrink-0 text-[10px] text-slate-500">
                        {contact.lastMessageAt}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-slate-400">
                        {contact.lastMessage}
                      </p>

                      {contact.unreadCount ? (
                        <span className="flex size-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                          {contact.unreadCount}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                      {getRoleLabel(contact.role)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="flex min-h-0 flex-col bg-[#111827]">
          {selectedContact ? (
            <>
              <div className="shrink-0 border-b border-slate-800 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={selectedContact.avatarUrl}
                        alt={`${selectedContact.name} avatar`}
                        className="size-12 rounded-2xl object-cover"
                      />

                      <span
                        className={`absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-[#111827] ${
                          selectedContact.isOnline
                            ? "bg-emerald-400"
                            : "bg-red-500"
                        }`}
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-base font-bold text-white">
                        {selectedContact.name}
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        {getRoleLabel(selectedContact.role)}
                        {selectedContact.isOnline ? " • Online" : " • Offline"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-blue-600 hover:text-white"
                      title="Voice call"
                    >
                      <Phone className="size-4" />
                    </button>

                    <button
                      type="button"
                      className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-blue-600 hover:text-white"
                      title="Video call"
                    >
                      <Video className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6">
                {selectedMessages.map((chatMessage) => (
                  <div
                    key={chatMessage.id}
                    className={`flex gap-3 ${
                      chatMessage.isCurrentStudent ? "justify-end" : ""
                    }`}
                  >
                    {!chatMessage.isCurrentStudent ? (
                      <img
                        src={chatMessage.senderAvatarUrl}
                        alt={`${chatMessage.senderName} avatar`}
                        className="size-8 rounded-full object-cover"
                      />
                    ) : null}

                    <div
                      className={`max-w-[65%] rounded-2xl px-4 py-3 ${
                        chatMessage.isCurrentStudent
                          ? "bg-blue-600 text-white"
                          : "bg-[#0f172a] text-slate-200"
                      }`}
                    >
                      <p className="break-words text-sm leading-6">
                        {chatMessage.content}
                      </p>

                      <p className="mt-2 text-right text-[10px] opacity-70">
                        {chatMessage.sentAt}
                      </p>
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>

              <div className="relative shrink-0 border-t border-slate-800 p-4">
                {showEmojiPicker ? (
                  <div className="absolute bottom-20 left-4 z-20 grid grid-cols-5 gap-2 rounded-2xl border border-slate-700 bg-[#0f172a] p-3 shadow-2xl">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleEmojiClick(emoji)}
                        className="flex size-9 items-center justify-center rounded-xl text-lg transition hover:bg-slate-800"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                ) : null}

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="flex items-center gap-2 rounded-2xl bg-[#0f172a] p-2">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="flex size-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Smile className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleAttachFile}
                    className="flex size-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Paperclip className="size-4" />
                  </button>

                  <input
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500"
                  />

                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6 text-center">
              <div>
                <MessageCircle className="mx-auto size-12 text-slate-600" />
                <p className="mt-4 text-lg font-bold text-white">
                  Select a chat
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Choose a contact from the left side to start messaging.
                </p>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default Chat;