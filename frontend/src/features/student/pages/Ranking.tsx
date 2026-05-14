import CurrentStudentRankCard from "../components/ranking/CurrentStudentRankCard";
import RankingTable from "../components/ranking/RankingTable";
import TopRankingStudents from "../components/ranking/TopRankingStudents";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import { useRanking } from "../hooks/useRanking";

const Ranking = () => {
  const ranking = useRanking();

  return (
    <StudentPageContainer>
      <div className="space-y-8">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Student Ranking
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Celebrating top learners
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Students are ranked by the coins they collect through learning
            progress, quizzes, assignments, and study activity.
          </p>
        </section>

        <TopRankingStudents students={ranking.topStudents} />

        <RankingTable students={ranking.rankedStudents} />

        <CurrentStudentRankCard
          currentStudent={ranking.currentStudent}
          coinsToNextRank={ranking.coinsToNextRank}
        />
      </div>
    </StudentPageContainer>
  );
};

export default Ranking;