import { Link } from "react-router-dom";
import { ArrowLeft, Users, UserRound } from "lucide-react";

const StudyClub = () => {
  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <Link
          to="/student/roadmap"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to Roadmap
        </Link>

        <div className="flex flex-1 flex-col items-center justify-center py-10">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              Study Club
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white">
              How do you want to study today?
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Choose whether you want to focus alone or join your track group
              and study together with your classmates.
            </p>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-2">
            <Link
              to="/student/solo-focus"
              className="group rounded-[28px] border border-slate-800 bg-[#101827] p-8 transition hover:-translate-y-1 hover:border-blue-500/60 hover:bg-[#13213a]"
            >
              <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                <UserRound className="size-8" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-white">
                Study Alone
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter a private focus room, set your study time, and track your
                progress without distractions.
              </p>

              <div className="mt-8 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-blue-500">
                Start Solo Study
              </div>
            </Link>

            <Link
              to="/student/study-room/group"
              className="group rounded-[28px] border border-slate-800 bg-[#101827] p-8 transition hover:-translate-y-1 hover:border-blue-500/60 hover:bg-[#13213a]"
            >
              <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                <Users className="size-8" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-white">
                Study with Your Group
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Join your track group room, study with classmates, and keep your
                learning streak active together.
              </p>

              <div className="mt-8 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-blue-500">
                Join Group Study
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StudyClub;