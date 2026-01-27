import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PostsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-muted" />
              <div className="h-8 w-8 rounded-full bg-muted" />
            </div>
            <div className="h-5 bg-muted rounded w-3/4 mb-2" />
            <div className="flex gap-2 mb-2">
              <div className="h-3 bg-muted rounded w-12" />
              <div className="h-3 bg-muted rounded w-16" />
              <div className="h-3 bg-muted rounded w-20" />
            </div>
            <div className="h-3 bg-muted rounded w-24" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="aspect-video bg-muted rounded-lg mb-4" />
            <div className="flex items-center gap-4">
              <div className="h-3 bg-muted rounded w-12" />
              <div className="h-3 bg-muted rounded w-12" />
              <div className="h-3 bg-muted rounded w-8" />
              <div className="h-3 bg-muted rounded w-8" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
