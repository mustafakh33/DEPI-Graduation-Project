import { z } from "zod";
import { ticketReplies } from "../data/seed";
import { toCsv } from "../lib/csv";
import { paginate } from "../lib/paginate";
import { getModuleDefinition } from "./config";

const genericEntitySchema = z.record(z.any());

export function listModuleRecords(
  key: string,
  query: { search?: string; status?: string; page?: string; pageSize?: string; sort?: string },
) {
  const definition = getModuleDefinition(key);
  if (!definition) {
    throw new Error("Unknown module");
  }

  const search = query.search?.toLowerCase().trim();
  const status = query.status?.toLowerCase().trim();
  const page = Number(query.page ?? 1);
  const pageSize = Number(query.pageSize ?? 10);
  const sortField = query.sort;

  let records = [...definition.records];

  if (search) {
    records = records.filter((record) =>
      definition.searchFields.some((field) =>
        String(record[field] ?? "")
          .toLowerCase()
          .includes(search),
      ),
    );
  }

  if (status && definition.statusField) {
    records = records.filter(
      (record) => String(record[definition.statusField ?? "status"] ?? "").toLowerCase() === status,
    );
  }

  if (sortField) {
    records.sort((a, b) => String(a[sortField] ?? "").localeCompare(String(b[sortField] ?? "")));
  } else {
    records.sort((a, b) => String(b.updatedAt ?? "").localeCompare(String(a.updatedAt ?? "")));
  }

  return paginate(records, page, pageSize);
}

export function getModuleRecord(key: string, id: string) {
  const definition = getModuleDefinition(key);
  if (!definition) {
    throw new Error("Unknown module");
  }

  const record = definition.records.find((item) => item.id === id);
  if (!record) {
    throw new Error("Record not found");
  }

  if (key === "tickets") {
    return {
      ...record,
      replies: ticketReplies[id as keyof typeof ticketReplies] ?? [],
    };
  }

  return record;
}

export function createModuleRecord(key: string, payload: unknown) {
  const definition = getModuleDefinition(key);
  if (!definition) {
    throw new Error("Unknown module");
  }

  const parsed = genericEntitySchema.parse(payload);
  const id = `${definition.singular.slice(0, 3)}-${Date.now()}`;
  const record = {
    id,
    ...parsed,
    status: parsed.status ?? "draft",
    createdAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  definition.records.unshift(record);
  return record;
}

export function updateModuleRecord(key: string, id: string, payload: unknown) {
  const definition = getModuleDefinition(key);
  if (!definition) {
    throw new Error("Unknown module");
  }

  const parsed = genericEntitySchema.parse(payload);
  const index = definition.records.findIndex((record) => record.id === id);
  if (index === -1) {
    throw new Error("Record not found");
  }

  const updated = {
    ...definition.records[index],
    ...parsed,
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  definition.records[index] = updated;
  return updated;
}

export function deleteModuleRecord(key: string, id: string) {
  const definition = getModuleDefinition(key);
  if (!definition) {
    throw new Error("Unknown module");
  }

  const index = definition.records.findIndex((record) => record.id === id);
  if (index === -1) {
    throw new Error("Record not found");
  }

  const [deleted] = definition.records.splice(index, 1);
  return deleted;
}

export function exportModuleRecords(key: string) {
  const definition = getModuleDefinition(key);
  if (!definition) {
    throw new Error("Unknown module");
  }

  return toCsv(definition.records);
}
