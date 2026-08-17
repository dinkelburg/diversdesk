import assert from "node:assert/strict";
import test from "node:test";

import { renderAiAnswerMarkdown } from "../src/lib/ai-search/markdown";

test("renders common and GitHub-flavored Markdown", () => {
  const output = renderAiAnswerMarkdown("## Steps\n\n1. Select **Save**\n2. Confirm the `price`\n\n| Field | Value |\n| --- | --- |\n| Status | Ready |");

  assert.match(output, /<h2>Steps<\/h2>/);
  assert.match(output, /<ol>/);
  assert.match(output, /<strong>Save<\/strong>/);
  assert.match(output, /<code>price<\/code>/);
  assert.match(output, /<table>/);
});

test("escapes raw HTML and removes dangerous link protocols", () => {
  assert.equal(renderAiAnswerMarkdown('<img src=x onerror="alert(1)">'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
  assert.equal(renderAiAnswerMarkdown("[unsafe](javascript:alert(1))"), '<p><a href="">unsafe</a></p>');
});
