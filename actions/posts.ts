"use server";

import { get, post, put, del } from "@/lib/api/axios";
import { endpoints } from "@/lib/api/endpoints";
import { wrapError } from "@/lib/api/errors";
import type { Post, CreatePostData, UpdatePostData, ApiError } from "@/types";

/**
 * Get all posts
 * @param params Optional query parameters (e.g., _limit, _page)
 */
export async function getPosts(
  params?: Record<string, string | number>
): Promise<{ data: Post[] } | { error: ApiError }> {
  try {
    const data = await get<Post[]>(endpoints.posts.base, { params });
    return { data };
  } catch (error) {
    return { error: wrapError(error) };
  }
}

/**
 * Get a single post by ID
 */
export async function getPost(
  id: number
): Promise<{ data: Post } | { error: ApiError }> {
  try {
    const data = await get<Post>(endpoints.posts.byId(id));
    return { data };
  } catch (error) {
    return { error: wrapError(error) };
  }
}

/**
 * Create a new post
 * Note: This is mocked - returns the created post with a generated ID
 */
export async function createPost(
  data: CreatePostData
): Promise<{ data: Post } | { error: ApiError }> {
  try {
    const createdPost = await post<Post>(endpoints.posts.base, data);
    return { data: createdPost };
  } catch (error) {
    return { error: wrapError(error) };
  }
}

/**
 * Update an existing post
 * Note: This is mocked - returns the updated post
 */
export async function updatePost(
  id: number,
  data: UpdatePostData
): Promise<{ data: Post } | { error: ApiError }> {
  try {
    const updatedPost = await put<Post>(endpoints.posts.byId(id), data);
    return { data: updatedPost };
  } catch (error) {
    return { error: wrapError(error) };
  }
}

/**
 * Delete a post
 * Note: This is mocked - always succeeds
 */
export async function deletePost(
  id: number
): Promise<{ success: true } | { error: ApiError }> {
  try {
    await del(endpoints.posts.byId(id));
    return { success: true };
  } catch (error) {
    return { error: wrapError(error) };
  }
}
