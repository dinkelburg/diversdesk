import type { APIRoute } from "astro";
import { isDocAudience } from "../../lib/docs/audiences";
import { getDocSearchIndex } from "../../lib/ai-search/docs";

export const prerender = false;
export const GET: APIRoute = async ({ url }) => {
  const audience = url.searchParams.get("audience");
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!isDocAudience(audience) || query.length < 3 || query.length > 500) {
    return Response.json(
      { error: "Choose an audience and enter 3–500 characters." },
      { status: 400 },
    );
  }
  const index = await getDocSearchIndex(audience);
  return Response.json(
    { sources: index.searchDocs(query, null) },
    { headers: { "Cache-Control": "no-store" } },
  );
};
