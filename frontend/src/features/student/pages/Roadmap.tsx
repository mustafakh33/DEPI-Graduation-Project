import RoadmapTimeline from "../components/roadmap/RoadmapTimeline";
import StudyClubCTA from "../components/roadmap/StudyClubCTA";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import StudentPageHeader from "../components/shared/StudentPageHeader";
import {
  calculateRoadmapProgress,
  getRoadmapLessons,
  useRoadmap,
} from "../hooks/useRoadmap";

const Roadmap = () => {
  const roadmap = useRoadmap();
  const lessons = getRoadmapLessons(roadmap);
  const progressPercentage = calculateRoadmapProgress(roadmap);

  return (
    <StudentPageContainer>
      <div className="space-y-8">
        <StudentPageHeader
          eyebrow="Course Roadmap"
          title={roadmap.trackTitle}
          description="Follow your roadmap step by step. Lessons become available based on your instructor’s progress."
        />

        <RoadmapTimeline
          lessons={lessons}
          progressPercentage={progressPercentage}
        />

        <StudyClubCTA />
      </div>
    </StudentPageContainer>
  );
};

export default Roadmap;