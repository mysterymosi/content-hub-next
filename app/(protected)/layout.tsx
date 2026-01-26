/**
 * Protected layout for authenticated routes
 * This layout wraps all protected routes
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
