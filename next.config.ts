import type { NextConfig } from "next";
import path from "node:path";

// Vercel already sets Strict-Transport-Security by platform default, so it's
// deliberately not repeated here. Everything else below was entirely absent
// otherwise — confirmed via `curl -D-` against the live site.
//
// script-src/style-src keep 'unsafe-inline' rather than a nonce: Next.js
// injects its own inline hydration scripts and this codebase uses plenty of
// inline `style={{...}}` props, and this app has no other place that
// executes attacker-controlled HTML/script (markdown rendering escapes and
// allowlists link schemes; no dangerouslySetInnerHTML misuse) — so CSP here
// is real defense-in-depth against clickjacking/framing/asset-injection,
// not the primary XSS defense.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't walk up to C:\Users\Lenovo
  // looking for a lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
