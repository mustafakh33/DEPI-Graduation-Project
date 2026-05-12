export const useStudentDashboard = () => {
    const student = {
      name: "Alex Johnson",
      status: "ACTIVE",
      id: "#STU-9402",
      major: "Computer Science",
      semester: "Fall 2023",
    };
  
    const stats = [
      {
        title: "Attendance",
        value: 92,
        unit: "%",
        trend: "+2.4% this month",
        status: "good",
      },
      {
        title: "Assignments",
        value: 85,
        unit: "%",
        trend: "On track",
        status: "normal",
      },
      {
        title: "Quiz Grades",
        value: 62,
        unit: "%",
        trend: "Below average",
        status: "bad",
      },
      {
        title: "Study Hours",
        value: 12,
        unit: "hrs/wk",
        trend: "+3.2% vs last week",
        status: "normal",
      },
    ];
  
    const performance = [40, 55, 50, 70, 60, 80];
  
    const notes = {
      text: `Showing strong practical skills in lab sessions. Need to focus on theoretical concepts.`,
      date: "Jan 12, 2024",
    };
  
    return { student, stats, performance, notes };
  };
export default useStudentDashboard