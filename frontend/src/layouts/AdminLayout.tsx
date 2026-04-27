import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Outlet, NavLink } from "react-router";

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  /* Admin UI matches the dark-only design; disable global :root:not(.dark) slate retargeting while here. */
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    if (!hadDark) root.classList.add("dark");
    return () => {
      if (!hadDark) root.classList.remove("dark");
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
    { to: "/admin/users", label: "User Management", icon: "group" },
    { to: "/admin/students", label: "Students", icon: "school" },
    { to: "/admin/sessions", label: "Sessions", icon: "calendar_month" },
    { to: "/admin/courses", label: "Courses", icon: "menu_book" },
    { to: "/admin/batches", label: "Batches", icon: "layers" },
    { to: "/admin/feedback", label: "Feedback", icon: "chat_bubble" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Sidebar Navigation — matches Uni Hub admin reference */}
      <aside className="w-64 shrink-0 flex flex-col h-full bg-slate-50 dark:bg-[#0b0f1a] border-r border-slate-200 dark:border-slate-800">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">school</span>
          </div>
          <div>
            <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none">Uni Hub</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </NavLink>
          ))}

          <div className="mt-auto flex flex-col gap-1 pt-2">
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium">Settings</span>
            </NavLink>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-background-light dark:bg-background-dark">
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 outline-none"
                placeholder="Search..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined text-sm">add</span>
              New Action
            </button>
            <div className="flex items-center gap-2 px-4 border-l border-slate-200 dark:border-slate-800 h-8">
              <button className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors relative" type="button">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark" />
              </button>
              <div className="flex items-center gap-3 ml-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold leading-none text-slate-900 dark:text-white">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 capitalize">{user?.role || "Administrator"}</p>
                </div>
                <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-700">
                  <img 
                    alt="User Profile" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHGC5TxJCpBxhF_G_9-Qm3vxHah1nzn28ippLHfeVE1NoiQAUbw-4FyeVKPLHGTdyhDzxzBu8AKDikUED-FqunmxNED0WojElztiq5xqfAaytjtsQA4WLBZz1ioU3d6jbV-qu0F4W1X4ZfUo5OZj7GMuGwsK0P4b35COP8FU-DQsMpgzZoxXO5GcmHMsp6Nd0baAwQ8GK63FwgWyiIG3sInLuSWlahymh-MSSW-7pjen_RRxvjsZZxHAzj2Y2-cCDiJAITXMhPTDsl"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
