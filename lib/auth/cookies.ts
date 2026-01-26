import { cookies } from "next/headers";

/**
 * Cookie name for authentication token
 */
export const AUTH_TOKEN_COOKIE_NAME = "auth_token";

/**
 * Get the authentication token from HTTP-only cookie
 * This function can only be used in Server Components or Server Actions
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE_NAME);
  return token?.value || null;
}

/**
 * Set the authentication token in HTTP-only cookie
 * This function can only be used in Server Actions or Route Handlers
 */
export async function setAuthToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Remove the authentication token cookie
 * This function can only be used in Server Actions or Route Handlers
 */
export async function removeAuthToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_COOKIE_NAME);
}

/**
 * Check if user is authenticated (has valid token)
 * This function can only be used in Server Components or Server Actions
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return token !== null;
}
