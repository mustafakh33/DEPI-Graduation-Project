import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, MessageCircle } from "lucide-react";
import { useLessonDetails } from "@/features/student/hooks/useLessonDetails";

const LessonDetails = () => {
  const { lessonId } = useParams();
  const lesson = useLessonDetails(lessonId);

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <Link
          to="/student/roadmap"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to Roadmap
        </Link>

        <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Lesson
              </p>

              <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                {lesson.description}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-lg">
              <video
                src={lesson.videoUrl}
                controls
                className="aspect-video w-full bg-black"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#101827] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Material
              </p>

              <div className="mt-3 flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-white">
                    {lesson.material.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {lesson.material.description}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {lesson.material.fileName}
                  </p>
                </div>

                <a
                  href={lesson.material.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  <Download className="size-4" />
                  Open PDF
                </a>
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:pt-[92px]">
            <SupportCard
              name={lesson.instructor.name}
              role="Instructor"
              avatarUrl={lesson.instructor.avatarUrl}
              chatPath={lesson.instructor.chatPath}
            />

            <SupportCard
              name={lesson.mentor.name}
              role="Mentor"
              avatarUrl={lesson.mentor.avatarUrl}
              chatPath={lesson.mentor.chatPath}
            />
          </aside>
        </div>
      </section>
    </main>
  );
};

interface SupportCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
  chatPath: string;
}

const SupportCard = ({ name, role, avatarUrl, chatPath }: SupportCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#101827] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
        {role}
      </p>

      <div className="mt-4 flex items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${name} avatar`}
            className="size-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold uppercase text-white">
            {name.slice(0, 1)}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>

      <Link
        to={chatPath}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/10 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-600 hover:text-white"
      >
        <MessageCircle className="size-4" />
        Chat with {role}
      </Link>
    </div>
  );
};

export default LessonDetails;