import type { NextConfig } from "next";
import { execSync } from "node:child_process";

// Commit SHA baked into the build so the live site can be matched to a git commit
// (see /version.json). Cloudflare Builds clones the repo, so `git` is available there.
function commitSha() {
  const fromEnv = process.env.WORKERS_CI_COMMIT_SHA ?? process.env.GITHUB_SHA;
  if (fromEnv) return fromEnv;
  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "unknown";
  }
}

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes HTML/CSS/JS to ./out, served by Cloudflare Workers static assets.
  output: "export",
  // Images are pre-sized/optimized before being committed (no runtime image optimizer on static export).
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_COMMIT_SHA: commitSha(),
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
