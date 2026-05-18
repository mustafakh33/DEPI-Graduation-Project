import { UserRound, Users } from "lucide-react";
import StudyModeCard from "./StudyModeCard";

const StudyClubOptions = () => {
  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <StudyModeCard
        to="/student/solo-focus"
        icon={<UserRound className="size-8" />}
        title="Study Alone"
        description="Enter a private focus room, set your study time, and track your progress without distractions."
        actionLabel="Start Solo Study"
      />

      <StudyModeCard
        to="/student/group-study"
        icon={<Users className="size-8" />}
        title="Study with Your Group"
        description="Join your track group room, study with classmates, and keep your learning streak active together."
        actionLabel="Join Group Study"
      />
    </div>
  );
};

export default StudyClubOptions;