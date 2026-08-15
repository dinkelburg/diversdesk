const DOCS_ORIGIN = "https://www.diversdesk.com";
const MAX_CHUNK_LENGTH = 1_600;
const MAX_SOURCES = 6;

const rawDocs = import.meta.glob<string>(
  [
    "../../content/docs/**/*.md",
    "../../content/docs/**/*.mdx",
    "!../../content/docs/support/**",
    "!../../content/docs/work_in_progress/**",
  ],
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
);

const rawVideoTranscripts = import.meta.glob<string>("../../content/ai/video-transcripts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const allowedRoots = new Set([
  "faq",
  "features-resources",
  "getting-started",
  "updates",
  "user-manual",
  "video-training",
  "workflows",
]);

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

const unquote = (value: string) => value.replace(/^(['"])(.*)\1$/, "$2").trim();

const getFrontmatter = (raw: string) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return match?.[1] ?? "";
};

const getFrontmatterValue = (frontmatter: string, key: string) => {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match ? unquote(match[1].trim()) : null;
};

const getBodyWithoutFrontmatter = (raw: string) => raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");

const slugifyHeading = (heading: string) =>
  normalize(heading)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

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

const splitIntoSections = (body: string) => {
  const sections: Array<{ heading: string | null; text: string }> = [];
  let heading: string | null = null;
  let lines: string[] = [];

  const flush = () => {
    const text = cleanBody(lines.join("\n"));
    if (text) sections.push({ heading, text });
    lines = [];
  };

  body.split(/\r?\n/).forEach((line) => {
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
    if (!headingMatch) {
      lines.push(line);
      return;
    }

    flush();
    heading = cleanInlineMarkdown(headingMatch[1]);
  });
  flush();

  return sections.flatMap((section) =>
    splitLongText(section.text).map((text) => ({
      heading: section.heading,
      text,
    })),
  );
};

const getRelativePath = (modulePath: string) => {
  const match = modulePath.match(/content\/docs\/(.+)\.mdx?$/);
  return match?.[1] ?? "";
};

const getFallbackSlug = (relativePath: string) =>
  relativePath
    .replace(/\/index$/, "")
    .split("/")
    .map((segment) => segment.replaceAll("_", "-"))
    .join("/");

const createChunk = (args: {
  heading: string | null;
  index: number;
  pagePath: string;
  text: string;
  title: string;
}) => {
  const title = args.heading ? `${args.title} — ${args.heading}` : args.title;
  const url = new URL(`/${args.pagePath}/`, DOCS_ORIGIN);
  if (args.heading) url.hash = slugifyHeading(args.heading);

  const bodyTokens = tokenize(args.text);
  const bodyTermCounts = bodyTokens.reduce<Map<string, number>>((counts, token) => {
    counts.set(token, (counts.get(token) ?? 0) + 1);
    return counts;
  }, new Map());

  return {
    bodyTermCounts,
    heading: args.heading,
    id: `${args.pagePath}:${args.index}`,
    normalizedHeading: normalize(args.heading ?? ""),
    normalizedText: normalize(args.text),
    normalizedTitle: normalize(args.title),
    pagePath: `/${args.pagePath}`,
    text: args.text,
    title,
    tokens: new Set([...bodyTokens, ...tokenize(args.title), ...tokenize(args.heading ?? "")]),
    url: url.toString(),
  } satisfies SearchChunk;
};

const chunks = Object.entries(rawDocs).flatMap(([modulePath, raw]) => {
  const relativePath = getRelativePath(modulePath);
  const root = relativePath.split("/")[0];
  if (!root || !allowedRoots.has(root)) return [];

  const frontmatter = getFrontmatter(raw);
  if (getFrontmatterValue(frontmatter, "pagefind") === "false") return [];

  const title = getFrontmatterValue(frontmatter, "title");
  if (!title) return [];

  const pagePath = getFrontmatterValue(frontmatter, "slug") ?? getFallbackSlug(relativePath);
  const body = getBodyWithoutFrontmatter(raw);

  return splitIntoSections(body).map((section, index) =>
    createChunk({
      heading: section.heading,
      index,
      pagePath,
      text: section.text,
      title,
    }),
  );
});

const transcriptChunks = Object.entries(rawVideoTranscripts).flatMap(([, raw]) => {
  const frontmatter = getFrontmatter(raw);
  if (getFrontmatterValue(frontmatter, "index") !== "true") return [];

  const title = getFrontmatterValue(frontmatter, "title");
  const pagePath = getFrontmatterValue(frontmatter, "videoSlug");
  if (!title || !pagePath) return [];

  return splitIntoSections(getBodyWithoutFrontmatter(raw)).map((section, index) =>
    createChunk({
      heading: section.heading,
      index,
      pagePath,
      text: section.text,
      title,
    }),
  );
});

chunks.push(...transcriptChunks);

const chunksById = new Map(chunks.map((chunk) => [chunk.id, chunk]));

const documentFrequency = chunks.reduce<Map<string, number>>((frequencies, chunk) => {
  chunk.tokens.forEach((token) => frequencies.set(token, (frequencies.get(token) ?? 0) + 1));
  return frequencies;
}, new Map());

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
    (chunk.normalizedTitle.includes(normalizedQuery) || chunk.normalizedHeading.includes(normalizedQuery))
  ) {
    return 12;
  }
  if (normalizedQuery.length > 5 && chunk.normalizedText.includes(normalizedQuery)) return 6;
  return 0;
};

const scoreChunk = (chunk: SearchChunk, query: string, currentPath: string | null) => {
  const normalizedQuery = normalize(query);
  const queryTokens = expandQueryTokens(query);

  const tokenScore = [...queryTokens.expandedTokens].reduce((score, token) => {
    const idf = getIdf(token);
    const originalWeight = queryTokens.originalTokens.has(token) ? 1 : 0.45;
    const bodyFrequency = chunk.bodyTermCounts.get(token) ?? 0;
    const titleScore = chunk.normalizedTitle.includes(token) ? 5 : 0;
    const headingScore = chunk.normalizedHeading.includes(token) ? 3 : 0;
    return score + (Math.min(bodyFrequency, 4) + titleScore + headingScore) * idf * originalWeight;
  }, 0);

  const phraseScore = getPhraseScore(chunk, normalizedQuery);
  const currentPageScore = currentPath && chunk.pagePath === currentPath.replace(/\/$/, "") ? 2 : 0;
  return tokenScore + phraseScore + currentPageScore;
};

const toSearchSource = (chunk: SearchChunk): SearchSource => ({
  excerpt: chunk.text,
  id: chunk.id,
  title: chunk.title,
  url: chunk.url,
});

export const searchDocs = (query: string, currentPath: string | null): SearchSource[] => {
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

export const getDocsByIds = (ids: string[]): SearchSource[] => {
  const seen = new Set<string>();
  return ids.flatMap((id) => {
    if (seen.has(id)) return [];
    seen.add(id);
    const chunk = chunksById.get(id);
    return chunk ? [toSearchSource(chunk)] : [];
  });
};

export const getIndexedDocumentCount = () => new Set(chunks.map((chunk) => chunk.pagePath)).size;
