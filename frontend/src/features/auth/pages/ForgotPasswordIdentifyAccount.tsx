import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ForgotPasswordIdentifyAccount: React.FC = () => {
  const navigate = useNavigate();
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


      <main className="flex min-h-screen flex-col md:flex-row">
        <section className="relative hidden items-center justify-center overflow-hidden bg-surface-container p-12 md:flex md:w-1/2">
          <div className="absolute inset-0 z-0">
            <img
              alt="Campus Library"
              className="h-full w-full object-cover opacity-30 grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwF2YAKPvcBXdiwGLuNVendIgj-4-VpliCfkmpK_LL2StgCQ-hQLPAn3ur53wA4wbuIy014OU5oX1QGIsQculCGjJ0bVkao0rDVzqO-2QRHfAH5qZz7OADhWJJmdq5cabNOAPseWH7_gUHXrBvyaG0QJYYgt482k1iig6dyuE5n-GA6nozdB5ckwIi9laVSZwIZm2wy2dGhc4QqC6818WyHv7nrSAXj1xZZ-Pw0AZCzCQClZXaJb50kKV_gB41LYEjINSZUKsrpBE"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-md">
            <h2 className="text-h1 font-h1 mb-stack-md text-on-surface leading-tight">
              Master your academic journey.
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant">
              Centralized access to your courses, schedules, and community. Log back in to continue
              your progress.
            </p>

            <div className="mt-stack-lg grid grid-cols-2 gap-stack-md">
              <Card className="border-outline-variant bg-surface-container-high">
                <CardContent className="p-stack-md">
                  <span className="material-symbols-outlined mb-stack-sm text-primary">security</span>
                  <div className="text-label-md font-label-md text-on-surface">Secure Access</div>
                  <div className="text-body-sm font-body-sm text-on-surface-variant">
                    Industry standard encryption
                  </div>
                </CardContent>
              </Card>
              <Card className="border-outline-variant bg-surface-container-high">
                <CardContent className="p-stack-md">
                  <span className="material-symbols-outlined mb-stack-sm text-primary">bolt</span>
                  <div className="text-label-md font-label-md text-on-surface">Quick Recovery</div>
                  <div className="text-body-sm font-body-sm text-on-surface-variant">
                    Instant reset links
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="flex w-full items-center justify-center p-6 md:w-1/2 md:p-12">
          <div className="w-full max-w-md space-y-stack-lg">
            <div className="space-y-stack-sm">
              <h1 className="text-h2 font-h2 text-on-surface">Forgot your password?</h1>
              <p className="text-body-md font-body-md text-on-surface-variant">
                No worries. Enter your email and we’ll send you a verification code.
              </p>
            </div>

            <form
              className="space-y-stack-md"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/forgot-password/verify-code");
              }}
            >
              <div className="space-y-stack-xs">
                <label className="text-label-sm font-label-sm ml-1 text-on-surface-variant" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                    mail
                  </span>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    className="h-12 rounded-lg border-[#374151] bg-[#1f2937] pl-10 text-[#f9fafb] placeholder:text-[#9ca3af] focus-visible:ring-primary-container"
                  />
                </div>
                <p className="text-body-sm font-body-sm mt-2 ml-1 text-[#9ca3af]">
                  Use the email associated with your account
                </p>
              </div>

              <Button type="submit" variant="primary" className="h-14 w-full text-label-md font-label-md">
                Send Verification Code
              </Button>
            </form>

            <div className="flex flex-col items-center gap-stack-md">
              <Link
                className="group flex items-center gap-2 text-primary-container text-label-md font-label-md hover:underline"
                to="/login"
              >
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
                  arrow_back
                </span>
                Back to Login
              </Link>
            </div>

          </div>
        </section>
      </main>

 
    </div>
  );
};

export default ForgotPasswordIdentifyAccount;

