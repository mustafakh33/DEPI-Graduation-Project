import type { Batch } from "../types/mentor.types";
export const batches: Batch[] = [
    {
      id: "batch-a",
      name: "Batch A",
  
      attendance: 94.2,
      absence: 5.8,
  
      students: [
        {
          id: 1,
          name: "Alex Johnson",
          major: "CS Major",
          year: "Year 2",
          attendanceRate: 92,
          gpa: 3.7,
          risk: false,
          image: "",
        },
  
        {
          id: 2,
          name: "Sarah Williams",
          major: "Design Major",
          year: "Year 1",
          attendanceRate: 45,
          gpa: 2.1,
          risk: true,
          image: "",
        },
  
        {
          id: 3,
          name: "Michael Chen",
          major: "Physics Major",
          year: "Year 3",
          attendanceRate: 88,
          gpa: 3.9,
          risk: false,
          image: "",
        },
      ],
    },
  
    {
      id: "batch-b",
      name: "Batch B",
  
      attendance: 90.1,
      absence: 9.9,
  
      students: [],
    },
  ];