"use client";

import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, requireAuth } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen grid-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-neon-cyan animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!requireAuth()) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
