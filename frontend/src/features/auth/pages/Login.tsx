import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

import type { Role } from "../../../types/global.types";
import { useAuth } from "../../../hooks/useAuth";

import "./auth.css";

const roles: Role[] = ["student", "instructor", "mentor", "admin"];

const roleRedirects: Record<Role, string> = {
  student: "/student/dashboard",
  instructor: "/instructor/dashboard",
  mentor: "/mentor/dashboard",
  admin: "/admin/dashboard",
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate(roleRedirects[role]);
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ margin: "2rem 0" }}>
        <label>
          Select Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" style={{ marginLeft: "1rem" }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: "1.5rem" }}>
        <span>Don't have an account? </span>
        <Link to="/register">Register</Link>
      </div>
      <div style={{ marginTop: "0.7rem" }}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
