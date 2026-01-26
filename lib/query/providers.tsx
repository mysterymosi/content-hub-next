"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

import { createQueryClient } from "./queryClient";

/**
 * QueryProvider component that wraps the app with TanStack Query
 * This is a Client Component that provides the QueryClient to the app
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance for each render
  // This ensures we don't share state between requests in SSR
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
