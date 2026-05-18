import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BackToRoadmapLink = () => {
  return (
    <Link
      to="/student/roadmap"
      className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
    >
      <ArrowLeft className="size-4" />
      Back to Roadmap
    </Link>
  );
};

export default BackToRoadmapLink;