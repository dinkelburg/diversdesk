import type { MarkdownHeading } from "astro";
import { audienceDocHref, type DocAudience } from "../docs/audiences";

const DOCS_ORIGIN = "https://www.diversdesk.com";
const MAX_CHUNK_LENGTH = 1_600;
const MAX_SOURCES = 6;

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "can",
  "do",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "my",
  "of",
  "on",
  "or",
  "the",
  "this",
  "to",
  "we",
  "what",
  "when",
  "where",
  "which",
  "with",
  "you",
]);

const synonymGroups = [
  ["accommodation", "hotel", "lodging", "room", "stay"],
  ["booking", "reservation", "schedule"],
  ["customer", "client", "guest", "participant"],
  ["inventory", "equipment", "gear", "rental", "stock"],
  ["invoice", "billing", "payment"],
  ["planner", "calendar", "planning", "schedule"],
  ["staff", "member", "team", "user"],
  ["waiver", "form", "paperwork", "registration"],
  ["webshop", "direct", "online", "self-booking"],
];

type SearchChunk = {
  bodyTermCounts: Map<string, number>;
  heading: string | null;
  id: string;
  normalizedHeading: string;
  normalizedText: string;
  normalizedTitle: string;
  pagePath: string;
  text: string;
  title: string;
  tokens: Set<string>;
  url: string;
};

export type SearchSource = {
  excerpt: string;
  id: string;
  title: string;
  url: string;
};

const decodeEntities = (value: string) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const cleanInlineMarkdown = (value: string) =>
  decodeEntities(
    value
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/<[^>]*>/gs, " ")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[*_~]/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );

const cleanBody = (value: string) =>
  cleanInlineMarkdown(
    value
      .replace(/^import\s.+?;\s*$/gms, " ")
      .replace(/^export\s.+?;\s*$/gms, " ")
      .replace(/^:::[^\n]*$/gm, " ")
      .replace(/^---+$/gm, " ")
      .replace(/^>\s?/gm, "")
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      .replace(/\{[^{}]*\}/g, " "),
  );

const normalize = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const stem = (token: string) => {
  if (token.length > 5 && token.endsWith("ing")) return token.slice(0, -3);
  if (token.length > 4 && token.endsWith("ed")) return token.slice(0, -2);
  if (token.length > 4 && token.endsWith("s")) return token.slice(0, -1);
  return token;
};

const tokenize = (value: string) =>
  normalize(value)
    .split(" ")
    .map(stem)
    .filter((token) => token.length > 1 && !stopWords.has(token));

const splitLongText = (text: string) => {
  if (text.length <= MAX_CHUNK_LENGTH) return [text];

  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences.reduce<string[]>((chunks, sentence) => {
    const current = chunks.at(-1);
    if (!current || current.length + sentence.length + 1 > MAX_CHUNK_LENGTH) {
      chunks.push(sentence);
      return chunks;
    }
    chunks[chunks.length - 1] = `${current} ${sentence}`;
    return chunks;
  }, []);
};

