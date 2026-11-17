import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getEdition, sortedEditions } from "@/content/events";
import { getPartners } from "@/content/partners";
import { PageHeader, PartnerCard } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { formatDateRange } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return events.flatMap((e) => e.editions.map((ed) => ({ event: e.slug, edition: ed.slug })));
}

export async function generateMetadata({ params }: PageProps<"/events/[event]/[edition]">) {
  const { event, edition } = await params;
  const found = getEdition(event, edition);
  if (!found) return {};
  return pageMetadata({
    title: found.edition.title,
    description: found.edition.summary,
    path: `/events/${found.event.slug}/${found.edition.slug}`,
  });
}

export default async function EditionPage({ params }: PageProps<"/events/[event]/[edition]">) {
  const { event: eventSlug, edition: editionSlug } = await params;
  const found = getEdition(eventSlug, editionSlug);
  if (!found) notFound();
  const { event, edition } = found;

  // Newest first: "newer" is the previous item, "older" the next.
  const ordered = sortedEditions(event);
  const index = ordered.findIndex((e) => e.slug === edition.slug);
  const newer = ordered[index - 1];
  const older = ordered[index + 1];
  const editionPartners = getPartners(edition.partnerIds);

  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/events", label: "Events" },
          { href: `/events/${event.slug}`, label: event.name },
          { label: edition.slug },
        ]}
        eyebrow={event.name}
        title={edition.title}
        lead={edition.summary}
      >
        {edition.status === "upcoming" ? (
          <p style={{ marginTop: 16 }}>
            <span className="chip upcoming">Upcoming</span>
          </p>
        ) : null}
      </PageHeader>

      <div className="section container" style={{ paddingTop: 40 }}>
        <div className="detail">
          <div>
            <section className="panel glass prose" aria-labelledby="overview">
              <h2 id="overview">Overview</h2>
              {edition.details.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>

            {edition.highlights.length ? (
              <section className="panel glass" aria-labelledby="highlights">
                <h2 id="highlights">Highlights</h2>
                <ul className="checklist">
                  {edition.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {edition.stats?.length ? (
              <section className="panel glass" aria-labelledby="numbers">
                <h2 id="numbers">By the numbers</h2>
                <ul className="grid grid-stats" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {edition.stats.map((s) => (
                    <li key={s.label}>
                      <span className="value" style={{ display: "block", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em" }}>
                        {s.value}
                      </span>
                      <span className="muted">{s.label}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {editionPartners.length ? (
              <section className="panel glass" aria-labelledby="edition-partners">
                <h2 id="edition-partners">Partners</h2>
                <ul className="grid grid-partners" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {editionPartners.map((p) => (
                    <PartnerCard key={p.id} partner={p} showTier />
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="glass" aria-label="Edition details">
            <dl className="facts">
              <div>
                <dt>Date</dt>
                <dd>{formatDateRange(edition.date, edition.endDate)}</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>{edition.venue}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{edition.status === "upcoming" ? "Upcoming" : "Completed"}</dd>
              </div>
            </dl>
            {edition.link ? (
              <a
                className="btn btn-primary"
                style={{ width: "100%", marginTop: 20 }}
                href={edition.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {edition.link.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            ) : null}
          </aside>
        </div>

        <nav className="pager" aria-label="Other editions">
          {newer ? (
            <Link className="glass card-link" href={`/events/${event.slug}/${newer.slug}`} style={{ borderRadius: 20 }}>
              <small>Newer edition</small>← {newer.title}
            </Link>
          ) : (
            <span />
          )}
          {older ? (
            <Link className="glass card-link next" href={`/events/${event.slug}/${older.slug}`} style={{ borderRadius: 20 }}>
              <small>Older edition</small>
              {older.title} →
            </Link>
          ) : null}
        </nav>
      </div>
    </>
  );
}
