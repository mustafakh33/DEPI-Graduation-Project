
export default function ProfileHeader({ student }) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>
            {student.name} ({student.status})
          </h2>
          <p>
            {student.id} • {student.major} • {student.semester}
          </p>
        </div>
  
        <button>Edit Profile</button>
      </div>
    );
  }
