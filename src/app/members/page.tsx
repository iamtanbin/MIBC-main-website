import { executives, subExecutivesByDepartment } from "@/content/members";
import { site } from "@/content/site";
import { PageHeader, PersonCard, SectionHead } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Members",
  description: `Meet the ${site.term} executive and sub-executive committee of ${site.shortName}.`,
  path: "/members",
});

const listStyle = { listStyle: "none", margin: 0, padding: 0 } as const;

export default function MembersPage() {
  const departments = subExecutivesByDepartment();
  return (
    <>
      <PageHeader
        eyebrow={`Committee ${site.term}`}
        title="Our members"
        lead={`The students who run ${site.shortName}: executives lead the club, and sub-executives drive each wing.`}
      />

      <section className="section container" aria-labelledby="executives" style={{ paddingTop: 40 }}>
        <SectionHead title="Executives" id="executives" />
        <ul className="grid grid-people" style={listStyle}>
          {executives.map((p) => (
            <PersonCard key={p.id} person={p} />
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="sub-executives">
        <SectionHead title="Sub-executives" id="sub-executives" />
        {departments.map(([dept, people]) => (
          <div key={dept} style={{ marginBottom: 32 }}>
            <h3 style={{ marginBottom: 14 }}>{dept}</h3>
            <ul className="grid grid-people" style={listStyle}>
              {people.map((p) => (
                <PersonCard key={p.id} person={p} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
