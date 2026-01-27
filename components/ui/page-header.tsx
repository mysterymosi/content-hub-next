import { TypographyH2, TypographyMuted } from "@/components/ui/typography";

interface PageHeaderProps {
  headline: string;
  subheadline: string;
  children?: React.ReactNode;
}

export function PageHeader({
  headline,
  subheadline,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <TypographyH2>{headline}</TypographyH2>
        <TypographyMuted>{subheadline}</TypographyMuted>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
