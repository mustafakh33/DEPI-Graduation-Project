import { useState } from "react";
import { useParams } from "react-router-dom";
import BackToRoadmapLink from "../components/lesson-details/BackToRoadmapLink";
import LessonMaterialSection from "../components/lesson-details/LessonMaterialSection";
import LessonVideoSection from "../components/lesson-details/LessonVideoSection";
import SupportCard from "../components/lesson-details/SupportCard";
import { useLessonDetails } from "../hooks/useLessonDetails";

const LessonDetails = () => {
  const { lessonId } = useParams();
  const lesson = useLessonDetails(lessonId);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);

  const toggleMaterial = () => {
    setIsMaterialOpen((prev) => !prev);
  };

  const closeMaterial = () => {
    setIsMaterialOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <BackToRoadmapLink />

        <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <header>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Lesson
              </p>

              <h1 className="text-3xl font-bold text-white">
                {lesson.title}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                {lesson.description}
              </p>
            </header>

            <LessonVideoSection
              videoUrl={lesson.videoUrl}
              title={lesson.title}
            />

            <LessonMaterialSection
              material={lesson.material}
              isOpen={isMaterialOpen}
              onToggle={toggleMaterial}
              onClose={closeMaterial}
            />
          </div>

          <aside className="space-y-4 lg:pt-[92px]">
            <SupportCard person={lesson.instructor} />
            <SupportCard person={lesson.mentor} />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default LessonDetails;