'use client';

import { useId, useEffect, useRef, useState, useCallback } from 'react';
import { FaStar, FaQuoteLeft, FaGoogle, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import Link from 'next/link';

const REVIEWS = [
  {
    id: 'meraj-2025',
    name: 'Meraj Ajju',
    location: 'Mumbra',
    rating: 5,
    time: '2 months ago',
    text: 'I had steel gate and grill made for my house from R N ALL STEEL FABRICATION WORK. The quality is very premium, the design is also very modern and the finishing is top-class. They deliver on time and complete the work at a reasonable price. Best steel fabrication shop in Mumbra — highly recommended.',
    source: 'Google',
    service: 'Steel Gate & Grill',
  },
  {
    id: 'irshad-2024',
    name: 'Irshad Ahmad',
    location: 'Thane',
    rating: 5,
    time: 'a year ago',
    text: 'I got steel counter, steel chair and steel table made from this shop. Very nice people. I liked the work very much. They are trustworthy people and deliver exactly what they promise.',
    source: 'Google',
    service: 'Steel Furniture',
  },
  {
    id: 'arman-2023',
    name: 'Arman Khan',
    location: 'Mumbai',
    rating: 5,
    time: '2 years ago',
    text: 'R N All Steel fabrication provides good service, good work, good finishing. Steel railing and grill work is very nice. Highly satisfied with the quality and professionalism.',
    source: 'Google',
    service: 'Steel Railing & Grill',
  },
  {
    id: 'sneha-2024',
    name: 'Sneha P.',
    location: 'Thane',
    rating: 5,
    time: '6 months ago',
    text: 'Excellent workmanship, timely completion, and very polite installers. The team was professional throughout and the final product looked exactly as discussed. Highly recommended for residential projects.',
    source: 'Google',
    service: 'Residential Project',
  },
  {
    id: 'vikram-2024',
    name: 'Vikram S.',
    location: 'Mumbai',
    rating: 5,
    time: '8 months ago',
    text: 'Professional team, clean site after installation. Great value for money. The quality of steel used is top grade and the finishing is impeccable. Would definitely recommend to anyone.',
    source: 'Google',
    service: 'Custom Fabrication',
  },
];

/* ─── Avatar ─── */
const AVATAR_COLORS = [
  'bg-blue-600', 'bg-emerald-600', 'bg-rose-600',
  'bg-indigo-600', 'bg-amber-600', 'bg-violet-600',
];
function Avatar({ name, size = 44 }) {
  const letter = name?.trim()[0]?.toUpperCase() ?? '?';
  const color  = AVATAR_COLORS[(letter.charCodeAt(0) || 65) % AVATAR_COLORS.length];
  return (
    <div
      role="img" aria-label={`Avatar for ${name}`}
      style={{ width: size, height: size, minWidth: size, fontSize: size * 0.4 }}
      className={`${color} text-white font-bold rounded-full flex items-center justify-center flex-shrink-0`}
    >
      {letter}
    </div>
  );
}

/* ─── Stars ─── */
function Stars({ count = 5, size = 'sm' }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i}
          className={`${size === 'sm' ? 'text-xs' : 'text-sm'} ${i < count ? 'text-amber-400' : 'text-gray-200'}`} />
      ))}
    </div>
  );
}

