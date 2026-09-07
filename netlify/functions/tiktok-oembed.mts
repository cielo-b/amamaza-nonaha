import {
  BadRequestError,
  fetchTikTokOembed,
} from "../../src/server/tiktokOembed";

/**
 * GET /api/tiktok-oembed?url=<tiktok video url>
 *
 * Netlify rewrites /api/tiktok-oembed to this function (see netlify.toml).
 * Captions change rarely, so the response is cached at the edge and the stale
 * copy is served while it revalidates — the campaign grid then costs no
 * upstream call for most visitors.
 */
export default async (request: Request): Promise<Response> => {
  const url = new URL(request.url).searchParams.get("url");

  const json = (body: unknown, status: number, cache: string) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json", "cache-control": cache },
    });

  if (!url) return json({ error: "missing url parameter" }, 400, "no-store");

  try {
    return json(
      await fetchTikTokOembed(url),
      200,
      "public, max-age=600, s-maxage=86400, stale-while-revalidate=604800",
    );
  } catch (error) {
    const status = error instanceof BadRequestError ? 400 : 502;
    return json(
      { error: error instanceof Error ? error.message : "lookup failed" },
      status,
      "no-store",
    );
  }
};
