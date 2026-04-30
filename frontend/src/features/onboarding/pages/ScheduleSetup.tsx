import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Clock,
  CalendarDays,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Flame,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import OnboardingLayout from "@/layouts/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const STUDY_TIMES = [
  {
    id: "morning",
    label: "Morning",
    time: "6AM - 12PM",
    icon: Sunrise,
    color: "text-amber-400",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    time: "12PM - 5PM",
    icon: Sun,
    color: "text-orange-400",
  },
  {
    id: "evening",
    label: "Evening",
    time: "5PM - 9PM",
    icon: Sunset,
    color: "text-rose-400",
  },
  {
    id: "night",
    label: "Night",
    time: "9PM - 2AM",
    icon: Moon,
    color: "text-indigo-400",
  },
];
const HOURS = [5, 10, 15, 20];

export default function ScheduleSetup() {
  const navigate = useNavigate();
  const { saveSchedule, schedule } = useOnboarding();
  const [selectedDays, setSelectedDays] = useState<string[]>(
    schedule?.days ?? [],
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    schedule?.preferredTime ?? null,
  );
  const [selectedHours, setSelectedHours] = useState<number | null>(
    schedule?.weeklyCommitment ?? null,
  );

  const canContinue =
    selectedDays.length > 0 && Boolean(selectedTime) && Boolean(selectedHours);

  const toggleDay = (day: string) => {
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day],
    );
  };

  const handleContinue = () => {
    if (!selectedTime || !selectedHours || selectedDays.length === 0) return;

    saveSchedule({
      days: selectedDays,
      preferredTime: selectedTime,
      weeklyCommitment: selectedHours,
    });
    navigate("/placement-intro");
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={6}
      title="Set your learning schedule"
      subtitle="Consistency is key to mastering new skills. Let's build a routine that works for you."
    >
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">
          {/* Days */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                Which days will you study?
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {WEEKDAYS.map((day) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`w-14 h-14 rounded-xl font-medium text-sm transition-all duration-200 border ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] scale-105"
                        : "bg-black/40 text-gray-400 border-white/10 hover:bg-white/5 hover:border-white/20 hover:text-gray-200"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Time */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">
                When are you most focused?
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STUDY_TIMES.map((time) => {
                const isSelected = selectedTime === time.id;
                const Icon = time.icon;
                return (
                  <button
                    key={time.id}
                    onClick={() => setSelectedTime(time.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-purple-500/10 border-purple-500/50 ring-1 ring-purple-500/50"
                        : "bg-black/40 border-white/10 hover:bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? "bg-purple-500/20" : "bg-white/5"}`}
                    >
                      <Icon
                        className={`w-5 h-5 ${isSelected ? time.color : "text-gray-500"}`}
                      />
                    </div>
                    <div>
                      <div
                        className={`font-medium ${isSelected ? "text-white" : "text-gray-300"}`}
                      >
                        {time.label}
                      </div>
                      <div className="text-xs text-gray-500">{time.time}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Hours */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-semibold text-white">
                Weekly Commitment
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {HOURS.map((hours) => {
                const isSelected = selectedHours === hours;
                return (
                  <button
                    key={hours}
                    onClick={() => setSelectedHours(hours)}
                    className={`py-4 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                      isSelected
                        ? "bg-orange-500/10 border-orange-500/50 ring-1 ring-orange-500/50"
                        : "bg-black/40 border-white/10 hover:bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`text-xl font-bold ${isSelected ? "text-orange-400" : "text-gray-300"}`}
                    >
                      {hours}
                      {hours === 20 ? "+" : ""}
                    </span>
                    <span className="text-xs text-gray-500">hours</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50">
            <h3 className="text-lg font-semibold text-white mb-6">
              Your Commitment
            </h3>

            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Study Days</div>
                <div className="font-medium text-white">
                  {selectedDays.length > 0 ? (
                    <span>{selectedDays.length} days per week</span>
                  ) : (
                    <span className="text-gray-600">Not selected</span>
                  )}
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <div className="text-sm text-gray-500 mb-1">Weekly Goal</div>
                <div className="font-medium text-white">
                  {selectedHours ? (
                    <span>{selectedHours} hours total</span>
                  ) : (
                    <span className="text-gray-600">Not selected</span>
                  )}
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-200 leading-relaxed">
                {selectedDays.length > 0 && selectedHours ? (
                  <span>
                    That's about{" "}
                    <strong className="text-blue-400">
                      {Math.round((selectedHours / selectedDays.length) * 10) /
                        10}{" "}
                      hours
                    </strong>{" "}
                    per study day.
                    {selectedHours >= 15
                      ? " An aggressive pace!"
                      : " A steady, sustainable pace."}
                  </span>
                ) : (
                  <span>Select your schedule to see your daily breakdown.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center w-full max-w-4xl mx-auto border-t border-white/10 pt-6">
        <Button
          onClick={() => navigate("/track-selection")}
          variant="ghost"
          className="text-gray-400 hover:text-white hover:bg-white/5 rounded-xl h-12 px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={handleContinue}
          disabled={!canContinue}
          className="bg-white text-black hover:bg-gray-200 h-12 px-8 rounded-xl font-semibold group transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-[1.02] active:scale-[0.98]"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </OnboardingLayout>
  );
}
