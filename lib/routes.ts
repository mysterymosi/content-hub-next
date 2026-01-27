/**
 * Centralized route paths
 * Single source of truth for all application routes
 */

export const routes = {
  public: {
    login: "/login",
    home: "/",
  },

  protected: {
    dashboard: {
      base: "/dashboard",
      posts: {
        base: "/dashboard/posts",
        detail: (id: number) => `/dashboard/posts/${id}`,
      },
    },
  },
} as const;
