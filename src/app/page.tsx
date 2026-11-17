import Link from "next/link";
import { site } from "@/content/site";
import { events } from "@/content/events";
import { executives } from "@/content/members";
import { advisors } from "@/content/advisors";
import { partners } from "@/content/partners";
import { AdvisorCard, EventCard, PartnerCard, PersonCard, SectionHead } from "@/components/ui";
import { SITE_URL } from "@/lib/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.fullName,
    alternateName: site.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    email: site.contact.email,
    description: site.description,
    parentOrganization: { "@type": "CollegeOrUniversity", name: site.university },
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-card glass">
          <span className="eyebrow">{site.university}</span>
          <h1 id="hero-title">Where future business leaders begin.</h1>
          <p className="hero-lead">{site.description}</p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/events">
              Explore our events
            </Link>
            <Link className="btn btn-ghost" href="/members">
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <section className="section container" id="about" aria-labelledby="about-title">
        <SectionHead eyebrow="About us" title={`Who is ${site.shortName}?`} id="about-title" />
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
          <div className="panel glass prose">
            {site.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="grid grid-stats" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {site.stats.map((s) => (
              <li key={s.label} className="stat glass">
                <span className="value">{s.value}</span>
                <span className="label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="grid grid-3" style={{ listStyle: "none", margin: "16px 0 0", padding: 0 }}>
          {site.pillars.map((p) => (
            <li key={p.title} className="card glass">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="events-title">
        <SectionHead
          eyebrow="Flagship events"
          title="What we're known for"
          intro="Our signature events return every year with a new edition."
          id="events-title"
          action={
            <Link className="text-link" href="/events">
              All events →
            </Link>
          }
        />
        <ul className="grid grid-3" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {events.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="team-title">
        <SectionHead
          eyebrow={`Committee ${site.term}`}
          title="Led by students"
          id="team-title"
          action={
            <Link className="text-link" href="/members">
              Full team →
            </Link>
          }
        />
        <ul className="grid grid-people" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {executives.slice(0, 4).map((p) => (
            <PersonCard key={p.id} person={p} />
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="advisors-title">
        <SectionHead
          eyebrow="Guidance"
          title="Faculty advisors"
          id="advisors-title"
          action={
            <Link className="text-link" href="/advisors">
              About our advisors →
            </Link>
          }
        />
        <ul className="grid" style={{ listStyle: "none", margin: 0, padding: 0, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))" }}>
          {advisors.map((a) => (
            <AdvisorCard key={a.id} advisor={a} />
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="partners-title">
        <SectionHead
          eyebrow="Partners"
          title="Backed by great organizations"
          id="partners-title"
          action={
            <Link className="text-link" href="/partners">
              All partners →
            </Link>
          }
        />
        <ul className="grid grid-partners" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {partners.map((p) => (
            <PartnerCard key={p.id} partner={p} />
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="cta-title">
        <div className="cta glass">
          <div>
            <h2 id="cta-title">Partner or collaborate with {site.shortName}</h2>
            <p>Reach out for sponsorships, collaborations, or speaking opportunities.</p>
          </div>
          <a className="btn btn-primary" href={`mailto:${site.contact.email}`}>
            Contact us
          </a>
        </div>
      </section>
    </>
  );
}
