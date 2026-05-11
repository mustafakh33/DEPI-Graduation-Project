

import { useAnalytics } from "../hooks/useAnalytics";

import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsStats from "../components/analytics/AnalysticsStats";
import AnalyticsFilters from "../components/analytics/AnalyticsFilters";
import BatchAnalyticsTable from "../components/analytics/BatchAnalyticsTable";

import "../style/analytics.css";

export default function AnalyticsPage() {
  const {
    filters,
    setFilters,

    stats,

    filteredBatches,
  } = useAnalytics();

  return (
    <div className="analytics-page">

      <AnalyticsHeader />

      <AnalyticsStats stats={stats} />

      <AnalyticsFilters
        filters={filters}
        setFilters={setFilters}
      />

      <BatchAnalyticsTable
        batches={filteredBatches}
      />

    </div>
  );
}
