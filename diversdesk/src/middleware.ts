import { defineMiddleware } from "astro:middleware";
import { getCollection } from "astro:content";
import { resolveDocAudience, scopeDocLink } from "./lib/docs/audiences";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (
    !context.locals.docsAudience ||
    !response.headers.get("content-type")?.includes("text/html")
  )
    return response;
  const route = context.locals.starlightRoute;
  const audience = resolveDocAudience(
    context.url.pathname,
    route.entry.data.audiences,
  );
  const docs = await getCollection("docs");
  // Run during prerendering: scoped navigation needs no JavaScript or runtime database work.
  const html = (await response.text()).replace(
    /\bhref="([^"]*)"/g,
    (attribute, href: string) => {
      const scoped = scopeDocLink(
        href,
        `/${route.entry.id.replace(/^help\/[^/]+\//, "")}/`,
        audience,
        docs,
      );
      return scoped === href
        ? attribute
        : `href="${scoped.replaceAll('"', "&quot;")}"`;
    },
  );
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, headers });
});
