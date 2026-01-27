/**
 * Centralized query keys factory
 * Single source of truth for all TanStack Query keys
 *
 * Query keys follow a hierarchical structure:
 * - Feature namespace (e.g., "posts", "auth")
 * - Resource type (e.g., "list", "detail")
 * - Resource identifier (e.g., id, params)
 */

/**
 * Posts query keys
 */
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params?: Record<string, string | number>) =>
    [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
  comments: (postId: number) =>
    [...postKeys.detail(postId), "comments"] as const,
  user: (userId: number) => [...postKeys.all, "user", userId] as const,
};

/**
 * Auth query keys (for future use)
 */
export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "currentUser"] as const,
};

/**
 * Query keys object containing all feature keys
 * Use this for type-safe access to all query keys
 */
export const queryKeys = {
  posts: postKeys,
  auth: authKeys,
} as const;
