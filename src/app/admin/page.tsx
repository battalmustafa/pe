"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Use useEffect for redirection
  useEffect(() => {
    // Add a small delay to ensure the authentication state is properly loaded
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.push("/admin/dashboard");
      } else {
        router.push("/admin/login");
      }
    }, 10);
    
    return () => clearTimeout(timer);
  }, [router, isAuthenticated]);

  // Return a loading state instead of null
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-foreground/70">Yükleniyor...</p>
    </div>
  );
} 