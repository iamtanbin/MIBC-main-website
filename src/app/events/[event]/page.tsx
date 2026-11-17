import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getEvent, sortedEditions } from "@/content/events";
import { PageHeader, SectionHead } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { formatDateRange } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return events.map((e) => ({ event: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[event]">) {
  const { event: slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return pageMetadata({ title: event.name, description: event.tagline, path: `/events/${event.slug}` });
}

export default async function EventPage({ params }: PageProps<"/events/[event]">) {
  const { event: slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const editions = sortedEditions(event);

  return (
    <>
      <PageHeader
        crumbs={[{ href: "/events", label: "Events" }, { label: event.name }]}
        eyebrow={event.category}
        title={event.name}
        lead={event.tagline}
      />
      <section className="section container" style={{ paddingTop: 40 }} aria-labelledby="about-event">
        <div className="panel glass prose">
          <h2 id="about-event">About the event</h2>
          {event.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
      <section className="section container" aria-labelledby="editions-title">
        <SectionHead
          eyebrow={`${editions.length} ${editions.length === 1 ? "edition" : "editions"}`}
          title="Editions"
          id="editions-title"
        />
        <ol className="timeline">
          {editions.map((ed) => (
            <li key={ed.slug}>
              <Link href={`/events/${event.slug}/${ed.slug}`} className="edition-row glass card-link">
                <span className="year">{ed.slug}</span>
                <span>
                  <span style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                    <strong>{ed.title}</strong>
                    {ed.status === "upcoming" ? <span className="chip upcoming">Upcoming</span> : null}
                  </span>
                  <span className="meta">
                    {formatDateRange(ed.date, ed.endDate)} · {ed.venue}
                  </span>
                </span>
                <span className="go" aria-hidden="true">
                  View edition →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
