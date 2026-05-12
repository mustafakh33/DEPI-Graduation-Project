export default function DashboardHeader() {
    return (
      <div className="dashboard-header">
  
        <div>
          <h1 className="dashboard-title">
            Mentor Dashboard
          </h1>
  
          <p className="dashboard-subtitle">
            Manage batches and monitor students
          </p>
        </div>
  
        <div className="dashboard-actions">
  
          <input
            type="text"
            placeholder="Search student..."
            className="dashboard-search"
          />
  
          <button className="notification-btn">
            🔔
          </button>
  
        </div>
  
      </div>
    );
  }