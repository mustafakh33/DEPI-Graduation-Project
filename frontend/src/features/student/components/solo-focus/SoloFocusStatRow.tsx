interface SoloFocusStatRowProps {
  label: string;
  value: string;
}

const SoloFocusStatRow = ({ label, value }: SoloFocusStatRowProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5">
      <span className="text-[11px] text-slate-200">{label}</span>
      <span className="text-[11px] font-bold text-cyan-300">{value}</span>
    </div>
  );
};

export default SoloFocusStatRow;