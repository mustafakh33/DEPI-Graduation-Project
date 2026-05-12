import { BatchPreviewCard } from "@/features/onboarding/components/final-welcome/BatchPreviewCard";
import { RoadmapPreviewCard } from "@/features/onboarding/components/final-welcome/RoadmapPreviewCard";
import { WeekPlanPreviewCard } from "@/features/onboarding/components/final-welcome/WeekPlanPreviewCard";

export function FeaturePreviewGrid() {
  return (
    <section className="grid w-full grid-cols-1 gap-gutter md:grid-cols-3">
      <RoadmapPreviewCard />
      <BatchPreviewCard />
      <WeekPlanPreviewCard />
    </section>
  );
}
