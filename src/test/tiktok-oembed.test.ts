import { describe, it, expect, vi } from "vitest";
import {
  BadRequestError,
  canonicalizeVideoUrl,
  fetchTikTokOembed,
} from "@/server/tiktokOembed";

/** Minimal stand-in for the pieces of Response the module reads. */
const resp = (init: { url?: string; ok?: boolean; status?: number; body?: unknown }) =>
  ({
    url: init.url ?? "",
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: async () => init.body ?? {},
  }) as unknown as Response;

describe("canonicalizeVideoUrl", () => {
  it("follows a short link and drops the tracking query", async () => {
    const fake = vi.fn(async () =>
      resp({ url: "https://www.tiktok.com/@/video/7639260484251880724?_r=1&u_code=abc" }),
    );
    await expect(
      canonicalizeVideoUrl("https://vt.tiktok.com/ZSxrYdVXp/", fake as unknown as typeof fetch),
    ).resolves.toBe("https://www.tiktok.com/@/video/7639260484251880724");
    expect(fake).toHaveBeenCalledOnce();
  });

  it("skips the redirect round trip when the url is already canonical", async () => {
    const fake = vi.fn();
    await expect(
      canonicalizeVideoUrl(
        "https://www.tiktok.com/@amamazanonaha.ltd/video/7617212122887408917",
        fake as unknown as typeof fetch,
      ),
    ).resolves.toBe("https://www.tiktok.com/@/video/7617212122887408917");
    expect(fake).not.toHaveBeenCalled();
  });

  // The endpoint takes a URL from the query string, so without a host allowlist
  // it would happily fetch anything on the attacker's behalf.
  it.each([
    "https://evil.example.com/video/123",
    "http://169.254.169.254/latest/meta-data/",
    "file:///etc/passwd",
    "https://tiktok.com.evil.example.com/video/1",
    "not a url",
  ])("refuses %s", async (bad) => {
    const fake = vi.fn();
    await expect(
      canonicalizeVideoUrl(bad, fake as unknown as typeof fetch),
    ).rejects.toBeInstanceOf(BadRequestError);
    expect(fake).not.toHaveBeenCalled();
  });

  it("refuses a short link that redirects off tiktok.com", async () => {
    const fake = vi.fn(async () => resp({ url: "https://evil.example.com/video/9" }));
    await expect(
      canonicalizeVideoUrl("https://vt.tiktok.com/ZSxrYdVXp/", fake as unknown as typeof fetch),
    ).rejects.toThrow(/left tiktok\.com/);
  });
});

describe("fetchTikTokOembed", () => {
  it("normalises the payload the component consumes", async () => {
    const fake = vi.fn(async (input: unknown) => {
      const href = String(input);
      if (href.includes("/oembed")) {
        return resp({
          body: {
            title: "AMAKURU MEZA KUBANYARWANDA #rwandatiktok",
            thumbnail_url: "https://p16.tiktokcdn.com/thumb.jpeg",
            embed_product_id: "7639260484251880724",
            author_name: "amamazanonaha.ltd",
          },
        });
      }
      return resp({ url: "https://www.tiktok.com/@/video/7639260484251880724" });
    });

    await expect(
      fetchTikTokOembed("https://vt.tiktok.com/ZSxrYdVXp/", fake as unknown as typeof fetch),
    ).resolves.toEqual({
      title: "AMAKURU MEZA KUBANYARWANDA #rwandatiktok",
      thumbnailUrl: "https://p16.tiktokcdn.com/thumb.jpeg",
      embedProductId: "7639260484251880724",
      authorName: "amamazanonaha.ltd",
    });
  });

  it("reports an upstream failure instead of returning empty fields", async () => {
    const fake = vi.fn(async (input: unknown) =>
      String(input).includes("/oembed")
        ? resp({ ok: false, status: 400 })
        : resp({ url: "https://www.tiktok.com/@/video/1" }),
    );
    await expect(
      fetchTikTokOembed("https://vt.tiktok.com/x/", fake as unknown as typeof fetch),
    ).rejects.toThrow(/oembed responded 400/);
  });

  it("turns absent fields into null rather than undefined", async () => {
    const fake = vi.fn(async (input: unknown) =>
      String(input).includes("/oembed")
        ? resp({ body: { title: "" } })
        : resp({ url: "https://www.tiktok.com/@/video/1" }),
    );
    await expect(
      fetchTikTokOembed("https://vt.tiktok.com/x/", fake as unknown as typeof fetch),
    ).resolves.toEqual({
      title: null,
      thumbnailUrl: null,
      embedProductId: null,
      authorName: null,
    });
  });
});
