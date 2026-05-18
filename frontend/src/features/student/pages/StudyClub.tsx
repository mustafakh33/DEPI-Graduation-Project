import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import StudyClubOptions from "../components/study-club/StudyClubOptions";

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

          <StudyClubOptions />
        </div>
      </section>
    </main>
  );
};

export default StudyClub;