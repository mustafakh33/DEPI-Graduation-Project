import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ForgotPasswordLinkSent: React.FC = () => {
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
      <main className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="flex w-full max-w-container-max justify-center">
          <Card className="relative w-full max-w-md overflow-hidden border border-[#374151] bg-[#1f2937] shadow-md">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary-container/10 blur-3xl" />
            <CardContent className="flex flex-col items-center p-stack-lg text-center">
              <div className="mb-stack-md flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                <span className="material-symbols-outlined text-4xl text-emerald-500">check_circle</span>
              </div>

              <h1 className="mb-stack-sm text-h3 font-h3 text-on-background">Reset link sent!</h1>
              <p className="mb-stack-lg text-body-md font-body-md text-on-surface-variant">
                We sent a 6-digit code to your email. Enter it below to continue.
              </p>

              <form
                className="mb-stack-md w-full space-y-stack-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate("/forgot-password/new-password");
                }}
              >
                <div className="space-y-stack-xs text-left">
                  <label className="ml-1 text-label-sm font-label-sm text-on-surface-variant" htmlFor="verify-code">
                    Verification Code
                  </label>
                  <Input
                    id="verify-code"
                    name="verify-code"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    className="h-12 border-[#374151] bg-[#11131b] text-center tracking-[0.3em] text-on-surface placeholder:text-slate-500"
                  />
                </div>

                <Button type="submit" variant="primary" className="h-12 w-full">
                  Verify Code
                </Button>
              </form>

              <Button
                type="button"
                disabled
                variant="outline"
                className="mb-stack-sm h-12 w-full cursor-not-allowed border-[#374151] bg-[#1f2937] text-[#9ca3af]"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Resend code (00:59)
              </Button>

              <Button
                type="button"
                variant="outline"
                className="mb-stack-lg h-12 w-full border-[#374151] bg-transparent text-on-surface transition-all hover:bg-surface-variant active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">support_agent</span>
                Contact support
              </Button>

              <div className="flex items-center gap-2 rounded-full border border-tertiary-container/20 bg-tertiary-container/10 px-4 py-2 text-on-tertiary-fixed-variant">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span className="text-label-sm font-label-sm">The code will expire in 30 minutes</span>
              </div>

              <Link
                to="/login"
                className="mt-stack-md inline-flex items-center gap-2 text-label-sm font-label-sm text-primary-container hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Back to Login
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <section className="pointer-events-none fixed right-0 top-0 z-0 hidden h-full w-1/4 p-6 lg:block">
        <div className="h-full w-full overflow-hidden rounded-xl border border-[#374151] shadow-lg">
          <img
            alt="Corporate Modern Workspace"
            className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPir_DgzvmLpHjgIYqLX1XD4ASiymj4071PNUxDRH5YGcqpjtngZ4uR1rPSeRN46jhKF7ONq-w39UK7wzTK6BhXkq_t1QSq7VN__Uy1rk9uF2FsYdOhz4gv3veVi8RckNalwerhFqwwSEW7X1Hb_r6dbB4evI4qQNZZUSoCXzmlKfVWpsAS7ydFZo8lyFKl914Ho1w6_iLRceuMuqF-JKgb2JvN8ISjIm3TUp0ci5zuqKtBc8lvHC1zf2WWyDpw2xglOFLt92eHEk"
          />
        </div>
      </section>
    </div>
  );
};

export default ForgotPasswordLinkSent;

