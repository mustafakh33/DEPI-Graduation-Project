import { useState, useEffect } from "react";
import type { ReactNode } from "react";

import type { Role, User } from "../../types/global.types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (role: Role) => {
    const fakeUser: User = {
      id: "1",
      name: "Test User",
      email: "test@unihub.com",
      role,
    };
    setUser(fakeUser);
  };

  const logout = () => setUser(null);

  const switchRole = (role: Role) => {
    if (user) setUser({ ...user, role });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
