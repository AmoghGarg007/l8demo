import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't walk up to C:\Users\Lenovo
  // looking for a lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
