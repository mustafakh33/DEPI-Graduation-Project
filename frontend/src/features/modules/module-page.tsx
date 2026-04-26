"use client";

import { PageHeader } from "@/components/layout/page-header";
import { EntityFormDialog } from "@/components/modules/entity-form-dialog";
import { EntityTable } from "@/components/modules/entity-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { EntityRecord, ModuleResponse } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Database, Filter, Search } from "lucide-react";
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
    return <div className="rounded-xl border border-border bg-card p-8 shadow-panel">Loading {config.title.toLowerCase()}...</div>;
  }

  if (query.isError || !query.data) {
    return <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-8 text-rose-200 shadow-panel">Failed to load {config.title.toLowerCase()}.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        actions={<Button onClick={() => setDialogOpen(true)}>{config.createLabel}</Button>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Visible records</p>
              <p className="mt-3 text-3xl font-black text-white">{query.data.total}</p>
            </div>
            <div className="rounded-lg bg-primary/15 p-3 text-primary">
              <Database className="h-5 w-5" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Filtered status</p>
              <p className="mt-3 text-3xl font-black text-white">{status || "All"}</p>
            </div>
            <div className="rounded-lg bg-emerald-500/15 p-3 text-emerald-300">
              <Filter className="h-5 w-5" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Search term</p>
              <p className="mt-3 truncate text-3xl font-black text-white">{search || "-"}</p>
            </div>
            <div className="rounded-lg bg-amber-500/15 p-3 text-amber-300">
              <Search className="h-5 w-5" />
            </div>
          </div>
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
