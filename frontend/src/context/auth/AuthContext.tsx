import { createContext } from "react";
import type { Role, User } from "../../types/global.types";

interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
