import { AuthProvider } from "../_components/auth-context";

/**
 * Everything under /recruitments (the join form and its login page)
 * needs the PESU-auth session context. Scoped here instead of the root
 * layout so the rest of the site never mounts it or fetches /api/auth/session.
 */
export default function RecruitmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
