import type { AssignmentStatus, StudentAssignment } from "../../types/student.types";

interface AssignmentCardProps {
  assignment: StudentAssignment;
}

type AssignmentDisplayStatus = AssignmentStatus | "missed";

const isDeadlinePassed = (deadline: string) => {
  return new Date().getTime() >= new Date(deadline).getTime();
};

const getDisplayStatus = (
  assignment: StudentAssignment
): AssignmentDisplayStatus => {
  if (assignment.status === "submitted" || assignment.status === "graded") {
    return assignment.status;
  }

  if (isDeadlinePassed(assignment.deadline)) {
    return "missed";
  }

  return "open";
};

const getAssignmentStyle = (status: AssignmentDisplayStatus) => {
  if (status === "submitted" || status === "graded") {
    return {
      border: "border-emerald-500/40",
      badge: "bg-emerald-500/10 text-emerald-400",
      button: "border-emerald-500 text-emerald-400 hover:bg-emerald-500/10",
      label: status === "graded" ? "Graded" : "Submitted",
    };
  }

  if (status === "missed") {
    return {
      border: "border-red-500/40",
      badge: "bg-red-500/10 text-red-400",
      button: "border-red-500 text-red-400 hover:bg-red-500/10",
      label: "Deadline Passed",
    };
  }

  return {
    border: "border-blue-500/40",
    badge: "bg-blue-500/10 text-blue-400",
    button: "border-blue-500 text-blue-400 hover:bg-blue-500/10",
    label: "Open",
  };
};

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getGradeText = (
  assignment: StudentAssignment,
  status: AssignmentDisplayStatus
) => {
  if (status === "missed") {
    return `Grade: 0/${assignment.totalGrade}`;
  }

  if (status === "open") {
    return "Grade: Not available yet";
  }

  if (status === "submitted") {
    return "Grade: Pending";
  }

  if (assignment.grade !== undefined) {
    return `Grade: ${assignment.grade}/${assignment.totalGrade}`;
  }

  return "Grade: Pending";
};

const getGradeColor = (status: AssignmentDisplayStatus) => {
  if (status === "missed") {
    return "text-red-400";
  }

  if (status === "open") {
    return "text-blue-400";
  }

  return "text-emerald-400";
};

const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
  const displayStatus = getDisplayStatus(assignment);
  const style = getAssignmentStyle(displayStatus);
  const gradeText = getGradeText(assignment, displayStatus);
  const gradeColor = getGradeColor(displayStatus);

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-[#111827] p-5 shadow-sm ${style.border}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Assignment {assignment.assignmentNumber}
          </p>

          <h3 className="mt-2 text-xl font-bold text-white">
            {assignment.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {assignment.description}
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Related lesson:{" "}
            <span className="font-semibold text-slate-300">
              {assignment.lessonTitle}
            </span>
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
        >
          {style.label}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-400 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Published
          </p>
          <p className="mt-1 font-semibold text-slate-200">
            {formatDateTime(assignment.publishedAt)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Deadline
          </p>
          <p className="mt-1 font-semibold text-slate-200">
            {formatDateTime(assignment.deadline)}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-5">
        <p className={`mb-3 text-sm font-semibold ${gradeColor}`}>
          {gradeText}
        </p>

        <button
          type="button"
          onClick={() => {
            window.location.href = assignment.assignmentPath;
          }}
          className={`inline-flex w-full items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${style.button}`}
        >
          Open Assignment
        </button>
      </div>
    </article>
  );
};

export default AssignmentCard;