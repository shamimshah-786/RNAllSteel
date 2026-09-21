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

/* The longest review leads the section — computed without mutating REVIEWS */
const FEATURED = [...REVIEWS].sort((a, b) => b.text.length - a.text.length)[0];

/* ─── Monogram ─── */
function Avatar({ name, size = 44, tone = 'light' }) {
  const letter = name?.trim()[0]?.toUpperCase() ?? '?';
  return (
    <span
      role="img"
      aria-label={`Avatar for ${name}`}
      style={{ width: size, height: size, minWidth: size, fontSize: size * 0.36 }}
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold
        ${tone === 'dark'
          ? 'bg-white/15 text-white'
          : 'bg-slate-100 text-slate-700 ring-1 ring-gray-200'}`}
    >
      {letter}
    </span>
  );
}

/* ─── Stars ─── */
function Stars({ count = 5, className = 'text-[11px]' }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className={`${className} ${i < count ? 'text-amber-400' : 'text-gray-200'}`} />
      ))}
    </span>
  );
}

/* ─── Dots ─── */
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
          className={`h-[3px] transition-all duration-300
            ${i === active ? 'w-7 bg-blue-600' : 'w-3 bg-gray-300 hover:bg-gray-400'}`}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════ MAIN ═══════════════════════════════════ */
export default function Testimonials({ autoRotateMs = 6500 }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const total = REVIEWS.length;

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, autoRotateMs);
    return () => clearInterval(t);
  }, [paused, next, autoRotateMs]);

  useEffect(() => {
    const fn = (e) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [next, prev]);

  const current = REVIEWS[active];

  return (
    <section
      ref={sectionRef}
      aria-labelledby={`testimonials-heading-${id}`}
      className="bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════ HEADER ══════════ */}
        <div className="flex flex-col gap-8 border-b border-gray-200 pb-12
          lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              Customer reviews
            </p>
            <h2
              id={`testimonials-heading-${id}`}
              className="mt-6 text-3xl font-semibold leading-[1.14] tracking-[-0.025em]
                text-slate-900 sm:text-4xl lg:text-[2.75rem]"
            >
              Trusted by <span className="text-blue-600">500+ clients</span> across
              Mumbai.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
              Real feedback from homeowners and businesses in Mumbai &amp; Thane —
              on quality, punctuality and honest pricing.
            </p>
          </div>

          {/* Google badge */}
          <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">
            <div className="flex items-center gap-4 border border-gray-200 bg-white
              px-6 py-4">
              <FaGoogle className="text-xl text-blue-600" />
              <span>
                <span className="flex items-center gap-2">
                  <Stars count={5} className="text-xs" />
                  <span className="text-lg font-semibold tabular-nums text-slate-900">
                    5.0
                  </span>
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase
                  tracking-[0.14em] text-slate-400">
                  41 Google Reviews
                </span>
              </span>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-[2px]
                bg-slate-900 px-7 py-4 text-[12px] font-semibold uppercase
                tracking-[0.14em] text-white transition-colors duration-200
                hover:bg-slate-800"
            >
              Get a Free Quote
              <HiArrowUpRight className="text-sm transition-transform duration-200
                group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* ══════════ BODY ══════════ */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* Featured — dark editorial panel */}
          <figure className="flex flex-col justify-between bg-slate-950 p-8
            sm:p-10 lg:col-span-5">
            <div>
              <FaQuoteLeft className="text-lg text-blue-500" />
              <blockquote className="mt-6 text-[17px] font-light leading-relaxed
                text-white/90 sm:text-lg">
                &ldquo;{FEATURED.text}&rdquo;
              </blockquote>
            </div>

            <figcaption className="mt-10">
              <div className="flex items-center justify-between gap-4
                border-t border-white/15 pt-6">
                <span className="flex items-center gap-3">
                  <Avatar name={FEATURED.name} size={42} tone="dark" />
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {FEATURED.name}
                    </span>
                    <span className="mt-0.5 block text-[11px] uppercase
                      tracking-[0.14em] text-white/45">
                      {FEATURED.location} · {FEATURED.time}
                    </span>
                  </span>
                </span>
                <Stars count={FEATURED.rating} />
              </div>

              <a
                href="https://wa.me/919665181246"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2.5
                  rounded-[2px] bg-white px-5 py-3.5 text-[12px] font-semibold
                  uppercase tracking-[0.14em] text-slate-900 transition-colors
                  duration-200 hover:bg-slate-100"
              >
                <FaWhatsapp className="text-sm text-emerald-500" />
                Get a Free Quote
              </a>
            </figcaption>
          </figure>

          {/* Rotating review + summary */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div
              className="relative flex-1 border border-gray-200 bg-white p-8 sm:p-10"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              {!paused && (
                <div
                  key={active}
                  className="absolute left-0 top-0 h-[2px] bg-blue-600"
                  style={{ animation: `grow ${autoRotateMs}ms linear forwards`, width: '0%' }}
                />
              )}

              <div className="flex items-start justify-between gap-4">
                <span className="flex items-center gap-3">
                  <Avatar name={current.name} size={46} />
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">
                      {current.name}
                    </span>
                    <span className="mt-1 block text-[11px] uppercase
                      tracking-[0.14em] text-slate-400">
                      {current.location} · {current.time}
                    </span>
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <Stars count={current.rating} className="text-xs" />
                  <span className="inline-flex items-center gap-1.5 text-[10px]
                    font-semibold uppercase tracking-[0.14em] text-slate-400">
                    <FaGoogle className="text-[10px]" /> Verified
                  </span>
                </span>
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase
                tracking-[0.18em] text-blue-600">
                {current.service}
              </p>

              <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-700
                sm:text-base">
                &ldquo;{current.text}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center justify-between border-t
                border-gray-200 pt-6">
                <Dots total={total} active={active} onClick={setActive} />
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous review"
                    className="flex h-10 w-10 items-center justify-center rounded-[2px]
                      border border-gray-200 text-slate-500 transition-colors
                      duration-200 hover:border-blue-600 hover:bg-blue-600
                      hover:text-white"
                  >
                    <FaArrowRight className="rotate-180 text-[11px]" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next review"
                    className="flex h-10 w-10 items-center justify-center rounded-[2px]
                      border border-gray-200 text-slate-500 transition-colors
                      duration-200 hover:border-blue-600 hover:bg-blue-600
                      hover:text-white"
                  >
                    <FaArrowRight className="text-[11px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Summary strip */}
            <div className="flex flex-col items-start justify-between gap-4
              border border-gray-200 bg-white px-6 py-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <span className="flex -space-x-2">
                  {REVIEWS.slice(0, 4).map((r) => (
                    <Avatar key={r.id} name={r.name} size={32} />
                  ))}
                </span>
                <p className="text-[13px] text-slate-600">
                  <strong className="font-semibold text-slate-900">41 customers</strong>{' '}
                  rated us 5 stars on Google
                </p>
              </div>
              <span className="flex items-center gap-2">
                <Stars count={5} className="text-xs" />
                <span className="text-sm font-semibold tabular-nums text-slate-900">
                  5.0
                </span>
                <span className="text-[13px] text-slate-400">/ 5.0</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes grow {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  );
}
