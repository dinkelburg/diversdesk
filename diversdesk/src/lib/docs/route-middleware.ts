import { getCollection } from "astro:content";
import {
  defineRouteMiddleware,
  type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import {
  audienceDocHref,
  audienceHome,
  getDocSection,
  manualIds,
  resolveDocAudience,
  visibleToAudience,
} from "./audiences";

export const onRequest = defineRouteMiddleware(async (context) => {
  const route = context.locals.starlightRoute;
  const audience = resolveDocAudience(
    context.url.pathname,
    route.entry.data.audiences,
  );
  context.locals.docsAudience = audience;
  const docs = (await getCollection("docs")).filter((doc) =>
    visibleToAudience(doc, audience),
  );
  const link = (
    label: string,
    href: string,
  ): NonNullable<StarlightRouteData["pagination"]["next"]> => ({
    type: "link",
    label,
    href,
    isCurrent:
      context.url.pathname.replace(/\/$/, "") === href.replace(/\/$/, ""),
    badge: undefined,
    attrs: {},
  });
  const groups = new Map<string, typeof docs>();
  for (const doc of docs.sort(
    (a, b) =>
      (a.data.sidebar.order ?? 100) - (b.data.sidebar.order ?? 100) ||
      a.data.title.localeCompare(b.data.title),
  )) {
    if (doc.id === manualIds[audience]) continue;
    const section = getDocSection(doc);
    groups.set(section, [...(groups.get(section) ?? []), doc]);
  }
  const sectionOrder = [
    "Getting started",
    "Page guides",
    "Quick reference",
    "Features",
    "Workflows",
    "Video training",
    "Questions and answers",
    "Updates",
    "About Diversdesk",
  ];
  const sortedGroups = [...groups].sort(([left], [right]) => {
    const rank = (label: string) =>
      sectionOrder.includes(label)
        ? sectionOrder.indexOf(label)
        : sectionOrder.length;
    return rank(left) - rank(right) || left.localeCompare(right);
  });
  route.sidebar = [
    link("Step-by-step manual", audienceHome(audience)),
    ...Array.from(
      sortedGroups,
      ([label, entries]): StarlightRouteData["sidebar"][number] => ({
        type: "group",
        label,
        collapsed: true,
        badge: undefined,
        entries: entries.map((doc) =>
          link(
            doc.data.sidebar.label ?? doc.data.title,
            audienceDocHref(audience, doc.id),
          ),
        ),
      }),
    ),
  ];
  route.pagination = { prev: undefined, next: undefined };
  route.siteTitleHref = audienceHome(audience);
  // Partner reference pages previously used splash solely to avoid the general sidebar.
  if (audience === "partners") route.hasSidebar = true;
});
