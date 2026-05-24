import { useState } from "react";

export default function RewardStudentCard() {
  const [coins, setCoins] = useState(10);

  return (
    <div className="reward-card">
      <div className="reward-header">
        <h3>Reward Student</h3>
        <span>Assign Coins</span>
      </div>

      <div className="reward-form">
        <div>
          <label>Select Batch</label>
          <select>
            <option>Alpha-2024 (120 Students)</option>
            <option>Beta-2024</option>
          </select>
        </div>

        <div>
          <label>Find Student</label>
          <input type="text" placeholder="Enter student name or ID..." />
        </div>

        <div className="top-performers">
          <p>Top Performers Today</p>

          <div className="performer-card active">
            <div className="performer-info">
              <div className="student-avatar" />
              <span>Alex Johnson</span>
            </div>
            <strong>Active</strong>
          </div>

          <div className="performer-card">
            <div className="performer-info">
              <div className="student-avatar" />
              <span>Sarah Williams</span>
            </div>
            <strong>Idle</strong>
          </div>
        </div>

        <div className="reward-grid">
          <div>
            <label>Reward Coins</label>
            <input
              type="number"
              value={coins}
              onChange={(e) => setCoins(Number(e.target.value))}
            />
          </div>

          <div>
            <label>Reason</label>
            <select>
              <option>Excellent Answer</option>
              <option>Attendance</option>
              <option>Participation</option>
            </select>
          </div>
        </div>

        <button type="button">Grant Reward Coins</button>
      </div>
    </div>
  );
}