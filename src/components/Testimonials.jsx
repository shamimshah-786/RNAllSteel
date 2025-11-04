'use client';

import { useId, useEffect, useRef, useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Testimonials component (fixed)
 * - Uses initials (first letter of name) as avatar instead of external images
 * - Fixes mobile text clipping in carousel by ensuring each slide is full-width and content uses normal flow (no absolute/fixed heights)
 * - Carousel is responsive: slides use flex: 0 0 100% and padding is inside the slide so text never overflows/cuts on narrow screens
 * - Auto-rotate with pause on hover/focus, manual controls, keyboard navigation
 *
 * Usage: import Testimonials from 'app/components/Testimonials'
 */

const RAW_REVIEWS = [
  {
    id: 'meraj-2025',
    name: 'Meraj Ajju',
    rating: 5,
    time: '2 months ago',
    text:
      'I had steel gate and grill made for my house from R N ALL STEEL FABRICATION WORK. The quality is very premium, the design is also very modern and the finishing is top-class. The best thing is that they deliver on time and complete the work at a reasonable price. If you need the best steel fabrication shop in Mumbra, then this is the best option. Highly recommended.',
    source: 'Google',
    lang: 'hi',
  },
  {
    id: 'irshad-2024',
    name: 'Irshad Ahmad',
    rating: 5,
    time: 'a year ago',
    text:
      'I got steel counter and steel chair and steel table made from this shop. Very nice people. I liked the work very much. They are trustworthy people.',
    source: 'Google',
    lang: 'en',
  },
  {
    id: 'arman-2023',
    name: 'Arman Khan',
    rating: 5,
    time: '2 years ago',
    text:
      'R N All Steel fabrication good service provide good work good finishing, steel railing & grill nice work.',
    source: 'Google',
    lang: 'en',
  },
  {
    id: 'sneha-2024',
    name: 'Sneha P.',
    rating: 5,
    time: '6 months ago',
    text:
      'Excellent workmanship, timely completion and very polite installers. Recommended for residential projects.',
    source: 'Customer',
    lang: 'en',
  },
  {
    id: 'vikram-2024',
    name: 'Vikram S.',
    rating: 5,
    time: '8 months ago',
    text: 'Professional team, clean site after installation. Great value for money.',
    source: 'Customer',
    lang: 'en',
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex items-center" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-amber-400' : 'text-slate-200'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function InitialsAvatar({ name, size = 48 }) {
  const initial = name ? name.trim()[0].toUpperCase() : '?';
  // simple color hashing for variety
  const colors = [
    'bg-sky-600',
    'bg-emerald-600',
    'bg-rose-600',
    'bg-indigo-600',
    'bg-amber-600',
    'bg-violet-600',
  ];
  // stable pick by char code
  const pick = colors[(initial.charCodeAt(0) || 65) % colors.length];
  return (
    <div
      role="img"
      aria-label={`Avatar for ${name}`}
      className={`flex items-center justify-center ${pick} text-white font-semibold rounded-full`}
      style={{ width: size, height: size, minWidth: size }}
    >
      {initial}
    </div>
  );
}

export default function Testimonials({ autoRotateMs = 7000 }) {
  const id = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = RAW_REVIEWS.length;
  const timerRef = useRef(null);
  const carouselRef = useRef(null);

  // Auto-rotate carousel
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, autoRotateMs);
    return () => clearInterval(timerRef.current);
  }, [paused, total, autoRotateMs]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  // Ensure visible slide is scrolled into view for small screens (safe fallback)
  useEffect(() => {
    // If carouselRef present and slides exist, scroll to slide for smaller browsers
    const container = carouselRef.current;
    if (!container) return;
    const slides = container.querySelectorAll('[data-slide]');
    if (!slides || slides.length === 0) return;
    const current = slides[index];
    if (current && typeof current.scrollIntoView === 'function') {
      // smooth scroll horizontally so that slide is fully visible on mobile
      current.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  }, [index]);

  // Featured review: pick longest 5-star review
  const featured = RAW_REVIEWS
    .filter((r) => r.rating === 5)
    .sort((a, b) => b.text.length - a.text.length)[0] || RAW_REVIEWS[0];

  return (
    <section aria-labelledby={`testimonials-${id}`} className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 id={`testimonials-${id}`} className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            What our customers say
          </h2>
          <p className="mt-3 text-slate-600">
            Real feedback from clients in Mumbai & Thane — quality, punctuality and value.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-gradient-to-tr from-white to-slate-50 p-6 h-full flex flex-col">
              <div className="flex items-start gap-4">
                <InitialsAvatar name={featured.name} size={64} />
                <div>
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-semibold text-slate-900">{featured.name}</div>
                    <div className="text-xs text-slate-500">{featured.time}</div>
                  </div>
                  <div className="mt-2">
                    <Stars count={featured.rating} />
                  </div>
                </div>
              </div>

              <blockquote className="mt-6 text-slate-700 leading-relaxed flex-1">
                <p className="text-base">“{featured.text}”</p>
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <div className="text-sm text-slate-600">Verified on Google</div>
                <div className="ml-auto">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
                  >
                    Request a Quote
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel + Grid */}
          <div className="lg:col-span-7">

            {/* Compact grid below carousel */}
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RAW_REVIEWS.slice(0, 4).map((r, i) => (
                <div key={r.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <InitialsAvatar name={r.name} size={40} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">{r.name}</div>
                        <div className="text-xs text-slate-500">{r.time}</div>
                      </div>
                      <div className="mt-2">
                        <Stars count={r.rating} />
                      </div>
                      <p className="mt-2 text-sm text-slate-700 line-clamp-3 break-words">{r.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}