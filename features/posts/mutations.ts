"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost, deletePost } from "@/actions/posts";
import { postKeys } from "@/lib/query/keys";
import type { Post, CreatePostData, UpdatePostData } from "./types";
import type { ApiError } from "@/types";
import { toast } from "sonner";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<
    { data: Post },
    ApiError,
    CreatePostData,
    {
      previousPosts: Post[] | undefined;
      apiParams: { _page: number; _limit: number };
    }
  >({
    mutationFn: async (data) => {
      const result = await createPost(data);
      if ("error" in result) {
        throw result.error;
      }
      return result;
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });

      const apiParams = { _limit: 10, _page: 1 };

      const previousPosts = queryClient.getQueryData<Post[]>(
        postKeys.list(apiParams)
      );

      const optimisticPost: Post = {
        id: Date.now(),
        userId: newPost.userId,
        title: newPost.title,
        body: newPost.body,
      };

      queryClient.setQueryData<Post[]>(postKeys.list(apiParams), (old = []) => [
        optimisticPost,
        ...old,
      ]);

      return { previousPosts, apiParams };
    },
    onError: (error, _variables, context) => {
      toast.error(error.message);
      if (context?.previousPosts && context.apiParams) {
        queryClient.setQueryData(
          postKeys.list(context.apiParams),
          context.previousPosts
        );
      }
    },
    // Note: Query invalidation is disabled because JSONPlaceholder is a fake API that doesn't
    // actually persist updates. Invalidating queries would refetch fresh random data from the
    // API, overwriting our optimistic update. Instead, we rely on the optimistic update to
    // persist in the cache, giving users immediate feedback without losing their changes.

    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    // },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation<
    { data: Post },
    ApiError,
    { id: number; data: UpdatePostData },
    {
      previousPost: Post | undefined;
      previousPosts: Post[] | undefined;
      apiParams: { _page: number; _limit: number };
    }
  >({
    mutationFn: async ({ id, data }) => {
      const result = await updatePost(id, data);
      if ("error" in result) {
        throw result.error;
      }
      return result;
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(id) });
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });

      // Note: apiParams is hardcoded here for testing purposes. In a production app, these
      // pagination parameters would ideally be retrieved from a store (e.g., Zustand) or
      // directly from the URL search params to ensure we're updating the correct cached list.
      const apiParams = { _limit: 10, _page: 1 };

      const previousPost = queryClient.getQueryData<Post>(postKeys.detail(id));
      const previousPosts = queryClient.getQueryData<Post[]>(
        postKeys.list(apiParams)
      );

      const optimisticPost: Post = {
        ...previousPost!,
        ...data,
        id,
      };

      queryClient.setQueryData<Post>(postKeys.detail(id), optimisticPost);

      queryClient.setQueryData<Post[]>(postKeys.list(apiParams), (old = []) =>
        old.map((post) => (post.id === id ? optimisticPost : post))
      );

      return { previousPost, previousPosts, apiParams };
    },
    onError: (error, variables, context) => {
      toast.error(error.message);
      if (context?.previousPost) {
        queryClient.setQueryData(
          postKeys.detail(variables.id),
          context.previousPost
        );
      }
      if (context?.previousPosts && context.apiParams) {
        queryClient.setQueryData(
          postKeys.list(context.apiParams),
          context.previousPosts
        );
      }
    },
    // Note: Query invalidation is disabled because JSONPlaceholder is a fake API that doesn't
    // actually persist updates. Invalidating queries would refetch fresh random data from the
    // API, overwriting our optimistic update. Instead, we rely on the optimistic update to
    // persist in the cache, giving users immediate feedback without losing their changes.

    // onSettled: (_data, _error, variables) => {
    //   queryClient.invalidateQueries({
    //     queryKey: postKeys.detail(variables.id),
    //   });
    //   queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    // },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<
    { success: true },
    ApiError,
    number,
    {
      previousPosts: Post[] | undefined;
      apiParams: { _page: number; _limit: number };
    }
  >({
    mutationFn: async (id) => {
      const result = await deletePost(id);
      if ("error" in result) {
        throw result.error;
      }
      return result;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });

      // Note: apiParams is hardcoded here for testing purposes. In a production app, these
      // pagination parameters would ideally be retrieved from a store (e.g., Zustand) or
      // directly from the URL search params to ensure we're updating the correct cached list.
      const apiParams = { _limit: 10, _page: 1 };

      const previousPosts = queryClient.getQueryData<Post[]>(
        postKeys.list(apiParams)
      );

      queryClient.setQueryData<Post[]>(postKeys.list(apiParams), (old = []) =>
        old.filter((post) => post.id !== id)
      );

      return { previousPosts, apiParams };
    },
    onError: (error, _variables, context) => {
      toast.error(error.message);
      if (context?.previousPosts && context.apiParams) {
        queryClient.setQueryData(
          postKeys.list(context.apiParams),
          context.previousPosts
        );
      }
    },
    // Note: Query invalidation is disabled because JSONPlaceholder is a fake API that doesn't
    // actually persist updates. Invalidating queries would refetch fresh random data from the
    // API, overwriting our optimistic update. Instead, we rely on the optimistic update to
    // persist in the cache, giving users immediate feedback without losing their changes.
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    // },
  });
}
