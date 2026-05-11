import { useMentorDashboard } from "../hooks/useMentorDashboard";

import BatchTabs from "../components/Dashboard/BatchTabs";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatsCards from "../components/Dashboard/StatsCards";
import StudentGrid from "../components/Dashboard/StudentGrid";
import RiskStudents from "../components/Dashboard/RiskStudents";
import TopPerformers from "../components/Dashboard/TopPerformers";

import "../style/mentorDashboard.css";

export default function MentorDashboardPage() {
  const {
    batches,
    selectedBatch,
    selectedBatchId,
    setSelectedBatchId,
    students,
    topPerformers,
    riskStudents,
  } = useMentorDashboard();

  return (
    <div className="mentor-dashboard">
      <div className="dashboard-main">

        <DashboardHeader />

        <BatchTabs
          batches={batches}
          selectedBatchId={selectedBatchId}
          onSelect={setSelectedBatchId}
        />

        <StatsCards
          totalStudents={students.length}
          attendance={selectedBatch.attendance}
          absence={selectedBatch.absence}
        />

        <div className="dashboard-content">

          <div className="students-section">

            <div className="section-header">
              <h2>
                Student List - {selectedBatch.name}
              </h2>
            </div>

            <StudentGrid students={students} />

          </div>

          <div className="side-widgets">

            <RiskStudents students={riskStudents} />

            <TopPerformers students={topPerformers} />

          </div>

        </div>

      </div>
    </div>
  );
}