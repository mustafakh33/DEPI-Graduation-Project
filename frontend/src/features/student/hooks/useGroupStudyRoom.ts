import { useRanking } from "@/features/student/hooks/useRanking";
import { useRoadmap } from "@/features/student/hooks/useRoadmap";
import type {
  GroupStudyMessage,
  GroupStudyRoomData,
} from "@/features/student/types/student.types";

const onlineStudentIds = ["student-1", "student-2", "student-4", "student-6"];

const fallbackStudents = [
  {
    id: "group-student-1",
    name: "Sarah Chen",
    avatarUrl: "https://i.pravatar.cc/100?img=32",
    rank: 3,
    coins: 720,
    groupName: "Group A",
    isCurrentStudent: false,
  },
  {
    id: "group-student-2",
    name: "Alex Rivera",
    avatarUrl: "https://i.pravatar.cc/100?img=12",
    rank: 5,
    coins: 650,
    groupName: "Group A",
    isCurrentStudent: false,
  },
  {
    id: "group-student-3",
    name: "Mariam Ali",
    avatarUrl: "https://i.pravatar.cc/100?img=5",
    rank: 7,
    coins: 590,
    groupName: "Group A",
    isCurrentStudent: false,
  },
  {
    id: "group-student-4",
    name: "Omar Khaled",
    avatarUrl: "https://i.pravatar.cc/100?img=15",
    rank: 9,
    coins: 520,
    groupName: "Group A",
    isCurrentStudent: false,
  },
  {
    id: "group-student-5",
    name: "Liam Wilson",
    avatarUrl: "https://i.pravatar.cc/100?img=22",
    rank: 11,
    coins: 470,
    groupName: "Group A",
    isCurrentStudent: false,
  },
];

export const useGroupStudyRoom = (): GroupStudyRoomData => {
  const ranking = useRanking();
  const roadmap = useRoadmap();

  const currentStudent = {
    id: ranking.currentStudent.id,
    name: ranking.currentStudent.name,
    avatarUrl: ranking.currentStudent.avatarUrl,
    rank: ranking.currentStudent.rank,
    coins: ranking.currentStudent.coins,
    isOnline: true,
    currentActivity: "You",
  };

  const sameGroupStudents = ranking.rankedStudents.filter(
    (student) => student.groupName === ranking.currentStudent.groupName
  );

  const groupStudentsWithCurrent =
    sameGroupStudents.length >= 5
      ? sameGroupStudents.slice(0, 6)
      : [
          ranking.currentStudent,
          ...fallbackStudents.map((student) => ({
            ...student,
            groupName: ranking.currentStudent.groupName,
          })),
        ].slice(0, 6);

  const leader = [...groupStudentsWithCurrent].sort(
    (a, b) => a.rank - b.rank
  )[0];

  const members = groupStudentsWithCurrent
    .filter((student) => student.id !== ranking.currentStudent.id)
    .map((student, index) => ({
      id: student.id,
      name: student.name,
      avatarUrl: student.avatarUrl,
      rank: student.rank,
      coins: student.coins,
      isOnline: onlineStudentIds.includes(student.id) || index % 2 === 0,
      isLeader: student.id === leader?.id,
      currentActivity:
        student.rank <= 5 ? "Ready to study" : "Reviewing material",
    }));

  const messages: GroupStudyMessage[] = [
    {
      id: "message-1",
      senderId: members[0]?.id ?? "student-2",
      senderName: members[0]?.name ?? "Sarah Chen",
      senderAvatarUrl:
        members[0]?.avatarUrl ?? "https://i.pravatar.cc/80?img=32",
      content: "Who is ready to start the study room?",
      sentAt: "2:45 PM",
    },
    {
      id: "message-2",
      senderId: leader?.id ?? "leader-1",
      senderName: leader?.name ?? "Group Leader",
      senderAvatarUrl: leader?.avatarUrl ?? "https://i.pravatar.cc/80?img=12",
      content: "I’ll create the meeting and share the code here.",
      sentAt: "2:47 PM",
      isCurrentStudent: leader?.id === ranking.currentStudent.id,
    },
    {
      id: "message-3",
      senderId: ranking.currentStudent.id,
      senderName: ranking.currentStudent.name,
      senderAvatarUrl: ranking.currentStudent.avatarUrl,
      content: "Perfect, I’m ready.",
      sentAt: "2:50 PM",
      isCurrentStudent: true,
    },
  ];

  return {
    groupName: ranking.currentStudent.groupName,
    trackTitle: roadmap.trackTitle,
    currentStudent: {
      ...currentStudent,
      isLeader: ranking.currentStudent.id === leader?.id,
    },
    members,
    messages,
    meetUrl: "https://meet.google.com/new",
  };
};