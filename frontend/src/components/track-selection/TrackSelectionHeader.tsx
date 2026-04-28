export function TrackSelectionHeader() {
  return (
    <div className="mb-stack-lg text-center lg:text-left">
      <div className="mb-stack-md inline-flex items-center gap-unit rounded-full border border-[#434655] bg-[#282a32] px-stack-md py-stack-xs">
        <span className="font-label-sm text-label-sm text-[#b4c5ff]">
          Step 1 of 4
        </span>
        <div className="flex gap-1">
          <div className="h-1 w-6 rounded-full bg-[#b4c5ff]" />
          <div className="h-1 w-6 rounded-full bg-[#32343d]" />
          <div className="h-1 w-6 rounded-full bg-[#32343d]" />
          <div className="h-1 w-6 rounded-full bg-[#32343d]" />
        </div>
      </div>

      <h1 className="mb-stack-sm font-h1 text-h1 text-[#e1e2ed]">
        Choose Your Track
      </h1>
      <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-[#c3c6d7] lg:mx-0">
        Pick the path you want to master. Your placement test will determine
        your level within it.
      </p>
    </div>
  );
}
