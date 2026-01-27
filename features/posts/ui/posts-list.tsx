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
import { PostsListSkeleton } from "./posts-list-skeleton";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Trash2, ArrowUp, MessageCircle, Bookmark, Share2 } from "lucide-react";

interface PostsListProps {
  page: number;
  limit: number;
}

// Formats dates for display. Note: Dates are mock data generated from post.id since
// JSONPlaceholder doesn't provide actual post dates.
function formatDate(date: Date, now: Date): string {
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function calculateReadTime(body: string): number {
  const wordsPerMinute = 200;
  const wordCount = body.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute) || 1;
}

// Generates mock engagement metrics (upvotes, comments, saves, shares) based on post ID.
// JSONPlaceholder doesn't provide engagement data, so we generate deterministic mock values.
function generateMockEngagement(postId: number) {
  const seed = postId * 17;
  return {
    upvotes: Math.floor((seed % 500) + 50),
    comments: Math.floor((seed % 100) + 10),
    saves: Math.floor((seed % 20) + 1),
    shares: Math.floor((seed % 15) + 1),
  };
}

// Returns mock tags for a post based on its ID. JSONPlaceholder doesn't provide tags,
// so we cycle through predefined tag sets to simulate tag data.
function getTagsForPost(postId: number): string[] {
  const tagSets = [
    ["#ai", "#github", "#productivity"],
    ["#webdev", "#css", "#frontend"],
    ["#open-source", "#github", "#git"],
    ["#devops", "#production", "#deployment"],
    ["#javascript", "#webdev", "#frameworks"],
  ];
  return tagSets[postId % tagSets.length] || ["#tech", "#development"];
}

export function PostsList({ page, limit }: PostsListProps) {
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const apiParams = {
    _page: page,
    _limit: limit,
  };

  const { data: posts, isLoading, error } = usePosts(apiParams);
  const now = new Date();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            // Mock engagement metrics (upvotes, comments, saves, shares)
            const engagement = generateMockEngagement(post.id);
            const readTime = calculateReadTime(post.body);
            // Mock post date: generates a date that is (post.id) days ago from now.
            // JSONPlaceholder doesn't provide dates, so we simulate them based on post ID.
            const postDate = new Date(now.getTime() - post.id * 86400000);
            // Mock tags: cycles through predefined tag sets based on post ID
            const tags = getTagsForPost(post.id);
            // Mock user initials: JSONPlaceholder doesn't provide user names in post data,
            // so we generate initials from userId
            const userInitials = `U${post.userId}`;

            return (
              <Card
                key={post.id}
                className="group hover:shadow-lg transition-all duration-200 relative overflow-hidden"
              >
                <Link href={routes.protected.dashboard.posts.detail(post.id)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-3">
                      {/* Mock avatar group: shows user avatar and a placeholder "+" avatar */}
                      <AvatarGroup>
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                            +
                          </AvatarFallback>
                        </Avatar>
                      </AvatarGroup>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    {/* Mock tags: displayed tags are generated from predefined sets */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <CardDescription className="text-xs">
                      {formatDate(postDate, now)} • {readTime}m read
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-muted rounded-lg mb-4 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-2xl font-bold text-muted-foreground/50 mb-1">
                          {post.id}
                        </div>
                        <TypographyMuted className="text-xs">
                          Post Preview
                        </TypographyMuted>
                      </div>
                    </div>
                    {/* Mock engagement metrics: upvotes, comments, saves, and shares are generated */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <ArrowUp className="h-3.5 w-3.5" />
                          <span>{engagement.upvotes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>{engagement.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bookmark className="h-3.5 w-3.5" />
                          <span>{engagement.saves}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-3.5 w-3.5" />
                          <span>{engagement.shares}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDeletePostId(post.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </Card>
            );
          })}
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
