
import type { CurrentCourse } from "../../types/student.types";
import CourseProgressBar from "./CourseProgressBar";

interface CurrentCourseCardProps {
  course: CurrentCourse;
}

const CurrentCourseCard = ({ course }: CurrentCourseCardProps) => {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            &lt;/&gt;
          </div>

          <div className="flex-1">
            <span className="text-xs font-semibold uppercase text-muted-foreground">
              {course.status.replace("-", " ")}
            </span>

            <h2 className="mt-1 text-xl font-bold text-foreground">
              {course.title}
            </h2>
<CourseProgressBar progress={course.progress} />
          </div>
        </div>

      <button
  type="button"
  onClick={() => {
    window.location.href = course.lastLessonPath;
  }}
  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
>
  Continue Learning →
</button>
      </div>
    </section>
  );
};

export default CurrentCourseCard;