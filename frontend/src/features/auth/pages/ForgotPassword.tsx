import React from "react";
import { Link } from "react-router";

import "./auth.css";

const ForgotPassword: React.FC = () => {
  return (
    <div className="auth-page">
      <h2>Forgot Password</h2>
      {/* Place your forgot password form here */}
      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
