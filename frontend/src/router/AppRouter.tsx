import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "@/styles/global.css";

// Public pages
import LandingPage from "@/features/landing/pages/Landing";
import Unauthorized from "@/pages/public/Unauthorized";
import NotFound from "@/pages/public/NotFound";

// Auth pages
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import VerifyCode from "@/features/auth/pages/VerifyCode";
import ResetPassword from "@/features/auth/pages/ResetPassword";

// Onboarding pages
import TrackSelection from "@/features/onboarding/pages/TrackSelection";
import ScheduleSetup from "@/features/onboarding/pages/ScheduleSetup";
import TestIntro from "@/features/onboarding/pages/TestIntro";
import ActiveTest from "@/features/onboarding/pages/ActiveTest";
import TestResult from "@/features/onboarding/pages/TestResult";
import FinalWelcome from "@/features/onboarding/pages/FinalWelcome";
import OnboardingDashboard from "@/features/onboarding/pages/OnboardingDashboard";
import { OnboardingRouteGuard } from "@/guards/OnboardingRouteGuard";

// Student pages
import StudentDashboard from "@/features/student/pages/Dashboard";
import Roadmap from "@/features/student/pages/Roadmap";
import StudentSessions from "@/features/student/pages/Sessions";
import StudyRoom from "@/features/student/pages/StudyRoom";
import Exams from "@/features/student/pages/Exams";
import StudentProfile from "@/features/student/pages/StudentProfile";
import Subject from "@/features/student/pages/Subject";
import Analytics from "@/features/student/pages/Analytics";
import Assignments from "@/features/student/pages/Assignments";
import StudentQuizzes from "@/features/student/pages/Quizzes";
import Ranking from "@/features/student/pages/Ranking";
import Results from "@/features/student/pages/Results";
import LessonDetails from "@/features/student/pages/LessonDetails";
import StudyClub from "@/features/student/pages/StudyClub";
import SoloFocusRoom from "@/features/student/pages/SoloFocusRoom";
import StudentLayout from "@/layouts/StudentLayout";

// Instructor pages
import InstructorDashboard from "@/features/instructor/pages/Dashboard";
import MyCourses from "@/features/instructor/pages/MyCourses";
import Students from "@/features/instructor/pages/Students";
import Grades from "@/features/instructor/pages/Grades";
import Quizzes from "@/features/instructor/pages/Quizzes";
import LiveSession from "@/features/instructor/pages/LiveSession";
import InstructorLayout from "@/layouts/InstructorLayout";

// Mentor pages
import MentorDashboard from "@/features/mentor/pages/Dashboard";
import MyStudents from "@/features/mentor/pages/MyStudents";
import ChatPage from "@/features/mentor/pages/ChatPage";
import CheckIns from "@/features/mentor/pages/CheckIns";
import Progress from "@/features/mentor/pages/Progress";
import MentorLayout from "@/layouts/MentorLayout";

// Admin pages
import AdminDashboard from "@/features/admin/pages/Dashboard";
import Users from "@/features/admin/pages/Users";
import Batches from "@/features/admin/pages/Batches";
import Courses from "@/features/admin/pages/Courses";
import Reports from "@/features/admin/pages/Reports";
import Settings from "@/features/admin/pages/Settings";
import Sessions from "@/features/admin/pages/Sessions";
import Feedback from "@/features/admin/pages/Feedback";
import AdminStudents from "@/features/admin/pages/Students";
import AdminLayout from "@/layouts/AdminLayout";

import { adminDashboardPath } from "@/features/admin/config/navigation";
import { instructorDashboardPath } from "@/features/instructor/config/navigation";
import { mentorDashboardPath } from "@/features/mentor/config/navigation";
import { studentDashboardPath } from "@/features/student/config/navigation";

// Guards and hooks
import AuthGuard from "@/guards/AuthGuard";
import RoleGuard from "@/guards/RoleGuard";
import { useAuth } from "@/hooks/useAuth";

