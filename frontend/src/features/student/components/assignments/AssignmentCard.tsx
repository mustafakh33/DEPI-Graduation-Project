import { useMemo, useState } from "react";
import { Download, Eye, FileText, Upload, X } from "lucide-react";
import type {
  AssignmentStatus,
  StudentAssignment,
} from "../../types/student.types";

interface AssignmentCardProps {
  assignment: StudentAssignment;
}

type AssignmentDisplayStatus = AssignmentStatus | "missed";

const ASSIGNMENT_PDF_URL = "/materials/UNI-HUP.pdf";
const SUBMITTED_ANSWER_PDF_URL = "/materials/UNI-HUP.pdf";

const isDeadlinePassed = (deadline: string) => {
  return new Date().getTime() >= new Date(deadline).getTime();
};

const getDisplayStatus = (
  assignment: StudentAssignment,
  isSubmittedLocally = false
): AssignmentDisplayStatus => {
  if (isSubmittedLocally) {
    return "submitted";
  }

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
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isSubmittedLocally, setIsSubmittedLocally] = useState(false);

  const displayStatus = getDisplayStatus(assignment, isSubmittedLocally);
  const style = getAssignmentStyle(displayStatus);
  const gradeText = getGradeText(assignment, displayStatus);
  const gradeColor = getGradeColor(displayStatus);

  const canSubmit = displayStatus === "open";
  const hasSubmittedAnswer =
    displayStatus === "submitted" || displayStatus === "graded";

  const modalTitle = useMemo(() => {
    if (displayStatus === "missed") {
      return "Deadline passed";
    }

    if (hasSubmittedAnswer) {
      return "Submitted assignment";
    }

    return "Open assignment";
  }, [displayStatus, hasSubmittedAnswer]);

  const handleSubmitAssignment = () => {
    if (!uploadedFileName) {
      return;
    }

    setIsSubmittedLocally(true);
  };

  return (
    <>
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
            onClick={() => setIsAssignmentOpen(true)}
            className={`inline-flex w-full items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${style.button}`}
          >
            Open Assignment
          </button>
        </div>
      </article>

      {isAssignmentOpen ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-slate-800 bg-[#0f172a] text-white shadow-2xl">
            <div className="shrink-0 border-b border-slate-800 px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                    Assignment {assignment.assignmentNumber}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-white">
                    {assignment.title}
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    {modalTitle}. Related lesson:{" "}
                    <span className="font-semibold text-slate-200">
                      {assignment.lessonTitle}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAssignmentOpen(false)}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close assignment"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <section className="rounded-2xl border border-slate-800 bg-[#111827] p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600/15 text-blue-300">
                        <FileText className="size-5" />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-white">
                          Assignment File
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          View or download the assignment PDF.
                        </p>
                      </div>
                    </div>

                    <a
                      href={ASSIGNMENT_PDF_URL}
                      download
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-500 px-3 py-2 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/10"
                    >
                      <Download className="size-4" />
                      Download
                    </a>
                  </div>

                  <div className="h-[420px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                    <iframe
                      src={ASSIGNMENT_PDF_URL}
                      title={`${assignment.title} PDF`}
                      className="h-full w-full"
                    />
                  </div>
                </section>

                <aside className="space-y-4">
                  <section className="rounded-2xl border border-slate-800 bg-[#111827] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                      Assignment Status
                    </p>

                    <div className="mt-4 space-y-3 text-sm">
                      <InfoRow label="Status" value={style.label} />
                      <InfoRow
                        label="Deadline"
                        value={formatDateTime(assignment.deadline)}
                      />
                      <InfoRow label="Grade" value={gradeText.replace("Grade: ", "")} />
                    </div>
                  </section>

                  {canSubmit ? (
                    <section className="rounded-2xl border border-blue-500/40 bg-blue-500/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/15 text-blue-300">
                          <Upload className="size-5" />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-white">
                            Submit your answer
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            Upload your PDF answer before the deadline, then
                            submit the assignment.
                          </p>
                        </div>
                      </div>

                      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-blue-500/50 bg-slate-950/40 px-4 py-6 text-center transition hover:bg-blue-500/10">
                        <Upload className="size-7 text-blue-300" />

                        <span className="mt-3 text-sm font-semibold text-white">
                          {uploadedFileName || "Upload PDF answer"}
                        </span>

                        <span className="mt-1 text-xs text-slate-400">
                          PDF file from your device
                        </span>

                        <input
                          type="file"
                          accept="application/pdf,.pdf"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            setUploadedFileName(file?.name ?? "");
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={handleSubmitAssignment}
                        disabled={!uploadedFileName}
                        className={`mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                          uploadedFileName
                            ? "bg-blue-600 text-white hover:bg-blue-500"
                            : "cursor-not-allowed bg-slate-700 text-slate-400"
                        }`}
                      >
                        Submit Assignment
                      </button>
                    </section>
                  ) : null}

                  {hasSubmittedAnswer ? (
                    <section className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                          <FileText className="size-5" />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-white">
                            Submitted Answer
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            This is a mock submitted PDF answer until backend
                            submission is connected.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <a
                          href={SUBMITTED_ANSWER_PDF_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
                        >
                          <Eye className="size-4" />
                          View Answer
                        </a>

                        <a
                          href={SUBMITTED_ANSWER_PDF_URL}
                          download
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
                        >
                          <Download className="size-4" />
                          Download
                        </a>
                      </div>
                    </section>
                  ) : null}

                  {displayStatus === "missed" ? (
                    <section className="rounded-2xl border border-red-500/40 bg-red-500/5 p-4">
                      <h3 className="text-sm font-bold text-red-300">
                        Submission closed
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        The deadline has passed. You can still view and download
                        the assignment file, but you cannot upload or submit an
                        answer.
                      </p>
                    </section>
                  ) : null}
                </aside>
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-800 px-6 py-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAssignmentOpen(false)}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl bg-slate-950/40 px-3 py-2">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-right text-xs font-semibold text-slate-200">
        {value}
      </span>
    </div>
  );
};

export default AssignmentCard;