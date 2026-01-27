"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeletePost } from "@/features/posts/mutations";
import { routes } from "@/lib/routes";
import type { Post } from "../types";

interface DeletePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
}

export function DeletePostDialog({
  open,
  onOpenChange,
  post,
}: DeletePostDialogProps) {
  const router = useRouter();
  const deletePost = useDeletePost();

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(post.id);
      toast.success("Post deleted successfully!");
      onOpenChange(false);
      router.push(routes.protected.dashboard.posts.base);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{post.title}&quot;? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deletePost.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deletePost.isPending}
            variant="destructive"
          >
            {deletePost.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
