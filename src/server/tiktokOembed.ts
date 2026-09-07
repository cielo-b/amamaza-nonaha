/**
 * Server-side TikTok oEmbed lookup.
 *
 * Two reasons this cannot happen in the browser:
 *   1. oEmbed sends no Access-Control-Allow-Origin, so a client fetch is
 *      blocked outright.
 *   2. oEmbed answers 400 for vt.tiktok.com short links. They have to be
 *      followed to a canonical /video/<id> URL first, and following a
 *      cross-origin redirect chain is also off-limits to the browser.
 *
 * Shared by the Netlify function (production) and the Vite dev middleware
 * (local), so both environments behave identically.
 */

/** Hosts we are willing to contact. Without this the endpoint is an open proxy. */
const ALLOWED_HOSTS = new Set([
  "tiktok.com",
  "www.tiktok.com",
  "vt.tiktok.com",
  "vm.tiktok.com",
  "m.tiktok.com",
]);

// Some TikTok edges answer differently to a non-browser client.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

export interface TikTokOembed {
  title: string | null;
  thumbnailUrl: string | null;
  embedProductId: string | null;
  authorName: string | null;
}

export class BadRequestError extends Error {}
export class UpstreamError extends Error {}

const isAllowed = (raw: string): boolean => {
  try {
    const parsed = new URL(raw);
    return (
      (parsed.protocol === "https:" || parsed.protocol === "http:") &&
      ALLOWED_HOSTS.has(parsed.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
};

/**
 * Turn any TikTok video link into the canonical form oEmbed accepts.
 * Short links are followed; the tracking query string is dropped because
 * oEmbed rejects the URL with it attached.
 */
export const canonicalizeVideoUrl = async (
  raw: string,
  fetchImpl: typeof fetch = fetch,
): Promise<string> => {
  if (!isAllowed(raw)) throw new BadRequestError("url must be a tiktok.com link");

  let target = raw;

  // Already canonical? Then we never need the extra round trip.
  let id = /\/video\/(\d+)/.exec(new URL(target).pathname)?.[1];

  if (!id) {
    const res = await fetchImpl(target, {
      redirect: "follow",
      headers: { "User-Agent": UA },
    });
    if (!isAllowed(res.url)) throw new UpstreamError("short link left tiktok.com");
    target = res.url;
    id = /\/video\/(\d+)/.exec(new URL(target).pathname)?.[1];
  }

  if (!id) throw new UpstreamError("could not find a video id for this link");
  return `https://www.tiktok.com/@/video/${id}`;
};

export const fetchTikTokOembed = async (
  raw: string,
  fetchImpl: typeof fetch = fetch,
): Promise<TikTokOembed> => {
  const canonical = await canonicalizeVideoUrl(raw, fetchImpl);

  const res = await fetchImpl(
    `https://www.tiktok.com/oembed?url=${encodeURIComponent(canonical)}`,
    { headers: { "User-Agent": UA, Accept: "application/json" } },
  );
  if (!res.ok) throw new UpstreamError(`oembed responded ${res.status}`);

  const data = (await res.json()) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" && v.length ? v : null);

  return {
    title: str(data.title),
    thumbnailUrl: str(data.thumbnail_url),
    embedProductId: str(data.embed_product_id),
    authorName: str(data.author_name),
  };
};
