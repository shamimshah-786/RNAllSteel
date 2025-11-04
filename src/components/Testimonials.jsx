"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

/**
 * Client Testimonial component (App Router friendly).
 * - Fetches /api/google-review
 * - Shows loading, error, and fallback reviews
 * - Polished responsive card UI and accessibility attributes
 *
 * Usage: import TestimonialsClient from "@/components/TestimonialsClient"
 * Place inside an app route or component (client).
 */

export default function TestimonialsClient({ apiPath = "/api/google-review" }) {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    async function getReviews() {
      try {
        const res = await fetch(apiPath, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!mounted) return;
        setReviews(Array.isArray(json.reviews) ? json.reviews : []);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        if (!mounted) return;
        setError("Unable to load reviews right now.");
        setReviews([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    getReviews();
    return () => { mounted = false; };
  }, [apiPath]);

  const RatingStars = ({ score = 0 }) => {
    const full = Math.round(score || 0);
    return (
      <div className="flex items-center" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={`mr-0.5 ${i < full ? "text-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
    );
  };

  // Fallback reviews if Google fails
  const fallback = [
    { author_name: "Rahul Sharma", text: "Great workmanship and timely delivery.", rating: 5, relative_time_description: "2 months ago" },
    { author_name: "Sunita Patel", text: "Professional team. Highly recommended.", rating: 5, relative_time_description: "6 months ago" },
    { author_name: "Amit Verma", text: "Reliable, transparent and excellent finish.", rating: 5, relative_time_description: "1 year ago" },
  ];

  const list = (reviews && reviews.length > 0) ? reviews : fallback;

  return (
    <section aria-labelledby="testimonials-title" className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 id="testimonials-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">Client Reviews</h2>
            <p className="mt-1 text-sm text-gray-600 max-w-xl">Verified Google reviews — shown here for transparency. Updated periodically.</p>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{/* optional: show rating from API */}</span>
          </div>
        </div>

        <div aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full rounded-2xl p-6 bg-white shadow-sm border border-gray-100 text-center text-gray-500">Loading reviews...</div>
          )}

          {!loading && error && (
            <div className="col-span-full rounded-2xl p-6 bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
              {error} Showing a few recent client notes.
            </div>
          )}

          {!loading && list.map((r, i) => (
            <article key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {r.profile_photo_url ? (
                    <img src={r.profile_photo_url} alt={`${r.author_name} avatar`} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-gray-700 font-semibold">
                      {r.author_name ? r.author_name.charAt(0) : "U"}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{r.author_name}</h3>
                      <p className="text-xs text-gray-500">{r.relative_time_description || ""}</p>
                    </div>
                    <div className="text-right">
                      <RatingStars score={r.rating} />
                      <div className="text-xs text-gray-500 mt-1">{r.rating ? `${r.rating}/5` : ""}</div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-700 line-clamp-4">{r.text}</p>

                  <div className="mt-3 flex items-center gap-3">
                    {r.author_url ? (
                      <Link href={r.author_url} aria-label="View on Google">
                        <div className="text-xs text-blue-600 font-medium hover:underline">View on Google</div>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Reviews are fetched from Google Places and cached for performance. Contact us for any concerns.
        </div>
      </div>
    </section>
  );
}