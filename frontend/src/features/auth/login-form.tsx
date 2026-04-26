"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AUTH_COOKIE } from "@/lib/constants";
import { api } from "@/lib/api";
import { AuthResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@unihub.com",
      password: "Admin123!",
    },
  });

  async function onSubmit(values: LoginValues) {
    try {
      setLoading(true);
      setError("");
      const payload = await api.post<AuthResponse>("/auth/login", values);
      document.cookie = `${AUTH_COOKIE}=${payload.token}; path=/; max-age=28800`;
      localStorage.setItem("admin_lms_user", JSON.stringify(payload.user));
      router.push("/dashboard");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr,0.9fr]">
      <section className="grid-surface hidden bg-hero-mesh p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="max-w-lg">
          <div className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-panel">
            Admin LMS Control Center
          </div>
          <h1 className="mt-8 text-5xl font-semibold leading-tight tracking-tight text-slate-950">
            Operate sessions, cohorts, surveys, and support from one clean dashboard.
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Built around the requested Stitch-style layout with bilingual support and dense operational modules.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <p className="text-sm text-muted-foreground">Realtime operations</p>
            <p className="mt-3 text-2xl font-semibold">12 modules</p>
            <p className="mt-2 text-sm text-muted-foreground">Dashboard, sessions, users, students, groups, tickets, surveys and more.</p>
          </Card>
          <Card className="bg-slate-950 p-5 text-white">
            <p className="font-arabic text-lg font-bold">إدارة كاملة للمنصة</p>
            <p className="mt-2 text-sm text-white/70">الجلسات، الحضور، الشكاوى، والاستبيانات في مكان واحد.</p>
          </Card>
        </div>
      </section>

      <section className="flex items-center justify-center p-6 lg:p-12">
        <Card className="w-full max-w-xl p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-primary p-3 text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl font-semibold">Sign in to UniHub</div>
              <div className="text-sm text-muted-foreground">Use the seeded admin account to access the dashboard.</div>
            </div>
          </div>

          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input {...form.register("email")} />
              {form.formState.errors.email ? (
                <p className="text-sm text-danger">{form.formState.errors.email.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input type="password" {...form.register("password")} />
              {form.formState.errors.password ? (
                <p className="text-sm text-danger">{form.formState.errors.password.message}</p>
              ) : null}
            </div>

            {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </Button>

            <div className="rounded-2xl bg-secondary p-4 text-sm text-secondary-foreground">
              Demo credentials: <strong>admin@unihub.com</strong> / <strong>Admin123!</strong>
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
}
