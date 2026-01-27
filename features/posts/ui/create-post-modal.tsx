"use client";

import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostForm } from "./post-form";
import { useCreatePost } from "@/features/posts/mutations";
import type { PostFormData } from "@/features/posts/schema";

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePostModal({ open, onOpenChange }: CreatePostModalProps) {
  const createPost = useCreatePost();

  const handleSubmit = async (data: PostFormData) => {
    try {
      await createPost.mutateAsync(data);
      toast.success("Post created successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <PostForm
            onSubmit={handleSubmit}
            isLoading={createPost.isPending}
            submitLabel="Create Post"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
