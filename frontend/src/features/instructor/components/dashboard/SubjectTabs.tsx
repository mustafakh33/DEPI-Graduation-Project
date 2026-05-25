import type { InstructorSubject } from "../../types/instructorDashboard.types";

interface Props {
  subjects: readonly InstructorSubject[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function SubjectTabs({ subjects, activeId, onChange }: Props) {
  return (
    <div className="instructor-subject-tabs" role="tablist" aria-label="Subjects">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          type="button"
          role="tab"
          aria-selected={activeId === subject.id}
          className={
            activeId === subject.id
              ? "instructor-subject-tab instructor-subject-tab--active"
              : "instructor-subject-tab"
          }
          onClick={() => onChange(subject.id)}
        >
          {subject.name}
        </button>
      ))}
    </div>
  );
}
