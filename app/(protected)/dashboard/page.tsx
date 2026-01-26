import {
  TypographyH2,
  TypographyH3,
  TypographyMuted,
  TypographyLarge,
} from "@/components/ui/typography";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <TypographyH2>Welcome back!</TypographyH2>
        <TypographyMuted className="mt-2">
          Here&apos;s an overview of your content platform.
        </TypographyMuted>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <TypographyH3>Posts</TypographyH3>
          <TypographyLarge className="mt-2">0</TypographyLarge>
          <TypographyMuted className="mt-1">Total posts</TypographyMuted>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <TypographyH3>Comments</TypographyH3>
          <TypographyLarge className="mt-2">0</TypographyLarge>
          <TypographyMuted className="mt-1">Total comments</TypographyMuted>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <TypographyH3>Users</TypographyH3>
          <TypographyLarge className="mt-2">0</TypographyLarge>
          <TypographyMuted className="mt-1">Total users</TypographyMuted>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <TypographyH3>Activity</TypographyH3>
          <TypographyLarge className="mt-2">0</TypographyLarge>
          <TypographyMuted className="mt-1">Recent activity</TypographyMuted>
        </div>
      </div>
    </div>
  );
}
