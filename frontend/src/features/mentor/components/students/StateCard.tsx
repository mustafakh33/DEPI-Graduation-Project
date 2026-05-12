import React from "react";

export default function StatCard({ title, value, unit, trend, status }) {
  return (
    <div className="card">
      <p>{title}</p>
      <h2 className={`stat-${status}`}>
        {value}
        {unit}
      </h2>
      <small>{trend}</small>
    </div>
  );
}