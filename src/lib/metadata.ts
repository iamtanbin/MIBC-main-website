import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Per-page metadata. Next.js replaces (not merges) nested objects like `openGraph`,
 * so each page must restate canonical URL, Open Graph and Twitter fields.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} · ${site.shortName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.shortName,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.shortName} — ${site.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og.png"],
    },
  };
}
