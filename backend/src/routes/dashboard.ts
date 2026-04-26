import { Router } from "express";
import { attendanceTrend, moduleStore } from "../data/seed";
import { DashboardSummary } from "../types";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", (_request, response) => {
  const summary: DashboardSummary = {
    headline: {
      totalStudents: moduleStore.students.length,
      activeGroups: moduleStore.groups.filter((group) => group.status === "active").length,
      liveSessions: moduleStore.sessions.filter((session) => session.status === "live").length,
      openTickets: moduleStore.tickets.filter((ticket) =>
        ["open", "in_progress", "reopened"].includes(String(ticket.status)),
      ).length,
    },
    growth: [
      { label: "Monthly retention", value: 91.2, tone: "success" },
      { label: "Attendance uplift", value: 8.4, tone: "info" },
      { label: "Risk students", value: 6.0, tone: "warning" },
    ],
    attendanceTrend,
    distribution: [
      { name: "Users", value: moduleStore.users.length },
      { name: "Students", value: moduleStore.students.length },
      { name: "Groups", value: moduleStore.groups.length },
      { name: "Sessions", value: moduleStore.sessions.length },
      { name: "Surveys", value: moduleStore.surveys.length },
    ],
    ticketsBreakdown: [
      { name: "In progress", value: moduleStore.tickets.filter((ticket) => ticket.status === "in_progress").length },
      { name: "Resolved", value: moduleStore.tickets.filter((ticket) => ticket.status === "resolved").length },
      { name: "Reopened", value: moduleStore.tickets.filter((ticket) => ticket.status === "reopened").length },
      { name: "Closed", value: moduleStore.tickets.filter((ticket) => ticket.status === "closed").length },
    ],
  };

  response.json(summary);
});
