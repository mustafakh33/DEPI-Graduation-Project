import CurrentStudentRankCard from "../components/ranking/CurrentStudentRankCard";
import RankingTable from "../components/ranking/RankingTable";
import TopRankingStudents from "../components/ranking/TopRankingStudents";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import StudentPageHeader from "../components/shared/StudentPageHeader";
import { useRanking } from "../hooks/useRanking";

const Ranking = () => {
  const ranking = useRanking();

  return (
    <StudentPageContainer>
      <div className="space-y-8">
        <StudentPageHeader
          eyebrow="Student Ranking"
          title="Celebrating top learners"
          description="Students are ranked by the coins they collect through learning progress, quizzes, assignments, and study activity."
        />

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