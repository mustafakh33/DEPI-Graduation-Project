import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type {
  RankedStudent,
  RankingData,
  RankingStudent,
  RankingStatus,
} from "../types/student.types";
import { useStudentDashboard } from "./useStudentDashboard";

const buildMockRankingStudents = (trackId: string): RankingStudent[] => {
  const groupA = "Group 1";
  const groupB = "Group 2";
  const groupC = "Group 3";

  return [
    {
      id: `${trackId}-student-1`,
      name: "Tames Chen",
      avatarUrl: "https://i.pravatar.cc/120?img=12",
      coins: 950,
      previousCoins: 830,
      trackId,
      groupName: groupA,
    },
    {
      id: `${trackId}-student-2`,
      name: "Sarah Williams",
      avatarUrl: "https://i.pravatar.cc/120?img=13",
      coins: 820,
      previousCoins: 820,
      trackId,
      groupName: groupA,
    },
    {
      id: `${trackId}-student-3`,
      name: "Alex Johnson",
      avatarUrl: "https://i.pravatar.cc/120?img=14",
      coins: 740,
      previousCoins: 620,
      trackId,
      groupName: groupA,
    },
    {
      id: `${trackId}-student-4`,
      name: "Michael Ross",
      avatarUrl: "https://i.pravatar.cc/120?img=15",
      coins: 610,
      previousCoins: 610,
      trackId,
      groupName: groupB,
    },
    {
      id: `${trackId}-student-5`,
      name: "Emily Blunt",
      avatarUrl: "https://i.pravatar.cc/120?img=16",
      coins: 520,
      previousCoins: 470,
      trackId,
      groupName: groupB,
    },
    {
      id: `${trackId}-student-6`,
      name: "Sophia Lee",
      avatarUrl: "https://i.pravatar.cc/120?img=17",
      coins: 430,
      previousCoins: 430,
      trackId,
      groupName: groupC,
    },
    {
      id: `${trackId}-student-7`,
      name: "Mariam Hassan",
      avatarUrl: "https://i.pravatar.cc/120?img=18",
      coins: 350,
      previousCoins: 300,
      trackId,
      groupName: groupA,
    },
    {
      id: `${trackId}-student-8`,
      name: "Omar Khaled",
      avatarUrl: "https://i.pravatar.cc/120?img=19",
      coins: 260,
      previousCoins: 260,
      trackId,
      groupName: groupA,
    },
    {
      id: `${trackId}-student-9`,
      name: "Laila Samir",
      avatarUrl: "https://i.pravatar.cc/120?img=20",
      coins: 180,
      previousCoins: 120,
      trackId,
      groupName: groupB,
    },
    {
      id: `${trackId}-student-10`,
      name: "Youssef Ali",
      avatarUrl: "https://i.pravatar.cc/120?img=21",
      coins: 90,
      previousCoins: 90,
      trackId,
      groupName: groupC,
    },
  ];
};

const getRankingStatus = (student: RankingStudent): RankingStatus => {
  return student.coins > student.previousCoins ? "rising" : "stable";
};

const rankStudents = (students: RankingStudent[]): RankedStudent[] => {
  return [...students]
    .sort((firstStudent, secondStudent) => {
      if (secondStudent.coins !== firstStudent.coins) {
        return secondStudent.coins - firstStudent.coins;
      }

      return firstStudent.name.localeCompare(secondStudent.name);
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

  const currentStudent: RankingStudent = {
    id: "current-student",
    name: user?.name?.trim() || dashboard.studentName || "You",
    avatarUrl:
      localStorage.getItem("student-profile-avatar") ??
      "https://i.pravatar.cc/120?img=5",
    coins: dashboard.stats.coins,
    previousCoins: Math.max(dashboard.stats.coins - 100, 0),
    trackId: selectedTrackId,
    groupName: "Group 1",
    isCurrentStudent: true,
  };

  const mockStudents = buildMockRankingStudents(selectedTrackId);

  const rankedStudents = rankStudents([currentStudent, ...mockStudents]);

  const rankedCurrentStudent =
    rankedStudents.find((student) => student.isCurrentStudent) ??
    rankedStudents[0];

  return {
    currentStudent: rankedCurrentStudent,
    topStudents: rankedStudents.slice(0, 3),
    rankedStudents,
    coinsToNextRank: getCoinsToNextRank(rankedCurrentStudent, rankedStudents),
  };
};