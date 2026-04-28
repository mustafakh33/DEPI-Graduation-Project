import { School } from "lucide-react";

type FinalWelcomeHeroProps = {
  name: string;
};

export function FinalWelcomeHero({ name }: FinalWelcomeHeroProps) {
  return (
    <header className="flex flex-col items-center">
      <div className="mb-stack-md flex size-24 items-center justify-center rounded-full bg-[#2563eb]/20 ring-4 ring-[#2563eb]/10">
        <School className="size-16 text-[#b4c5ff]" />
      </div>
      <h1 className="mb-stack-sm font-h1 text-h1 text-[#e1e2ed]">
        You're All Set, {name}!
      </h1>
      <p className="max-w-2xl font-body-lg text-body-lg text-[#c3c6d7]">
        Your academic profile is ready. We've optimized your learning path to
        help you reach your goals faster.
      </p>
    </header>
  );
}
