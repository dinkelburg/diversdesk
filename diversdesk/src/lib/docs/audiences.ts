export const docAudiences = [
  "partners",
  "liveaboard-operators",
  "operators",
] as const;
export type DocAudience = (typeof docAudiences)[number];

export const audienceLabels: Record<DocAudience, string> = {
  partners: "Partners",
  "liveaboard-operators": "Liveaboard operators",
  operators: "Non-liveaboard operators",
};

export const manualIds: Record<DocAudience, string> = {
  partners: "liveaboard-partner-portal",
  "liveaboard-operators": "manuals/liveaboard-operators",
  operators: "manuals/operators",
};

export const isDocAudience = (value: unknown): value is DocAudience =>
  docAudiences.some((audience) => audience === value);

export const normalizeDocPath = (value: string) =>
  value.replace(/^\/+|\/+$/g, "").replace(/\/index$/, "");

export const audienceFromPath = (path: string): DocAudience | null => {
  const parts = normalizeDocPath(path).split("/");
  if (parts[0] === "help" && isDocAudience(parts[1])) return parts[1];
  if (
    ["partner", "liveaboard-partner-portal", "liveaboard-partners"].includes(
      parts[0] || "",
    )
  )
    return "partners";
  return null;
};

export const resolveDocAudience = (
  path: string,
  audiences: readonly DocAudience[] = [],
): DocAudience =>
  audienceFromPath(path) ??
  (audiences.length === 1 ? audiences[0] : "operators");

export const audienceHome = (audience: DocAudience) => `/help/${audience}/`;

export const audienceDocHref = (audience: DocAudience, id: string) =>
  normalizeDocPath(id) === manualIds[audience]
    ? audienceHome(audience)
    : `${audienceHome(audience)}${normalizeDocPath(id)}/`;

export type AudienceDocument = {
  id: string;
  data: {
    title: string;
    description?: string;
    audiences: DocAudience[];
    draft?: boolean;
    docsSection?: string;
  };
};

export const visibleToAudience = (
  doc: AudienceDocument,
  audience: DocAudience,
) => !doc.data.draft && doc.data.audiences.includes(audience);

export const getDocSection = (doc: AudienceDocument) => {
  if (doc.data.docsSection) return doc.data.docsSection;
  const root = doc.id.split("/")[0];
  const labels: Record<string, string> = {
    "getting-started": "Getting started",
    user_manual: "Page guides",
    "user-manual": "Page guides",
    "features-resources": "Features",
    workflows: "Workflows",
    "video-training": "Video training",
    updates: "Updates",
    faq: "Questions and answers",
    docs: "About Diversdesk",
    "liveaboard-partner-portal": "Page guides",
    manuals: "Start here",
  };
  return labels[root] ?? "Reference articles";
};

// Only known documentation links are rewritten. External/application links and fragments stay intact.
export const scopeDocLink = (
  href: string,
  currentPath: string,
  audience: DocAudience,
  docs: AudienceDocument[],
) => {
  if (href.startsWith("#")) return href;
  let url: URL;
  try {
    url = new URL(href, `https://www.diversdesk.com${currentPath}`);
  } catch {
    return href;
  }
  if (
    !["diversdesk.com", "www.diversdesk.com"].includes(url.hostname) ||
    !["http:", "https:"].includes(url.protocol)
  )
    return href;
  const path = normalizeDocPath(url.pathname);
  if (path.startsWith("help/")) return href;
  if (path === "welcome-to-docs") return audienceHome(audience);
  const doc = docs.find((entry) => normalizeDocPath(entry.id) === path);
  if (!doc || !visibleToAudience(doc, audience)) return href;
  return `${audienceDocHref(audience, doc.id)}${url.search}${url.hash}`;
};
