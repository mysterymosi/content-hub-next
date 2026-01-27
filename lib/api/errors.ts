import type { ApiError } from "@/types";

/**
 * Wraps errors in a consistent format
 * Used by Server Actions to ensure consistent error handling
 */
export function wrapError(error: unknown): ApiError {
  if (error && typeof error === "object" && "message" in error) {
    const apiError = error as ApiError;
    return {
      message: apiError.message || "An unexpected error occurred",
      status: apiError.status,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message || "An unexpected error occurred",
    };
  }

  return {
    message: "An unexpected error occurred",
  };
}
