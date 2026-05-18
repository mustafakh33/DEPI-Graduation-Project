import type { ReactNode } from "react";

interface SoloFocusGlassCardProps {
  children: ReactNode;
  className?: string;
}

const SoloFocusGlassCard = ({
  children,
  className = "",
}: SoloFocusGlassCardProps) => {
  return (
    <div
      className={`rounded-[24px] border border-white/15 bg-slate-950/35 p-4 shadow-2xl backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
};

export default SoloFocusGlassCard;