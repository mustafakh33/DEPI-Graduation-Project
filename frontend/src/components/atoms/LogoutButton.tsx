import React from "react";

interface LogoutButtonProps {
  onLogout: () => void;
}

const logoutBtnStyle: React.CSSProperties = {
  marginTop: "2rem",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.5rem 1.2rem",
  cursor: "pointer",
  width: "90%",
  alignSelf: "center",
};

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => (
  <button style={logoutBtnStyle} onClick={onLogout}>
    Logout
  </button>
);

export default LogoutButton;
