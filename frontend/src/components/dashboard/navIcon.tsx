import React from "react";

/** Material Symbols name (same visual system across student / mentor / instructor). */
export function navIcon(name: string): React.ReactNode {
  return <span className="material-symbols-outlined">{name}</span>;
}
