import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Crown,
  MessageCircle,
  Paperclip,
  Send,
  Smile,
  Users,
  Video,
} from "lucide-react";
import { useGroupStudyRoom } from "@/features/student/hooks/useGroupStudyRoom";
import type { GroupStudyMessage } from "@/features/student/types/student.types";

const GROUP_CHAT_STORAGE_KEY = "group-study-room-chat-messages";

const emojis = ["😀", "😂", "👏", "🔥", "💪", "✅", "📚", "💙"];

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

const GroupStudyRoom = () => {
  const room = useGroupStudyRoom();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const currentStudent = room.currentStudent;

  const leader = currentStudent.isLeader
    ? currentStudent
    : room.members.find((member) => member.isLeader);

  const isCurrentStudentLeader = Boolean(currentStudent.isLeader);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<GroupStudyMessage[]>(() =>
    getSavedMessages(room.messages)
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

    window.open(room.meetUrl, "_blank", "noopener,noreferrer");

    const meetMessage: GroupStudyMessage = {
      id: `message-${Date.now()}`,
      senderId: currentStudent.id,
      senderName: currentStudent.name,
      senderAvatarUrl: currentStudent.avatarUrl,
      content: `I created the study meeting. Join here: ${room.meetUrl}`,
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

  return (
    <main className="h-screen overflow-hidden bg-[#08090d] px-6 py-6 text-white">
      <section className="mx-auto flex h-[calc(100vh-48px)] max-w-7xl flex-col gap-4">
        <Link
          to="/student/study-club"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to Study Club
        </Link>

        <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[1fr_380px]">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-[28px] border border-slate-800 bg-[#0f172a] p-6 shadow-2xl">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-blue-400" />

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                    Study Club
                  </p>
                </div>

                <h1 className="mt-2 text-2xl font-bold text-white">
                  {room.trackTitle} - {room.groupName}
                </h1>
              </div>
            </div>

            <div className="grid gap-4 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
              {room.members.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-slate-800 bg-[#111827] p-4 transition hover:-translate-y-1 hover:border-blue-500/60"
                >
                  <div className="relative mx-auto size-20">
                    <img
                      src={member.avatarUrl}
                      alt={`${member.name} avatar`}
                      className="size-20 rounded-2xl object-cover"
                    />

                    <span
                      className={`absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-[#111827] ${
                        member.isOnline ? "bg-emerald-400" : "bg-red-500"
                      }`}
                      title={member.isOnline ? "Online" : "Offline"}
                    />

                    {member.isLeader ? (
                      <span
                        className="absolute -left-2 -top-2 flex size-7 items-center justify-center rounded-full bg-yellow-400 text-slate-950 shadow-lg"
                        title="Group leader"
                      >
                        <Crown className="size-4" />
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 text-center">
                    <h2 className="truncate text-sm font-bold text-white">
                      {member.name}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Rank #{member.rank}
                    </p>

                    {member.isLeader ? (
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-300">
                        Leader
                      </p>
                    ) : (
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Member
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/student/chat?contactId=${member.id}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600/15 px-4 py-2 text-xs font-bold text-blue-300 transition hover:bg-blue-600 hover:text-white"
                  >
                    <MessageCircle className="size-4" />
                    Chat
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-auto flex justify-center pt-6">
              <button
                type="button"
                onClick={handleOpenMeet}
                disabled={!isCurrentStudentLeader}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm font-bold shadow-lg transition ${
                  isCurrentStudentLeader
                    ? "bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-500"
                    : "cursor-not-allowed bg-slate-700 text-slate-400 shadow-none"
                }`}
              >
                <Video className="size-4" />
                {isCurrentStudentLeader
                  ? "Enter Study Room"
                  : "Waiting for Leader"}
              </button>
            </div>

            {leader ? (
              <p className="mt-3 text-center text-xs text-slate-400">
                {isCurrentStudentLeader
                  ? "You are the group leader. You can create the meeting and share it with your group."
                  : `${leader.name} is the group leader and will share the meeting link in chat.`}
              </p>
            ) : null}
          </div>

          <aside className="flex min-h-0 flex-col overflow-hidden rounded-[28px] border border-slate-800 bg-[#0f172a] shadow-2xl">
            <div className="shrink-0 border-b border-slate-800 p-5">
              <p className="text-sm font-bold text-white">Live Room Chat</p>

              <p className="mt-1 text-xs text-slate-400">
                Send messages, emojis, files, and share the meeting code here.
              </p>
            </div>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((chatMessage) => (
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
                    className={`max-w-[260px] rounded-2xl px-4 py-3 ${
                      chatMessage.isCurrentStudent
                        ? "bg-blue-600 text-white"
                        : "bg-[#111827] text-slate-200"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold">
                        {chatMessage.senderName}
                      </span>

                      <span className="text-[10px] opacity-70">
                        {chatMessage.sentAt}
                      </span>
                    </div>

                    <p className="break-words text-xs leading-5">
                      {chatMessage.content}
                    </p>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <div className="relative shrink-0 border-t border-slate-800 p-4">
              {showEmojiPicker ? (
                <div className="absolute bottom-20 left-4 z-20 grid grid-cols-4 gap-2 rounded-2xl border border-slate-700 bg-[#111827] p-3 shadow-2xl">
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

              <div className="flex items-center gap-2 rounded-2xl bg-[#111827] p-2">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="flex size-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <Smile className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={handleAttachFile}
                  className="flex size-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <Paperclip className="size-4" />
                </button>

                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
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
          </aside>
        </div>
      </section>
    </main>
  );
};

export default GroupStudyRoom;