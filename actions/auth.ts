"use server";

// TODO: When implementing real API, use:
// import { post } from "@/lib/api/axios";
// import { endpoints } from "@/lib/api/endpoints";
import { wrapError } from "@/lib/api/errors";
import { setAuthToken, removeAuthToken } from "@/lib/auth/cookies";
import type {
  LoginCredentials,
  LoginResponse,
  User,
} from "@/features/auth/types";
import type { ApiError } from "@/types";

/**
 * Server Action to handle login
 * - Calls login API with credentials
 * - Sets auth token in HTTP-only cookie
 * - Returns user data and token
 */
export async function loginAction(
  credentials: LoginCredentials
): Promise<LoginResponse | { error: ApiError }> {
  try {
    const mockUser: User = {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: credentials.email,
      address: {
        street: "123 Main St",
        suite: "Apt 4",
        city: "Anytown",
        zipcode: "12345",
        geo: {
          lat: "0",
          lng: "0",
        },
      },
      phone: "555-1234",
      website: "johndoe.com",
      company: {
        name: "Acme Corp",
        catchPhrase: "Making things happen",
        bs: "harness real-time e-markets",
      },
    };

    const token = `mock_token_${Date.now()}`;
    const response: LoginResponse = { user: mockUser, token };

    await setAuthToken(response.token);

    return response;
  } catch (error) {
    return { error: wrapError(error) };
  }
}

export async function logoutAction(): Promise<void> {
  await removeAuthToken();
}
