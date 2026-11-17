import type { MetadataRoute } from "next";
import { events } from "@/content/events";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/events", "/members", "/advisors", "/partners"];
  const eventPaths = events.flatMap((e) => [
    `/events/${e.slug}`,
    ...e.editions.map((ed) => `/events/${e.slug}/${ed.slug}`),
  ]);
  return [...staticPaths, ...eventPaths].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 3 ? 0.6 : 0.8,
  }));
}
