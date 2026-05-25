import { CalendarPlus } from "lucide-react";
import type {
  CreateSessionForm,
  MentorSessionBatchOption,
} from "../../types/mentorSessions.types";

interface Props {
  form: CreateSessionForm;
  batchOptions: MentorSessionBatchOption[];
  notice: string | null;
  onChange: (patch: Partial<CreateSessionForm>) => void;
  onSubmit: () => void;
}

export default function CreateSessionPanel({
  form,
  batchOptions,
  notice,
  onChange,
  onSubmit,
}: Props) {
  return (
    <aside className="mentor-create-session">
      <div className="mentor-create-session__heading">
        <h2>Create New Session</h2>
        <span className="mentor-create-session__icon" aria-hidden>
          <CalendarPlus size={18} />
        </span>
      </div>

      <form
        className="mentor-create-session__form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label>
          <span>Session Name</span>
          <input
            type="text"
            placeholder="e.g. Advanced Calculus Q&A"
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </label>

        <div className="mentor-create-session__row">
          <label>
            <span>Date</span>
            <input
              type="date"
              value={form.date}
              onChange={(e) => onChange({ date: e.target.value })}
            />
          </label>
          <label>
            <span>Start Time</span>
            <input
              type="time"
              value={form.time}
              onChange={(e) => onChange({ time: e.target.value })}
            />
          </label>
        </div>

        <label>
          <span>Assign to Batch</span>
          <select
            value={form.batchId}
            onChange={(e) => onChange({ batchId: e.target.value })}
          >
            {batchOptions.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Purpose / Description</span>
          <textarea
            rows={4}
            placeholder="Brief agenda for enrolled students..."
            value={form.description}
            onChange={(e) => onChange({ description: e.target.value })}
          />
        </label>

        {notice ? (
          <p className="mentor-create-session__notice" role="status">
            {notice}
          </p>
        ) : null}

        <button type="submit" className="mentor-create-session__submit">
          <CalendarPlus size={18} aria-hidden />
          Create Session
        </button>
      </form>

      <p className="mentor-create-session__footnote">
        Auto-notifies all enrolled students upon creation
      </p>
    </aside>
  );
}
