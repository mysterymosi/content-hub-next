"use client";

import { useMutation } from "@tanstack/react-query";
import { loginAction } from "@/actions/auth";
import type { LoginCredentials, LoginResponse } from "./types";
import type { ApiError } from "@/types";

export function useLogin() {
  return useMutation<LoginResponse, ApiError, LoginCredentials>({
    mutationFn: async (credentials) => {
      const result = await loginAction(credentials);
      if ("error" in result) {
        throw result.error;
      }
      return result;
    },
  });
}
