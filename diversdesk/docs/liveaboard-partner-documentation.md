# Liveaboard partner documentation

The initial partner guides live in `src/content/docs/liveaboard-partners/` and publish at `/liveaboard-partner-portal/`. Share that URL with partners after deployment. The former `/liveaboard-partners/` URLs redirect to the corresponding pages under the new URL.

These pages are unlisted, not access-controlled. Anyone with the URL can read them. Do not put credentials, private partner terms, or guest information in this section.

## Adding a page

Copy the frontmatter from an existing page in this folder. Keep `pagefind: false`, `sidebar.hidden: true`, `prev: false`, and `next: false`; use a slug beneath `liveaboard-partner-portal/`. Link new guides from the partner landing page, not the general documentation navigation. Do not set `draft: true` on a page intended to be published.

Discovery controls:

- `pagefind: false` excludes each page from the built-in search index.
- `src/lib/ai-search/docs.ts` excludes the folder from the AI search corpus.
- The general sidebar does not include this section.
- `src/components/ui/starlight/Head.astro` adds `noindex, nofollow` to the section.
- `astro.config.mjs` excludes the section from the sitemap.

Leave crawling allowed in `robots.txt` so search engines can read the `noindex` directive.

## Content and release

The guide was checked against the local `traveltruster` application's `feature/feature` branch at commit `ac01024b8` on 2026-09-08. The portal URL and invitation-email sign-in instructions were supplied by the product owner. Actual operator settings and the deployed application may differ; the guide explains conditional paths without assigning fixed deadlines to any operator.

Source references within that application's `tanstack/app/` directory:

- `routes/_all._catch.partner.availability.tsx`: opening a trip, Hold cabins & continue, booker/guest fields, Review option, Place option, and redirect to Reservations.
- `components/HamburgerMenu.tsx`: Availability, Reservations, Reporting, and the Help link to this guide.
- `domain/booking/booking-cache-and-checkout.server.ts`: direct versus operator approval, tentative departures, and approval deadlines.
- `domain/liveaboard/liveaboard-booking-state.ts`: confirmation after required approval and deposit, plus the separate manual cabin-review state.
- `domain/liveaboard/liveaboard-journey-policy.ts` and `liveaboard-payment-policy.ts`: partner-specific overrides, separate deposit/balance collectors, and before/on-departure balance timing.
- `domain/liveaboard/liveaboard-booking-review.server.ts`: deposit window after approval and workflow activation.
- `domain/callback/callback.server.tsx`: expiry of unreviewed partner options.
- `domain/liveaboard/liveaboard-deposit-expiry.server.ts`, `liveaboard-payment-callback.ts`, and `liveaboard-journey-simulator.ts`: unpaid deposit expiry, payment-proof exceptions, overdue balances, and conditional email steps.
- `domain/partner/PartnerReservationActions.tsx`, `partner-reservation-permissions.ts`, and `partner-liveaboard-hold-actions.server.ts`: payment recording and eligibility to release options.

`src/components/docs/PartnerBookingJourney.astro` renders the process schematic as responsive HTML. It is an overview, not a live reading of a partner's settings. Keep its wording and section links aligned with the guide when the application workflow changes.

Run `npm run build` from the `diversdesk` application directory. Verify both guides render, have robots metadata, lack `data-pagefind-body`, and are absent from the sitemap and general navigation before deploying through the existing Vercel workflow.

A Git branch can be used to review changes, but it does not separate audiences after deployment. Later, partner authentication and an audience-specific search index can provide proper separation while retaining these URLs.
