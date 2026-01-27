import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/lib/env";
import type { ApiError } from "@/types";

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || "An unexpected error occurred",
      status: error.response?.status,
    };

    if (error.response) {
      apiError.message =
        (error.response.data as { message?: string })?.message ||
        error.message ||
        `Request failed with status ${error.response.status}`;
    } else if (error.request) {
      apiError.message = "No response received from server";
    }

    return Promise.reject(apiError);
  }
);

export async function get<T = unknown>(
  url: string,
  config?: Partial<InternalAxiosRequestConfig>
): Promise<T> {
  const response = await apiClient.get<T>(url, config);
  return response.data;
}

export async function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: Partial<InternalAxiosRequestConfig>
): Promise<T> {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

export async function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: Partial<InternalAxiosRequestConfig>
): Promise<T> {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
}

export async function patch<T = unknown>(
  url: string,
  data?: unknown,
  config?: Partial<InternalAxiosRequestConfig>
): Promise<T> {
  const response = await apiClient.patch<T>(url, data, config);
  return response.data;
}

export async function del<T = unknown>(
  url: string,
  config?: Partial<InternalAxiosRequestConfig>
): Promise<T> {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
}

export default apiClient;
