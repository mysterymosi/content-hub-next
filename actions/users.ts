"use server";

import { get } from "@/lib/api/axios";
import { endpoints } from "@/lib/api/endpoints";
import { wrapError } from "@/lib/api/errors";
import type { User } from "@/features/auth/types";
import type { ApiError } from "@/types";

/**
 * Get a single user by ID
 */
export async function getUser(
  id: number
): Promise<{ data: User } | { error: ApiError }> {
  try {
    const data = await get<User>(endpoints.users.byId(id));
    return { data };
  } catch (error) {
    return { error: wrapError(error) };
  }
}
