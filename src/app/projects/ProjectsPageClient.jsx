// ─────────────────────────────────────────────────────────────────
//  ProjectsPageClient.jsx  —  Improved Design
// ─────────────────────────────────────────────────────────────────
'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChevronLeft, FaChevronRight,
  FaWhatsapp, FaArrowRight, FaTimes,
} from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import { MdOpenInFull } from 'react-icons/md';

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const ALL_PROJECTS = [
  { id: 1,  src: '/projects/main-gates/ms-decorative-main-gate-house.webp',          title: 'Mild Steel Decorative Main Gate',                   category: 'Main Gates' },
  { id: 2,  src: '/projects/street-stalls/stainless-steel-food-cart-stall.webp',     title: 'Stainless Steel Food Stalls',                       category: 'Street Stalls' },
  { id: 3,  src: '/projects/window-grills/stainless-steel-window-grill-modern.webp', title: 'Modern Stainless Steel Window Grill',               category: 'Window Grills' },
  { id: 4,  src: '/projects/main-gates/stainless-steel-main-gate-house.webp',        title: 'Stainless Steel Main Gate',                         category: 'Main Gates' },
  { id: 5,  src: '/projects/railings/stainless-steel-staircase-railing.webp',        title: 'Stainless Steel Staircase Railing',                 category: 'Railings' },
  { id: 6,  src: '/projects/window-grills/designer-ss-window-grill.webp',            title: 'Designer Stainless Steel Window Grill',             category: 'Window Grills' },
  { id: 7,  src: '/projects/railings/steel-staircase-railing.webp',                  title: 'Steel Staircase Railing',                           category: 'Railings' },
  { id: 8,  src: '/projects/collapsible-gates/collapsible-steel-gate.webp',          title: 'Collapsible Steel Gate',                            category: 'Collapsible Gates' },
  { id: 9,  src: '/projects/main-doors/ss-designer-main-door.webp',                  title: 'Stainless Steel Designer Main Door',                category: 'Main Doors' },
  { id: 10, src: '/projects/railings/ss-staircase-railing-decorative-pillars.webp',  title: 'SS Staircase Railing with Decorative Pillars',      category: 'Railings' },
  { id: 11, src: '/projects/main-gates/ss-staircase-safety-gate.webp',               title: 'Stainless Steel Staircase Safety Gate',             category: 'Main Gates' },
  { id: 12, src: '/projects/main-gates/wrought-iron-designer-main-gate-gold.webp',   title: 'Wrought Iron Designer Main Gate with Gold Finish',  category: 'Main Gates' },
  { id: 13, src: '/projects/main-gates/laser-cut-steel-main-gate.webp',              title: 'Modern Laser Cut Steel Main Gate',                  category: 'Main Gates' },
  { id: 14, src: '/projects/main-gates/ms-sliding-main-gate-laser-cut.webp',         title: 'Mild Steel Sliding Main Gate with Laser Cut Panel', category: 'Main Gates' },
  { id: 15, src: '/projects/collapsible-gates/collapsible-steel-window-gate.webp',   title: 'Collapsible Steel Window Gate',                     category: 'Collapsible Gates' },
  { id: 16, src: '/projects/railings/ss-balcony-railing-designer.webp',              title: 'SS Balcony Railing with Designer Panels',           category: 'Railings' },
  { id: 17, src: '/projects/main-doors/ss-main-door-wooden-finish.webp',             title: 'SS Main Door with Wooden Finish',                   category: 'Main Doors' },
  { id: 18, src: '/projects/window-grills/ss-window-grill-apartment.webp',           title: 'Stainless Steel Window Grill for Apartment',        category: 'Window Grills' },
  { id: 19, src: '/projects/main-gates/ss-swing-compound-main-gate.webp',            title: 'SS Swing Main Gate with Decorative Design',         category: 'Main Gates' },
  { id: 20, src: '/projects/railings/ss-balcony-railing-curved-design.webp',         title: 'Stainless Steel Balcony Railing with Curved Design',category: 'Railings' },
  { id: 21, src: '/projects/railings/ss-mezzanine-railing-metal-stairs.webp',        title: 'SS Mezzanine Railing with Metal Staircase',         category: 'Railings' },
  { id: 22, src: '/projects/railings/ss-bungalow-balcony-railing-window-grill.jpg',  title: 'SS Railings & Window Grills for Modern Bungalow',   category: 'Railings' },
];

