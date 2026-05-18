interface LessonVideoSectionProps {
  videoUrl: string;
  title: string;
}

const LessonVideoSection = ({ videoUrl, title }: LessonVideoSectionProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-lg">
      <video
        src={videoUrl}
        controls
        className="aspect-video w-full bg-black"
        aria-label={title}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LessonVideoSection;