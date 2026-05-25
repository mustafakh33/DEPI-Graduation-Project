import { Clock, Users } from "lucide-react";
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

      <div className="lectures-list">
        {lectures.map((lecture) => (
          <article key={lecture.id} className="lecture-card">
            <div className="lecture-date">
              <span className="lecture-month">{lecture.month}</span>
              <span className="lecture-day">{lecture.day}</span>
            </div>

            <div className="lecture-content">
              <div className="lecture-topline">
                <span className="batch-tag">{lecture.batchName}</span>
                <small>Lecture {lecture.lectureNumber}</small>
              </div>

              <h3>{lecture.title}</h3>

              <div className="lecture-meta">
                <span>
                  <Clock size={14} aria-hidden />
                  {lecture.time}
                </span>
                <span>
                  <Users size={14} aria-hidden />
                  {lecture.enrolledStudents} Enrolled
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
