import { notFound } from "next/navigation";
import { createQueryClient } from "@/lib/query/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPost } from "@/actions/posts";
import { getUser } from "@/actions/users";
import { postKeys } from "@/lib/query/keys";
import { PostDetail } from "@/features/posts/ui";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";

interface PostDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
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
    <div className="space-y-6">
      <div>
        <TypographyH2>{post.title}</TypographyH2>
        <TypographyMuted>
          Post ID: {post.id} • User ID: {post.userId}
        </TypographyMuted>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostDetail postId={postId} initialPost={post} />
      </HydrationBoundary>
    </div>
  );
}
