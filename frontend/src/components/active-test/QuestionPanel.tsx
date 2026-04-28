import { Card } from "@/components/ui/card";
import type { PlacementQuestion } from "@/store/onboarding/questions";

type QuestionPanelProps = {
  question: PlacementQuestion;
};

export function QuestionPanel({ question }: QuestionPanelProps) {
  return (
    <div className="flex flex-col gap-stack-md lg:col-span-7">
      <Card className="rounded-xl border border-[#434655]/10 bg-[#1d1f27] p-stack-lg text-[#e1e2ed] shadow-md">
        <span className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-[#b4c5ff]">
          {question.category}
        </span>
        <h2 className="mb-stack-md font-h3 text-h3 text-[#e1e2ed]">
          {question.prompt}
        </h2>

        {question.code && (
          <div className="overflow-x-auto rounded-lg border border-[#434655] bg-[#0c0e16] p-stack-md font-mono text-sm leading-relaxed">
            <pre className="text-[#c3c6d7]">
              <code>{question.code}</code>
            </pre>
          </div>
        )}

        <p className="mt-stack-md font-body-md text-body-md text-[#c3c6d7]">
          {question.helper}
        </p>
      </Card>
    </div>
  );
}
