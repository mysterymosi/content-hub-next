import { Suspense } from "react";
import { createQueryClient } from "@/lib/query/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPosts } from "@/actions/posts";
import { postKeys } from "@/lib/query/keys";
import {
  PostsList,
  PostsListSkeleton,
  PostsPageHeader,
} from "@/features/posts/ui";

interface PostsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = parseInt(params.limit || "10", 10);

  const apiParams = {
    _page: page,
    _limit: limit,
  };

  const queryClient = createQueryClient();
  await queryClient.prefetchQuery({
    queryKey: postKeys.list(apiParams),
    queryFn: async () => {
      const result = await getPosts(apiParams);
      if ("error" in result) {
        throw result.error;
      }
      return result.data;
    },
  });

  return (
    <div className="space-y-6">
      <PostsPageHeader />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList page={page} limit={limit} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
