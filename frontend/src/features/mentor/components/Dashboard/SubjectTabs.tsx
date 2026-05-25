import type { SubjectTabsProps } from "../../types/mentor.types";

export default function SubjectTabs({
  subjects,
  selectedSubjectId,
  onSelect,
}: SubjectTabsProps) {
  return (
    <div className="mentor-subject-tabs" role="tablist" aria-label="Subjects">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          type="button"
          role="tab"
          aria-selected={selectedSubjectId === subject.id}
          className={
            selectedSubjectId === subject.id
              ? "mentor-subject-tab mentor-subject-tab--active"
              : "mentor-subject-tab"
          }
          onClick={() => onSelect(subject.id)}
        >
          {subject.name}
        </button>
      ))}
    </div>
  );
}
