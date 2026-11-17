import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/content/site";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.shortName} — Business Club at ${site.university}`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.shortName,
    locale: "en_US",
    url: "/",
    title: `${site.shortName} — Business Club at ${site.university}`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.shortName} — ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} — Business Club at ${site.university}`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: ALLOW_INDEXING ? { index: true, follow: true } : { index: false, follow: false },
  other: { "build-commit": process.env.NEXT_PUBLIC_COMMIT_SHA ?? "unknown" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="ambient" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
