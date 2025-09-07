import React, { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from "react";
import { axios } from "../lib/axios";

export type User = { id: string; email: string; username?: string; role?: string };

type LoginResponse = { user?: User; requires2FA?: boolean; pendingToken?: string };

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  register: (data: { email: string; username?: string; phone?: string; password: string }) => Promise<void>;
  verify2FA: (code: string, pendingToken: string) => Promise<void>;
  fetchMe: () => Promise<void>;
}

declare global {
  interface Window {
    useAuth: () => AuthCtx;
  }
}

const AuthContext = createContext<AuthCtx | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside <AuthProvider>");
  // Expose globally for debug
  if (typeof window !== 'undefined') {
    window.useAuth = () => ctx;
  }
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const initRef = useRef(false);

  const fetchMe = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/me");
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    (async () => {
      await fetchMe();
      setLoading(false);
    })();
  }, [fetchMe]);

  const login = useCallback(async (identifier: string, password: string) => {
    const { data } = await axios.post<LoginResponse>("/api/auth/login", { identifier, password });
    if (data.user) setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (payload: { email: string; username?: string; phone?: string; password: string }) => {
    await axios.post("/api/auth/register", payload);
  }, []);

  const verify2FA = useCallback(async (code: string, pendingToken: string) => {
    const { data } = await axios.post<{ user: User }>("/api/auth/2fa/verify", { code, pendingToken });
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout, register, verify2FA, fetchMe }),
    [user, loading, login, logout, register, verify2FA, fetchMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
