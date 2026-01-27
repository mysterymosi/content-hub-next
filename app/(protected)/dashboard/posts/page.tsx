import { Suspense } from "react";
import { createQueryClient } from "@/lib/query/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPosts } from "@/actions/posts";
import { postKeys } from "@/lib/query/keys";
import { PostsList } from "@/features/posts/ui";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";

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
      <div>
        <TypographyH2>Posts</TypographyH2>
        <TypographyMuted>
          Browse and manage all posts in the platform.
        </TypographyMuted>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList page={page} limit={limit} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}

function PostsListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-6 animate-pulse">
          <div className="h-6 bg-muted rounded w-3/4 mb-2" />
          <div className="h-4 bg-muted rounded w-full mb-1" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      ))}
    </div>
  );
}
