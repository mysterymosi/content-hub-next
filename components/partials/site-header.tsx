"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { routes } from "@/lib/routes";

type Crumb =
  | { type: "link"; href: string; label: string }
  | { type: "page"; label: string }
  | { type: "separator" };

function buildBreadcrumb(crumbs: Crumb[]) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, idx) => {
          if (crumb.type === "separator") {
            return <BreadcrumbSeparator key={`sep-${idx}`} />;
          }

          if (crumb.type === "link") {
            return (
              <BreadcrumbItem key={`link-${crumb.href}`}>
                <BreadcrumbLink className="text-[13px]" href={crumb.href}>
                  {crumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          }

          return (
            <BreadcrumbItem key={`page-${crumb.label}`}>
              <BreadcrumbPage className="text-[13px]">
                {crumb.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const staticRoutes: Record<string, Crumb[]> = {
  [routes.public.home]: [{ type: "page", label: "Home" }],
  [routes.protected.dashboard.base]: [{ type: "page", label: "Dashboard" }],
  [routes.protected.dashboard.posts.base]: [
    { type: "link", href: routes.protected.dashboard.base, label: "Dashboard" },
    { type: "separator" },
    { type: "page", label: "Posts" },
  ],
};

function getDynamicBreadcrumbs(pathname: string): Crumb[] | null {
  const postDetailMatch = pathname.match(/^\/dashboard\/posts\/(\d+)$/);
  if (postDetailMatch) {
    return [
      {
        type: "link",
        href: routes.protected.dashboard.base,
        label: "Dashboard",
      },
      { type: "separator" },
      {
        type: "link",
        href: routes.protected.dashboard.posts.base,
        label: "Posts",
      },
      { type: "separator" },
      { type: "page", label: `Post #${postDetailMatch[1]}` },
    ];
  }

  return null;
}

export function SiteHeader() {
  const pathname = usePathname();

  const crumbs = getDynamicBreadcrumbs(pathname) ||
    staticRoutes[pathname] || [
      {
        type: "link",
        href: routes.protected.dashboard.base,
        label: "Dashboard",
      },
    ];

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {buildBreadcrumb(crumbs)}
      </div>
    </header>
  );
}
