import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Example condition: Block all protected routes
  const protectedRoutes = ["/protected", "/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    url.pathname.startsWith(route),
  );

  // Check a condition (e.g., user authentication or state check)
  const isUserAuthenticated = request.cookies.get("authToken"); // Example using cookie-based auth

  if (isProtectedRoute && !isUserAuthenticated) {
    // Redirect to the login page or home page if not authenticated
    url.pathname = "/login"; // Redirect to login
    return NextResponse.redirect(url);
  }

  // Allow access if conditions are met
  return NextResponse.next();
}
