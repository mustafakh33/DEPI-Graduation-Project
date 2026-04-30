import { Navigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";

export default function OnboardingDashboard() {
  const { result, schedule, selectedTrack, user } = useOnboarding();

  if (!user || !selectedTrack || !schedule || !result) {
    return <Navigate replace to="/signup" />;
  }

  return (
    <div className="min-h-screen bg-[#11131b] p-margin font-body-md text-[#e1e2ed]">
      <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-container-max flex-col justify-center gap-gutter">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#b4c5ff]">
            Dashboard
          </span>
          <h1 className="mt-stack-sm font-h1 text-h1 text-[#e1e2ed]">
            Welcome back, {user.name}
          </h1>
          <p className="mt-stack-sm max-w-2xl font-body-lg text-body-lg text-[#c3c6d7]">
            Your onboarding is complete. Your personalized learning workspace is
            ready.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-4">
          {[
            ["Track", selectedTrack.title],
            ["Level", result.level],
            ["Schedule", `${schedule.days.length} selected days`],
            ["Commitment", `${schedule.weeklyCommitment} hrs/week`],
          ].map(([label, value]) => (
            <Card
              className="rounded-xl border border-[#434655]/30 !bg-[#1d1f27] p-stack-md shadow-md"
              key={label}
            >
              <span className="font-label-sm text-label-sm uppercase text-[#8d90a0]">
                {label}
              </span>
              <p className="mt-stack-sm font-h3 text-h3 text-[#e1e2ed]">
                {value}
              </p>
            </Card>
          ))}
        </div>

        <Button className="w-full rounded-lg !bg-[#2563eb] px-12 py-4 font-label-md text-body-lg !text-[#eeefff] hover:brightness-110 md:w-fit">
          Start Learning
        </Button>
      </main>
    </div>
  );
}
