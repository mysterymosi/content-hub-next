"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PostDetailError({
  error,
  reset,
}: PostDetailErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Post detail error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Error loading post</CardTitle>
          <CardDescription>
            {error.message || "An unexpected error occurred"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button
            onClick={() =>
              (window.location.href = routes.protected.dashboard.posts.base)
            }
            variant="outline"
          >
            Back to posts
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
