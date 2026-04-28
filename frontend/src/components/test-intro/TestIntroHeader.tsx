export function TestIntroHeader() {
  return (
    <div className="mb-stack-lg">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#b4c5ff]">
          Step 3 of 4
        </span>
        <div className="flex h-1 w-48 overflow-hidden rounded-full bg-[#1d1f27]">
          <div className="h-full w-3/4 rounded-full bg-[#2563eb]" />
        </div>
      </div>

      <h1 className="mb-2 font-h1 text-h1 text-[#e1e2ed]">
        Placement Test
      </h1>
      <p className="max-w-2xl font-body-lg text-body-lg text-[#c3c6d7]">
        One test to find your exact starting point. Our adaptive engine
        evaluates your skills in real-time to personalize your learning path.
      </p>
    </div>
  );
}
