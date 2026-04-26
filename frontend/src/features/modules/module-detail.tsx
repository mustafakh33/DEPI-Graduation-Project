"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { EntityRecord } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { moduleConfigs } from "./config";

function getToken() {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((part) => part.startsWith("admin_lms_token="));
  return cookie?.split("=")[1] ?? null;
}

export function ModuleDetail({ moduleKey, id }: { moduleKey: keyof typeof moduleConfigs; id: string }) {
  const config = moduleConfigs[moduleKey];
  const query = useQuery({
    queryKey: ["module-detail", moduleKey, id],
    queryFn: () => api.get<EntityRecord>(`/modules/${moduleKey}/${id}`, getToken()),
  });

  if (query.isLoading) {
    return <div className="rounded-[28px] bg-white p-8 shadow-panel">Loading details...</div>;
  }

  if (query.isError || !query.data) {
    return <div className="rounded-[28px] bg-rose-50 p-8 text-rose-700 shadow-panel">Failed to load record details.</div>;
  }

  const record = query.data;
  const replies = Array.isArray(record.replies) ? record.replies : [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={config.eyebrow}
        title={String(record.name ?? record.title ?? `${config.title.slice(0, -1)} detail`)}
        description="Detailed record view with metadata, current state, and available operational context."
        actions={<Link href={`/${moduleKey}`} className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium shadow-panel">Back to {config.title}</Link>}
      />

      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(record)
            .filter(([key]) => key !== "replies")
            .map(([key, value]) => (
              <div key={key} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{key}</p>
                <div className="mt-2 text-base font-medium">
                  {key === "status" && typeof value === "string" ? <Badge value={value} /> : String(value)}
                </div>
              </div>
            ))}
        </div>
      </Card>

      {replies.length ? (
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Reply thread</h3>
          <div className="mt-5 space-y-4">
            {replies.map((reply) => {
              const safeReply = reply as Record<string, string>;
              return (
                <div key={safeReply.id} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-medium">{safeReply.author}</div>
                    <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{safeReply.role}</div>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{safeReply.body}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{safeReply.createdAt}</p>
                </div>
              );
            })}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
