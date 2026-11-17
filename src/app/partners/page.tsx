import { partnersByTier, tierLabels } from "@/content/partners";
import { site } from "@/content/site";
import { PageHeader, PartnerCard, SectionHead } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Partners",
  description: `Organizations that partner with ${site.shortName} to support students at ${site.university}.`,
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Our partners"
        lead="Organizations that make our events and programs possible."
      />
      {partnersByTier().map(([tier, list], i) => (
        <section
          key={tier}
          className="section container"
          aria-labelledby={`tier-${tier}`}
          style={i === 0 ? { paddingTop: 40 } : undefined}
        >
          <SectionHead title={tierLabels[tier]} id={`tier-${tier}`} />
          <ul className="grid grid-partners" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {list.map((p) => (
              <PartnerCard key={p.id} partner={p} />
            ))}
          </ul>
        </section>
      ))}
      <section className="section container" aria-labelledby="become-partner">
        <div className="cta glass">
          <div>
            <h2 id="become-partner">Become a partner</h2>
            <p>Work with {site.shortName} to reach ambitious business students at {site.university}.</p>
          </div>
          <a className="btn btn-primary" href={`mailto:${site.contact.email}?subject=Partnership%20with%20${site.shortName}`}>
            Get in touch
          </a>
        </div>
      </section>
    </>
  );
}
