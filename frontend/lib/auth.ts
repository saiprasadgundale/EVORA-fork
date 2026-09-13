"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api, LoginCredentials, SignupCredentials } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "google" | "github";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithGitHub: () => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = "evora_session";

function getInitialUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (storedSession) {
      return JSON.parse(storedSession) as User;
    }
  } catch {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const persistSession = (userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userData));
    } catch {
    }
  };

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = true
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const credentials: LoginCredentials = { email, password, rememberMe };
      const res = await api.login(credentials);
      const name = res.user?.fullName || email.split("@")[0] || "Executive Leader";
      const userData: User = {
        id: res.user?.id || "usr_" + Date.now(),
        name,
        email,
        provider: "email",
      };
      persistSession(userData);
      router.push("/dashboard");
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      const userData: User = {
        id: "goog_" + Date.now(),
        name: "Alex Mercer",
        email: "alex.mercer@evora.ai",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
        provider: "google",
      };
      persistSession(userData);
      router.push("/dashboard");
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGitHub = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      const userData: User = {
        id: "gh_" + Date.now(),
        name: "Morgan Vance",
        email: "morgan.vance@developer.io",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
        provider: "github",
      };
      persistSession(userData);
      router.push("/dashboard");
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const credentials: SignupCredentials = { fullName: name, email, password };
      const res = await api.signup(credentials);
      const userData: User = {
        id: res.user?.id || "usr_" + Date.now(),
        name: name || "Executive Leader",
        email,
        provider: "email",
      };
      persistSession(userData);
      router.push("/dashboard");
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
    }
    router.push("/login");
  };

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        loginWithGitHub,
        signup,
        logout,
      },
    },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
