import { Link } from "react-router";

const StudyClubCTA = () => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">
            Join the learning club
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Connect with other students in the same track and study together.
          </p>
        </div>

        <Link
          to="/student/study-club"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Join Club
        </Link>
      </div>
    </section>
  );
};

export default StudyClubCTA;