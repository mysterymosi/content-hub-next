import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/lib/env";
import type { ApiError } from "@/types";

/**
 * Create a centralized Axios instance with default configuration
 * Base URL is accessed lazily to ensure environment variables are loaded
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: env.api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

/**
 * Request interceptor
 * Add auth token to requests if available
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Auth token will be added here in Phase 3
    // For now, we'll leave this as-is
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handle errors globally and transform error responses
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Transform Axios errors into our ApiError format
    const apiError: ApiError = {
      message: error.message || "An unexpected error occurred",
      status: error.response?.status,
    };

    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      apiError.message =
        (error.response.data as { message?: string })?.message ||
        error.message ||
        `Request failed with status ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      apiError.message = "No response received from server";
    }

    return Promise.reject(apiError);
  }
);

/**
 * Reusable HTTP method functions using apiClient
 * These provide a clean API for making requests throughout the application
 */

/**
 * GET request
 */
export async function get<T = unknown>(
  url: string,
  config?: Partial<InternalAxiosRequestConfig>
): Promise<T> {
  const response = await apiClient.get<T>(url, config);
  return response.data;
}

/**
 * POST request
 */
export async function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: Partial<InternalAxiosRequestConfig>
): Promise<T> {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

/**
 * PUT request
 */
export async function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: Partial<InternalAxiosRequestConfig>
): Promise<T> {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
}

/**
 * PATCH request
 */
export async function patch<T = unknown>(
  url: string,
  data?: unknown,
  config?: Partial<InternalAxiosRequestConfig>
): Promise<T> {
  const response = await apiClient.patch<T>(url, data, config);
  return response.data;
}

/**
 * DELETE request
 */
export async function del<T = unknown>(
  url: string,
  config?: Partial<InternalAxiosRequestConfig>
): Promise<T> {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
}

export default apiClient;
