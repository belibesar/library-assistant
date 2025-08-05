"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

type Role = "admin" | "user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      if (!token) {
        console.log("No token found");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Verify token response:", response.status, response.ok);

      if (response.ok) {
        const userData = await response.json();
        const { role } = userData;
        console.log("User data from token:", userData);
        console.log("Role from token:", role);
        setUser(userData);
        setRole(role);
      } else {
        console.log("Token verification failed");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, checkAuth, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
