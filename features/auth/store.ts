"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/features/auth/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  logout: () => void;
}

type AuthStoreType = AuthStore & AuthActions;

const initialState: AuthStore = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
