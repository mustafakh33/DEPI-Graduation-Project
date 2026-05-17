import { Link } from "react-router";
import CourseNode from "../components/roadmap/CourseNode";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import { calculateRoadmapProgress, getRoadmapLessons, useRoadmap } from "../hooks/useRoadmap";

const Roadmap = () => {
  const roadmap = useRoadmap();
  const lessons = getRoadmapLessons(roadmap);
  const progressPercentage = calculateRoadmapProgress(roadmap);

  return (
    <StudentPageContainer>
      <div className="space-y-8">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Course Roadmap
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            {roadmap.trackTitle}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Follow your roadmap step by step. Lessons become available based on
            your instructor’s progress.
          </p>
        </section>

        <section className="rounded-[28px] border border-slate-800 bg-[#0f172a] p-6 shadow-sm md:p-8">
          <div className="mb-8 flex justify-end">
            <div className="w-full max-w-xs rounded-2xl border border-slate-800 bg-[#111827] p-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Current Progress</span>
                <span>{progressPercentage}%</span>
              </div>

              <div className="mt-3 h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-blue-500/70 md:block" />

            <div className="space-y-8">
              {lessons.map((lesson, index) => {
                const isLessonOpen =
                  lesson.status === "completed" || lesson.status === "active";

                if (isLessonOpen) {
                  return (
                    <Link
                      key={lesson.id}
                      to={`/student/lesson/${lesson.id}`}
                      className="block transition hover:scale-[1.01]"
                    >
                      <CourseNode lesson={lesson} index={index} />
                    </Link>
                  );
                }

                return (
                  <CourseNode
                    key={lesson.id}
                    lesson={lesson}
                    index={index}
                  />
                );
              })}

              <div className="relative flex justify-center pt-4">
                <div className="w-full max-w-[240px] rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-5 text-center opacity-80">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-2xl text-slate-300">
                    🔒
                  </div>

                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Locked
                  </p>

                  <h3 className="mt-2 text-sm font-semibold text-slate-200">
                    Final Project
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Unlocks at the end of the term after all roadmap lessons are
                    completed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Join the learning club
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Connect with other students in the same track and study
                together.
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
      </div>
    </StudentPageContainer>
  );
};

export default Roadmap;