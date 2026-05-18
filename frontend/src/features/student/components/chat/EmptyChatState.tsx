import { MessageCircle } from "lucide-react";

const EmptyChatState = () => {
  return (
    <div className="flex flex-1 items-center justify-center p-6 text-center">
      <div>
        <MessageCircle className="mx-auto size-12 text-slate-600" />

        <p className="mt-4 text-lg font-bold text-white">Select a chat</p>

        <p className="mt-2 text-sm text-slate-400">
          Choose a contact from the left side to start messaging.
        </p>
      </div>
    </div>
  );
};

export default EmptyChatState;