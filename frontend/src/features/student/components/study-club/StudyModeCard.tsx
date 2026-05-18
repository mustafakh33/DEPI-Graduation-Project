import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface StudyModeCardProps {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel: string;
}

const StudyModeCard = ({
  to,
  icon,
  title,
  description,
  actionLabel,
}: StudyModeCardProps) => {
  return (
    <Link
      to={to}
      className="group rounded-[28px] border border-slate-800 bg-[#101827] p-8 transition hover:-translate-y-1 hover:border-blue-500/60 hover:bg-[#13213a]"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">{title}</h2>

      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>

      <div className="mt-8 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-blue-500">
        {actionLabel}
      </div>
    </Link>
  );
};

export default StudyModeCard;