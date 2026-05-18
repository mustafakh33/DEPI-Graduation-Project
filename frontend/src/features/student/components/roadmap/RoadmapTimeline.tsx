import { Link } from "react-router";
import type { RoadmapLesson } from "../../types/student.types";
import CourseNode from "./CourseNode";
import FinalProjectNode from "./FinalProjectNode";
import RoadmapProgressCard from "./RoadmapProgressCard";

interface RoadmapTimelineProps {
  lessons: RoadmapLesson[];
  progressPercentage: number;
}

const RoadmapTimeline = ({
  lessons,
  progressPercentage,
}: RoadmapTimelineProps) => {
  return (
    <section className="rounded-[28px] border border-slate-800 bg-[#0f172a] p-6 shadow-sm md:p-8">
      <div className="mb-8 flex justify-end">
        <RoadmapProgressCard progressPercentage={progressPercentage} />
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
              <CourseNode key={lesson.id} lesson={lesson} index={index} />
            );
          })}

          <FinalProjectNode />
        </div>
      </div>
    </section>
  );
};

export default RoadmapTimeline;