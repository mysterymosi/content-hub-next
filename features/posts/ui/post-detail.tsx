"use client";

import { useState } from "react";
import { usePost, usePostComments, useUser } from "@/features/posts/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyMuted } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EditPostModal } from "./edit-post-modal";
import { DeletePostDialog } from "./delete-post-dialog";
import type { Post } from "@/features/posts/types";

interface PostDetailProps {
  postId: number;
  initialPost: Post;
}

export function PostDetail({ postId, initialPost }: PostDetailProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: post } = usePost(postId);
  const { data: user, isLoading: userLoading } = useUser(initialPost.userId);
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = usePostComments(postId);

  const displayPost = post || initialPost;

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle>{displayPost.title}</CardTitle>
                <CardDescription>
                  Post ID: {displayPost.id} • User ID: {displayPost.userId}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditModalOpen(true)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TypographyMuted className="whitespace-pre-wrap">
              {displayPost.body}
            </TypographyMuted>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Author</CardTitle>
          </CardHeader>
          <CardContent>
            {userLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : user ? (
              <div className="space-y-1">
                <p className="font-medium">{user.name}</p>
                <TypographyMuted>@{user.username}</TypographyMuted>
                <TypographyMuted>{user.email}</TypographyMuted>
              </div>
            ) : (
              <TypographyMuted>
                Author information not available
              </TypographyMuted>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
            <CardDescription>
              {commentsLoading
                ? "Loading comments..."
                : comments
                  ? `${comments.length} comment${comments.length !== 1 ? "s" : ""}`
                  : "No comments"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {commentsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : commentsError ? (
              <TypographyMuted className="text-destructive">
                Error loading comments: {commentsError.message}
              </TypographyMuted>
            ) : comments && comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4 last:border-0">
                    <div className="mb-2">
                      <p className="font-medium text-sm">{comment.name}</p>
                      <TypographyMuted className="text-xs">
                        {comment.email}
                      </TypographyMuted>
                    </div>
                    <TypographyMuted className="text-sm">
                      {comment.body}
                    </TypographyMuted>
                  </div>
                ))}
              </div>
            ) : (
              <TypographyMuted>No comments yet.</TypographyMuted>
            )}
          </CardContent>
        </Card>
      </div>

      <EditPostModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        post={displayPost}
      />
      <DeletePostDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        post={displayPost}
      />
    </>
  );
}
