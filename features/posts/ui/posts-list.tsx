"use client";

import { useState } from "react";
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
import { PaginationComp } from "@/components/ui/pagination-comp";
import { DeletePostDialog } from "./delete-post-dialog";
import { Trash2 } from "lucide-react";

interface PostsListProps {
  page: number;
  limit: number;
}

export function PostsList({ page, limit }: PostsListProps) {
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const apiParams = {
    _page: page,
    _limit: limit,
  };

  const { data: posts, isLoading, error } = usePosts(apiParams);

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
    <>
      <div className="space-y-6">
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="hover:bg-accent/50 transition-colors relative group"
            >
              <Link href={routes.protected.dashboard.posts.detail(post.id)}>
                <CardHeader>
                  <CardTitle className="line-clamp-2 pr-8">
                    {post.title}
                  </CardTitle>
                  <CardDescription>Post ID: {post.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <TypographyMuted className="line-clamp-3">
                    {post.body}
                  </TypographyMuted>
                </CardContent>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeletePostId(post.id);
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </Card>
          ))}
        </div>

        <PaginationComp
          basePath={routes.protected.dashboard.posts.base}
          page={page}
          limit={limit}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </div>

      {deletePostId &&
        (() => {
          const postToDelete = posts.find((p) => p.id === deletePostId);
          if (!postToDelete) return null;
          return (
            <DeletePostDialog
              open={true}
              onOpenChange={(open) => {
                if (!open) {
                  setDeletePostId(null);
                }
              }}
              post={postToDelete}
            />
          );
        })()}
    </>
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
