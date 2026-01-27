"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts, getPost } from "@/actions/posts";
import { getPostComments } from "@/actions/comments";
import { getUser } from "@/actions/users";
import { postKeys } from "@/lib/query/keys";
import type { Post, Comment } from "./types";
import type { User } from "@/features/auth/types";
import type { ApiError } from "@/types";

/**
 * Hook to fetch all posts with pagination
 * @param params Optional query parameters (e.g., _limit, _page)
 */
export function usePosts(params?: Record<string, string | number>) {
  return useQuery<Post[], ApiError>({
    queryKey: postKeys.list(params),
    queryFn: async () => {
      const result = await getPosts(params);
      if ("error" in result) {
        throw result.error;
      }
      return result.data;
    },
  });
}

/**
 * Hook to fetch a single post by ID
 * @param id Post ID
 */
export function usePost(id: number) {
  return useQuery<Post, ApiError>({
    queryKey: postKeys.detail(id),
    queryFn: async () => {
      const result = await getPost(id);
      if ("error" in result) {
        throw result.error;
      }
      return result.data;
    },
    enabled: !!id, // Only fetch if id is provided
  });
}

/**
 * Hook to fetch comments for a specific post
 * @param postId Post ID
 */
export function usePostComments(postId: number) {
  return useQuery<Comment[], ApiError>({
    queryKey: postKeys.comments(postId),
    queryFn: async () => {
      const result = await getPostComments(postId);
      if ("error" in result) {
        throw result.error;
      }
      return result.data;
    },
    enabled: !!postId, // Only fetch if postId is provided
  });
}

/**
 * Hook to fetch user data by ID
 * @param userId User ID
 */
export function useUser(userId: number) {
  return useQuery<User, ApiError>({
    queryKey: postKeys.user(userId),
    queryFn: async () => {
      const result = await getUser(userId);
      if ("error" in result) {
        throw result.error;
      }
      return result.data;
    },
    enabled: !!userId, // Only fetch if userId is provided
  });
}
