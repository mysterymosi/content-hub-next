"use server";

import { get } from "@/lib/api/axios";
import { endpoints } from "@/lib/api/endpoints";
import { wrapError } from "@/lib/api/errors";
import type { Comment, ApiError } from "@/types";

/**
 * Get all comments for a specific post
 */
export async function getPostComments(
  postId: number
): Promise<{ data: Comment[] } | { error: ApiError }> {
  try {
    const data = await get<Comment[]>(endpoints.comments.byPostId(postId));
    return { data };
  } catch (error) {
    return { error: wrapError(error) };
  }
}
