import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container" style={{ paddingTop: "clamp(48px, 10vw, 120px)" }}>
      <div className="hero-card glass" style={{ textAlign: "center" }}>
        <span className="eyebrow">404</span>
        <h1 style={{ maxWidth: "none" }}>Page not found</h1>
        <p className="hero-lead" style={{ marginInline: "auto" }}>
          The page you are looking for does not exist or has moved.
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" href="/">
            Go home
          </Link>
          <Link className="btn btn-ghost" href="/events">
            Browse events
          </Link>
        </div>
      </div>
    </section>
  );
}
