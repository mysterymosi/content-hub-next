"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreatePostModal } from "./create-post-modal";

export function PostsPageHeader() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <PageHeader
        headline="Posts"
        subheadline="Browse and manage all posts in the platform."
      >
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </PageHeader>
      <CreatePostModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </>
  );
}
