import type { Metadata } from "next";
import LoginClient from "./login-client";

export const metadata: Metadata = {
  title: "Log in · Layer8 Recruitments",
  description: "Log in with your PESU Academy credentials to apply to Layer8.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginClient />;
}
