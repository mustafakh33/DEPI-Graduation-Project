import { useNavigate } from "react-router";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goToDashboard = () => {
    if (!user) return navigate("/login");

    switch (user.role) {
      case "student":
        return navigate("/student/dashboard");
      case "instructor":
        return navigate("/instructor/dashboard");
      case "mentor":
        return navigate("/mentor/dashboard");
      case "admin":
        return navigate("/admin/dashboard");
      default:
        return navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-6 text-white font-sans selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-lg text-center space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
            <ShieldAlert className="w-10 h-10 text-red-400" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Access Denied</h1>
          
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            You don't have permission to view this page. If you believe this is an error, please contact your administrator.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-white/10 text-gray-300 hover:text-white hover:bg-white/5 h-12 px-6 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            
            <Button
              onClick={goToDashboard}
              className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 h-12 px-6 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
