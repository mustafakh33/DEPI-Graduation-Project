import type { RankedStudent } from "../../types/student.types";

interface CurrentStudentRankCardProps {
  currentStudent: RankedStudent;
  coinsToNextRank: number;
}

const CurrentStudentRankCard = ({
  currentStudent,
  coinsToNextRank,
}: CurrentStudentRankCardProps) => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <article className="rounded-2xl border border-blue-500/40 bg-blue-600 p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
          Current Rank
        </p>

        <h3 className="mt-2 text-3xl font-bold text-white">
          #{currentStudent.rank}
        </h3>

        <p className="mt-1 text-sm text-blue-100">Overall ranking</p>
      </article>

      <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Current Coins
        </p>

        <h3 className="mt-2 text-3xl font-bold text-yellow-400">
          🟠 {currentStudent.coins.toLocaleString()}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Coins collected so far
        </p>
      </article>

      <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          To Next Rank
        </p>

        <h3 className="mt-2 text-3xl font-bold text-white">
          {coinsToNextRank === 0
            ? "Top Rank"
            : `${coinsToNextRank.toLocaleString()} coins`}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Needed to move one rank higher
        </p>
      </article>
    </section>
  );
};

export default CurrentStudentRankCard;