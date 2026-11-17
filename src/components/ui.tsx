import Link from "next/link";
import type { ReactNode } from "react";
import type { Advisor, FlagshipEvent, Partner, Person } from "@/content/types";
import { sortedEditions } from "@/content/events";
import { tierLabels } from "@/content/partners";
import { initials } from "@/lib/site";

export function Avatar({ person, size = 112 }: { person: Person; size?: number }) {
  if (person.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export: images are pre-optimized, sized via CSS
      <img
        className="avatar"
        src={person.photo}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span className="avatar" aria-hidden="true" style={{ width: size, height: size }}>
      {initials(person.name)}
    </span>
  );
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <li className="person glass">
      <Avatar person={person} />
      <span className="name">{person.name}</span>
      <span className="role">{person.role}</span>
      {person.linkedin ? (
        <a className="social text-link" href={person.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn<span className="visually-hidden"> profile of {person.name} (opens in a new tab)</span>
        </a>
      ) : null}
    </li>
  );
}

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <li className="advisor glass">
      <Avatar person={advisor} size={128} />
      <div>
        <span className="chip">{advisor.role}</span>
        <h3 style={{ marginTop: 10 }}>{advisor.name}</h3>
        <p className="designation">{advisor.designation}</p>
        {advisor.bio ? <p className="bio">{advisor.bio}</p> : null}
        {advisor.email ? (
          <a className="text-link" href={`mailto:${advisor.email}`}>
            {advisor.email}
          </a>
        ) : null}
      </div>
    </li>
  );
}

export function PartnerCard({ partner, showTier = false }: { partner: Partner; showTier?: boolean }) {
  const inner = (
    <>
      {partner.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export: logos are pre-optimized
        <img src={partner.logo} alt={partner.name} loading="lazy" decoding="async" />
      ) : (
        <span className="wordmark">{partner.name}</span>
      )}
      {showTier ? <span className="tier">{tierLabels[partner.tier].replace(/s$/, "")}</span> : null}
    </>
  );
  return (
    <li style={{ display: "grid" }}>
      {partner.url ? (
        <a className="partner glass card-link" href={partner.url} target="_blank" rel="noopener noreferrer">
          {inner}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      ) : (
        <div className="partner glass">{inner}</div>
      )}
    </li>
  );
}

export function EventCard({ event }: { event: FlagshipEvent }) {
  const latest = sortedEditions(event)[0];
  const count = event.editions.length;
  return (
    <li style={{ display: "grid" }}>
      <Link href={`/events/${event.slug}`} className="card glass card-link">
        <span className="chip">{event.category}</span>
        <h3>{event.name}</h3>
        <p>{event.tagline}</p>
        <p style={{ fontSize: "0.9rem" }}>
          {count} {count === 1 ? "edition" : "editions"}
          {latest ? ` · Latest: ${latest.slug}` : ""}
        </p>
        <span className="arrow" aria-hidden="true">
          Explore event →
        </span>
      </Link>
    </li>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  action,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-head">
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 id={id}>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {action}
    </div>
  );
}

export type Crumb = { href?: string; label: string };

export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <div className="page-header container">
      {crumbs ? (
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            {crumbs.map((c, i) => (
              <li key={i}>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h1>{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
      {children}
    </div>
  );
}
