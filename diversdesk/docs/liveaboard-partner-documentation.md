# Liveaboard partner documentation

The initial partner guides live in `src/content/docs/liveaboard-partners/` and publish at `/liveaboard-partners/`. Share that URL with partners after deployment.

These pages are unlisted, not access-controlled. Anyone with the URL can read them. Do not put credentials, private partner terms, or guest information in this section.

## Adding a page

Copy the frontmatter from an existing page in this folder. Keep `pagefind: false`, `sidebar.hidden: true`, `prev: false`, and `next: false`; use a slug beneath `liveaboard-partners/`. Link new guides from the partner landing page, not the general documentation navigation. Do not set `draft: true` on a page intended to be published.

Discovery controls:

- `pagefind: false` excludes each page from the built-in search index.
- `src/lib/ai-search/docs.ts` excludes the folder from the AI search corpus.
- The general sidebar does not include this section.
- `src/components/ui/starlight/Head.astro` adds `noindex, nofollow` to the section.
- `astro.config.mjs` excludes the section from the sitemap.

Leave crawling allowed in `robots.txt` so search engines can read the `noindex` directive.

## Content and release

The starter copy draws from `src/content/docs/updates/2026-09-01-liveaboard-operations.mdx`. That source is a draft release note; verify the guide against the live partner portal before publishing. The guide deliberately avoids unverified button names, login URLs, fixed payment terms, and automatic confirmation rules. Add confirmed workflows and screenshots as they become available.

Run `npm run build` from the `diversdesk` application directory. Verify both guides render, have robots metadata, lack `data-pagefind-body`, and are absent from the sitemap and general navigation before deploying through the existing Vercel workflow.

A Git branch can be used to review changes, but it does not separate audiences after deployment. Later, partner authentication and an audience-specific search index can provide proper separation while retaining these URLs.
