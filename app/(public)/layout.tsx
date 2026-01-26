/**
 * Public layout for unauthenticated routes
 * Simple layout without sidebar or navigation
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
