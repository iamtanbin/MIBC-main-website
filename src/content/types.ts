// Shared content types. All site content lives in src/content/*.ts.
// Edit those files (not components) to update the website.

export type SocialLink = {
  label: string;
  href: string;
};

export type Person = {
  /** Unique id used as React key. */
  id: string;
  name: string;
  role: string;
  /** Wing / department, used to group sub-executives. */
  department?: string;
  /** Path under /public, e.g. "/images/members/jane.webp". Optional: initials avatar is shown otherwise. */
  photo?: string;
  linkedin?: string;
  email?: string;
};

export type Advisor = Person & {
  /** e.g. "Associate Professor, Department of Management". */
  designation: string;
  bio?: string;
};

export type PartnerTier = "title" | "strategic" | "knowledge" | "media" | "community";

export type Partner = {
  id: string;
  name: string;
  tier: PartnerTier;
  /** Path under /public. Optional: name is shown as a wordmark otherwise. */
  logo?: string;
  url?: string;
  description?: string;
};

export type Stat = {
  label: string;
  value: string;
};

export type EventEdition = {
  /** URL segment, e.g. "2025". Must be unique within its event. */
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). Used for ordering and display. */
  date: string;
  /** Optional ISO end date for multi-day editions. */
  endDate?: string;
  venue: string;
  status: "upcoming" | "completed";
  summary: string;
  /** Longer description paragraphs. */
  details: string[];
  highlights: string[];
  stats?: Stat[];
  /** Partner ids from partners.ts. */
  partnerIds?: string[];
  /** Optional registration / recap link. */
  link?: SocialLink;
};

export type FlagshipEvent = {
  /** URL segment, e.g. "case-competition". */
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  category: string;
  editions: EventEdition[];
};
