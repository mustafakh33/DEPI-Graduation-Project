import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import ChatMessageList from "../components/chat/ChatMessageList";
import ChatSidebar from "../components/chat/ChatSidebar";
import EmptyChatState from "../components/chat/EmptyChatState";
import { useStudentChatRoom } from "../hooks/useStudentChatRoom";

const emojis = ["😀", "😂", "👏", "🔥", "💪", "✅", "📚", "💙", "❤️", "✨"];

const Chat = () => {
  const chat = useStudentChatRoom();

  return (
    <main className="h-[calc(100vh-96px)] overflow-hidden text-white">
      <section className="grid h-full overflow-hidden rounded-[28px] border border-slate-800 bg-[#0f172a] shadow-2xl lg:grid-cols-[340px_1fr]">
        <ChatSidebar
          contacts={chat.filteredContacts}
          selectedContactId={chat.selectedContactId}
          searchValue={chat.searchValue}
          onSearchChange={chat.setSearchValue}
          onSelectContact={chat.handleSelectContact}
        />

        <section className="flex min-h-0 flex-col bg-[#111827]">
          {chat.selectedContact ? (
            <>
              <ChatHeader contact={chat.selectedContact} />

              <ChatMessageList
                messages={chat.selectedMessages}
                messagesEndRef={chat.messagesEndRef}
              />

              <ChatInput
                newMessage={chat.newMessage}
                emojis={emojis}
                showEmojiPicker={chat.showEmojiPicker}
                fileInputRef={chat.fileInputRef}
                onMessageChange={chat.setNewMessage}
                onSendMessage={chat.handleSendMessage}
                onToggleEmojiPicker={chat.toggleEmojiPicker}
                onEmojiClick={chat.handleEmojiClick}
                onAttachFile={chat.handleAttachFile}
                onFileChange={chat.handleFileChange}
              />
            </>
          ) : (
            <EmptyChatState />
          )}
        </section>
      </section>
    </main>
  );
};

export default Chat;