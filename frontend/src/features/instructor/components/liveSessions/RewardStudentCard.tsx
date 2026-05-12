import { useState } from "react";

export default function RewardStudentCard() {
  const [coins, setCoins] =
    useState(10);

  return (
    <div className="reward-card">

      <h3>Reward Student</h3>

      <select>
        <option>
          Select Batch
        </option>

        <option>
          Alpha-2024
        </option>
      </select>

      <input
        type="text"
        placeholder="Find Student"
      />

      <input
        type="number"
        value={coins}
        onChange={(e) =>
          setCoins(
            Number(
              e.target.value
            )
          )
        }
      />

      <select>
        <option>
          Excellent Answer
        </option>

        <option>
          Attendance
        </option>

        <option>
          Participation
        </option>
      </select>

      <button>
        Grant Reward Coins
      </button>

    </div>
  );
}