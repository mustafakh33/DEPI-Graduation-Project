import type { UpcomingLecture } from "../../types/liveSessions.types";

interface Props {
  lectures: UpcomingLecture[];
}

export default function UpcomingLecturesList({ lectures }: Props) {
  return (
    <section className="upcoming-lectures">
      <div className="lectures-header">
        <h2>Upcoming for the Week</h2>
        <button type="button">Full Schedule →</button>
      </div>

      {lectures.map((lecture) => (
        <article key={lecture.id} className="lecture-card">
          <div className="lecture-date">{lecture.date}</div>

          <div className="lecture-content">
            <div className="lecture-topline">
              <span>{lecture.batchName}</span>
              <small>Lecture {lecture.lectureNumber}</small>
            </div>

            <h3>{lecture.title}</h3>

            <div className="lecture-meta">
              <span>🕒 {lecture.time}</span>
              <span>👥 {lecture.enrolledStudents} Enrolled</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}