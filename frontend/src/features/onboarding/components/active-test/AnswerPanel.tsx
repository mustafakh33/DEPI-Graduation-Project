import { Info } from "lucide-react";

import { AnswerOption } from "@/features/onboarding/components/active-test/AnswerOption";
import type { PlacementQuestion } from "@/features/onboarding/data/questions";

type AnswerPanelProps = {
  question: PlacementQuestion;
  selectedAnswer: string;
  onSelectAnswer: (answer: string) => void;
};

export function AnswerPanel({
  question,
  selectedAnswer,
  onSelectAnswer,
}: AnswerPanelProps) {
  return (
    <div className="flex flex-col gap-stack-sm lg:col-span-5">
      <div className="flex h-full flex-col gap-stack-sm">
        {question.answers.map((answer, index) => (
          <AnswerOption
            id={answer.id}
            isSelected={selectedAnswer === answer.id}
            key={answer.id}
            label={String.fromCharCode(65 + index)}
            onSelect={onSelectAnswer}
            value={answer.text}
          />
        ))}

        <div className="mt-auto flex items-start gap-stack-sm pt-stack-md opacity-60">
          <Info className="mt-1 size-4 shrink-0" />
          <p className="font-label-sm text-label-sm text-[#e1e2ed]">
            Select an option to enable the next button. You can change your
            selection at any time before proceeding.
          </p>
        </div>
      </div>
    </div>
  );
}
