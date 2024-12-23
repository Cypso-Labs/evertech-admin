"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/features/authSlice";
import { useGetRoleByIdQuery } from "@/app/redux/features/roleApiSlice"; 

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname() || "";
  const { isAuthenticated, token, employee } = useSelector(selectAuth); 
  const { data: role } = useGetRoleByIdQuery(employee?.role || "");

  useEffect(() => {
    const userPrivileges = role?.privileges ? role.privileges.map(String) : [];

    const protectedRoutes = ["/protected", "/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route),
    );

   
    if (
      isProtectedRoute &&
      (!isAuthenticated || !token || !userPrivileges.length)
    ) {
      router.push("/");
    }
  }, [pathname, router, isAuthenticated, token, role]);

  return <>{children}</>;
};

export default AuthWrapper;
