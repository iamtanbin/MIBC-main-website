import type { Partner, PartnerTier } from "./types";

// PLACEHOLDER: replace with real partners.
// Logos: put SVG (preferred) or WebP files in public/images/partners/ and set `logo`.
export const partners: Partner[] = [
  { id: "partner-1", name: "Partner Name", tier: "title", description: "Placeholder partner description." },
  { id: "partner-2", name: "Partner Name", tier: "strategic" },
  { id: "partner-3", name: "Partner Name", tier: "strategic" },
  { id: "partner-4", name: "Partner Name", tier: "knowledge" },
  { id: "partner-5", name: "Partner Name", tier: "media" },
  { id: "partner-6", name: "Partner Name", tier: "community" },
];

export const tierLabels: Record<PartnerTier, string> = {
  title: "Title partners",
  strategic: "Strategic partners",
  knowledge: "Knowledge partners",
  media: "Media partners",
  community: "Community partners",
};

export function partnersByTier() {
  return (Object.keys(tierLabels) as PartnerTier[])
    .map((tier) => [tier, partners.filter((p) => p.tier === tier)] as const)
    .filter(([, list]) => list.length > 0);
}

export function getPartners(ids: string[] = []) {
  return ids.map((id) => partners.find((p) => p.id === id)).filter((p): p is Partner => Boolean(p));
}
