import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    // Pre-launch: keep the whole site out of search results.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    // Management/utility endpoints (none public yet) go in `disallow`.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/version.json"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
