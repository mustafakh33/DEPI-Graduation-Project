import { Download } from "lucide-react";

interface Props {
  onExport: () => void;
}

export default function AnalyticsHeader({ onExport }: Props) {
  return (
    <header className="analytics-header">
      <div className="analytics-header__text">
        <h1>Batch Performance Analytics</h1>
        <p>Monitoring real-time academic health across all cohorts.</p>
      </div>
      <button type="button" className="analytics-export-btn" onClick={onExport}>
        <Download size={18} aria-hidden />
        Export Report
      </button>
    </header>
  );
}
