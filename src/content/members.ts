import type { Person } from "./types";

// PLACEHOLDER: replace with the current committee.
// Photos: put square images (min 480x480, WebP preferred) in public/images/members/
// and set `photo: "/images/members/<file>.webp"`. Without a photo, initials are shown.

export const executives: Person[] = [
  { id: "exec-1", name: "Executive Name", role: "President" },
  { id: "exec-2", name: "Executive Name", role: "Vice President" },
  { id: "exec-3", name: "Executive Name", role: "General Secretary" },
  { id: "exec-4", name: "Executive Name", role: "Treasurer" },
  { id: "exec-5", name: "Executive Name", role: "Director, Operations" },
  { id: "exec-6", name: "Executive Name", role: "Director, Marketing" },
];

export const subExecutives: Person[] = [
  { id: "sub-1", name: "Sub-Executive Name", role: "Sub-Executive", department: "Operations" },
  { id: "sub-2", name: "Sub-Executive Name", role: "Sub-Executive", department: "Operations" },
  { id: "sub-3", name: "Sub-Executive Name", role: "Sub-Executive", department: "Marketing" },
  { id: "sub-4", name: "Sub-Executive Name", role: "Sub-Executive", department: "Marketing" },
  { id: "sub-5", name: "Sub-Executive Name", role: "Sub-Executive", department: "Creative" },
  { id: "sub-6", name: "Sub-Executive Name", role: "Sub-Executive", department: "Creative" },
  { id: "sub-7", name: "Sub-Executive Name", role: "Sub-Executive", department: "Partnerships" },
  { id: "sub-8", name: "Sub-Executive Name", role: "Sub-Executive", department: "Partnerships" },
];

/** Sub-executives grouped by department, preserving first-seen order. */
export function subExecutivesByDepartment() {
  const groups = new Map<string, Person[]>();
  for (const person of subExecutives) {
    const key = person.department ?? "General";
    groups.set(key, [...(groups.get(key) ?? []), person]);
  }
  return [...groups.entries()];
}
