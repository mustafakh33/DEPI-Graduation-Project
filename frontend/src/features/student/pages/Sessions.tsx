import LiveSessionCard from "../components/sessions/LiveSessionCard";
import RecordedSessionCard from "../components/sessions/RecordedSessionCard";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import { useSessions } from "../hooks/useSessions";

const Sessions = () => {
  const sessions = useSessions();

  return (
    <StudentPageContainer>
      <div className="space-y-8">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Sessions
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            {sessions.trackTitle} Sessions
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Join your upcoming live session and review previous recordings from
            your learning track.
          </p>
        </section>

        <LiveSessionCard session={sessions.upcomingSession} />

        <section className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Previous Recordings
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Track Recordings
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sessions.recordings.map((recording) => (
              <RecordedSessionCard
                key={recording.id}
                recording={recording}
              />
            ))}
          </div>
        </section>
      </div>
    </StudentPageContainer>
  );
};

export default Sessions;