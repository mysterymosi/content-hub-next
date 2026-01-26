import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_TOKEN_COOKIE_NAME } from "@/lib/auth/cookies";

/**
 * Check if user is authenticated by checking for auth cookie
 */
function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(AUTH_TOKEN_COOKIE_NAME);
  return token !== undefined && token.value !== "";
}

/**
 * Proxy to protect routes and handle authentication redirects
 * Note: In Next.js 16+, middleware.ts has been renamed to proxy.ts
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = isAuthenticated(request);

  // Protected routes - require authentication
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Public routes that authenticated users shouldn't access
  const isPublicAuthRoute = pathname === "/login";

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !authenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login page
  if (isPublicAuthRoute && authenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

/**
 * Configure which routes the proxy should run on
 * Excludes static files, API routes, and Next.js internals
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
