import { QueryClient } from "@tanstack/react-query";

/**
 * Default query options for TanStack Query
 */
const queryConfig = {
  defaultOptions: {
    queries: {
      // Stale time: data is considered fresh for 1 minute
      staleTime: 60 * 1000,
      // Cache time: unused data stays in cache for 5 minutes
      gcTime: 5 * 60 * 1000,
      // Retry failed requests once
      retry: 1,
      // Refetch on window focus in development only
      refetchOnWindowFocus: process.env.NODE_ENV === "development",
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
};

/**
 * Create a new QueryClient instance with default configuration
 * This should be used for client-side rendering
 */
export function createQueryClient(): QueryClient {
  return new QueryClient(queryConfig);
}

/**
 * Default QueryClient instance for client-side use
 * This will be used in the QueryClientProvider
 */
export const queryClient = createQueryClient();
