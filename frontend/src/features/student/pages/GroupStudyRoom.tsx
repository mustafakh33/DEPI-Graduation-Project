import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import GroupStudyChatPanel from "../components/group-study/GroupStudyChatPanel";
import GroupStudyMembersPanel from "../components/group-study/GroupStudyMembersPanel";
import { useGroupStudyChat } from "../hooks/useGroupStudyChat";
import { useGroupStudyRoom } from "../hooks/useGroupStudyRoom";

const emojis = ["😀", "😂", "👏", "🔥", "💪", "✅", "📚", "💙"];

const GroupStudyRoom = () => {
  const room = useGroupStudyRoom();

  const currentStudent = room.currentStudent;

  const leader = currentStudent.isLeader
    ? currentStudent
    : room.members.find((member) => member.isLeader);

  const isCurrentStudentLeader = Boolean(currentStudent.isLeader);

  const chat = useGroupStudyChat({
    defaultMessages: room.messages,
    currentStudent,
    meetUrl: room.meetUrl,
    isCurrentStudentLeader,
  });

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
          <GroupStudyMembersPanel
            trackTitle={room.trackTitle}
            groupName={room.groupName}
            members={room.members}
            leader={leader}
            isCurrentStudentLeader={isCurrentStudentLeader}
            onOpenMeet={chat.handleOpenMeet}
          />

          <GroupStudyChatPanel
            messages={chat.messages}
            message={chat.message}
            emojis={emojis}
            showEmojiPicker={chat.showEmojiPicker}
            fileInputRef={chat.fileInputRef}
            messagesEndRef={chat.messagesEndRef}
            onMessageChange={chat.setMessage}
            onSendMessage={chat.handleSendMessage}
            onToggleEmojiPicker={chat.toggleEmojiPicker}
            onEmojiClick={chat.handleEmojiClick}
            onAttachFile={chat.handleAttachFile}
            onFileChange={chat.handleFileChange}
          />
        </div>
      </section>
    </main>
  );
};

export default GroupStudyRoom;