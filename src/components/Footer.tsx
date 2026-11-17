import Link from "next/link";
import { site } from "@/content/site";
import { navItems } from "@/lib/nav";

export default function Footer() {
  const sha = process.env.NEXT_PUBLIC_COMMIT_SHA ?? "unknown";
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner glass">
          <div>
            <p className="brand-mark" style={{ minHeight: 0 }}>
              <span className="logo-dot" aria-hidden="true">
                M
              </span>
              <span>{site.shortName}</span>
            </p>
            <p className="muted" style={{ marginTop: 10, maxWidth: "40ch" }}>
              {site.tagline}
            </p>
            <address className="muted" style={{ fontStyle: "normal", marginTop: 12, fontSize: "0.95rem" }}>
              {site.contact.address}
              <br />
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </address>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Follow</h2>
            <ul>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.shortName}, {site.university}
          </span>
          <span title={`Build ${sha}`}>Build {sha.slice(0, 7)}</span>
        </div>
      </div>
    </footer>
  );
}
