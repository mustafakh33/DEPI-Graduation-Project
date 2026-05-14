import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type {
  RankedStudent,
  RankingData,
  RankingStudent,
  RankingStatus,
} from "../types/student.types";
import { useStudentDashboard } from "./useStudentDashboard";

const rankingStudents: RankingStudent[] = [
  {
    id: "student-1",
    name: "Tames Chen",
    avatarUrl: "https://i.pravatar.cc/120?img=12",
    coins: 15820,
    previousCoins: 15400,
    trackId: "ai-data-science",
    groupName: "AI Group A",
  },
  {
    id: "student-2",
    name: "Sarah Williams",
    avatarUrl: "https://i.pravatar.cc/120?img=47",
    coins: 14350,
    previousCoins: 14350,
    trackId: "ai-data-science",
    groupName: "AI Group B",
  },
  {
    id: "student-3",
    name: "Alex Johnson",
    avatarUrl: "https://i.pravatar.cc/120?img=32",
    coins: 13200,
    previousCoins: 13000,
    trackId: "ai-data-science",
    groupName: "AI Group A",
  },
  {
    id: "student-4",
    name: "Michael Ross",
    avatarUrl: "https://i.pravatar.cc/120?img=15",
    coins: 11420,
    previousCoins: 11200,
    trackId: "ai-data-science",
    groupName: "AI Group C",
  },
  {
    id: "student-5",
    name: "Emily Blunt",
    avatarUrl: "https://i.pravatar.cc/120?img=25",
    coins: 9800,
    previousCoins: 9700,
    trackId: "ai-data-science",
    groupName: "AI Group B",
  },
  {
    id: "student-6",
    name: "Sophia Lee",
    avatarUrl: "https://i.pravatar.cc/120?img=44",
    coins: 9450,
    previousCoins: 9450,
    trackId: "ai-data-science",
    groupName: "AI Group C",
  },
  {
    id: "student-7",
    name: "Mariam Hassan",
    avatarUrl: "https://i.pravatar.cc/120?img=10",
    coins: 8200,
    previousCoins: 8100,
    trackId: "ai-data-science",
    groupName: "AI Group A",
  },
  {
    id: "student-8",
    name: "Omar Khaled",
    avatarUrl: "https://i.pravatar.cc/120?img=14",
    coins: 6500,
    previousCoins: 6500,
    trackId: "ai-data-science",
    groupName: "AI Group B",
  },
  {
    id: "student-9",
    name: "Laila Samir",
    avatarUrl: "https://i.pravatar.cc/120?img=23",
    coins: 4100,
    previousCoins: 3900,
    trackId: "ai-data-science",
    groupName: "AI Group C",
  },
  {
    id: "student-10",
    name: "Youssef Ali",
    avatarUrl: "https://i.pravatar.cc/120?img=33",
    coins: 1200,
    previousCoins: 1200,
    trackId: "ai-data-science",
    groupName: "AI Group A",
  },
  {
    id: "student-11",
    name: "Nour Adel",
    avatarUrl: "https://i.pravatar.cc/120?img=40",
    coins: 700,
    previousCoins: 600,
    trackId: "ai-data-science",
    groupName: "AI Group B",
  },

  {
    id: "web-student-1",
    name: "Mona Adel",
    avatarUrl: "https://i.pravatar.cc/120?img=20",
    coins: 12500,
    previousCoins: 12400,
    trackId: "web-development",
    groupName: "Web Group A",
  },
  {
    id: "web-student-2",
    name: "Ahmed Hany",
    avatarUrl: "https://i.pravatar.cc/120?img=18",
    coins: 860,
    previousCoins: 800,
    trackId: "web-development",
    groupName: "Web Group B",
  },
];

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

  const selectedTrackId = selectedTrack?.id ?? "ai-data-science";

  const currentStudentFromNavbar: RankingStudent = {
    id: "current-student",
    name: user?.name ?? "You",
    avatarUrl: "https://i.pravatar.cc/120?img=5",
    coins: dashboard.stats.coins,
    previousCoins: dashboard.stats.coins,
    trackId: selectedTrackId,
    groupName: `${selectedTrack?.title ?? "Student"} Group`,
    isCurrentStudent: true,
  };

  const studentsInTrack = rankingStudents.filter(
    (student) => student.trackId === selectedTrackId
  );

  const rankedStudents = rankStudents([
    ...studentsInTrack,
    currentStudentFromNavbar,
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