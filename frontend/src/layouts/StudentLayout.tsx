import {
  studentDashboardPath,
  studentNavItems,
} from "@/features/student/config/navigation";
import StudentHeader from "@/features/student/components/layout/StudentHeader";
import { useStudentDashboard } from "@/features/student/hooks/useStudentDashboard";
import { useLogout } from "@/hooks/useLogout";
import AppShellLayout from "@/layouts/AppShellLayout";

const StudentLayout = () => {
  const dashboard = useStudentDashboard();
  const logout = useLogout();

  const handleLogout = () => {
    localStorage.removeItem("student-profile-avatar");
    logout();
  };

  return (
    <AppShellLayout
      links={studentNavItems}
      dashboardPath={studentDashboardPath}
      appName="Uni Hub"
      portalSubtitle="Student Dashboard"
      headerContent={<StudentHeader stats={dashboard.stats} />}
      sidebarUserName={dashboard.studentName}
      sidebarUserAvatarUrl="https://i.pravatar.cc/80?img=5"
      showSidebarUserRole={false}
      onLogout={handleLogout}
    />
  );
};

export default StudentLayout;
