'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FaClock, FaSearch, FaTimes } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

/* ─────────────── FEATURED (newest post) ─────────────── */
function FeaturedPost({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group col-span-full flex flex-col overflow-hidden border
        border-gray-200 bg-white transition-colors duration-300
        hover:border-blue-300 lg:flex-row"
    >
      <div className="relative w-full shrink-0 overflow-hidden bg-slate-200
        lg:w-[52%]">
        <div className="relative aspect-[16/9] w-full lg:aspect-auto lg:h-full
          lg:min-h-[320px]">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width:1024px) 100vw, 52vw"
              className="object-cover transition-transform duration-700
                group-hover:scale-[1.04]"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center
              bg-slate-900">
              <span className="select-none text-[7rem] font-semibold leading-none
                text-white/10">
                {post.title[0]}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40
            to-transparent" />
          <span className="absolute left-4 top-4 bg-blue-600 px-3 py-1.5
            text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
            Latest
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center p-7 lg:p-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em]
            text-blue-600">
            {post.category}
          </span>
          {post.date && (
            <span className="text-[12px] text-slate-400">{fmtDate(post.date)}</span>
          )}
          <span className="inline-flex items-center gap-1.5 text-[12px] text-slate-400">
            <FaClock className="text-[9px]" />
            {post.readingTime}
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-semibold leading-[1.15] tracking-[-0.02em]
          text-slate-900 transition-colors duration-200 group-hover:text-blue-700
          sm:text-3xl">
          {post.title}
        </h2>

        {post.description && (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
            {post.description}
          </p>
        )}

        <span className="mt-7 inline-flex items-center gap-2 border-t border-gray-200
          pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-600">
          Read the guide
          <HiArrowUpRight className="text-xs transition-transform duration-200
            group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

/* ─────────────── GRID CARD ─────────────── */
function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white transition-colors duration-300
        hover:bg-slate-50"
    >
      <div className="relative overflow-hidden bg-slate-200">
        <div className="relative aspect-[16/10] w-full">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700
                group-hover:scale-[1.05]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center
              bg-slate-900">
              <span className="select-none text-6xl font-semibold text-white/10">
                {post.title[0]}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em]
            text-blue-600">
            {post.category}
          </span>
          <span className="text-[11px] text-slate-400">{fmtDate(post.date)}</span>
        </div>

        <h3 className="mt-3.5 text-[16px] font-semibold leading-snug text-slate-900
          transition-colors duration-200 group-hover:text-blue-700">
          {post.title}
        </h3>

        {post.description && (
          <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-600">
            {post.description}
          </p>
        )}

        <span className="mt-5 flex items-center justify-between border-t
          border-gray-200 pt-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
            <FaClock className="text-[9px]" />
            {post.readingTime}
          </span>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold
            uppercase tracking-[0.14em] text-blue-600">
            Read
            <HiArrowUpRight className="text-[10px] transition-transform duration-200
              group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </Link>
  );
}

/* ─────────────── MAIN ─────────────── */
export default function BlogList({ posts }) {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );

  /* Article pages link here as /blog?category=Railings — honour that
     so the link actually lands on a filtered list. */
  const params = useSearchParams();
  const requested = params.get('category');
  const initialCategory =
    requested && categories.includes(requested) ? requested : 'All';

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let out =
      category === 'All' ? posts : posts.filter((p) => p.category === category);
    const q = search.trim().toLowerCase();
    if (q) {
      out = out.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return out;
  }, [posts, category, search]);

  const hasFilters = category !== 'All' || search.trim() !== '';
  const clearFilters = () => {
    setCategory('All');
    setSearch('');
  };

  /* Only feature the newest post on an unfiltered listing — once the
     reader has filtered, every result deserves equal weight. */
  const showFeatured = !hasFilters && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  return (
    <>
      {/* ══════════ FILTER BAR ══════════ */}
      <section className="sticky top-[68px] z-30 border-b border-gray-200
        bg-white/95 backdrop-blur-md lg:top-[76px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
            <div
              className="no-scrollbar flex flex-1 gap-2 overflow-x-auto"
              role="group"
              aria-label="Filter articles by category"
            >
              {categories.map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    aria-pressed={active}
                    className={`shrink-0 rounded-[2px] border px-4 py-2 text-[12px]
                      font-semibold uppercase tracking-[0.1em] transition-colors
                      duration-150
                      ${active
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64">
              <FaSearch className="pointer-events-none absolute left-3.5 top-1/2
                -translate-y-1/2 text-[11px] text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guides…"
                aria-label="Search articles"
                className="w-full rounded-[2px] border border-gray-200 bg-white
                  py-2.5 pl-9 pr-9 text-[13px] text-slate-900 placeholder-slate-400
                  transition-colors duration-150 focus:border-blue-600
                  focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
                    transition-colors duration-150 hover:text-slate-700"
                >
                  <FaTimes className="text-[11px]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ RESULTS ══════════ */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-[12px] uppercase tracking-[0.14em] text-slate-400">
            {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            {hasFilters && category !== 'All' && ` in ${category}`}
          </p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center border
              border-gray-200 bg-white px-8 py-20 text-center">
              <p className="text-lg font-semibold text-slate-900">
                No articles found
              </p>
              <p className="mt-2 max-w-xs text-[14px] text-slate-500">
                Try a different keyword, or browse every category.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-[2px]
                  bg-blue-600 px-6 py-3 text-[11px] font-semibold uppercase
                  tracking-[0.14em] text-white transition-colors duration-200
                  hover:bg-blue-700"
              >
                <FaTimes className="text-[10px]" />
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {featured && <FeaturedPost post={featured} />}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-px border border-gray-200
                  bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
