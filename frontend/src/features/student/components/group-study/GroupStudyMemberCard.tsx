import { Crown, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { GroupStudyMember } from "../../types/student.types";

interface GroupStudyMemberCardProps {
  member: GroupStudyMember;
}

const GroupStudyMemberCard = ({ member }: GroupStudyMemberCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4 transition hover:-translate-y-1 hover:border-blue-500/60">
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

        <p className="mt-1 text-xs text-slate-400">Rank #{member.rank}</p>

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
  );
};

export default GroupStudyMemberCard;