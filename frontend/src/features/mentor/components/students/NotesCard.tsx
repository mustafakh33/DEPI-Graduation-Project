export default function NotesCard({ notes }) {
    return (
      <div className="card">
        <h3>Advisor Notes</h3>
        <p>{notes.text}</p>
        <small>{notes.date}</small>
      </div>
    );
  }