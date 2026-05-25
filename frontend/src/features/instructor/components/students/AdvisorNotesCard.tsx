import type { AdvisorNote } from "../../types/students.types";

interface Props {
  note: AdvisorNote;
}

export default function AdvisorNotesCard({ note }: Props) {
  return (
    <article className="advisor-notes-card">
      <h3>Academic Advisor Notes</h3>
      <blockquote>{note.content}</blockquote>
      <footer>
        <time>{note.date}</time>
        <button type="button">View all notes</button>
      </footer>
    </article>
  );
}
