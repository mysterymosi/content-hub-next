"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

/**
 * Auth store state interface
 * Note: Token is stored in HTTP-only cookies, not in this store
 */
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Auth store actions interface
 */
interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  logout: () => void;
}

/**
 * Combined auth store type
 */
type AuthStoreType = AuthStore & AuthActions;

/**
 * Initial state for auth store
 */
const initialState: AuthStore = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Auth store using Zustand with persistence
 * Manages client-side UI state only.
 * Authentication token is stored in HTTP-only cookies via Server Actions.
 * Only user data is persisted (not token).
 */
export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      ...initialState,

      /**
       * Set user and update authentication status
       */
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      /**
       * Set loading state
       */
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      /**
       * Set error state
       */
      setError: (error: string | null) => {
        set({ error });
      },

      /**
       * Clear error state
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Logout - clears store state
       * Cookie clearing is handled by Server Action
       */
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        // Only persist user data and authentication status
        // Token is NOT persisted (stored in HTTP-only cookies only)
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
