import assert from "node:assert/strict";
import test from "node:test";
import {
  audienceDocHref,
  resolveDocAudience,
  scopeDocLink,
  visibleToAudience,
  type AudienceDocument,
} from "../src/lib/docs/audiences";
import {
  createDocSearchIndex,
  type SearchDocument,
} from "../src/lib/ai-search/index";

const documents: SearchDocument[] = [
  {
    id: "liveaboard-partner-portal",
    title: "Partner manual",
    body: "## Invoices\nConfirm booking to issue the partner invoice.",
    audiences: ["partners"],
  },
  {
    id: "manuals/liveaboard-operators",
    title: "Vessel operations",
    body: "## Invoices\nOperator invoice correction and cabin inventory.",
    audiences: ["liveaboard-operators"],
  },
  {
    id: "manuals/operators",
    title: "Operator manual",
    body: "## Invoices\nDaily planner invoice handling.",
    audiences: ["operators"],
  },
  {
    id: "faq/shared",
    title: "Shared help",
    body: "Find your invoice.",
    audiences: ["partners", "operators"],
  },
  {
    id: "draft",
    title: "Unreleased invoice feature",
    body: "Secret invoice instructions.",
    audiences: ["partners"],
    draft: true,
  },
  {
    id: "untagged",
    title: "Unassigned invoice article",
    body: "An invoice example.",
    audiences: [],
  },
  {
    id: "excluded",
    title: "Excluded invoice",
    body: "An invoice example.",
    audiences: ["partners"],
    searchEnabled: false,
  },
];

test("each audience searches only published assigned articles, with scoped source links", () => {
  for (const audience of [
    "partners",
    "liveaboard-operators",
    "operators",
  ] as const) {
    const index = createDocSearchIndex(documents, audience);
    const sources = index.searchDocs("invoice", null);
    assert.ok(sources.length > 0);
    for (const source of sources) {
      assert.ok(
        source.url.startsWith(`https://www.diversdesk.com/help/${audience}/`),
      );
      assert.ok(
        documents.some(
          (doc) =>
            doc.audiences.includes(audience) &&
            !doc.draft &&
            doc.searchEnabled !== false &&
            source.id.startsWith(doc.id + ":"),
        ),
      );
    }
    assert.deepEqual(
      index.getDocsByIds(["draft:0", "untagged:0", "excluded:0"]),
      [],
    );
  }
});

test("prior source IDs cannot recover another audience or unpublished material", () => {
  const index = createDocSearchIndex(documents, "partners");
  assert.deepEqual(
    index.getDocsByIds([
      "manuals/liveaboard-operators:0",
      "manuals/operators:0",
      "draft:0",
    ]),
    [],
  );
  assert.equal(index.getDocsByIds(["faq/shared:0", "faq/shared:0"]).length, 1);
  assert.equal(index.getIndexedDocumentCount(), 2);
});

test("empty audience search never falls back to a different collection", () => {
  const index = createDocSearchIndex(
    documents.filter((doc) => !doc.audiences.includes("partners")),
    "partners",
  );
  assert.deepEqual(index.searchDocs("invoice", null), []);
  assert.equal(index.getIndexedDocumentCount(), 0);
});

test("partner portal links and explicit audience paths have stable defaults", () => {
  assert.equal(resolveDocAudience("/partner/reservations"), "partners");
  assert.equal(resolveDocAudience("/liveaboard-partner-portal/"), "partners");
  assert.equal(
    resolveDocAudience("/help/liveaboard-operators/user_manual/bookings/"),
    "liveaboard-operators",
  );
  assert.equal(resolveDocAudience("/unknown"), "operators");
  assert.equal(
    audienceDocHref("partners", "liveaboard-partner-portal"),
    "/help/partners/",
  );
});

test("internal documentation links stay scoped without changing application or external URLs", () => {
  const docs: AudienceDocument[] = documents.map((doc) => ({
    id: doc.id,
    data: doc,
  }));
  assert.equal(
    scopeDocLink("/faq/shared/#invoice", "/help/partners/", "partners", docs),
    "/help/partners/faq/shared/#invoice",
  );
  assert.equal(
    scopeDocLink(
      "https://www.diversdesk.com/faq/shared/",
      "/",
      "partners",
      docs,
    ),
    "/help/partners/faq/shared/",
  );
  assert.equal(
    scopeDocLink("/welcome-to-docs/", "/", "partners", docs),
    "/help/partners/",
  );
  for (const link of [
    "https://app.diversdesk.com/booking/123",
    "https://example.com/faq/shared/",
    "#invoice",
    "/help/operators/",
  ]) {
    assert.equal(scopeDocLink(link, "/", "partners", docs), link);
  }
  assert.equal(
    visibleToAudience(docs.find((doc) => doc.id === "draft")!, "partners"),
    false,
  );
});

test("index articles use the same public path in navigation and search", () => {
  const doc: AudienceDocument = { id: "updates/index", data: { title: "Updates", audiences: ["operators"] } };
  assert.equal(audienceDocHref("operators", doc.id), "/help/operators/updates/");
  assert.equal(scopeDocLink("/updates/", "/", "operators", [doc]), "/help/operators/updates/");
});
