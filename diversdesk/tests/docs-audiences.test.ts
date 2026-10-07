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
import { scopeSidebar } from "../src/lib/docs/sidebar";

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

test("search links use rendered heading IDs, including punctuation and duplicates", () => {
  const index = createDocSearchIndex([{
    id: "getting-started/quickstart-guide",
    title: "Quickstart",
    audiences: ["operators"],
    body: [
      "## 2. Personalize & Add Your Offerings",
      "Configure offerings.",
      "## Café & résumé",
      "Accented headings.",
      "## Repeated",
      "First section.",
      "## Repeated",
      "Second section.",
      "### **Custom** heading ###",
      "Custom anchor.",
    ].join("\n"),
    headings: [
      { depth: 2, text: "2. Personalize & Add Your Offerings", slug: "2-personalize--add-your-offerings" },
      { depth: 2, text: "Café & résumé", slug: "café--résumé" },
      { depth: 2, text: "Repeated", slug: "repeated" },
      { depth: 2, text: "Repeated", slug: "repeated-1" },
      { depth: 3, text: "Custom heading", slug: "custom-anchor" },
    ],
  }], "operators");
  const sources = index.getDocsByIds(Array.from({ length: 5 }, (_, i) => `getting-started/quickstart-guide:${i}`));
  assert.deepEqual(sources.map((source) => decodeURIComponent(new URL(source.url).hash)), [
    "#2-personalize--add-your-offerings", "#café--résumé", "#repeated", "#repeated-1", "#custom-anchor",
  ]);
});

test("long sections keep their rendered anchor on every search chunk", () => {
  const index = createDocSearchIndex([{
    id: "faq/long",
    title: "Long guide",
    audiences: ["operators"],
    body: "## Long & detailed\n" + "A sentence about bookings. ".repeat(150),
    headings: [{ depth: 2, text: "Long & detailed", slug: "long--detailed" }],
  }], "operators");
  const sources = index.getDocsByIds(["faq/long:0", "faq/long:1", "faq/long:2"]);
  assert.equal(sources.length, 3);
  assert.ok(sources.every((source) => new URL(source.url).hash === "#long--detailed"));
});

test("unmatched and transcript headings link to the page without an invented fragment", () => {
  const index = createDocSearchIndex([
    { id: "faq/unmatched", title: "Guide", body: "## Missing heading\nBooking instructions.", audiences: ["operators"], headings: [] },
    { id: "video-training/example", sourceId: "transcript:example", title: "Video", body: "## 01:30 Booking walkthrough\nBooking instructions.", audiences: ["operators"] },
  ], "operators");
  assert.deepEqual(index.getDocsByIds(["faq/unmatched:0", "transcript:example:0"]).map((source) => source.url), [
    "https://www.diversdesk.com/help/operators/faq/unmatched/",
    "https://www.diversdesk.com/help/operators/video-training/example/",
  ]);
});

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
    "/welcome-to-docs/",
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
  const doc: AudienceDocument = {
    id: "updates/index",
    data: { title: "Updates", audiences: ["operators"] },
  };
  assert.equal(
    audienceDocHref("operators", doc.id),
    "/help/operators/updates/",
  );
  assert.equal(
    scopeDocLink("/updates/", "/", "operators", [doc]),
    "/help/operators/updates/",
  );
});

test("operator navigation preserves configured hierarchy, ordering, labels and badges", () => {
  const docs: AudienceDocument[] = [
    {
      id: "getting-started/quickstart-guide",
      data: {
        title: "Quickstart",
        audiences: ["operators", "liveaboard-operators"],
      },
    },
    {
      id: "user_manual/activities/beta-planner",
      data: {
        title: "Planner Beta",
        audiences: ["operators", "liveaboard-operators"],
      },
    },
    {
      id: "getting-started/login",
      data: { title: "Old login", audiences: [] },
    },
    {
      id: "draft",
      data: { title: "Draft", audiences: ["operators"], draft: true },
    },
    {
      id: "liveaboard-partner-portal",
      data: { title: "Partners", audiences: ["partners"] },
    },
  ];
  const link = (id: string, label: string) => ({
    type: "link" as const,
    label,
    href: `/${id}/`,
    isCurrent: false,
    badge: undefined,
    attrs: {},
  });
  const badge = { text: "New", variant: "tip" as const };
  const tree = [
    {
      type: "group" as const,
      label: "Getting Started",
      collapsed: true,
      badge: undefined,
      entries: [link(docs[0].id, "Quick Start Guide")],
    },
    {
      type: "group" as const,
      label: "Page guides",
      collapsed: true,
      badge: undefined,
      entries: [
        {
          type: "group" as const,
          label: "Activities",
          collapsed: false,
          badge: undefined,
          entries: [{ ...link(docs[1].id, "Planner Beta"), badge }],
        },
      ],
    },
    {
      type: "group" as const,
      label: "Hidden",
      collapsed: true,
      badge: undefined,
      entries: docs.slice(2).map((doc) => link(doc.id, doc.data.title)),
    },
  ];
  for (const audience of ["operators", "liveaboard-operators"] as const) {
    const href = `/help/${audience}/user_manual/activities/beta-planner/`;
    const scoped = scopeSidebar(tree, docs, audience, href);
    assert.deepEqual(scoped, [
      {
        ...tree[0],
        entries: [
          {
            ...link(docs[0].id, "Quick Start Guide"),
            href: `/help/${audience}/`,
          },
        ],
      },
      {
        ...tree[1],
        entries: [
          {
            type: "group",
            label: "Activities",
            collapsed: false,
            badge: undefined,
            entries: [
              {
                ...link(docs[1].id, "Planner Beta"),
                href,
                isCurrent: true,
                badge,
              },
            ],
          },
        ],
      },
    ]);
  }
  assert.equal(tree[0].entries[0].href, "/getting-started/quickstart-guide/");
});
