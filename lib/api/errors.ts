import type { ApiError } from "@/types";

/**
 * Wraps errors in a consistent format
 * Used by Server Actions to ensure consistent error handling
 */
export function wrapError(error: unknown): ApiError {
  // If it's already an ApiError, return it
  if (error && typeof error === "object" && "message" in error) {
    const apiError = error as ApiError;
    return {
      message: apiError.message || "An unexpected error occurred",
      status: apiError.status,
    };
  }

  // If it's an Error object, extract message
  if (error instanceof Error) {
    return {
      message: error.message || "An unexpected error occurred",
    };
  }

  // Fallback for unknown error types
  return {
    message: "An unexpected error occurred",
  };
}

/**
 * Creates a standardized error response
 */
export function createError(
  message: string,
  status?: number
): { error: ApiError } {
  return {
    error: {
      message,
      status,
    },
  };
}
