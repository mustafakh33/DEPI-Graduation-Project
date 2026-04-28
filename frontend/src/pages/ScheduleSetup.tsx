import { useState } from "react";
import { useNavigate } from "react-router";

import { AvailableDaysSection } from "@/components/schedule-setup/AvailableDaysSection";
import { ScheduleSetupFooter } from "@/components/schedule-setup/ScheduleSetupFooter";
import { ScheduleSetupHeader } from "@/components/schedule-setup/ScheduleSetupHeader";
import { ScheduleSetupNavbar } from "@/components/schedule-setup/ScheduleSetupNavbar";
import { ScheduleSummaryCard } from "@/components/schedule-setup/ScheduleSummaryCard";
import { StudyTimeSection } from "@/components/schedule-setup/StudyTimeSection";
import { WeeklyCommitmentSection } from "@/components/schedule-setup/WeeklyCommitmentSection";
import { useOnboarding } from "@/store/onboarding/OnboardingContext";

export default function ScheduleSetup() {
  const navigate = useNavigate();
  const { saveSchedule, schedule } = useOnboarding();
  const [selectedDays, setSelectedDays] = useState<string[]>(schedule?.days ?? []);
  const [selectedTime, setSelectedTime] = useState<string | null>(
    schedule?.preferredTime ?? null,
  );
  const [selectedHours, setSelectedHours] = useState<number | null>(
    schedule?.weeklyCommitment ?? null,
  );

  const canContinue =
    selectedDays.length > 0 && Boolean(selectedTime) && Boolean(selectedHours);

  const toggleDay = (day: string) => {
    setSelectedDays((currentDays) =>
      currentDays.includes(day)
        ? currentDays.filter((currentDay) => currentDay !== day)
        : [...currentDays, day],
    );
  };

  const handleContinue = () => {
    if (!selectedTime || !selectedHours || selectedDays.length === 0) {
      return;
    }

    saveSchedule({
      days: selectedDays,
      preferredTime: selectedTime,
      weeklyCommitment: selectedHours,
    });
    navigate("/placement-intro");
  };

  return (
    <div className="min-h-screen bg-[#11131b] font-body-md text-body-md text-[#e1e2ed] selection:bg-[#2563eb] selection:text-[#eeefff]">
      <ScheduleSetupNavbar />

      <main className="mx-auto max-w-container-max px-margin pb-32 pt-24">
        <ScheduleSetupHeader />

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <div className="space-y-stack-lg lg:col-span-8">
            <AvailableDaysSection
              onToggleDay={toggleDay}
              selectedDays={selectedDays}
            />
            <StudyTimeSection
              onSelectTime={setSelectedTime}
              selectedTime={selectedTime}
            />
            <WeeklyCommitmentSection
              onSelectHours={setSelectedHours}
              selectedHours={selectedHours}
            />
          </div>

          <div className="lg:col-span-4">
            <ScheduleSummaryCard
              selectedDaysCount={selectedDays.length}
              selectedHours={selectedHours}
            />
          </div>
        </div>
      </main>

      <ScheduleSetupFooter
        canContinue={canContinue}
        onBack={() => navigate("/track-selection")}
        onContinue={handleContinue}
      />
    </div>
  );
}
