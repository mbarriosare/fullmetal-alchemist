
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "Supervisor" | "Alchemist" | null;

interface AuthContextType {
  token: string | null;
  role: Role;
  setToken: (token: string | null, role?: Role) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<Role>(localStorage.getItem("role") as Role || null);

  const setToken = (newToken: string | null, newRole?: Role) => {
    setTokenState(newToken);
    setRole(newRole || null);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role || "");
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [token, role]);

  const contextValue = useMemo(() => ({ token, role, setToken }), [token, role]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export default AuthProvider;
