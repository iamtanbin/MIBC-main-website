import { events } from "@/content/events";
import { site } from "@/content/site";
import { EventCard, PageHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Flagship events",
  description: `Flagship events organized by ${site.shortName} at ${site.university}, with details of every edition.`,
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Flagship events"
        title="Our events"
        lead="Signature competitions, summits, and programs. Each returns with a new edition, and every edition has its own page."
      />
      <section className="section container" aria-labelledby="event-list" style={{ paddingTop: 40 }}>
        <h2 id="event-list" className="visually-hidden">
          All flagship events
        </h2>
        <ul className="grid grid-3" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {events.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </ul>
      </section>
    </>
  );
}
