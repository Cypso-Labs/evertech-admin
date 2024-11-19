"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/features/authSlice";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname() || ""; 
  const { isAuthenticated, token } = useSelector(selectAuth);

  useEffect(() => {
    const protectedRoutes = ["/protected", "/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route),
    );

   
    if (isProtectedRoute && (!isAuthenticated || !token)) {
      router.push("/");
    }
  }, [pathname, router, isAuthenticated, token]);

  return <>{children}</>;
};

export default AuthWrapper;
