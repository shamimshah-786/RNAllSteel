'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaArrowRight,
  FaWhatsapp,
  FaPhone,
} from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';

/* ═══════════════════════════════════════════════
   LIGHTBOX
   Where a browsing client decides. Photo large,
   the few specs that matter, and one tap to ask
   for this exact design.
═══════════════════════════════════════════════ */
function Lightbox({ projects, index, onClose, onNext, onPrev }) {
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const [show, setShow] = useState(false);
  const p = projects[index];

  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    const start = (e) => (touchX.current = e.touches?.[0]?.clientX ?? null);
    const end = (e) => {
      if (touchX.current == null) return;
      const d = touchX.current - (e.changedTouches?.[0]?.clientX ?? 0);
      if (Math.abs(d) > 44) (d > 0 ? onNext : onPrev)();
      touchX.current = null;
    };
    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchend', end, { passive: true });
    return () => {
      window.removeEventListener('touchstart', start);
      window.removeEventListener('touchend', end);
    };
  }, [onNext, onPrev]);

  useEffect(() => {
    const t = setTimeout(() => closeRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [index]);

  if (!p) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing design: ${p.title}`}
      className={`fixed inset-0 z-[60] flex items-end justify-center transition-opacity
        duration-300 sm:items-center ${show ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`relative z-10 flex w-full flex-col overflow-hidden bg-white
          shadow-2xl transition-all duration-300 sm:mx-4 sm:max-w-5xl sm:rounded-[3px]
          md:flex-row ${show ? 'translate-y-0 scale-100' : 'translate-y-8 sm:scale-95'}`}
        style={{ maxHeight: '92dvh' }}
      >
        {/* Photo */}
        <div className="relative w-full shrink-0 overflow-hidden bg-slate-100 md:w-[58%]">
          <div className="relative w-full" style={{ paddingTop: 'clamp(300px, 68vw, 560px)' }}>
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width:768px) 100vw, 58vw"
              className="object-cover"
              priority
            />
          </div>

          <button
            onClick={onPrev}
            aria-label="Previous design"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2
              items-center justify-center rounded-[2px] bg-white/90 text-slate-800
              transition-colors duration-200 hover:bg-white"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            onClick={onNext}
            aria-label="Next design"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2
              items-center justify-center rounded-[2px] bg-white/90 text-slate-800
              transition-colors duration-200 hover:bg-white"
          >
            <FaChevronRight className="text-xs" />
          </button>

          <span className="absolute bottom-4 right-4 rounded-[2px] bg-slate-950/70
            px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white
            backdrop-blur-sm">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Details */}
        <div className="flex w-full flex-col overflow-y-auto md:w-[42%]">
          <div className="flex items-start justify-between gap-4 border-b
            border-gray-200 px-6 pb-5 pt-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]
                text-blue-600">
                {p.categoryName} · {p.tag}
              </span>
              <h3 className="mt-2.5 text-xl font-semibold leading-snug
                tracking-[-0.01em] text-slate-900">
                {p.title}
              </h3>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.14em]
                text-slate-400">
                Ref {p.code}
              </p>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px]
                border border-gray-200 text-slate-500 transition-colors duration-150
                hover:bg-gray-50"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>

          <div className="flex-1 space-y-6 px-6 py-6">
            <dl className="grid grid-cols-2 gap-px border border-gray-200 bg-gray-200">
              {[
                { k: 'Material', v: p.material },
                { k: 'Finish', v: p.finish },
                { k: 'Lead time', v: '15–20 days' },
                { k: 'Warranty', v: '2 years' },
              ].map((s) => (
                <div key={s.k} className="bg-white px-4 py-3.5">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em]
                    text-slate-400">
                    {s.k}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{s.v}</dd>
                </div>
              ))}
            </dl>

            {p.serviceHref && (
              <Link
                href={p.serviceHref}
                className="group flex items-center justify-between gap-4 border
                  border-gray-200 bg-slate-50 px-5 py-4 transition-colors duration-200
                  hover:border-blue-600 hover:bg-blue-50"
              >
                <span>
                  <span className="block text-[10px] font-semibold uppercase
                    tracking-[0.16em] text-slate-400">
                    Sizes, options &amp; pricing
                  </span>
                  <span className="mt-1 block text-[14px] font-semibold text-slate-900
                    group-hover:text-blue-700">
                    {p.serviceName}
                  </span>
                </span>
                <FaArrowRight className="shrink-0 text-[11px] text-slate-300
                  transition-all duration-200 group-hover:translate-x-1
                  group-hover:text-blue-600" />
              </Link>
            )}

            {/* Filmstrip */}
            <div>
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                {projects.map((proj, i) => (
                  <button
                    key={proj.slug}
                    onClick={() => {
                      const d = i - index;
                      if (!d) return;
                      const fn = d > 0 ? onNext : onPrev;
                      for (let x = 0; x < Math.abs(d); x++) fn();
                    }}
                    aria-label={proj.title}
                    className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-[2px]
                      transition-all duration-200
                      ${i === index ? 'ring-2 ring-blue-600' : 'opacity-45 hover:opacity-90'}`}
                  >
                    <Image src={proj.src} alt="" fill sizes="48px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Decide */}
          <div className="space-y-2.5 border-t border-gray-200 px-6 py-5">
            <a
              href={p.enquiryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5
                rounded-[2px] bg-blue-600 px-4 py-4 text-[12px] font-semibold
                uppercase tracking-[0.14em] text-white transition-colors duration-200
                hover:bg-blue-700"
            >
              <FaWhatsapp className="text-sm" />
              I want this design
            </a>
            <a
              href="tel:+919665181246"
              className="inline-flex w-full items-center justify-center gap-2
                rounded-[2px] border border-gray-200 px-4 py-3 text-[11px]
                font-semibold uppercase tracking-[0.12em] text-slate-700
                transition-colors duration-200 hover:border-blue-600
                hover:text-blue-700"
            >
              <FaPhone className="text-[10px]" /> Call about ref {p.code}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TILE — image first. Caption sits on hover for
   pointer devices and stays visible on touch.
═══════════════════════════════════════════════ */
function Tile({ project, onClick, large, priority }) {
  return (
    <button
      onClick={onClick}
      aria-label={`View design: ${project.title}`}
      className={`group relative block w-full overflow-hidden rounded-[3px]
        bg-slate-200 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-600 focus-visible:ring-offset-2
        ${large ? 'col-span-2 row-span-2' : ''}`}
    >
      <div className="relative aspect-square w-full">
        <Image
          src={project.src}
          alt={project.alt}
          fill
          sizes={large ? '(max-width:768px) 100vw, 50vw' : '(max-width:768px) 50vw, 25vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          priority={priority}
        />
      </div>

      {/* Caption veil — always on for touch, on hover for pointers */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85
        via-slate-950/10 to-transparent transition-opacity duration-300
        sm:opacity-0 sm:group-hover:opacity-100" />

      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center
        rounded-[2px] bg-white opacity-0 transition-opacity duration-300
        group-hover:opacity-100">
        <HiArrowUpRight className="text-xs text-slate-900" />
      </span>

      <span className="absolute inset-x-0 bottom-0 p-3.5 text-left transition-all
        duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0
        sm:group-hover:opacity-100">
        {/* Clamped: on a 2-up mobile grid a long title would otherwise run
            to three lines and swallow the photo.
            No `block` here — line-clamp needs display:-webkit-box and a
            display utility alongside it silently cancels the clamp. */}
        <span className={`font-semibold leading-snug text-white
          ${large ? 'line-clamp-3 text-[15px] sm:text-base' : 'line-clamp-2 text-[13px]'}`}>
          {project.title}
        </span>
        <span className="mt-1 block text-[10px] font-medium uppercase
          tracking-[0.14em] text-white/60">
          {project.material} · {project.code}
        </span>
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════
   GALLERY
   `projects` must already carry code / enquiryHref /
   categoryName / serviceName — resolved on the
   server so the services data stays off the client.
   Pass `filters` to show category chips.
═══════════════════════════════════════════════ */
export default function ProjectGallery({
  projects,
  filters = null,
  featureFirst = true,
  priority = false,
}) {
  const [active, setActive] = useState('all');
  const [idx, setIdx] = useState(-1);

  const shown = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [projects, active]
  );

  const total = shown.length;
  const open = useCallback((i) => setIdx(i), []);
  const close = useCallback(() => setIdx(-1), []);
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

  /* Reset alongside the filter change, not in an effect afterwards —
     a stale index would open the wrong design. */
  const selectFilter = useCallback((slug) => {
    setActive(slug);
    setIdx(-1);
  }, []);

  useEffect(() => {
    document.body.style.overflow = idx > -1 ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [idx]);

  return (
    <>
      {filters && (
        <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1"
          role="group" aria-label="Filter designs by type">
          {[{ slug: 'all', name: 'All designs', count: projects.length }, ...filters].map((f) => {
            const on = active === f.slug;
            return (
              <button
                key={f.slug}
                onClick={() => selectFilter(f.slug)}
                aria-pressed={on}
                aria-label={`${f.name} — ${f.count} designs`}
                className={`inline-flex shrink-0 items-baseline gap-2 rounded-[2px]
                  border px-4 py-2.5 text-[12px] font-semibold uppercase
                  tracking-[0.1em] transition-colors duration-150
                  ${on
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'}`}
              >
                {f.name}
                <span className={`text-[10px] tabular-nums
                  ${on ? 'text-white/70' : 'text-slate-400'}`}>
                  {String(f.count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="grid auto-rows-auto grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {shown.map((p, i) => (
          <Tile
            key={p.slug}
            project={p}
            onClick={() => open(i)}
            large={featureFirst && i === 0}
            priority={priority && i < 3}
          />
        ))}
      </div>

      {idx > -1 && (
        <Lightbox
          projects={shown}
          index={idx}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      )}
    </>
  );
}