const CAT_CONFIG = {
  'Main Gates':        { pill: 'bg-blue-50/90 text-blue-700 border-blue-200',         dot: 'bg-blue-500',    btn: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'   },
  'Railings':          { pill: 'bg-emerald-50/90 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', btn: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
  'Window Grills':     { pill: 'bg-violet-50/90 text-violet-700 border-violet-200',   dot: 'bg-violet-500',  btn: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100'   },
  'Collapsible Gates': { pill: 'bg-amber-50/90 text-amber-700 border-amber-200',      dot: 'bg-amber-500',   btn: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'     },
  'Main Doors':        { pill: 'bg-rose-50/90 text-rose-700 border-rose-200',         dot: 'bg-rose-500',    btn: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'         },
  'Street Stalls':     { pill: 'bg-orange-50/90 text-orange-700 border-orange-200',   dot: 'bg-orange-500',  btn: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'  },
};
const getCat = (c) => CAT_CONFIG[c] ?? { pill: 'bg-white/80 text-gray-700 border-gray-200', dot: 'bg-gray-400', btn: 'bg-gray-100 text-gray-700 border-gray-200' };

const PER_PAGE = 12;

/* ═══════════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════════ */
function Lightbox({ projects, index, onClose, onNext, onPrev }) {
  const closeRef = useRef(null);
  const touchX   = useRef(null);
  const [mounted, setMounted] = useState(false);
  const project = projects[index];

  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  useEffect(() => {
    const t = setTimeout(() => closeRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    const start = (e) => { touchX.current = e.touches?.[0]?.clientX ?? null; };
    const end   = (e) => {
      if (touchX.current === null) return;
      const d = touchX.current - (e.changedTouches?.[0]?.clientX ?? 0);
      if (Math.abs(d) > 44) d > 0 ? onNext() : onPrev();
      touchX.current = null;
    };
    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchend',   end,   { passive: true });
    return () => {
      window.removeEventListener('touchstart', start);
      window.removeEventListener('touchend', end);
    };
  }, [onNext, onPrev]);

  if (!project) return null;
  const cat = getCat(project.category);

  return (
    <div
      role="dialog" aria-modal="true" aria-label={`Viewing: ${project.title}`}
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center
        transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose} aria-hidden="true" />

      {/* ── Shell ── */}
      <div
        className={`relative z-10 w-full sm:max-w-5xl sm:mx-4 bg-white
          rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl
          flex flex-col md:flex-row
          transition-all duration-300 ease-out
          ${mounted ? 'translate-y-0 sm:scale-100' : 'translate-y-12 sm:scale-95'}`}
        style={{ maxHeight: '95dvh' }}
      >
        {/* ── IMAGE PANE ── */}
        <div className="relative flex-shrink-0 w-full md:w-[58%]
          bg-gray-950 overflow-hidden">

          {/* Blurred bg */}
          <div className="absolute inset-0 scale-110" aria-hidden="true">
            <Image src={project.src} alt="" fill sizes="60vw"
              className="object-cover opacity-20 blur-2xl saturate-150" />
          </div>

          {/* Main image — fixed height on mobile for safe area */}
          <div className="relative w-full"
            style={{ height: 'clamp(240px, 52vw, 520px)' }}>
            <Image src={project.src} alt={project.title} fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-contain" priority />
          </div>

          {/* Prev / Next */}
          {[
            { fn: onPrev, icon: FaChevronLeft,  side: 'left-3',  label: 'Previous' },
            { fn: onNext, icon: FaChevronRight, side: 'right-3', label: 'Next' },
          ].map(({ fn, icon: Icon, side, label }) => (
            <button key={label} onClick={fn} aria-label={label}
              className={`absolute ${side} top-1/2 -translate-y-1/2
                w-10 h-10 sm:w-11 sm:h-11
                bg-white/10 hover:bg-white/25 active:bg-white/30
                backdrop-blur-sm border border-white/20 text-white rounded-full
                flex items-center justify-center
                transition-colors duration-200`}>
              <Icon className="text-sm" />
            </button>
          ))}

          {/* Bottom bar */}
          <div className="absolute bottom-0 inset-x-0 px-4 py-3
            bg-gradient-to-t from-black/60 to-transparent
            flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10px]
              font-black text-white/70 uppercase tracking-[0.18em]">
              <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
              {project.category}
            </span>
            <span className="text-[11px] font-bold text-white/50 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── INFO PANE ── */}
        <div className="flex flex-col w-full md:w-[42%] overflow-y-auto overscroll-contain
          max-h-[50dvh] md:max-h-none">

          {/* Header */}
          <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4
            border-b border-gray-100 sticky top-0 bg-white z-10">
            <div className="flex-1">
              <span className={`inline-flex items-center gap-1.5 text-[9px] font-black
                uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border mb-2.5
                ${cat.pill} backdrop-blur-sm`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cat.dot}`} />
                {project.category}
              </span>
              <h3 className="text-[1.05rem] font-black text-gray-950 leading-snug">
                {project.title}
              </h3>
            </div>
            <button ref={closeRef} onClick={onClose} aria-label="Close lightbox"
              className="flex-shrink-0 mt-0.5 w-8 h-8 bg-gray-100 hover:bg-gray-200
                active:bg-gray-300 rounded-full flex items-center justify-center
                transition-colors duration-150">
              <FaTimes className="text-gray-500 text-xs" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 px-5 py-4 space-y-4">
            <p className="text-sm text-gray-500 leading-relaxed">
              Precision-fabricated{' '}
              <strong className="text-gray-800 font-semibold">
                {project.category.toLowerCase()}
              </strong>{' '}
              using SS 304 / mild steel with premium finishing — built for longevity,
              security, and aesthetic appeal across Mumbai &amp; Thane.
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { k: 'Material',  v: 'SS 304 / MS' },
                { k: 'Finish',    v: 'Mirror / Matte' },
                { k: 'Lead Time', v: '15–20 Days' },
                { k: 'Warranty',  v: '2 Years' },
              ].map(({ k, v }) => (
                <div key={k} className="bg-gray-50 border border-gray-100
                  rounded-xl p-3 space-y-0.5">
                  <p className="text-[9px] font-black text-gray-400 uppercase
                    tracking-[0.18em]">{k}</p>
                  <p className="text-sm font-bold text-gray-900">{v}</p>
                </div>
              ))}
            </div>

            {/* Thumbnail strip */}
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase
                tracking-[0.2em] mb-2.5">
                Browse All
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1"
                style={{ scrollbarWidth: 'none' }}>
                {projects.map((p, i) => (
                  <button key={p.id}
                    onClick={() => {
                      const delta = i - index;
                      if (!delta) return;
                      const fn = delta > 0 ? onNext : onPrev;
                      for (let x = 0; x < Math.abs(delta); x++) fn();
                    }}
                    aria-label={`View: ${p.title}`}
                    aria-current={i === index ? 'true' : undefined}
                    className={`relative flex-shrink-0 w-12 h-12 rounded-xl
                      overflow-hidden border-2 transition-all duration-200
                      ${i === index
                        ? 'border-blue-600 ring-2 ring-blue-200 scale-105'
                        : 'border-transparent opacity-40 hover:opacity-75 hover:scale-105'}`}>
                    <Image src={p.src} alt={p.title} fill
                      sizes="48px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="px-5 py-4 border-t border-gray-100 space-y-2
            sticky bottom-0 bg-white">
            <a href="https://wa.me/919665181246" target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2
                bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                text-white px-4 py-3 rounded-xl font-bold text-sm
                transition-colors duration-200 shadow-sm shadow-blue-200">
              <FaWhatsapp className="text-green-300 text-base" />
              Request Similar Work
            </a>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-1.5
                  border border-gray-200 hover:border-blue-300 hover:bg-blue-50
                  text-gray-700 hover:text-blue-700 px-4 py-2.5
                  rounded-xl font-semibold text-sm transition-colors duration-200">
                Get Quote
              </Link>
              <a href={project.src} download
                className="inline-flex items-center justify-center gap-1.5
                  border border-gray-200 hover:border-gray-300 hover:bg-gray-50
                  text-gray-700 px-4 py-2.5 rounded-xl font-semibold text-sm
                  transition-colors duration-200">
                Download
                <HiArrowUpRight className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════ */
function ProjectCard({ project, onClick, priority }) {
  const cat = getCat(project.category);

  return (
    <article className="break-inside-avoid mb-3 sm:mb-4" aria-label={project.title}>
      <button
        onClick={onClick}
        className="group relative block w-full text-left rounded-2xl overflow-hidden
          bg-white border border-gray-100 shadow-sm
          hover:shadow-xl hover:border-blue-100 hover:-translate-y-1
          active:scale-[0.98] transition-all duration-300
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        aria-label={`View: ${project.title}`}
      >
        {/* Image */}
        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
          <Image
            src={project.src} alt={project.title} fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700
              group-hover:scale-[1.08]"
            priority={priority}
          />
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-t
            from-gray-950/75 via-gray-950/10 to-transparent" />
          {/* Hover colour wash */}
          <div className="absolute inset-0 bg-blue-900/0
            group-hover:bg-blue-900/15 transition-colors duration-300" />
        </div>

        {/* Expand icon — top right, appears on hover */}
        <div className="absolute top-2.5 right-2.5 w-7 h-7
          bg-white/90 backdrop-blur-sm rounded-lg shadow-sm
          flex items-center justify-center
          opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-250">
          <MdOpenInFull className="text-gray-800 text-[11px]" />
        </div>

        {/* Category chip — top left, glassmorphism */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`inline-flex items-center gap-1 text-[9px] font-black
            uppercase tracking-[0.16em] px-2 py-1 rounded-full border
            backdrop-blur-sm ${cat.pill}`}>
            <span className={`w-1 h-1 rounded-full flex-shrink-0 ${cat.dot}`} />
            {project.category}
          </span>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-0 inset-x-0 px-3 pb-3 pt-8">
          <p className="text-white font-bold text-[0.8125rem] leading-snug
            line-clamp-2 mb-1 drop-shadow-sm">
            {project.title}
          </p>
          {/* "View Project" — slides in on hover */}
          <div className="flex items-center gap-1.5 text-white/0
            group-hover:text-white/60 transition-colors duration-250">
            <span className="w-3 h-px bg-blue-400 opacity-0
              group-hover:opacity-100 transition-opacity duration-250" />
            <span className="text-[10px] font-semibold">View Project</span>
          </div>
        </div>
      </button>
    </article>
  );
}

/* ═══════════════════════════════════════════════
   FILTER BAR (sticky, horizontal scroll on mobile)
═══════════════════════════════════════════════ */
function FilterBar({ categories, active, onChange, count, total }) {
  return (
    <div className="flex items-center gap-3">
      {/* Scrollable pills */}
      <div className="flex-1 flex items-center gap-1.5 overflow-x-auto pb-0.5"
        style={{ scrollbarWidth: 'none' }}
        role="group" aria-label="Filter by category">
        {categories.map((c) => {
          const isActive = active === c;
          const cfg      = c !== 'All' ? getCat(c) : null;
          return (
            <button key={c} onClick={() => onChange(c)} aria-pressed={isActive}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full
                text-[11px] font-bold uppercase tracking-wider
                border transition-all duration-200
                ${isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200/70 scale-[1.03]'
                  : cfg
                    ? `${cfg.btn} transition-colors`
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}>
              {c === 'All' ? `All · ${total}` : c}
            </button>
          );
        })}
      </div>
      {/* Count */}
      <span className="flex-shrink-0 text-[11px] text-gray-400 font-semibold tabular-nums hidden sm:block">
        {count} / {total}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SKELETON
═══════════════════════════════════════════════ */
function Skeleton() {
  return (
    <div className="break-inside-avoid mb-3 sm:mb-4">
      <div className="w-full aspect-[3/4] rounded-2xl
        bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HERO STATS
═══════════════════════════════════════════════ */
function HeroStats() {
  const stats = [
    { v: '500+', l: 'Projects Done' },
    { v: '15+',  l: 'Years Active'  },
    { v: '5.0★', l: 'Google Rating' },
  ];
  return (
    <div className="flex items-stretch gap-px rounded-2xl overflow-hidden
      border border-gray-200 shadow-sm bg-gray-200">
      {stats.map((s) => (
        <div key={s.l} className="flex flex-col items-center justify-center
          bg-white px-4 sm:px-5 py-3 first:rounded-l-2xl last:rounded-r-2xl">
          <p className="text-lg font-black text-gray-950 leading-none tabular-nums">
            {s.v}
          </p>
          <p className="text-[10px] text-gray-400 font-semibold mt-0.5 uppercase
            tracking-wider whitespace-nowrap">
            {s.l}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════ */
export default function ProjectsPageClient() {
  const [category,     setCategory]     = useState('All');
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [selectedIdx,  setSelectedIdx]  = useState(-1);
  const [loadingMore,  setLoadingMore]  = useState(false);
  const lastFocusRef = useRef(null);

  const filteredAll = useMemo(
    () => category === 'All'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === category),
    [category]
  );

  const visible = useMemo(
    () => filteredAll.slice(0, visibleCount),
    [filteredAll, visibleCount]
  );
  const hasMore = visibleCount < filteredAll.length;

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(ALL_PROJECTS.map((p) => p.category)))],
    []
  );

  useEffect(() => { setVisibleCount(PER_PAGE); setSelectedIdx(-1); }, [category]);

  useEffect(() => {
    document.body.style.overflow = selectedIdx > -1 ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedIdx]);

  const openViewer = useCallback((i) => {
    lastFocusRef.current = document.activeElement;
    setSelectedIdx(i);
  }, []);

  const closeViewer = useCallback(() => {
    setSelectedIdx(-1);
    setTimeout(() => lastFocusRef.current?.focus?.(), 60);
  }, []);

  const showNext = useCallback(
    () => setSelectedIdx((i) => (i + 1) % visible.length),
    [visible.length]
  );
  const showPrev = useCallback(
    () => setSelectedIdx((i) => (i - 1 + visible.length) % visible.length),
    [visible.length]
  );

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    await new Promise((r) => setTimeout(r, 380));
    setVisibleCount((c) => Math.min(filteredAll.length, c + PER_PAGE));
    setLoadingMore(false);
  };

  return (
    <main className="bg-[#f8f8f6] min-h-screen">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            {/* Left */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2.5 mb-6">
                <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
                <span className="text-[10px] font-black text-blue-600 uppercase
                  tracking-[0.25em]">
                  Portfolio
                </span>
              </div>
              <h1 className="text-[2.25rem] sm:text-5xl lg:text-[3.25rem] font-black
                text-gray-950 leading-[1.06] tracking-tight mb-5">
                500+ Projects.
                <br />
                <span className="text-blue-600">Every One</span> Built
                <br className="hidden sm:block" /> by Our Team.
              </h1>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-lg">
                Browse our complete portfolio — gates, railings, grills &amp; doors —
                delivered across Mumbai &amp; Thane since 2010.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-3 lg:items-end">
              <HeroStats />
              <a href="https://wa.me/919665181246" target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2
                  bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                  text-white px-6 py-3 rounded-xl font-bold text-sm
                  transition-colors duration-200 shadow-md shadow-blue-200">
                <FaWhatsapp className="text-green-300 text-base" />
                Request Custom Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STICKY FILTER BAR
      ═══════════════════════════════════════ */}
      <div className="sticky top-0 z-30 bg-[#f8f8f6]/90 backdrop-blur-sm
        border-b border-gray-200/60 py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FilterBar
            categories={categories}
            active={category}
            onChange={setCategory}
            count={filteredAll.length}
            total={ALL_PROJECTS.length}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════
          GALLERY GRID
      ═══════════════════════════════════════ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div aria-live="polite" aria-label="Project gallery">
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => openViewer(i)}
                priority={i < 4}
              />
            ))}
            {loadingMore && Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={`sk-${i}`} />
            ))}
          </div>
        </div>

        {/* Load more / end */}
        <div className="mt-12 flex flex-col items-center gap-3">
          {hasMore ? (
            <button onClick={loadMore} disabled={loadingMore}
              className="inline-flex items-center gap-2.5
                bg-gray-900 hover:bg-gray-800 active:bg-black
                disabled:opacity-60 disabled:cursor-not-allowed
                text-white px-7 py-3.5 rounded-xl font-bold text-sm
                transition-colors duration-200 shadow-md group">
              {loadingMore ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white
                    rounded-full animate-spin" />
                  Loading…
                </>
              ) : (
                <>
                  Load {Math.min(PER_PAGE, filteredAll.length - visibleCount)} More
                  <FaArrowRight className="text-xs group-hover:translate-x-0.5
                    transition-transform duration-150" />
                </>
              )}
            </button>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-6
              shadow-sm text-center max-w-xs">
              <p className="text-sm font-bold text-gray-900 mb-1">
                All {filteredAll.length} projects shown ✓
              </p>
              <p className="text-sm text-gray-500">
                Need something custom?{' '}
                <Link href="/contact"
                  className="text-blue-600 font-semibold hover:underline">
                  Get a quote
                </Link>
              </p>
            </div>
          )}
          <p className="text-[11px] text-gray-400 font-semibold tabular-nums">
            Showing {visible.length} of {filteredAll.length} projects
            {category !== 'All' && ` · ${category}`}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-3xl
          bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950
          border border-gray-800">
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-px
            bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400" />
          {/* Bg circles */}
          <div className="absolute -top-12 -right-12 w-56 h-56
            rounded-full bg-blue-600/8 pointer-events-none" />
          <div className="absolute -bottom-10 left-20 w-36 h-36
            rounded-full bg-white/4 pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start
            md:items-center justify-between gap-6 p-8 sm:p-10">
            <div>
              <span className="text-[10px] font-black text-blue-400 uppercase
                tracking-[0.25em] block mb-3">
                Start Your Project
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white
                leading-snug tracking-tight mb-2">
                Don't see exactly<br className="hidden sm:block" />
                what you need?
              </h2>
              <p className="text-gray-400 text-sm max-w-sm">
                We do fully custom work — bring us your design or idea.
                Free site visit across Mumbai &amp; Thane.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0 w-full sm:w-auto">
              <a href="https://wa.me/919665181246" target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2
                  bg-blue-600 hover:bg-blue-500 active:bg-blue-700
                  text-white px-6 py-3 rounded-xl font-bold text-sm
                  transition-colors duration-200 shadow-lg shadow-blue-900/40">
                <FaWhatsapp className="text-green-300 text-base" />
                WhatsApp Now
              </a>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2
                  bg-white/10 hover:bg-white/15 active:bg-white/20
                  border border-white/15 text-white px-6 py-3
                  rounded-xl font-bold text-sm transition-colors duration-200">
                Get Free Quote
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedIdx > -1 && (
        <Lightbox
          projects={visible}
          index={selectedIdx}
          onClose={closeViewer}
          onNext={showNext}
          onPrev={showPrev}
        />
      )}
    </main>
  );
}