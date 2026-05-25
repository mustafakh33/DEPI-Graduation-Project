/**
 * Chat — `/mentor/chat/:studentId`
 *
 * Three-column layout: sidebar, thread, student info panel. Notes persist in localStorage.
 *
 * @see ../README.md#section-chat
 */
import { useChat } from "../hooks/useChat";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";
import StudentInfoPanel from "../components/chat/StudentInfoPanel";
import "../style/Chat.css";

export default function ChatPage() {
  const {
    activeStudentId,
    student,
    conversations,
    conversationSearch,
    setConversationSearch,
    messages,
    draft,
    setDraft,
    sendMessage,
    quickReplies,
    applyQuickReply,
    selectConversation,
    privateNote,
    setPrivateNote,
    savePrivateNote,
    isNoteDirty,
    noteSaveFeedback,
    attachFile,
    recentFiles,
    upcomingSession,
    joinSession,
    scheduleMeeting,
    downloadFile,
    getUnreadCount,
  } = useChat();

  return (
    <div className="chat-page">
      <ChatSidebar
        conversations={conversations}
        activeStudentId={activeStudentId}
        search={conversationSearch}
        onSearchChange={setConversationSearch}
        onSelect={selectConversation}
        getUnreadCount={getUnreadCount}
      />

      <section className="chat-thread">
        <ChatHeader
          name={student.name}
          majorLabel={student.majorLabel}
          isOnline={student.isOnline}
          onScheduleMeeting={scheduleMeeting}
        />

        <div className="chat-thread__messages">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              studentName={student.name}
              onDownloadFile={downloadFile}
            />
          ))}
        </div>

        <MessageInput
          studentName={student.name}
          draft={draft}
          onDraftChange={setDraft}
          onSend={sendMessage}
          onAttachFile={attachFile}
          quickReplies={quickReplies}
          onQuickReply={applyQuickReply}
        />
      </section>

      <StudentInfoPanel
        name={student.name}
        studentId={student.studentId}
        year={student.year}
        gpa={student.gpa}
        recentFiles={recentFiles}
        upcomingSession={upcomingSession}
        privateNote={privateNote}
        onNoteChange={setPrivateNote}
        onSaveNote={savePrivateNote}
        isNoteDirty={isNoteDirty}
        noteSaveFeedback={noteSaveFeedback}
        onJoinSession={joinSession}
        onDownloadFile={downloadFile}
      />
    </div>
  );
}
