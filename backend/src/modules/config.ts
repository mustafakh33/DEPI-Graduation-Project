import { moduleStore } from "../data/seed";
import { ModuleDefinition, ModuleKey } from "../types";

const modules: ModuleDefinition[] = [
  { key: "users", singular: "user", searchFields: ["name", "email", "role"], statusField: "status", records: moduleStore.users },
  { key: "students", singular: "student", searchFields: ["name", "email", "group", "level"], statusField: "status", records: moduleStore.students },
  { key: "groups", singular: "group", searchFields: ["name", "code", "trainer", "admins"], statusField: "status", records: moduleStore.groups },
  { key: "sessions", singular: "session", searchFields: ["title", "group", "trainer", "mode"], statusField: "status", records: moduleStore.sessions },
  { key: "community", singular: "post", searchFields: ["title", "type", "author"], statusField: "status", records: moduleStore.community },
  { key: "tickets", singular: "ticket", searchFields: ["title", "requester", "assignee", "priority"], statusField: "status", records: moduleStore.tickets },
  { key: "surveys", singular: "survey", searchFields: ["title", "audience"], statusField: "status", records: moduleStore.surveys },
  { key: "quizzes", singular: "quiz", searchFields: ["title", "group"], statusField: "status", records: moduleStore.quizzes },
  { key: "assessments", singular: "assessment", searchFields: ["title", "type"], statusField: "status", records: moduleStore.assessments }
];

export function getModuleDefinition(key: string) {
  return modules.find((module) => module.key === key as ModuleKey);
}

export function getAllModules() {
  return modules;
}
