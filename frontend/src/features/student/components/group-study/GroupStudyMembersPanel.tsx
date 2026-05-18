import { Users, Video } from "lucide-react";
import type { GroupStudyMember } from "../../types/student.types";
import GroupStudyMemberCard from "./GroupStudyMemberCard";

interface GroupStudyMembersPanelProps {
  trackTitle: string;
  groupName: string;
  members: GroupStudyMember[];
  leader?: GroupStudyMember;
  isCurrentStudentLeader: boolean;
  onOpenMeet: () => void;
}

const GroupStudyMembersPanel = ({
  trackTitle,
  groupName,
  members,
  leader,
  isCurrentStudentLeader,
  onOpenMeet,
}: GroupStudyMembersPanelProps) => {
  return (
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
            {trackTitle} - {groupName}
          </h1>
        </div>
      </div>

      <div className="grid gap-4 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <GroupStudyMemberCard key={member.id} member={member} />
        ))}
      </div>

      <div className="mt-auto flex justify-center pt-6">
        <button
          type="button"
          onClick={onOpenMeet}
          disabled={!isCurrentStudentLeader}
          className={`inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm font-bold shadow-lg transition ${
            isCurrentStudentLeader
              ? "bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-500"
              : "cursor-not-allowed bg-slate-700 text-slate-400 shadow-none"
          }`}
        >
          <Video className="size-4" />
          {isCurrentStudentLeader ? "Enter Study Room" : "Waiting for Leader"}
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
  );
};

export default GroupStudyMembersPanel;