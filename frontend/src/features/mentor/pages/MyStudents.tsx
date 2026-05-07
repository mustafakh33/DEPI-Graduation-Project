
import{useStudentDashboard} from "../hooks/useStudentDashboard";
import "../style/StudentsProfile.css";
import StateCard from "@/features/mentor/components/students/StateCard";
import NotesCard from "@/features/mentor/components/students/NotesCard";
import Chart from "@/features/mentor/components/students/Chart";
import ProfileHeader from "@/features/mentor/components/students/ProfilerHeader";

// const MyStudents: React.FC = () => (
//   <DashboardPageShell
//     title="My students"
//     description="Students assigned to you."
//   />
// );

export default function MyStudents() {

  const { student, stats, performance, notes } = useStudentDashboard();

  return (

    <div className="dashboard">

      {/* <Sidebar /> */}

      <div style={{ padding: "30px", flex: 1 }}>

        <ProfileHeader student={student} />

        <div className="grid-4">

          {stats.map((stat, i) => (

            <StateCard key={i} {...stat} />

          ))}

        </div>

        <div className="grid-3" style={{ marginTop: "20px" }}>

          <div style={{ gridColumn: "span 2" }}>

            <Chart data={performance} />

          </div>

          <NotesCard notes={notes} />

        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>

          <button className="button-primary">

            Start Chat with Alex

          </button>

        </div>

      </div>

    </div>

  

   );
}
