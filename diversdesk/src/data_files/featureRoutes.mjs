// Keep solution feature selections and preview migration redirects in sync.
export const solutionFeatureSlugs = {
  "dive-centers": [
    "digital-onboarding", "planner-scheduling", "booking-engine-channel-manager",
    "inventory-pos-rentals", "staff-wages-workload", "finance-bookkeeping",
    "payment-gateways", "agents-partners-portal", "group-bookings-split-billing-discounts",
  ],
  "dive-resorts": [
    "digital-onboarding", "planner-scheduling", "booking-engine-channel-manager",
    "inventory-pos-rentals", "finance-bookkeeping", "payment-gateways",
    "agents-partners-portal", "accommodation-channel-manager",
    "group-bookings-split-billing-discounts", "staff-wages-workload",
  ],
  liveaboards: [
    "booking-engine-channel-manager", "agents-partners-portal", "inventory-pos-rentals",
    "payment-gateways", "finance-bookkeeping", "vessel-cabin-management",
    "manifests-guest-automation", "digital-onboarding",
  ],
};

export const previewFeatureRedirects = Object.fromEntries(
  Object.entries(solutionFeatureSlugs).flatMap(([solution, features]) => [
    [`/new/solutions/${solution}/features`, `/new/features?audience=${solution}`],
    ...features.map((feature) => [
      `/new/solutions/${solution}/features/${feature}`,
      `/new/features/${feature}#${solution}`,
    ]),
  ])
);
