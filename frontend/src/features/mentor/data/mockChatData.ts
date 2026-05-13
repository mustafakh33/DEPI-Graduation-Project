export const mockChatData = {
    student: {
      id: 2,
      name: "Sarah Williams",
      major: "CS Student",
      year: "Senior",
      gpa: 3.9,
      attendanceRate: 92,
      risk: false,
    },
  
    conversations: [
      {
        id: 1,
        name: "Sarah Williams",
        message: "The analytics report looks great...",
        active: true,
      },
  
      {
        id: 2,
        name: "Alex Johnson",
        message: "Can we reschedule our session?",
      },
    ],
  
    messages: [
      {
        id: 1,
        sender: "student",
        text: "Hello Dr. Chen! I've finished reviewing the analytics you sent over.",
        time: "9:12 AM",
      },
  
      {
        id: 2,
        sender: "mentor",
        text: "That's great to hear, Sarah.",
        time: "9:15 AM",
      },
    ],
  };