import { ChevronDown, Coins, Search } from "lucide-react";
import { useState } from "react";
import { topPerformers } from "../../data/liveSessions.mock";

export default function RewardStudentCard() {
  const [coins, setCoins] = useState(10);
  const [selectedPerformer, setSelectedPerformer] = useState(topPerformers[0]?.id);

  return (
    <div className="reward-card">
      <div className="reward-header">
        <h3>Reward Student</h3>
        <span>Assign Coins</span>
      </div>

      <div className="reward-form">
        <div className="reward-field">
          <label>Select Batch</label>
          <div className="reward-select-wrap">
            <select defaultValue="alpha">
              <option value="alpha">Alpha-2024 (120 Students)</option>
              <option value="beta">Beta-2024 (95 Students)</option>
            </select>
            <ChevronDown size={16} className="reward-select-icon" aria-hidden />
          </div>
        </div>

        <div className="reward-field">
          <label>Find Student</label>
          <div className="reward-search">
            <Search size={16} className="reward-search-icon" aria-hidden />
            <input type="text" placeholder="Enter student name or ID..." />
          </div>
        </div>

        <div className="top-performers">
          <p>Top Performers Today</p>

          {topPerformers.map((performer) => (
            <button
              key={performer.id}
              type="button"
              className={`performer-card ${
                selectedPerformer === performer.id ? "performer-card--selected" : ""
              }`}
              onClick={() => setSelectedPerformer(performer.id)}
            >
              <div className="performer-info">
                <div className="performer-avatar" />
                <span>{performer.name}</span>
              </div>
              <span
                className={`performer-status performer-status--${performer.status}`}
              >
                {performer.status === "active" ? "Active" : "Idle"}
              </span>
            </button>
          ))}
        </div>

        <div className="reward-grid">
          <div className="reward-field">
            <label>Reward Coins</label>
            <div className="reward-coins-input">
              <Coins size={16} className="reward-coins-icon" aria-hidden />
              <input
                type="number"
                value={coins}
                min={1}
                onChange={(e) => setCoins(Number(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="reward-field">
            <label>Reason</label>
            <div className="reward-select-wrap">
              <select defaultValue="excellent">
                <option value="excellent">Excellent Answer</option>
                <option value="attendance">Attendance</option>
                <option value="participation">Participation</option>
              </select>
              <ChevronDown size={16} className="reward-select-icon" aria-hidden />
            </div>
          </div>
        </div>

        <button type="button" className="grant-reward-btn">
          <Coins size={18} aria-hidden />
          Grant Reward Coins
        </button>
      </div>
    </div>
  );
}
