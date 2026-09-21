import { Suspense } from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { getAllPosts } from '@/lib/blog';
import { TOP_SERVICES } from '@/data/services';
import {
  BUSINESS,
  SITE_URL,
  buildMetadata,
  breadcrumbSchema,
  jsonLd,
} from '@/lib/seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import BlogList from '@/components/blog/BlogList';
import CtaBand from '@/components/seo/CtaBand';

export const metadata = buildMetadata({
  title: 'Steel Fabrication Guides for Mumbai & Thane | RN All Steel',
  description:
    'Practical guides on railings, gates, grills and metalwork — material choices, design comparisons, pricing factors and maintenance, written by our workshop team.',
  path: '/blog',
  keywords: [
    'steel fabrication blog',
    'SS railing guide Mumbai',
    'window grill types',
    'main gate design guide',
    'steel maintenance tips',
  ],
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const totalMinutes = posts.reduce((acc, p) => {
    const n = parseInt(p.readingTime, 10);
    return acc + (Number.isNaN(n) ? 0 : n);
  }, 0);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ];

  const schemas = [
    breadcrumbSchema(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#blog`,
      name: 'RN All Steel Fabrication — Guides',
      description:
        'Guides on steel railings, gates, grills and fabrication for homeowners and contractors in Mumbai and Thane.',
      url: `${SITE_URL}/blog`,
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#business`,
        name: BUSINESS.name,
      },
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.date,
        author: { '@type': 'Organization', name: BUSINESS.name },
      })),
    },
  ];

  const STATS = [
    { v: String(posts.length), k: 'Guides published' },
    { v: String(categories.length), k: 'Topic categories' },
    { v: `${totalMinutes}`, k: 'Minutes of reading' },
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      ))}

      {/* ══════════ HERO ══════════ */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />

          <div className="grid grid-cols-1 items-end gap-10 pb-14 lg:grid-cols-12 lg:pb-16">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-600">
                <span className="h-px w-8 bg-blue-600" />
                Knowledge base
              </p>
              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.12]
                tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.9rem]">
                Steel fabrication{' '}
                <span className="text-blue-600">guides</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-slate-600
                sm:text-base">
                Straight answers on materials, designs, costs and maintenance —
                written by the people who fabricate this work every day, for
                homeowners and contractors across Mumbai and Thane.
              </p>
            </div>

            <div className="lg:col-span-4">
              <dl className="grid grid-cols-3 border-t border-gray-200 lg:border-t-0">
                {STATS.map((s) => (
                  <div key={s.k} className="border-b border-gray-200 py-4 lg:border-b-0">
                    <dd className="text-2xl font-semibold tabular-nums text-slate-900">
                      {s.v}
                    </dd>
                    <dt className="mt-1 text-[10px] font-semibold uppercase
                      tracking-[0.14em] text-slate-400">
                      {s.k}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Suspense is required: BlogList reads ?category= via
          useSearchParams, and this page is statically rendered. */}
      <Suspense
        fallback={
          <div className="bg-slate-50 py-20 text-center text-[13px] text-slate-400">
            Loading guides…
          </div>
        }
      >
        <BlogList posts={posts} />
      </Suspense>

      {/* ══════════ SERVICES CROSS-LINK ══════════ */}
      <section className="border-t border-gray-200 bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold
            uppercase tracking-[0.24em] text-blue-600">
            <span className="h-px w-8 bg-blue-600" />
            Ready to build?
          </p>
          <h2 className="mt-6 text-2xl font-semibold tracking-[-0.02em]
            text-slate-900 sm:text-3xl">
            Reading up on a project?
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            The guides explain the choices. When you are ready for numbers, these are
            the services behind them.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {TOP_SERVICES.map((s) => (
              <li key={s.slug} className="border-b border-gray-200">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block text-[14.5px] font-semibold text-slate-900
                      transition-colors duration-200 group-hover:text-blue-700">
                      {s.short}
                    </span>
                    <span className="mt-1 block text-[12.5px] text-slate-500">
                      {s.tagline}
                    </span>
                  </span>
                  <FaArrowRight className="shrink-0 text-[10px] text-slate-300
                    transition-all duration-200 group-hover:translate-x-1
                    group-hover:text-blue-600" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Still not sure which option suits you?"
        subtitle="Send us your measurements and a reference photo — we will tell you honestly what works and what it costs."
      />
    </>
  );
}
