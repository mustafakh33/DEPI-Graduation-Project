import { useState } from "react";
import type { AdvisorNote } from "../../types/students.types";

interface Props {
  notes: AdvisorNote[];
  onAddNote: (content: string) => boolean;
}

export default function AdvisorNotesCard({ notes, onAddNote }: Props) {
  const [draft, setDraft] = useState("");
  const [showAll, setShowAll] = useState(false);

  const latestNote = notes[0];
  const hasMultipleNotes = notes.length > 1;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onAddNote(draft)) {
      setDraft("");
      setShowAll(true);
    }
  };

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
              <button
                type="button"
                onClick={() => setShowAll(true)}
              >
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

      <form className="advisor-notes-form" onSubmit={handleSubmit}>
        <label htmlFor="advisor-note-input" className="advisor-notes-label">
          Add a note
        </label>
        <textarea
          id="advisor-note-input"
          className="advisor-notes-input"
          rows={4}
          placeholder="Write academic advisor notes for this student..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          type="submit"
          className="advisor-notes-submit"
          disabled={!draft.trim()}
        >
          Save note
        </button>
      </form>
    </article>
  );
}
