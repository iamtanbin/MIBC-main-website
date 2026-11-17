import type { FlagshipEvent } from "./types";

// PLACEHOLDER: replace with MIBC's real flagship events.
// Each event can have any number of editions; each edition gets its own page at
// /events/<event.slug>/<edition.slug>.
export const events: FlagshipEvent[] = [
  {
    slug: "flagship-event-one",
    name: "Flagship Event One",
    tagline: "Placeholder tagline for the first flagship event.",
    category: "Competition",
    description: [
      "Placeholder description. Explain what this event is, who it is for, and what participants gain.",
      "Placeholder second paragraph. Describe the format, rounds, and judging.",
    ],
    editions: [
      {
        slug: "2026",
        title: "Flagship Event One 2026",
        date: "2026-12-12",
        venue: "North South University",
        status: "upcoming",
        summary: "Placeholder summary of the upcoming edition.",
        details: ["Placeholder details about schedule, eligibility, and registration."],
        highlights: ["Placeholder highlight one", "Placeholder highlight two"],
        partnerIds: ["partner-1", "partner-2"],
        link: { label: "Register", href: "https://example.com/" },
      },
      {
        slug: "2025",
        title: "Flagship Event One 2025",
        date: "2025-11-20",
        endDate: "2025-11-21",
        venue: "North South University",
        status: "completed",
        summary: "Placeholder recap of the 2025 edition.",
        details: [
          "Placeholder paragraph about what happened in this edition.",
          "Placeholder paragraph about winners and outcomes.",
        ],
        highlights: ["Placeholder winner", "Placeholder runner-up", "Placeholder guest speaker"],
        stats: [
          { label: "Participants", value: "000" },
          { label: "Teams", value: "00" },
          { label: "Universities", value: "00" },
        ],
        partnerIds: ["partner-1", "partner-3"],
      },
      {
        slug: "2024",
        title: "Flagship Event One 2024",
        date: "2024-11-15",
        venue: "North South University",
        status: "completed",
        summary: "Placeholder recap of the 2024 edition.",
        details: ["Placeholder paragraph about this edition."],
        highlights: ["Placeholder winner", "Placeholder runner-up"],
        stats: [
          { label: "Participants", value: "000" },
          { label: "Teams", value: "00" },
        ],
      },
    ],
  },
  {
    slug: "flagship-event-two",
    name: "Flagship Event Two",
    tagline: "Placeholder tagline for the second flagship event.",
    category: "Summit",
    description: ["Placeholder description of the second flagship event."],
    editions: [
      {
        slug: "2025",
        title: "Flagship Event Two 2025",
        date: "2025-08-09",
        venue: "North South University",
        status: "completed",
        summary: "Placeholder recap of the 2025 edition.",
        details: ["Placeholder paragraph about this edition."],
        highlights: ["Placeholder keynote", "Placeholder panel discussion"],
        stats: [{ label: "Attendees", value: "000" }],
        partnerIds: ["partner-2"],
      },
      {
        slug: "2024",
        title: "Flagship Event Two 2024",
        date: "2024-08-10",
        venue: "North South University",
        status: "completed",
        summary: "Placeholder recap of the 2024 edition.",
        details: ["Placeholder paragraph about this edition."],
        highlights: ["Placeholder keynote"],
      },
    ],
  },
  {
    slug: "flagship-event-three",
    name: "Flagship Event Three",
    tagline: "Placeholder tagline for the third flagship event.",
    category: "Workshop series",
    description: ["Placeholder description of the third flagship event."],
    editions: [
      {
        slug: "2025",
        title: "Flagship Event Three 2025",
        date: "2025-03-15",
        venue: "North South University",
        status: "completed",
        summary: "Placeholder recap of the 2025 edition.",
        details: ["Placeholder paragraph about this edition."],
        highlights: ["Placeholder session one", "Placeholder session two"],
      },
    ],
  },
];

/** Editions sorted newest first. */
export function sortedEditions(event: FlagshipEvent) {
  return [...event.editions].sort((a, b) => b.date.localeCompare(a.date));
}

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getEdition(eventSlug: string, editionSlug: string) {
  const event = getEvent(eventSlug);
  const edition = event?.editions.find((e) => e.slug === editionSlug);
  return event && edition ? { event, edition } : undefined;
}
