type Notes = {
  text: string;
  date: string;
};

export default function NotesCard({ notes }: { notes: Notes }) {
  return (
    <div className="card">
      <h3>Advisor Notes</h3>
      <p>{notes.text}</p>
      <small>{notes.date}</small>
    </div>
  );
}