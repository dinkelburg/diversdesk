import assert from "node:assert/strict";
import test from "node:test";

import {
  getConversationRetrievalQuery,
  mergeConversationSources,
} from "../src/lib/ai-search/conversation";

test("adds the previous question to an ambiguous follow-up retrieval query", () => {
  const history = [
    {
      answer: "Use the refund action on the payment.",
      question: "How do refunds work?",
      sourceIds: ["payments:refunds"],
    },
  ];

  assert.equal(
    getConversationRetrievalQuery("What if it was cancelled?", history),
    "How do refunds work?\nWhat if it was cancelled?",
  );
  assert.equal(
    getConversationRetrievalQuery("How do refunds work?", []),
    "How do refunds work?",
  );
});

test("keeps current results first while retaining prior evidence", () => {
  const current = [
    "current-1",
    "shared",
    "current-2",
    "current-3",
    "current-4",
    "current-5",
  ].map((id) => ({ id }));
  const previous = ["shared", "previous-1", "previous-2"].map((id) => ({ id }));

  assert.deepEqual(
    mergeConversationSources(current, previous).map((source) => source.id),
    [
      "current-1",
      "shared",
      "current-2",
      "current-3",
      "previous-1",
      "previous-2",
    ],
  );
});
