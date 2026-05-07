
import { studentDashboardPath, studentNavItems } from "@/features/student/config/navigation";
import AppShellLayout from "@/layouts/AppShellLayout";
import StudentHeader from "@/features/student/components/layout/StudentHeader";
import { useStudentDashboard } from "@/features/student/hooks/useStudentDashboard";

const StudentLayout = () => {
  const dashboard = useStudentDashboard();

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
/>
  );
};
export default StudentLayout;
