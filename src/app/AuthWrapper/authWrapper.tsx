"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "../../app/redux/slices/authSlice";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useSelector(selectAuth);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const protectedRoutes = ["/protected", "/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname?.startsWith(route),
    );

    if (isProtectedRoute && !isAuthenticated) {
      router.push("/"); // Redirect to home if not authenticated
    }
  }, [pathname, router, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthWrapper;
