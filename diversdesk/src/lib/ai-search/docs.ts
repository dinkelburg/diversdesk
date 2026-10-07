import { getCollection, render } from "astro:content";
import { docAudiences, type DocAudience } from "../docs/audiences";
import { createDocSearchIndex, type SearchDocument } from "./index";
export type { SearchSource } from "./index";

const rawTranscripts = import.meta.glob<string>(
  "../../content/ai/video-transcripts/*.md",
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
);
const frontmatterValue = (raw: string, key: string) => {
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/u)?.[1] ?? "";
  return frontmatter
    .match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]
    ?.trim()
    .replace(/^(['"])(.*)\1$/, "$2");
};
// Loaded once per server instance. All three indexes use published files, never application data.
const loadIndexes = async () => {
  const docs = await getCollection("docs");
  const searchableDocs = docs.filter((doc) =>
    !doc.data.draft && doc.data.pagefind && doc.data.audiences.length > 0,
  );
  const documents: SearchDocument[] = await Promise.all(searchableDocs.map(async (doc) => ({
    id: doc.id,
    title: doc.data.title,
    body: doc.body ?? "",
    // Read Astro's compiled heading metadata, including punctuation and duplicate IDs.
    headings: (await render(doc)).headings,
    audiences: doc.data.audiences,
    draft: doc.data.draft,
    searchEnabled: doc.data.pagefind,
  })));
  for (const [path, raw] of Object.entries(rawTranscripts)) {
    if (frontmatterValue(raw, "index") !== "true") continue;
    const id = frontmatterValue(raw, "videoSlug")?.replace(/^\/+|\/+$/g, "");
    const parent = docs.find((doc) => doc.id === id);
    if (!parent || parent.data.draft || !parent.data.pagefind) continue;
    documents.push({
      id: parent.id,
      sourceId: `transcript:${path}`,
      title: parent.data.title,
      body: raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, ""),
      audiences: parent.data.audiences,
    });
  }
  return new Map(
    docAudiences.map((audience) => [
      audience,
      createDocSearchIndex(documents, audience),
    ]),
  );
};
let indexes: ReturnType<typeof loadIndexes> | undefined;
export const getDocSearchIndex = async (audience: DocAudience) => {
  indexes ??= loadIndexes().catch((error) => {
    indexes = undefined;
    throw error;
  });
  const index = (await indexes).get(audience);
  if (!index) throw new Error("Unknown documentation audience");
  return index;
};
