import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goToDashboard = () => {
    if (!user) return navigate("/login");

    switch (user.role) {
      case "student":
        return navigate("/student/dashboard");
      case "mentor":
        return navigate("/mentor/dashboard");
      case "admin":
        return navigate("/admin/dashboard");
      default:
        return navigate("/");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>403 - Unauthorized</h1>
      <p>You don't have permission to access this page.</p>

      <button onClick={goToDashboard}>Go to Dashboard</button>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default Unauthorized;
