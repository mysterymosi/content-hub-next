/**
 * API endpoint constants
 * Centralized location for all API endpoint paths
 */
export const endpoints = {
  posts: {
    base: "/posts",
    byId: (id: number) => `/posts/${id}`,
  },
  users: {
    base: "/users",
    byId: (id: number) => `/users/${id}`,
  },
  comments: {
    base: "/comments",
    byPostId: (postId: number) => `/posts/${postId}/comments`,
  },
  auth: {
    login: "/auth/login",
  },
} as const;
