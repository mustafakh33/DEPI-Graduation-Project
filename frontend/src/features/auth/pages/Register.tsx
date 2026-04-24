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

const Register: React.FC = () => {
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
      <h2>Register</h2>
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
          Register
        </button>
      </form>
      <div style={{ marginTop: "1.5rem" }}>
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
