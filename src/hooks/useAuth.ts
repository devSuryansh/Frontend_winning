"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ user_id: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("user_id");

      if (token && userId) {
        setIsAuthenticated(true);
        setUser({ user_id: userId });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setIsLoading(false);
  };

  const login = (token: string, userId: string) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user_id", userId);
    setIsAuthenticated(true);
    setUser({ user_id: userId });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  };

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
      return false;
    }
    return true;
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    getToken,
    requireAuth,
    checkAuth,
  };
};
