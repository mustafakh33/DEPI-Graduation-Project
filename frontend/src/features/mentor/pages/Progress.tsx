/**
 * Progress (Batch Analytics) — `/mentor/progress/:id`
 *
 * Filterable analytics table, summary stats, and client-side CSV export.
 *
 * @see ../README.md#section-progress-analytics
 */
import AnalyticsFilters from "../components/analytics/AnalyticsFilters";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsStats from "../components/analytics/AnalysticsStats";
import BatchAnalyticsTable from "../components/analytics/BatchAnalyticsTable";
import { useAnalytics } from "../hooks/useAnalytics";
import "../style/analytics.css";

export default function Progress() {
  const {
    filters,
    setFilters,
    stats,
    paginatedBatches,
    page,
    setPage,
    pageSize,
    totalBatches,
    totalFiltered,
    totalPages,
    exportReport,
    resetFilters,
  } = useAnalytics();

  return (
    <div className="analytics-page">
      <AnalyticsHeader onExport={exportReport} />
      <AnalyticsStats stats={stats} />
      <AnalyticsFilters
        filters={filters}
        setFilters={setFilters}
        onResetFilters={resetFilters}
      />
      <BatchAnalyticsTable
        batches={paginatedBatches}
        page={page}
        pageSize={pageSize}
        totalFiltered={totalFiltered}
        totalBatches={totalBatches}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
