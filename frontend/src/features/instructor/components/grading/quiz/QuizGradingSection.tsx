import {
  BarChart3,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import StatCard from "../shared/StateCard";
import SearchHeader from "../shared/SearchHeader";
import TablePagination from "../shared/TablePagination";
import QuizTable from "./QuizTable";
import { useQuizGrading } from "../../../hooks/useQuizGrading";
import { useTablePagination } from "../../../hooks/useTablePagination";

export default function QuizGradingSection() {
  const {
    search,
    setSearch,
    sort,
    setSort,
    filteredStudents,
  } = useQuizGrading();

  const {
    paginatedItems,
    page,
    setPage,
    totalPages,
    total,
    pageSize,
  } = useTablePagination(filteredStudents, `${search}-${sort}`);

  return (
    <div className="quiz-grading-section">
      <div className="stats-grid">
        <StatCard
          title="Average Score"
          value="84.2%"
          icon={<BarChart3 size={20} />}
          extra="↑ 2.1%"
          extraVariant="positive"
        />

        <StatCard
          title="Highest Score"
          value="98%"
          icon={<Trophy size={20} />}
          extra="Top Performer"
          extraVariant="neutral"
        />

        <StatCard
          title="Participants"
          value="38 / 42"
          icon={<Users size={20} />}
          extra="4 Absent"
          extraVariant="negative"
        />

        <StatCard
          title="Passing Rate"
          value="92%"
          icon={<Target size={20} />}
          extra="Target Met"
          extraVariant="info"
        />
      </div>

      <div className="table-card">
        <SearchHeader
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />

        <QuizTable students={paginatedItems} />

        <TablePagination
          total={total}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
