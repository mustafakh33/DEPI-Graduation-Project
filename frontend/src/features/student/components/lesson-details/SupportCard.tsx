import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { StudentSupportPerson } from "../../types/student.types";

interface SupportCardProps {
  person: StudentSupportPerson;
}

const roleLabels = {
  instructor: "Instructor",
  mentor: "Mentor",
};

const SupportCard = ({ person }: SupportCardProps) => {
  const roleLabel = roleLabels[person.role];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#101827] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
        {roleLabel}
      </p>

      <div className="mt-4 flex items-center gap-3">
        {person.avatarUrl ? (
          <img
            src={person.avatarUrl}
            alt={`${person.name} avatar`}
            className="size-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold uppercase text-white">
            {person.name.slice(0, 1)}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-white">{person.name}</h3>
          <p className="text-xs text-slate-400">{roleLabel}</p>
        </div>
      </div>

      <Link
        to={person.chatPath}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/10 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-600 hover:text-white"
      >
        <MessageCircle className="size-4" />
        Chat with {roleLabel}
      </Link>
    </div>
  );
};

export default SupportCard;