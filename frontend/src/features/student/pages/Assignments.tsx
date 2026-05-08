import { useMemo, useState } from "react";
import AssignmentCard from "../components/assignments/AssignmentCard";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import { useAssignments } from "../hooks/useAssignments";

type SortOrder = "newest" | "oldest";

const Assignments = () => {
  const assignments = useAssignments();
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const sortedAssignments = useMemo(() => {
    return [...assignments].sort((firstAssignment, secondAssignment) => {
      const firstDate = new Date(firstAssignment.publishedAt).getTime();
      const secondDate = new Date(secondAssignment.publishedAt).getTime();

      return sortOrder === "newest"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });
  }, [assignments, sortOrder]);

  return (
    <StudentPageContainer>
      <div className="space-y-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Assignments
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              Track Assignments
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              View your assignments, deadlines, submission status, and grades.
            </p>
          </div>

          <div className="flex rounded-xl border border-slate-800 bg-[#111827] p-1">
            <button
              type="button"
              onClick={() => setSortOrder("newest")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                sortOrder === "newest"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Newest
            </button>

            <button
              type="button"
              onClick={() => setSortOrder("oldest")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                sortOrder === "oldest"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Oldest
            </button>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          {sortedAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </section>
      </div>
    </StudentPageContainer>
  );
};

export default Assignments;