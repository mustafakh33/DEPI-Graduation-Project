"use client";

import { AppDialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ModuleConfig } from "@/features/modules/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Values = Record<string, string | number>;

function buildSchema(config: ModuleConfig) {
  return z.object(
    Object.fromEntries(
      config.fields.map((field) => [
        field.name,
        field.type === "number"
          ? z.coerce.number().optional()
          : field.required
            ? z.string().min(1, `${field.label} is required`)
            : z.string().optional(),
      ]),
    ),
  );
}

export function EntityFormDialog({
  open,
  onOpenChange,
  config,
  initialValues,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: ModuleConfig;
  initialValues?: Record<string, unknown> | null;
  onSubmit: (values: Values) => Promise<void>;
}) {
  const schema = buildSchema(config);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: Object.fromEntries(config.fields.map((field) => [field.name, ""])),
  });

  useEffect(() => {
    if (open) {
      form.reset({
        ...Object.fromEntries(config.fields.map((field) => [field.name, ""])),
        ...(initialValues ?? {}),
      } as Values);
    }
  }, [config.fields, form, initialValues, open]);

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={initialValues ? `Edit ${config.title.slice(0, -1)}` : config.createLabel}
      description={config.description}
    >
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(async (values) => {
          await onSubmit(values);
          onOpenChange(false);
        })}
      >
        {config.fields.map((field) => {
          const error = form.formState.errors[field.name]?.message?.toString();
          const common = form.register(field.name);
          return (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium">{field.label}</label>
              {field.type === "textarea" ? (
                <Textarea {...common} />
              ) : field.type === "select" ? (
                <Select {...common}>
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input type={field.type} {...common} />
              )}
              {error ? <p className="text-sm text-danger">{error}</p> : null}
            </div>
          );
        })}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">{initialValues ? "Save changes" : config.createLabel}</Button>
        </div>
      </form>
    </AppDialog>
  );
}
