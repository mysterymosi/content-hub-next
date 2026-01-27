import { notFound } from "next/navigation";
import { createQueryClient } from "@/lib/query/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPost } from "@/actions/posts";
import { getUser } from "@/actions/users";
import { postKeys } from "@/lib/query/keys";
import { PostDetailModal } from "@/features/posts/ui/post-detail-modal";

interface PostDetailModalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostDetailModalPage({
  params,
}: PostDetailModalPageProps) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  const queryClient = createQueryClient();

  const post = await queryClient.fetchQuery({
    queryKey: postKeys.detail(postId),
    queryFn: async () => {
      const result = await getPost(postId);
      if ("error" in result) {
        throw result.error;
      }
      return result.data;
    },
  });

  queryClient.prefetchQuery({
    queryKey: postKeys.user(post.userId),
    queryFn: async () => {
      const result = await getUser(post.userId);
      if ("error" in result) {
        console.error("Failed to fetch user:", result.error);
        throw result.error;
      }
      return result.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailModal postId={postId} initialPost={post} />
    </HydrationBoundary>
  );
}
