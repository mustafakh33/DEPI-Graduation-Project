import { useState, useEffect } from "react";
import type { ReactNode } from "react";

import type { Role, User } from "../../types/global.types";
import { AuthContext } from "./AuthContext";

const demoUsers: Record<Role, User> = {
  admin: {
    id: "admin-root",
    name: "Platform Admin",
    email: "admin@unihub.edu",
    role: "admin",
  },
  instructor: {
    id: "inst-salma",
    name: "Dr. Salma Adel",
    email: "salma.adel@unihub.edu",
    role: "instructor",
  },
  mentor: {
    id: "mentor-mariam",
    name: "Mariam Hassan",
    email: "mariam.hassan@unihub.edu",
    role: "mentor",
  },
  student: {
    id: "student-nour",
    name: "Nour Emad",
    email: "nour.emad@unihub.edu",
    role: "student",
  },
};

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
    setUser(demoUsers[role]);
  };

  const logout = () => setUser(null);

  const switchRole = (role: Role) => {
    if (!user) {
      setUser(demoUsers[role]);
      return;
    }

    setUser({
      ...demoUsers[role],
      name: user.name,
      email: user.email,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
