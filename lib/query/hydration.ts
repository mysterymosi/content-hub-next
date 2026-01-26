"use client";

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

/**
 * Dehydrate query client for server-side prefetching
 * Use this in Server Components to prefetch data
 */
export function dehydrateQueryClient(queryClient: QueryClient) {
  return dehydrate(queryClient);
}

/**
 * HydrationBoundary wrapper component
 * Use this to hydrate prefetched queries on the client
 */
export { HydrationBoundary };

/**
 * Helper function to create a dehydrated state from a QueryClient
 * This is useful for server-side prefetching
 */
export function createDehydratedState(queryClient: QueryClient) {
  return dehydrate(queryClient);
}