const splitIntoSections = (body: string, headings: MarkdownHeading[] = []) => {
  const headingSlugs = new Map<string, string[]>();
  for (const heading of headings) {
    const key = `${heading.depth}:${cleanInlineMarkdown(heading.text)}`;
    const slugs = headingSlugs.get(key) ?? [];
    slugs.push(heading.slug);
    headingSlugs.set(key, slugs);
  }
  const sections: Array<{ heading: string | null; headingSlug: string | null; text: string }> = [];
  let heading: string | null = null;
  let headingSlug: string | null = null;
  let lines: string[] = [];

  const flush = () => {
    const text = cleanBody(lines.join("\n"));
    if (text) sections.push({ heading, headingSlug, text });
    lines = [];
  };

  body.split(/\r?\n/).forEach((line) => {
    const headingMatch = line.match(/^(#{2,3})\s+(.+?)(?:\s+#+\s*)?$/);
    if (!headingMatch) {
      lines.push(line);
      return;
    }

    flush();
    heading = cleanInlineMarkdown(headingMatch[2]);
    // Consume repeated headings in order. Unmatched sections (including transcripts)
    // link to the page instead of inventing an anchor that does not exist.
    headingSlug = headingSlugs.get(`${headingMatch[1].length}:${heading}`)?.shift() ?? null;
  });
  flush();

  return sections.flatMap((section) =>
    splitLongText(section.text).map((text) => ({
      heading: section.heading,
      headingSlug: section.headingSlug,
      text,
    })),
  );
};

const createChunk = (args: {
  audience: DocAudience;
  heading: string | null;
  headingSlug: string | null;
  index: number;
  pagePath: string;
  text: string;
  title: string;
}) => {
  const title = args.heading ? `${args.title} — ${args.heading}` : args.title;
  const url = new URL(
    audienceDocHref(args.audience, args.pagePath),
    DOCS_ORIGIN,
  );
  if (args.headingSlug) url.hash = args.headingSlug;

  const bodyTokens = tokenize(args.text);
  const bodyTermCounts = bodyTokens.reduce<Map<string, number>>(
    (counts, token) => {
      counts.set(token, (counts.get(token) ?? 0) + 1);
      return counts;
    },
    new Map(),
  );

  return {
    bodyTermCounts,
    heading: args.heading,
    id: `${args.pagePath}:${args.index}`,
    normalizedHeading: normalize(args.heading ?? ""),
    normalizedText: normalize(args.text),
    normalizedTitle: normalize(args.title),
    pagePath: audienceDocHref(args.audience, args.pagePath).replace(/\/$/, ""),
    text: args.text,
    title,
    tokens: new Set([
      ...bodyTokens,
      ...tokenize(args.title),
      ...tokenize(args.heading ?? ""),
    ]),
    url: url.toString(),
  } satisfies SearchChunk;
};

export type SearchDocument = {
  id: string;
  title: string;
  body: string;
  headings?: MarkdownHeading[];
  audiences: DocAudience[];
  draft?: boolean;
  searchEnabled?: boolean;
  sourceId?: string;
};

export const createDocSearchIndex = (
  documents: SearchDocument[],
  audience: DocAudience,
) => {
  const chunks = documents
    .filter(
      (doc) =>
        !doc.draft &&
        doc.searchEnabled !== false &&
        doc.audiences.includes(audience),
    )
    .flatMap((doc) =>
      splitIntoSections(doc.body, doc.headings).map((section, index) => ({
        ...createChunk({
          audience,
          heading: section.heading,
          headingSlug: section.headingSlug,
          index,
          pagePath: doc.id,
          text: section.text,
          title: doc.title,
        }),
        id: (doc.sourceId || doc.id) + ":" + index,
      })),
    );

  const chunksById = new Map(chunks.map((chunk) => [chunk.id, chunk]));

  const documentFrequency = chunks.reduce<Map<string, number>>(
    (frequencies, chunk) => {
      chunk.tokens.forEach((token) =>
        frequencies.set(token, (frequencies.get(token) ?? 0) + 1),
      );
      return frequencies;
    },
    new Map(),
  );

  const expandQueryTokens = (query: string) => {
    const originalTokens = new Set(tokenize(query));
    const expandedTokens = new Set(originalTokens);

    synonymGroups.forEach((group) => {
      const normalizedGroup = group.map(stem);
      if (!normalizedGroup.some((token) => originalTokens.has(token))) return;
      normalizedGroup.forEach((token) => expandedTokens.add(token));
    });

    return {
      expandedTokens,
      originalTokens,
    };
  };

  const getIdf = (token: string) => {
    const frequency = documentFrequency.get(token) ?? 0;
    return Math.log((chunks.length + 1) / (frequency + 1)) + 1;
  };

  const getPhraseScore = (chunk: SearchChunk, normalizedQuery: string) => {
    if (
      normalizedQuery.length > 3 &&
      (chunk.normalizedTitle.includes(normalizedQuery) ||
        chunk.normalizedHeading.includes(normalizedQuery))
    ) {
      return 12;
    }
    if (
      normalizedQuery.length > 5 &&
      chunk.normalizedText.includes(normalizedQuery)
    )
      return 6;
    return 0;
  };

  const scoreChunk = (
    chunk: SearchChunk,
    query: string,
    currentPath: string | null,
  ) => {
    const normalizedQuery = normalize(query);
    const queryTokens = expandQueryTokens(query);

    const tokenScore = [...queryTokens.expandedTokens].reduce(
      (score, token) => {
        const idf = getIdf(token);
        const originalWeight = queryTokens.originalTokens.has(token) ? 1 : 0.45;
        const bodyFrequency = chunk.bodyTermCounts.get(token) ?? 0;
        const titleScore = chunk.normalizedTitle.includes(token) ? 5 : 0;
        const headingScore = chunk.normalizedHeading.includes(token) ? 3 : 0;
        return (
          score +
          (Math.min(bodyFrequency, 4) + titleScore + headingScore) *
            idf *
            originalWeight
        );
      },
      0,
    );

    const phraseScore = getPhraseScore(chunk, normalizedQuery);
    const currentPageScore =
      currentPath && chunk.pagePath === currentPath.replace(/\/$/, "") ? 2 : 0;
    return tokenScore + phraseScore + currentPageScore;
  };

  const toSearchSource = (chunk: SearchChunk): SearchSource => ({
    excerpt: chunk.text,
    id: chunk.id,
    title: chunk.title,
    url: chunk.url,
  });

  const searchDocs = (
    query: string,
    currentPath: string | null,
  ): SearchSource[] => {
    const ranked = chunks
      .map((chunk) => ({
        chunk,
        score: scoreChunk(chunk, query, currentPath),
      }))
      .filter((entry) => entry.score > 0)
      .sort((left, right) => right.score - left.score);

    const pageCounts = new Map<string, number>();

    return ranked
      .filter((entry) => {
        const count = pageCounts.get(entry.chunk.pagePath) ?? 0;
        if (count >= 2) return false;
        pageCounts.set(entry.chunk.pagePath, count + 1);
        return true;
      })
      .slice(0, MAX_SOURCES)
      .map((entry) => toSearchSource(entry.chunk));
  };

  const getDocsByIds = (ids: string[]): SearchSource[] => {
    const seen = new Set<string>();
    return ids.flatMap((id) => {
      if (seen.has(id)) return [];
      seen.add(id);
      const chunk = chunksById.get(id);
      return chunk ? [toSearchSource(chunk)] : [];
    });
  };

  const getIndexedDocumentCount = () =>
    new Set(chunks.map((chunk) => chunk.pagePath)).size;

  return { searchDocs, getDocsByIds, getIndexedDocumentCount };
};
