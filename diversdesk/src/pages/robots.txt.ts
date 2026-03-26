// https://docs.astro.build/en/guides/integrations-guide/sitemap/#usage
import type { APIRoute } from 'astro';

const robotsTxt = `
User-agent: Googlebot
Disallow: /admin
Disallow: /*.json$
Disallow: /api/
Allow: /
Crawl-delay: 0.5
Request-rate: 30/60

User-agent: Bingbot
Disallow: /admin
Disallow: /*.json$
Disallow: /api/
Allow: /
Crawl-delay: 1

User-agent: Yandex
Disallow: /admin
Disallow: /*.json$
Disallow: /api/
Allow: /
Crawl-delay: 1

User-agent: archive.org_bot
Disallow:
Allow: /
Crawl-delay: 2

User-agent: *
Disallow: /admin
Disallow: /*.json$
Disallow: /api/
Allow: /
Crawl-delay: 1

Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};