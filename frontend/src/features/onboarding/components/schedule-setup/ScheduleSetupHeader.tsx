export function ScheduleSetupHeader() {
  return (
    <>
      <div className="mb-stack-lg flex flex-col items-center">
        <span className="mb-stack-sm font-label-md text-label-md tracking-widest text-[#b4c5ff]">
          STEP 2 OF 4
        </span>
        <div className="h-1.5 w-full max-w-md overflow-hidden rounded-full bg-[#1d1f27]">
          <div className="h-full w-1/2 rounded-full bg-[#2563eb]" />
        </div>
      </div>

      <div className="mb-stack-lg text-center">
        <h1 className="mb-stack-sm font-h2 text-h2 text-[#e1e2ed]">
          Set Your Schedule
        </h1>
        <p className="font-body-lg text-body-lg text-[#c3c6d7]">
          Tell us when you're available. We'll place you with students who
          share your schedule.
        </p>
      </div>
    </>
  );
}