const roleRedirects = {
  student: studentDashboardPath,
  instructor: instructorDashboardPath,
  mentor: mentorDashboardPath,
  admin: adminDashboardPath,
};

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/register" element={<Navigate to="/signup" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/verify-code" element={<VerifyCode />} />
        <Route path="/forgot-password/reset" element={<ResetPassword />} />

        {/* Onboarding routes */}
        <Route element={<OnboardingRouteGuard step="track" />}>
          <Route path="/track-selection" element={<TrackSelection />} />
        </Route>

        <Route element={<OnboardingRouteGuard step="schedule" />}>
          <Route path="/schedule" element={<ScheduleSetup />} />
        </Route>

        <Route element={<OnboardingRouteGuard step="intro" />}>
          <Route path="/placement-intro" element={<TestIntro />} />
        </Route>

        <Route element={<OnboardingRouteGuard step="test" />}>
          <Route path="/placement-test" element={<ActiveTest />} />
        </Route>

        <Route element={<OnboardingRouteGuard step="result" />}>
          <Route path="/result" element={<TestResult />} />
        </Route>

        <Route element={<OnboardingRouteGuard step="complete" />}>
          <Route path="/onboarding-complete" element={<FinalWelcome />} />
        </Route>

        <Route element={<OnboardingRouteGuard step="dashboard" />}>
          <Route path="/dashboard" element={<OnboardingDashboard />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route element={<AuthGuard />}>
          <Route
            path="/home"
            element={
              user ? (
                <Navigate to={roleRedirects[user.role] ?? "/"} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Student routes */}
          <Route element={<RoleGuard allowedRoles={["student"]} />}>
            {/* Internal student pages without sidebar */}
            <Route path="/student/lesson/:lessonId" element={<LessonDetails />} />
            <Route path="/student/study-club" element={<StudyClub />} />
            <Route path="/student/solo-focus" element={<SoloFocusRoom />} />

            {/* Student pages with sidebar layout */}
            <Route element={<StudentLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/roadmap" element={<Roadmap />} />
              <Route path="/student/Sessions" element={<StudentSessions />} />
              <Route path="/student/study-room/:id" element={<StudyRoom />} />
              <Route path="/student/exams" element={<Exams />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/subject/:id" element={<Subject />} />
              <Route path="/student/analytics" element={<Analytics />} />
              <Route path="/student/assignments" element={<Assignments />} />
              <Route path="/student/quizzes" element={<StudentQuizzes />} />
              <Route path="/student/ranking" element={<Ranking />} />
              <Route path="/student/results" element={<Results />} />
            </Route>
          </Route>

          {/* Instructor routes */}
          <Route element={<RoleGuard allowedRoles={["instructor"]} />}>
            <Route element={<InstructorLayout />}>
              <Route
                path="/instructor/dashboard"
                element={<InstructorDashboard />}
              />
              <Route path="/instructor/my-courses" element={<MyCourses />} />
              <Route path="/instructor/students" element={<Students />} />
              <Route path="/instructor/grades" element={<Grades />} />
              <Route path="/instructor/quizzes" element={<Quizzes />} />
              <Route path="/instructor/live-session" element={<LiveSession />} />
            </Route>
          </Route>

          {/* Mentor routes */}
          <Route element={<RoleGuard allowedRoles={["mentor"]} />}>
            <Route element={<MentorLayout />}>
              <Route path="/mentor/dashboard" element={<MentorDashboard />} />
              <Route path="/mentor/my-students" element={<MyStudents />} />
              <Route path="/mentor/ChatPage" element={<ChatPage />} />
              <Route path="/mentor/chat/:studentId" element={<ChatPage />} />
              <Route path="/mentor/check-ins" element={<CheckIns />} />
              <Route path="/mentor/progress/:id" element={<Progress />} />
            </Route>
          </Route>

          {/* Admin routes */}
          <Route element={<RoleGuard allowedRoles={["admin"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/sessions" element={<Sessions />} />
              <Route path="/admin/batches" element={<Batches />} />
              <Route path="/admin/courses" element={<Courses />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/feedback" element={<Feedback />} />
              <Route path="/admin/settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>

        {/* 404 Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;