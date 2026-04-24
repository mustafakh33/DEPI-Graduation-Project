import React from "react";

interface SidebarHeaderProps {
  logo?: React.ReactNode;
  appName?: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  logo,
  appName = "UniHub",
}) => (
  <div className="sidebar-header">
    {logo && <span className="sidebar-logo">{logo}</span>}
    <span>{appName}</span>
  </div>
);

export default SidebarHeader;
