import { useState } from "react";
import type { AdvisorNote } from "@/features/instructor/types/students.types";

interface Props {
  notes: AdvisorNote[];
}

export default function MentorAdvisorNotesCard({ notes }: Props) {
  const [showAll, setShowAll] = useState(false);
  const latestNote = notes[0];
  const hasMultipleNotes = notes.length > 1;

  return (
    <article className="advisor-notes-card">
      <h3>Academic Advisor Notes</h3>

      {notes.length === 0 ? (
        <p className="advisor-notes-empty">No advisor notes yet.</p>
      ) : showAll && hasMultipleNotes ? (
        <ul className="advisor-notes-list">
          {notes.map((note, index) => (
            <li key={`${note.date}-${index}`}>
              <blockquote>{note.content}</blockquote>
              <time>{note.date}</time>
            </li>
          ))}
        </ul>
      ) : latestNote ? (
        <>
          <blockquote>{latestNote.content}</blockquote>
          <footer className="advisor-notes-meta">
            <time>{latestNote.date}</time>
            {hasMultipleNotes ? (
              <button type="button" onClick={() => setShowAll(true)}>
                View all notes ({notes.length})
              </button>
            ) : null}
          </footer>
        </>
      ) : null}

      {showAll && hasMultipleNotes ? (
        <button
          type="button"
          className="advisor-notes-show-latest"
          onClick={() => setShowAll(false)}
        >
          Show latest only
        </button>
      ) : null}
    </article>
  );
}
