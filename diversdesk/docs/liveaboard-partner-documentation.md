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

Regular documentation pages have no audience switcher or audience heading link. The public `/welcome-to-docs/` entry page retains three business categories for visitors arriving without application context. This static website receives no verified user identity: manager/email-restricted switching and automatic selection for multiple memberships require a trusted application identity integration. Do not use a query-string email or browser storage as manager authorization. The unused operator step-by-step pages, old login alias, and data-safety insight are unassigned and excluded from help search; their source content is retained.

## Performance and fallback

Manuals, article lists, and navigation are static. Search operates on files in memory; it makes no booking, customer, payment, or application-database queries. Ordinary article search does not use an AI provider. Search failures retain links to the audience manual, which works without JavaScript.

The company/partner-specific settings selector is deliberately deferred. No live account settings or email delivery history are fetched. Generic instructions use the actual reservation as the authority for amounts and deadlines.

## Verification

Run `npm test` and `npm run build` from `diversdesk/`. Tests cover audience isolation, drafts/unassigned pages, previous-source lookup, fallback and links. Check generated `/help/` pages, partner legacy URLs, noindex metadata, sidebar links, search source URLs, and sitemap exclusions. Test the three manuals at desktop and mobile widths. AI provider availability is separate from retrieval correctness.
