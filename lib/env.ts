/**
 * Environment configuration object
 * All environment variables are validated and typed here
 */
export const env = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  },

  // Application Configuration
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
  },

  // Node Environment
  nodeEnv: process.env.NODE_ENV || "development",
} as const;

/**
 * Type-safe environment variable access
 * Use this instead of accessing process.env directly
 */
export default env;
