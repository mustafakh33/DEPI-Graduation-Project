"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ModuleConfig } from "@/features/modules/config";
import { EntityRecord } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Download, Eye, Pencil, Search, Trash2, Upload } from "lucide-react";
import Link from "next/link";

export function EntityTable({
  config,
  rows,
  page,
  totalPages,
  search,
  status,
  onSearchChange,
  onStatusChange,
  onPageChange,
  onCreate,
  onEdit,
  onDelete,
  onExport,
  onImport,
}: {
  config: ModuleConfig;
  rows: EntityRecord[];
  page: number;
  totalPages: number;
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onCreate: () => void;
  onEdit: (row: EntityRecord) => void;
  onDelete: (row: EntityRecord) => void;
  onExport: () => void;
  onImport: () => void;
}) {
  const columns: ColumnDef<EntityRecord>[] = [
    ...config.columns.map((column) => ({
      accessorKey: column.key,
      header: column.label,
      cell: ({ row }: CellContext<EntityRecord, unknown>) => {
        const value = row.original[column.key];
        if (column.key === "status" && typeof value === "string") {
          return <Badge value={value} />;
        }
        return <span className="text-sm text-slate-700">{String(value ?? "—")}</span>;
      },
    })),
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: CellContext<EntityRecord, unknown>) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/${config.key}/${row.original.id}`}
            className="rounded-xl border border-border p-2 text-slate-500 transition hover:bg-secondary hover:text-slate-900"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <button
            className="rounded-xl border border-border p-2 text-slate-500 transition hover:bg-secondary hover:text-slate-900"
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            className="rounded-xl border border-border p-2 text-rose-500 transition hover:bg-rose-50"
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-border/70 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => onSearchChange(event.target.value)} className="pl-9" placeholder={`Search ${config.title.toLowerCase()}...`} />
          </div>
          <Select className="sm:max-w-[220px]" value={status} onChange={(event) => onStatusChange(event.target.value)}>
            <option value="">All statuses</option>
            {config.statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={onImport}>
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={onExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" onClick={onCreate}>
            {config.createLabel}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-50/90">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-border/70 bg-white">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-4 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border/70 p-5">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            className={cn("rounded-xl border border-border px-3 py-2 text-sm", page <= 1 && "pointer-events-none opacity-40")}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </button>
          <button
            className={cn("rounded-xl border border-border px-3 py-2 text-sm", page >= totalPages && "pointer-events-none opacity-40")}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}
