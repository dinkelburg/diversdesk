import type { StarlightRouteData } from "@astrojs/starlight/route-data";
import {
  audienceDocHref,
  normalizeDocPath,
  visibleToAudience,
  type AudienceDocument,
  type DocAudience,
} from "./audiences";

type Sidebar = StarlightRouteData["sidebar"];

// Filter Starlight's configured tree instead of rebuilding it from article titles.
// This preserves editorial order, nested sections, labels, badges and attributes.
export function scopeSidebar(
  entries: Sidebar,
  docs: AudienceDocument[],
  audience: DocAudience,
  pathname: string,
): Sidebar {
  const allowed = new Map(
    docs
      .filter((doc) => visibleToAudience(doc, audience))
      .map((doc) => [normalizeDocPath(doc.id), doc]),
  );
  const visit = (items: Sidebar): Sidebar =>
    items.flatMap((item): Sidebar => {
      if (item.type === "group") {
        const children = visit(item.entries);
        return children.length ? [{ ...item, entries: children }] : [];
      }
      const doc = allowed.get(normalizeDocPath(item.href));
      if (!doc) return [];
      const href = audienceDocHref(audience, doc.id);
      return [
        {
          ...item,
          href,
          isCurrent:
            normalizeDocPath(pathname) === normalizeDocPath(href) ||
            normalizeDocPath(pathname) === normalizeDocPath(doc.id),
        },
      ];
    });
  return visit(entries);
}
