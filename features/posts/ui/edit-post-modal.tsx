"use client";

import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostForm } from "./post-form";
import { useUpdatePost } from "@/features/posts/mutations";
import type { Post } from "../types";
import type { PostFormData } from "../schema";

interface EditPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
}

export function EditPostModal({
  open,
  onOpenChange,
  post,
}: EditPostModalProps) {
  const updatePost = useUpdatePost();

  const handleSubmit = async (data: PostFormData) => {
    try {
      await updatePost.mutateAsync({ id: post.id, data });
      toast.success("Post updated successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <PostForm
            initialData={{
              title: post.title,
              body: post.body,
            }}
            onSubmit={handleSubmit}
            isLoading={updatePost.isPending}
            submitLabel="Update Post"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
