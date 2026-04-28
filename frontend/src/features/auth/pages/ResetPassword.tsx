import React, { useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ResetPassword: React.FC = () => {
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    if (!hadDark) root.classList.add("dark");
    return () => {
      if (!hadDark) root.classList.remove("dark");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#11131b] text-on-background">
      <main className="flex min-h-screen items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md border-[#374151] bg-[#1f2937]">
          <CardContent className="space-y-stack-md p-stack-lg">
            <div className="text-center">
              <h1 className="text-h3 font-h3 text-on-background">Create new password</h1>
              <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
                Your new password must be different from previously used passwords.
              </p>
            </div>

            <form
              className="space-y-stack-md"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="space-y-stack-xs">
                <label className="ml-1 text-label-sm font-label-sm text-on-surface-variant" htmlFor="new-password">
                  New Password
                </label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  className="h-12 border-[#374151] bg-[#11131b] text-on-surface placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-stack-xs">
                <label className="ml-1 text-label-sm font-label-sm text-on-surface-variant" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm password"
                  className="h-12 border-[#374151] bg-[#11131b] text-on-surface placeholder:text-slate-500"
                />
              </div>

              <Button type="submit" variant="primary" className="h-12 w-full">
                Save New Password
              </Button>
            </form>

            <div className="text-center">
              <Link to="/login" className="text-label-sm font-label-sm text-primary-container hover:underline">
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ResetPassword;
