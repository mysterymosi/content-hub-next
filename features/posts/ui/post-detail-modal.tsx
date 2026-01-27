"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostDetail } from "./post-detail";
import type { Post } from "@/features/posts/types";

interface PostDetailModalProps {
  postId: number;
  initialPost: Post;
}

export function PostDetailModal({ postId, initialPost }: PostDetailModalProps) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="line-clamp-2">
            {initialPost.title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <PostDetail postId={postId} initialPost={initialPost} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
