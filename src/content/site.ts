import type { SocialLink, Stat } from "./types";

// PLACEHOLDER: replace every value marked "Placeholder" with real MIBC content.
export const site = {
  shortName: "MIBC",
  /** Placeholder: full club name. */
  fullName: "MIBC — Full Club Name",
  university: "North South University",
  tagline: "A student-driven business club at North South University.",
  description:
    "MIBC is a student-driven business club at North South University, building future business leaders through flagship competitions, workshops, and industry partnerships.",
  /** Placeholder: founding year. */
  founded: "20XX",
  intro: [
    "Placeholder introduction. Describe who MIBC is, what it stands for, and why students join.",
    "Placeholder second paragraph. Mention the club's mission, the community it has built at NSU, and its impact.",
  ],
  pillars: [
    {
      title: "Learn",
      text: "Placeholder: workshops, sessions, and case practice that build real business skills.",
    },
    {
      title: "Compete",
      text: "Placeholder: flagship competitions that challenge students nationally.",
    },
    {
      title: "Connect",
      text: "Placeholder: partnerships with industry leaders, alumni, and organizations.",
    },
  ],
  stats: [
    { label: "Members", value: "000+" },
    { label: "Flagship events", value: "0" },
    { label: "Partners", value: "00+" },
    { label: "Years active", value: "0" },
  ] satisfies Stat[],
  contact: {
    /** Placeholder email. */
    email: "mibc@example.com",
    address: "North South University, Bashundhara, Dhaka 1229, Bangladesh",
  },
  /** Placeholder social links. Remove any the club does not use. */
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ] satisfies SocialLink[],
  /** Current committee term, shown on the members page. */
  term: "2026–2027",
};
