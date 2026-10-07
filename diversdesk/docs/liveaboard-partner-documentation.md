# Documentation audiences and partner manuals

The documentation has three public audience views:

- `/help/partners/`: partner booking manual and partner reference articles.
- `/help/liveaboard-operators/`: Liveaboards; existing Quickstart Guide and assigned reference articles.
- `/help/operators/`: Dive Centers & Resorts; existing Quickstart Guide and assigned reference articles.

`/welcome-to-docs/` is the audience chooser. Existing article URLs remain accessible, including `/liveaboard-partner-portal/` used by the application's Help link. Visibility removes clutter; it is not access control. Never publish private operator settings, partner terms, credentials, or guest information in documentation.

## Assigning an article

Set the article's frontmatter explicitly:

```yaml
audiences: ["partners"]
```

Shared articles may list both `liveaboard-operators` and `operators`, or any combination of the three audiences. The schema rejects unknown audience values. No audience assignment means the page is absent from these audience views and search. `draft: true` also excludes it. For operators, navigation follows the curated sidebar in `astro.config.mjs`, filtered by audience. Add articles to the appropriate existing section there; tags alone do not add a menu item. Partner articles use `docsSection` for their navigation group, or a group inferred from their path.

Existing general operator articles were assigned to both operator audiences. The liveaboard-only release article keeps its existing draft status and is assigned only to liveaboard operators. Partner reference articles are assigned only to partners. Review these editorial tags when changing an article's scope.

For partner articles, keep slugs beneath `liveaboard-partner-portal/`. Do not set `pagefind: false` on a published article that should be searchable: both article search and AI search respect that exclusion. The scoped copies set that flag only for their rendered HTML to avoid duplicate Pagefind indexing; the source article remains searchable in the audience index.

The partner manual follows six steps. Put control explanations, statuses, and exceptions in the linked page references. Use current action names: `Confirm booking`, `Copy booking URL`, `Report deposit transfer`, and `Report balance transfer`. Copying does not email guests; confirmation accepts payment responsibility, not separate proof of customer payment receipt. Customer extras may still show prices.

## Navigation and search

- `src/lib/docs/audiences.ts`: shared audience IDs, labels, visibility and link helpers.
- `src/lib/docs/route-middleware.ts` and `sidebar.ts`: preserves the operator sidebar hierarchy, order, labels and badges while filtering by audience; only partners get the six-step manual. Disables automatic cross-audience pagination.
- `src/pages/help/[audience]/[...article].astro`: pre-renders each assigned article for each audience without duplicating its source.
- `src/middleware.ts`: rewrites known internal documentation links at build time to preserve the current audience. Application and external links are unchanged; explicit links to another audience remain usable.
- `src/lib/ai-search/docs.ts`: builds the three search indexes from the validated content collection once per server instance. Transcripts inherit the parent video article's audience and publication rules.
- `src/lib/ai-search/index.ts`: pure retrieval and source lookup, shared by ordinary article search and AI search.

AI requests accept `context.audience` with one of the three IDs. When omitted, partner portal paths resolve to partners, scoped help paths resolve to their audience, and other paths fall back to operators. Invalid explicit values are rejected. Prior-turn source IDs are checked against the current audience; history with missing/out-of-audience sources is dropped. Search never broadens to another audience.

The documentation pages pass audience explicitly. The separate application can pass its active role/workflow as `context.audience` for automatic liveaboard-operator selection; this website change does not alter that application's role handling. Its existing partner Help URL continues to work.

Documentation sidebars show the current audience in muted text at the bottom, followed by a “Switch” link and trailing switch icon, returning to the public `/welcome-to-docs/` chooser. Anyone can choose Dive Centers & Resorts, Liveaboards, or Liveaboard Partners/Agents; the destination URL determines the sidebar and search audience. The chooser link is deliberately exempt from audience-home rewriting. This static navigation needs no identity integration, browser storage, or database queries and does not switch application roles. The unused operator step-by-step pages, old login alias, and data-safety insight remain unassigned and excluded from help search; their source content is retained. Data Safety also remains outside the public Insights listing and sitemap, with an explicit noindex directive.

## Performance and fallback

Manuals, article lists, and navigation are static. Search operates on files in memory; it makes no booking, customer, payment, or application-database queries. Ordinary article search does not use an AI provider. Search failures retain links to the audience manual, which works without JavaScript.

The public documentation remains generic. Operator-specific guidance is implemented in the separate application's `/partner/guide` page, reached through Partner portal → Booking guide. It uses the authenticated partner's active liveaboard connections; the selector includes the operator and location, and selects a sole connection automatically. The partner can also choose the general guide.

The application guide uses three read-only queries after authentication: connected locations, the selected agreement's effective policy, and a bounded set of email settings. It does not load availability, bookings, customers, invoices, or email delivery logs, and does not send emails or change settings. Only safe configuration summaries reach the browser. The response is private and not cached; operator selection reloads current settings. Existing reservations remain authoritative for saved terms, amounts, deadlines, full-payment arrangements and available actions.

Missing or unauthorized selections never load another operator's settings. Settings failures show all six general steps, with unknown email behavior clearly identified, plus a link to the public manual. The route error page also retains that manual link. Email summaries describe configuration rather than delivery; booking-specific eligibility, invoice notifications and manual sends can differ. This guide does not personalize AI search.

## Verification

Run `npm test` and `npm run build` from `diversdesk/`. Tests cover audience isolation, drafts/unassigned pages, previous-source lookup, fallback and links. Check generated `/help/` pages, partner legacy URLs, noindex metadata, sidebar links, search source URLs, and sitemap exclusions. Test the three manuals at desktop and mobile widths. AI provider availability is separate from retrieval correctness.
