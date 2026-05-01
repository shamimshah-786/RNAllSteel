'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaClock, FaTag, FaSearch, FaTimes } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const CATEGORY_CONFIG = {
  Railings:        { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  'Main Gates':    { color: 'bg-blue-50 text-blue-700 border-blue-200',           dot: 'bg-blue-500' },
  'Window Grills': { color: 'bg-violet-50 text-violet-700 border-violet-200',     dot: 'bg-violet-500' },
  'Tips & Care':   { color: 'bg-amber-50 text-amber-700 border-amber-200',        dot: 'bg-amber-500' },
  General:         { color: 'bg-gray-100 text-gray-600 border-gray-200',          dot: 'bg-gray-400' },
};

const getCatStyle = (cat) => CATEGORY_CONFIG[cat] ?? CATEGORY_CONFIG['General'];

/* ─────────────────────────────────────────────
   Category Badge
───────────────────────────────────────────── */
function CategoryBadge({ category, size = 'sm' }) {
  const { color } = getCatStyle(category);
  const sizeClass = size === 'xs'
    ? 'text-[9px] px-2 py-1 tracking-[0.18em]'
    : 'text-[10px] px-2.5 py-1 tracking-[0.2em]';
  return (
    <span className={`inline-block font-black uppercase rounded-full border
      ${color} ${sizeClass}`}>
      {category}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Featured Post Card
───────────────────────────────────────────── */
function FeaturedCard({ post }) {
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null;

  return (
    <Link href={`/blog/${post.slug}`}
      className="group col-span-full relative bg-white border border-gray-100
        rounded-3xl overflow-hidden shadow-sm
        hover:shadow-xl hover:border-blue-100
        transition-all duration-500 flex flex-col lg:flex-row">

      {/* Image side */}
      <div className="relative w-full lg:w-[55%] flex-shrink-0
        aspect-[16/9] lg:aspect-auto lg:min-h-[340px] bg-gray-100 overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage} alt={post.title} fill
            sizes="(max-width:1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-700
              group-hover:scale-[1.04]" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-700 to-blue-900
            flex items-center justify-center">
            <span className="text-white/10 text-[9rem] font-black select-none leading-none">
              {post.title[0]}
            </span>
          </div>
        )}
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t
          from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r
          from-transparent to-black/10 lg:to-white/5" />

        {/* Featured badge */}
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center gap-1.5
            bg-blue-600 text-white text-[10px] font-black uppercase
            tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg shadow-blue-900/30">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Featured
          </span>
        </div>
      </div>

      {/* Content side */}
      <div className="flex flex-col justify-center p-7 lg:p-10 xl:p-12 flex-1">
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <CategoryBadge category={post.category} />
          {dateStr && (
            <span className="text-xs text-gray-400 font-medium">{dateStr}</span>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <FaClock className="text-[9px]" />
            {post.readingTime}
          </span>
        </div>

        <h2 className="text-2xl sm:text-[1.75rem] lg:text-[2rem] font-black
          text-gray-950 leading-[1.1] tracking-tight mb-4
          group-hover:text-blue-700 transition-colors duration-300">
          {post.title}
        </h2>

        {post.description && (
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed
            mb-6 line-clamp-3 max-w-lg">
            {post.description}
          </p>
        )}

        {/* Tags preview */}
        {post.tags?.slice(0, 3).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag}
                className="inline-flex items-center gap-1 text-[10px] font-semibold
                  text-gray-400 bg-gray-50 border border-gray-200
                  px-2.5 py-1 rounded-md">
                <FaTag className="text-[7px] opacity-60" />{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm
          group-hover:gap-3 transition-all duration-300">
          Read Full Article
          <HiArrowUpRight className="text-base
            group-hover:translate-x-0.5 group-hover:-translate-y-0.5
            transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Regular Post Card
───────────────────────────────────────────── */
function PostCard({ post }) {
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    : null;
  const { dot } = getCatStyle(post.category);

  return (
    <Link href={`/blog/${post.slug}`}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden
        shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1
        transition-all duration-300 flex flex-col">

      {/* Cover */}
      <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden flex-shrink-0">
        {post.coverImage ? (
          <Image
            src={post.coverImage} alt={post.title} fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700
              group-hover:scale-[1.06]"
            loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-950
            flex items-center justify-center">
            <span className="text-white/10 text-8xl font-black select-none">
              {post.title[0]}
            </span>
          </div>
        )}
        {/* Category dot overlay on image */}
        <div className="absolute bottom-3 left-3">
          <span className={`inline-flex items-center gap-1.5
            bg-white/90 backdrop-blur-sm border border-white/60
            text-[9px] font-black uppercase tracking-[0.18em]
            text-gray-700 px-2.5 py-1 rounded-full shadow-sm`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
            {post.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Date + reading time */}
        <div className="flex items-center justify-between mb-3">
          {dateStr && (
            <span className="text-[11px] text-gray-400 font-medium">{dateStr}</span>
          )}
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 ml-auto">
            <FaClock className="text-[9px]" />{post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[0.95rem] font-bold text-gray-900 leading-snug mb-2.5
          group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
          {post.title}
        </h2>

        {/* Description */}
        {post.description && (
          <p className="text-[0.8125rem] text-gray-500 leading-relaxed
            line-clamp-2 mb-4">
            {post.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3.5
          border-t border-gray-100/80">
          {post.tags?.[0] && (
            <span className="inline-flex items-center gap-1 text-[10px]
              font-semibold text-gray-400">
              <FaTag className="text-[8px] opacity-50" />
              {post.tags[0]}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1
            text-blue-600 font-bold text-[11px]
            group-hover:gap-1.5 transition-all duration-200">
            Read
            <HiArrowUpRight className="text-xs
              group-hover:translate-x-0.5 group-hover:-translate-y-0.5
              transition-transform duration-200" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Stats Bar
───────────────────────────────────────────── */
function StatsBar({ posts }) {
  const cats  = new Set(posts.map((p) => p.category)).size;
  const total = posts.length;
  const mins  = posts.reduce((acc, p) => {
    const n = parseInt(p.readingTime);
    return acc + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-gray-100">
      {[
        { value: `${total}+`, label: 'Expert Articles' },
        { value: `${cats}`,   label: 'Topic Categories' },
        { value: `${mins}+`,  label: 'Minutes of Reading' },
      ].map(({ value, label }) => (
        <div key={label}>
          <p className="text-2xl font-black text-gray-900 leading-none">{value}</p>
          <p className="text-[11px] text-gray-400 font-semibold mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Empty State
───────────────────────────────────────────── */
function EmptyState({ onClear }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center
      bg-white border border-gray-100 rounded-3xl py-16 px-8 shadow-sm text-center">
      <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-2xl
        flex items-center justify-center mb-5">
        <span className="text-3xl">🔍</span>
      </div>
      <p className="font-black text-gray-900 text-lg mb-1">No articles found</p>
      <p className="text-sm text-gray-500 max-w-xs mb-5">
        Try a different keyword or browse all categories.
      </p>
      <button onClick={onClear}
        className="inline-flex items-center gap-2 text-sm font-bold
          text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5
          rounded-xl transition-colors duration-200">
        <FaTimes className="text-xs" />
        Clear Filters
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Client Component
───────────────────────────────────────────── */
export default function BlogListingClient({ posts }) {
  const [category, setCategory] = useState('All');
  const [search,   setSearch]   = useState('');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );

  const filtered = useMemo(() => {
    let out = category === 'All'
      ? posts
      : posts.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return out;
  }, [posts, category, search]);

  const [featured, ...rest] = filtered;
  const hasFilters = category !== 'All' || search.trim() !== '';
  const clearFilters = () => { setCategory('All'); setSearch(''); };

  return (
    <main className="bg-[#f8f8f6] min-h-screen">

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
              <span className="text-[10px] font-black text-blue-600 uppercase
                tracking-[0.25em]">
                Knowledge Base
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-[2.25rem] sm:text-5xl font-black text-gray-950
              leading-[1.06] tracking-tight mb-5">
              Steel Fabrication
              <br />
              <span className="text-blue-600">Tips &amp; Guides</span>
            </h1>

            <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl">
              Expert advice on railings, gates, grills and metalwork — written for
              Mumbai &amp; Thane homeowners and contractors by our 15-year team.
            </p>

            {/* Stats */}
            <StatsBar posts={posts} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FILTER + SEARCH BAR
      ═══════════════════════════════════════ */}
      <section className="sticky top-0 z-30 bg-[#f8f8f6]/90
        backdrop-blur-sm border-b border-gray-200/60 py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

            {/* Category filters */}
            <div className="flex flex-wrap gap-1.5 flex-1" role="group"
              aria-label="Filter by category">
              {categories.map((c) => {
                const isActive = category === c;
                const cfg = c !== 'All' ? getCatStyle(c) : null;
                return (
                  <button key={c} onClick={() => setCategory(c)}
                    aria-pressed={isActive}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold
                      uppercase tracking-wider transition-all duration-200
                      ${isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200/60 scale-[1.02]'
                        : cfg
                          ? `${cfg.color} hover:shadow-sm`
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>
                    {c === 'All'
                      ? `All · ${posts.length}`
                      : `${c}`}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0 sm:w-60 w-full">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2
                text-gray-400 text-[11px] pointer-events-none" />
              <input
                type="search" value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guides…"
                aria-label="Search blog posts"
                className="w-full bg-white border border-gray-200 rounded-xl
                  pl-9 pr-9 py-2 text-sm placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent focus:bg-white
                  transition-all duration-150 shadow-sm" />
              {search && (
                <button onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-gray-400 hover:text-gray-600 transition-colors duration-150">
                  <FaTimes className="text-[11px]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          POSTS GRID
      ═══════════════════════════════════════ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-20">

        {/* Active filter indicator */}
        {hasFilters && (
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs text-gray-500 font-semibold">
              Showing{' '}
              <span className="font-black text-gray-900">{filtered.length}</span>
              {' '}of{' '}
              <span className="font-black text-gray-900">{posts.length}</span>
              {' '}articles
              {category !== 'All' && (
                <> in <span className="text-blue-600">{category}</span></>
              )}
              {search && (
                <> for "<span className="text-blue-600">{search}</span>"</>
              )}
            </p>
            <button onClick={clearFilters}
              className="text-xs font-bold text-gray-500 hover:text-blue-600
                transition-colors duration-150 inline-flex items-center gap-1.5">
              <FaTimes className="text-[9px]" />
              Clear all
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="grid grid-cols-1">
            <EmptyState onClear={clearFilters} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Featured post — full width */}
            {featured && <FeaturedCard post={featured} />}

            {/* Regular cards */}
            {rest.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        )}

        {/* Bottom count — only when no active filters */}
        {!hasFilters && filtered.length > 0 && (
          <p className="text-center text-[11px] text-gray-400 font-semibold mt-10 tabular-nums">
            {filtered.length} articles published — more coming soon
          </p>
        )}
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA STRIP
      ═══════════════════════════════════════ */}
      <section className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6
            max-w-4xl mx-auto">
            <div>
              <p className="font-black text-gray-900 text-lg leading-tight mb-1">
                Have a project in mind?
              </p>
              <p className="text-sm text-gray-500">
                Free site visit across Mumbai &amp; Thane — no obligation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
              <a href="https://wa.me/919665181246" target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2
                  bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5
                  rounded-xl font-bold text-sm transition-colors duration-200
                  shadow-sm shadow-blue-200">
                WhatsApp Us
              </a>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2
                  bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5
                  rounded-xl font-bold text-sm transition-colors duration-200">
                Get Free Quote
                <HiArrowUpRight className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}