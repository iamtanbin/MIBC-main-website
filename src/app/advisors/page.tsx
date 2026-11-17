import { advisors } from "@/content/advisors";
import { site } from "@/content/site";
import { AdvisorCard, PageHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Faculty advisors",
  description: `The ${site.university} faculty members who advise and guide ${site.shortName}.`,
  path: "/advisors",
});

export default function AdvisorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guidance"
        title="Faculty advisors"
        lead={`Faculty members of ${site.university} who mentor the club and guide its direction.`}
      />
      <section className="section container" aria-labelledby="advisor-list" style={{ paddingTop: 40 }}>
        <h2 id="advisor-list" className="visually-hidden">
          Advisor list
        </h2>
        <ul className="grid" style={{ listStyle: "none", margin: 0, padding: 0, gap: 20 }}>
          {advisors.map((a) => (
            <AdvisorCard key={a.id} advisor={a} />
          ))}
        </ul>
      </section>
    </>
  );
}
