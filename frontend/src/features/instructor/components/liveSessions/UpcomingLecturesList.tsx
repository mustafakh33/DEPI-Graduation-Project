import type {
    UpcomingLecture,
  } from "../../types/liveSessions.types";
  
  interface Props {
    lectures: UpcomingLecture[];
  }
  
  export default function UpcomingLecturesList({
    lectures,
  }: Props) {
    return (
      <div className="upcoming-lectures">
  
        <div className="lectures-header">
  
          <h2>
            Upcoming for the Week
          </h2>
  
        </div>
  
        {lectures.map((lecture) => (
          <div
            key={lecture.id}
            className="lecture-card"
          >
  
            <div className="lecture-date">
              {lecture.date}
            </div>
  
            <div>
  
              <h3>
                {lecture.title}
              </h3>
  
              <p>
                {
                  lecture.batchName
                }{" "}
                • Lecture
                {
                  lecture.lectureNumber
                }
              </p>
  
              <span>
                {lecture.time}
              </span>
  
            </div>
  
            <div>
              {
                lecture.enrolledStudents
              }{" "}
              Enrolled
            </div>
  
          </div>
        ))}
  
      </div>
    );
  }