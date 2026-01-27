"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { usePosts } from "@/features/posts/queries";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyMuted } from "@/components/ui/typography";

interface PostsListProps {
  page: number;
  limit: number;
}

export function PostsList({ page, limit }: PostsListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const apiParams = {
    _page: page,
    _limit: limit,
  };

  const { data: posts, isLoading, error } = usePosts(apiParams);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(
      `${routes.protected.dashboard.posts.base}?${params.toString()}`
    );
  };

  if (isLoading) {
    return <PostsListSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error loading posts</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No posts found</CardTitle>
          <CardDescription>
            There are no posts to display at this time.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const hasNextPage = posts.length === limit;
  const hasPrevPage = page > 1;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={routes.protected.dashboard.posts.detail(post.id)}
          >
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription>Post ID: {post.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <TypographyMuted className="line-clamp-3">
                  {post.body}
                </TypographyMuted>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {page} • {posts.length} posts
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(page - 1)}
            disabled={!hasPrevPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function PostsListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-3/4 mb-2" />
            <div className="h-4 bg-muted rounded w-1/4" />
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-muted rounded w-full mb-2" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
