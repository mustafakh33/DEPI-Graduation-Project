"use client";

import { EntityFormDialog } from "@/components/modules/entity-form-dialog";
import { EntityTable } from "@/components/modules/entity-table";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { EntityRecord, ModuleResponse } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { moduleConfigs } from "./config";

function getToken() {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((part) => part.startsWith("admin_lms_token="));
  return cookie?.split("=")[1] ?? null;
}

export function ModulePage({ moduleKey }: { moduleKey: keyof typeof moduleConfigs }) {
  const config = moduleConfigs[moduleKey];
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EntityRecord | null>(null);

  const queryKey = useMemo(() => ["module", moduleKey, page, search, status], [moduleKey, page, search, status]);

  const query = useQuery({
    queryKey,
    queryFn: () =>
      api.get<ModuleResponse>(
        `/modules/${moduleKey}?page=${page}&pageSize=8&search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`,
        getToken(),
      ),
  });

  const saveMutation = useMutation({
    mutationFn: async (values: Record<string, unknown>) => {
      if (editing) {
        await api.put(`/modules/${moduleKey}/${editing.id}`, values, getToken());
      } else {
        await api.post(`/modules/${moduleKey}`, values, getToken());
      }
    },
    onSuccess: async () => {
      setEditing(null);
      await queryClient.invalidateQueries({ queryKey: ["module", moduleKey] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (row: EntityRecord) => api.del(`/modules/${moduleKey}/${row.id}`, getToken()),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["module", moduleKey] });
    },
  });

  async function handleExport() {
    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000/api"}/modules/${moduleKey}/export`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const text = await response.text();
    const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${moduleKey}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport() {
    await api.post(
      `/modules/${moduleKey}/import`,
      {
        fileName: `${moduleKey}-bulk.xlsx`,
        importedRows: 12,
      },
      getToken(),
    );
    alert("Import log created successfully.");
  }

  if (query.isLoading) {
    return <div className="rounded-[28px] bg-white p-8 shadow-panel">Loading {config.title.toLowerCase()}...</div>;
  }

  if (query.isError || !query.data) {
    return <div className="rounded-[28px] bg-rose-50 p-8 text-rose-700 shadow-panel">Failed to load {config.title.toLowerCase()}.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        actions={
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
            {config.createLabel}
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Visible records</p>
          <p className="mt-3 text-3xl font-semibold">{query.data.total}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Filtered status</p>
          <p className="mt-3 text-3xl font-semibold">{status || "All"}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Search term</p>
          <p className="mt-3 text-3xl font-semibold">{search || "—"}</p>
        </Card>
      </div>

      <EntityTable
        config={config}
        rows={query.data.items}
        page={query.data.page}
        totalPages={query.data.totalPages}
        search={search}
        status={status}
        onSearchChange={(value) => {
          setPage(1);
          setSearch(value);
        }}
        onStatusChange={(value) => {
          setPage(1);
          setStatus(value);
        }}
        onPageChange={setPage}
        onCreate={() => {
          setEditing(null);
          setDialogOpen(true);
        }}
        onEdit={(row) => {
          setEditing(row);
          setDialogOpen(true);
        }}
        onDelete={(row) => {
          deleteMutation.mutate(row);
        }}
        onExport={handleExport}
        onImport={handleImport}
      />

      <EntityFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditing(null);
          }
        }}
        config={config}
        initialValues={editing}
        onSubmit={async (values) => {
          await saveMutation.mutateAsync(values);
        }}
      />
    </div>
  );
}
