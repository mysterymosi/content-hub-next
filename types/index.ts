/**
 * Base API response types for JSONPlaceholder API
 * https://jsonplaceholder.typicode.com
 */

/**
 * User type from JSONPlaceholder API
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * Post type from JSONPlaceholder API
 */
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Comment type from JSONPlaceholder API
 */
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

/**
 * Create post payload
 */
export interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

/**
 * Update post payload
 */
export interface UpdatePostData {
  title?: string;
  body?: string;
  userId?: number;
}

/**
 * API Error response
 */
export interface ApiError {
  message: string;
  status?: number;
}
