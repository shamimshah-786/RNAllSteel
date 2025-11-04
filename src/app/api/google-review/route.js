/**
 * Server Route Handler for App Router
 * Path: /app/api/google-review/route.js
 *
 * - Next.js App Router route handler (JS)
 * - Safe/fail-safe behavior when env vars are missing or Google returns errors
 * - Returns normalized reviews (safe for client), with CDN-friendly cache headers.
 * - In-memory per-process cache included (replace with Redis for multi-instance production).
 *
 * Behavior decisions for "bug-proof":
 * - If GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID is missing, respond with 200 and an informative payload
 *   (so client can gracefully show fallback UI) instead of 500. This reduces UI noise while still
 *   signaling status in the payload.
 * - If Google returns non-OK or fetch fails, return 502 with a helpful error body AND a safe fallback
 *   reviews array (empty). The payload will include `ok: false` and `message` for diagnostics.
 * - Exposes ?force=1 to bypass cache (admin use), ?limit=N to restrict results.
 *
 * IMPORTANT: For production, don't rely on in-memory cache for multiple server instances. Use Redis.
 */

import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";
const PLACE_ID = process.env.GOOGLE_PLACE_ID || "";
const DEFAULT_TTL_MS = Number(process.env.GOOGLE_REVIEWS_TTL_MS || 1000 * 60 * 5); // default 5 minutes

// process-global cache to avoid repeated calls per server instance
if (!global.__googleReviewsCache) {
  global.__googleReviewsCache = { ts: 0, ttl: DEFAULT_TTL_MS, data: null, meta: null };
}
const cache = global.__googleReviewsCache;

function buildPlaceDetailsUrl(placeId, apiKey) {
  const fields = ["name", "rating", "user_ratings_total", "reviews", "url"].join(",");
  return `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
    placeId
  )}&fields=${encodeURIComponent(fields)}&key=${encodeURIComponent(apiKey)}`;
}

function normalizeReview(rev) {
  return {
    author_name: rev.author_name || "Anonymous",
    author_url: rev.author_url || null,
    rating: typeof rev.rating === "number" ? rev.rating : null,
    time: rev.time || null,
    text: rev.text || "",
    relative_time_description: rev.relative_time_description || "",
    profile_photo_url: rev.profile_photo_url || null,
  };
}

/** GET handler */
export async function GET(request) {
  const url = new URL(request.url);
  const force = url.searchParams.get("force") === "1" || url.searchParams.get("force") === "true";
  const limitParam = Number(url.searchParams.get("limit") || 6);
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(12, limitParam) : 6;

  // If env missing: respond 200 with ok:false and empty reviews so client can show fallback gracefully.
  if (!GOOGLE_API_KEY || !PLACE_ID) {
    const body = {
      ok: false,
      source: "disabled",
      message: "GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID is not configured on the server.",
      reviews: [],
      meta: null,
    };
    return NextResponse.json(body, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    const now = Date.now();
    if (!force && cache.data && now - cache.ts < cache.ttl) {
      const slice = cache.data.slice(0, limit);
      return NextResponse.json(
        { ok: true, source: "cache", reviews: slice, meta: cache.meta || null },
        {
          status: 200,
          headers: {
            "Cache-Control": `public, s-maxage=${Math.floor(cache.ttl / 1000)}, stale-while-revalidate=600`,
          },
        }
      );
    }

    // Fetch from Google Places Details API
    const apiUrl = buildPlaceDetailsUrl(PLACE_ID, GOOGLE_API_KEY);
    const res = await fetch(apiUrl, { method: "GET" });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      // Return 502 with diagnostics + empty reviews to allow client-side fallback
      return NextResponse.json(
        {
          ok: false,
          source: "google_fetch_error",
          status: res.status,
          message: "Failed to fetch Google Places",
          details: text ? (text.length > 1000 ? text.slice(0, 1000) + "..." : text) : null,
          reviews: [],
          meta: null,
        },
        { status: 502, headers: { "Cache-Control": "no-store" } }
      );
    }

    const json = await res.json();
    if (json.status !== "OK") {
      // Google responded but with an error status (ZERO_RESULTS, REQUEST_DENIED, etc)
      return NextResponse.json(
        {
          ok: false,
          source: "google_api_error",
          google_status: json.status,
          message: json.error_message || "Google Places API returned a non-OK status",
          reviews: [],
          meta: null,
        },
        { status: 502, headers: { "Cache-Control": "no-store" } }
      );
    }

    const rawReviews = Array.isArray(json.result.reviews) ? json.result.reviews : [];

    const normalized = rawReviews.slice(0, 12).map(normalizeReview);

    // Update cache
    cache.ts = now;
    cache.ttl = DEFAULT_TTL_MS;
    cache.data = normalized;
    cache.meta = {
      name: json.result.name || null,
      rating: json.result.rating || null,
      total_ratings: json.result.user_ratings_total || null,
      url: json.result.url || null,
    };

    return NextResponse.json(
      { ok: true, source: "google", reviews: normalized.slice(0, limit), meta: cache.meta },
      {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=${Math.floor(cache.ttl / 1000)}, stale-while-revalidate=600`,
        },
      }
    );
  } catch (err) {
    console.error("Error in /api/google-review:", err);
    return NextResponse.json(
      {
        ok: false,
        source: "server_error",
        message: "Internal server error while fetching Google reviews",
        details: String(err),
        reviews: [],
        meta: null,
      },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}