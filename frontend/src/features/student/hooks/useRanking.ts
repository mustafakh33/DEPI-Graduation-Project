import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type {
  RankedStudent,
  RankingData,
  RankingStudent,
  RankingStatus,
} from "../types/student.types";
import { useStudentDashboard } from "./useStudentDashboard";

const buildMockStudentsAboveCurrent = (
  trackId: string,
  rank: number,
  currentCoins: number,
  trackTitle: string
): RankingStudent[] => {
  const studentsCountAboveCurrent = Math.max(rank - 1, 0);

  return Array.from({ length: studentsCountAboveCurrent }, (_, index) => {
    const studentRank = index + 1;
    const coinsGap = (studentsCountAboveCurrent - index) * 350;

    return {
      id: `${trackId}-student-${studentRank}`,
      name: [
        "Tames Chen",
        "Sarah Williams",
        "Alex Johnson",
        "Michael Ross",
        "Emily Blunt",
        "Sophia Lee",
        "Mariam Hassan",
        "Omar Khaled",
        "Laila Samir",
        "Youssef Ali",
        "Nour Adel",
      ][index] ?? `Student ${studentRank}`,
      avatarUrl: `https://i.pravatar.cc/120?img=${index + 12}`,
      coins: currentCoins + coinsGap,
      previousCoins:
        index % 2 === 0
          ? currentCoins + coinsGap - 120
          : currentCoins + coinsGap,
      trackId,
      groupName: `${trackTitle} Group ${index % 3 === 0 ? "A" : index % 3 === 1 ? "B" : "C"}`,
    };
  });
};

const buildMockStudentsBelowCurrent = (
  trackId: string,
  currentCoins: number,
  trackTitle: string
): RankingStudent[] => {
  return [
    {
      id: `${trackId}-below-1`,
      name: "Farah Nabil",
      avatarUrl: "https://i.pravatar.cc/120?img=41",
      coins: Math.max(currentCoins - 120, 0),
      previousCoins: Math.max(currentCoins - 120, 0),
      trackId,
      groupName: `${trackTitle} Group B`,
    },
    {
      id: `${trackId}-below-2`,
      name: "Kareem Samy",
      avatarUrl: "https://i.pravatar.cc/120?img=42",
      coins: Math.max(currentCoins - 260, 0),
      previousCoins: Math.max(currentCoins - 300, 0),
      trackId,
      groupName: `${trackTitle} Group C`,
    },
    {
      id: `${trackId}-below-3`,
      name: "Hana Mostafa",
      avatarUrl: "https://i.pravatar.cc/120?img=43",
      coins: Math.max(currentCoins - 430, 0),
      previousCoins: Math.max(currentCoins - 430, 0),
      trackId,
      groupName: `${trackTitle} Group A`,
    },
  ];
};

const getRankingStatus = (student: RankingStudent): RankingStatus => {
  return student.coins > student.previousCoins ? "rising" : "stable";
};

const rankStudents = (students: RankingStudent[]): RankedStudent[] => {
  return [...students]
    .sort((firstStudent, secondStudent) => {
      return secondStudent.coins - firstStudent.coins;
    })
    .map((student, index) => ({
      ...student,
      rank: index + 1,
      status: getRankingStatus(student),
    }));
};

const getCoinsToNextRank = (
  currentStudent: RankedStudent,
  rankedStudents: RankedStudent[]
) => {
  if (currentStudent.rank === 1) {
    return 0;
  }

  const nextRankStudent = rankedStudents.find(
    (student) => student.rank === currentStudent.rank - 1
  );

  if (!nextRankStudent) {
    return 0;
  }

  return nextRankStudent.coins - currentStudent.coins + 1;
};

export const useRanking = (): RankingData => {
  const { selectedTrack, user } = useOnboarding();
  const dashboard = useStudentDashboard();

  const selectedTrackId = selectedTrack?.id ?? "web-development";
  const selectedTrackTitle = selectedTrack?.title ?? "Student";

  const currentStudentFromNavbar: RankingStudent = {
    id: "current-student",
    name: user?.name ?? "You",
    avatarUrl: "https://i.pravatar.cc/120?img=5",
    coins: dashboard.stats.coins,
    previousCoins: dashboard.stats.coins,
    trackId: selectedTrackId,
    groupName: `${selectedTrackTitle} Group`,
    isCurrentStudent: true,
  };

  const studentsAboveCurrent = buildMockStudentsAboveCurrent(
    selectedTrackId,
    dashboard.stats.rank,
    dashboard.stats.coins,
    selectedTrackTitle
  );

  const studentsBelowCurrent = buildMockStudentsBelowCurrent(
    selectedTrackId,
    dashboard.stats.coins,
    selectedTrackTitle
  );

  const rankedStudents = rankStudents([
    ...studentsAboveCurrent,
    currentStudentFromNavbar,
    ...studentsBelowCurrent,
  ]);

  const currentStudent =
    rankedStudents.find((student) => student.isCurrentStudent) ??
    rankedStudents[0];

  return {
    currentStudent,
    topStudents: rankedStudents.slice(0, 3),
    rankedStudents,
    coinsToNextRank: getCoinsToNextRank(currentStudent, rankedStudents),
  };
};