/* ─── Featured card (large) ─── */
function FeaturedCard({ review }) {
  return (
    <div className="h-full flex flex-col bg-blue-600 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 -left-6 w-24 h-24 rounded-full bg-white/5" />

      <div className="relative flex flex-col h-full gap-6">
        {/* Top: quote icon + stars */}
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
            <FaQuoteLeft className="text-white text-base" />
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5">
            <FaGoogle className="text-white text-xs" />
            <span className="text-white text-xs font-bold">4.9 · 41 reviews</span>
          </div>
        </div>

        {/* Review text */}
        <blockquote className="flex-1">
          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light">
            "{review.text}"
          </p>
        </blockquote>

        {/* Divider */}
        <div className="border-t border-white/20" />

        {/* Reviewer + CTA */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar name={review.name} size={44} />
            <div>
              <p className="text-white font-bold text-sm">{review.name}</p>
              <p className="text-white/60 text-xs">{review.location} · {review.time}</p>
            </div>
          </div>
          <div>
            <Stars count={review.rating} />
          </div>
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/919665181246"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-blue-700 px-5 py-3 rounded-xl font-bold text-sm transition-colors duration-200 shadow-md"
        >
          <FaWhatsapp className="text-green-500 text-base" />
          Get a Free Quote
        </a>
      </div>
    </div>
  );
}

/* ─── Small review card ─── */
function ReviewCard({ review, index }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md p-5 transition-all duration-300 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Avatar name={review.name} size={40} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-bold text-gray-900 text-sm leading-tight truncate">{review.name}</p>
            <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">{review.time}</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">{review.location}</p>
          <div className="mt-1.5">
            <Stars count={review.rating} />
          </div>
        </div>
      </div>

      {/* Service tag */}
      <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider self-start">
        {review.service}
      </span>

      {/* Text */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
        "{review.text}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-gray-400">
          <FaGoogle className="text-xs" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            Verified Review
          </span>
        </div>
        <div className="w-6 h-6 bg-gray-50 group-hover:bg-blue-600 border border-gray-200 group-hover:border-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
          <HiArrowUpRight className="text-gray-400 group-hover:text-white text-xs transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
}

/* ─── Auto-carousel dots ─── */
function Dots({ total, active, onClick }) {
  return (
    <div className="flex items-center gap-1.5" role="tablist" aria-label="Review navigation">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === active}
          aria-label={`Review ${i + 1}`}
          onClick={() => onClick(i)}
          className={`rounded-full transition-all duration-300 ${
            i === active
              ? 'w-6 h-2 bg-blue-600'
              : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
          }`}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════ MAIN ═══════════════════════════════════ */
export default function Testimonials({ autoRotateMs = 6000 }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = REVIEWS.length;

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, autoRotateMs);
    return () => clearInterval(t);
  }, [paused, next, autoRotateMs]);

  /* keyboard nav only when focused inside section */
  const sectionRef = useRef(null);
  useEffect(() => {
    const fn = (e) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [next, prev]);

  const featured = REVIEWS.sort((a, b) => b.text.length - a.text.length)[0];

  return (
    <section
      ref={sectionRef}
      aria-labelledby={`testimonials-heading-${id}`}
      className="bg-gray-50 py-16 sm:py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2.5 text-blue-600 text-xs font-extrabold uppercase tracking-[0.22em] mb-5">
              <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
              Customer Reviews
            </span>
            <h2
              id={`testimonials-heading-${id}`}
              className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08]"
            >
              Trusted by
              <br />
              <span className="text-blue-600">500+ Clients</span>
              <br />
              Across Mumbai.
            </h2>
            <p className="mt-4 text-gray-500 text-base leading-relaxed">
              Real feedback from homeowners and businesses in Mumbai &amp; Thane — quality, punctuality, and honest pricing.
            </p>
          </div>

          {/* Google rating badge */}
          <div className="flex-shrink-0 flex flex-col items-start lg:items-end gap-4">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <FaGoogle className="text-blue-600 text-lg" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Stars count={5} size="base" />
                  <span className="text-xl font-bold text-gray-900 tabular-nums">5.0</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 font-semibold">41 Google Reviews</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors duration-200 group"
            >
              Get Free Quote
              <HiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Featured — left */}
          <div className="lg:col-span-5">
            <FeaturedCard review={featured} />
          </div>

          {/* Right: carousel card + 2 small cards */}
          <div className="lg:col-span-7 flex flex-col gap-5">

            {/* Carousel card */}
            <div
              className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              {/* Progress bar */}
              {!paused && (
                <div key={active} className="absolute top-0 left-0 h-0.5 bg-blue-600 rounded-full"
                  style={{ animation: `grow ${autoRotateMs}ms linear forwards`, width: '0%' }} />
              )}

              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={REVIEWS[active].name} size={48} />
                    <div>
                      <p className="font-bold text-gray-900">{REVIEWS[active].name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{REVIEWS[active].location} · {REVIEWS[active].time}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <Stars count={REVIEWS[active].rating} size="base" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <FaGoogle className="text-xs" /> Verified
                    </span>
                  </div>
                </div>

                {/* Service tag */}
                <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider mb-4">
                  {REVIEWS[active].service}
                </span>

                <blockquote>
                  <p className="text-gray-700 text-base leading-relaxed">
                    "{REVIEWS[active].text}"
                  </p>
                </blockquote>

                {/* Controls */}
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                  <Dots total={total} active={active} onClick={setActive} />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev} aria-label="Previous review"
                      className="w-9 h-9 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-500 rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <FaArrowRight className="text-xs rotate-180" />
                    </button>
                    <button
                      onClick={next} aria-label="Next review"
                      className="w-9 h-9 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-500 rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <FaArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2 small cards side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {REVIEWS.slice(1, 3).map((r, i) => (
                <ReviewCard key={r.id} review={r} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM STRIP — all 5-star mention ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {REVIEWS.slice(0, 4).map((r) => (
                <Avatar key={r.id} name={r.name} size={32} />
              ))}
            </div>
            <p className="text-sm text-gray-700 font-medium">
              <strong className="text-gray-900 font-bold">41 customers</strong> rated us 5 stars on Google
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="text-amber-400 text-sm" />
            ))}
            <span className="text-gray-900 font-bold ml-1.5">5.0</span>
            <span className="text-gray-400 text-sm">/ 5.0</span>
          </div>
        </div>

      </div>

      {/* Progress bar animation */}
      <style>{`
        @keyframes grow {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  );
}