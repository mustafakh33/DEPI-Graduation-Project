import StatCard from "../shared/StateCard";
import SearchHeader from "../shared/SearchHeader";
import QuizTable from "./QuizTable";
import {useQuizGrading,} from "../../../hooks/useQuizGrading";

export default function QuizGradingSection() {
  const {
    search,

    setSearch,

    sort,

    setSort,

    filteredStudents,
  } = useQuizGrading();

  return (
    <div>

      <div className="stats-grid">

        <StatCard
          title="Average Score"
          value="84.2%"
        />

        <StatCard
          title="Highest Score"
          value="98%"
        />

        <StatCard
          title="Participants"
          value="38 / 42"
        />

        <StatCard
          title="Passing Rate"
          value="92%"
        />

      </div>

      <div className="table-card">

        <SearchHeader
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />

        <QuizTable
          students={
            filteredStudents
          }
        />

      </div>

    </div>
  );
}