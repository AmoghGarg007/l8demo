import { AuthProvider } from "../_components/auth-context";

/**
 * The admin dashboard is a self-contained internal tool — it deliberately
 * skips the site's Header/Footer and just needs the PESU-auth session
 * context to gate access (see admin-client.tsx's requireAdmin-backed checks).
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
