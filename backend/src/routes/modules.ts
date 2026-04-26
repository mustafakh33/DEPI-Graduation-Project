import { Router } from "express";
import { z } from "zod";
import {
  createModuleRecord,
  deleteModuleRecord,
  exportModuleRecords,
  getModuleRecord,
  listModuleRecords,
  updateModuleRecord,
} from "../modules/module-service";

const importSchema = z.object({
  fileName: z.string(),
  importedRows: z.number().optional(),
});

export const modulesRouter = Router();

modulesRouter.get("/:module", (request, response) => {
  try {
    const result = listModuleRecords(request.params.module, request.query as Record<string, string>);
    response.json(result);
  } catch (error) {
    response.status(404).json({ message: error instanceof Error ? error.message : "Unknown module" });
  }
});

modulesRouter.get("/:module/export", (request, response) => {
  try {
    const csv = exportModuleRecords(request.params.module);
    response.header("Content-Type", "text/csv");
    response.send(csv);
  } catch (error) {
    response.status(404).json({ message: error instanceof Error ? error.message : "Unknown module" });
  }
});

modulesRouter.post("/:module/import", (request, response) => {
  const parsed = importSchema.safeParse(request.body);
  if (!parsed.success) {
    return response.status(400).json({ message: "Invalid import payload" });
  }

  return response.json({
    message: "Import logged successfully",
    log: {
      id: `imp-${Date.now()}`,
      status: "completed",
      ...parsed.data,
      createdAt: new Date().toISOString(),
    },
  });
});

modulesRouter.get("/:module/:id", (request, response) => {
  try {
    const result = getModuleRecord(request.params.module, request.params.id);
    response.json(result);
  } catch (error) {
    response.status(404).json({ message: error instanceof Error ? error.message : "Record not found" });
  }
});

modulesRouter.post("/:module", (request, response) => {
  try {
    const result = createModuleRecord(request.params.module, request.body);
    response.status(201).json(result);
  } catch (error) {
    response.status(400).json({ message: error instanceof Error ? error.message : "Invalid payload" });
  }
});

modulesRouter.put("/:module/:id", (request, response) => {
  try {
    const result = updateModuleRecord(request.params.module, request.params.id, request.body);
    response.json(result);
  } catch (error) {
    response.status(400).json({ message: error instanceof Error ? error.message : "Invalid payload" });
  }
});

modulesRouter.delete("/:module/:id", (request, response) => {
  try {
    const result = deleteModuleRecord(request.params.module, request.params.id);
    response.json(result);
  } catch (error) {
    response.status(404).json({ message: error instanceof Error ? error.message : "Record not found" });
  }
});
