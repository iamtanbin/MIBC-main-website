export const dynamic = "force-static";

// Lets anyone confirm which git commit is live: GET /version.json
export function GET() {
  return Response.json({
    commit: process.env.NEXT_PUBLIC_COMMIT_SHA ?? "unknown",
    builtAt: process.env.NEXT_PUBLIC_BUILD_TIME ?? "unknown",
  });
}
