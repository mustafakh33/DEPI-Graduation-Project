import React from "react";
import { Link } from "react-router";
import "./Landing.css";

const Landing: React.FC = () => {
  return (
    <div className="landing-root">
      <nav className="landing-navbar">
        <span className="logo">UniHub</span>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <main className="landing-main">
        <h1>Welcome to Smart UniHub</h1>
        <p>
          A structured digital education platform for Computer Science students
          in the MENA region.
        </p>
        <div className="cta-buttons">
          <Link to="/login" className="cta-btn">
            Login
          </Link>
          <Link to="/register" className="cta-btn secondary">
            Register
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Landing;
