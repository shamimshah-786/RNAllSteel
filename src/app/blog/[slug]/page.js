// src/app/blog/[slug]/page.js
import { getAllPosts, getPostBySlug, getRawPostSource, extractHeadings } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link          from 'next/link';
import Image         from 'next/image';
import {
  FaClock, FaArrowLeft, FaWhatsapp,
  FaPhone, FaCalendarAlt, FaTag, FaUser, FaChevronRight,
} from 'react-icons/fa';
import { HiArrowUpRight, HiShare } from 'react-icons/hi2';
import '@/styles/blog-content.css';
import TableOfContents from '@/components/blog/TableOfContents';
import Callout         from '@/components/blog/Callout';  // ← moved to own file

/* ─────────────────────────────────────────────
   MDX Components map
   ⚠️  Every value MUST be a React component function/class.
       Never put a plain object or imported namespace here.
───────────────────────────────────────────── */
const MDX_COMPONENTS = {
  // Custom MDX components
  Callout,

  // Override default HTML elements
  img: ({ src, alt, width, height, ...props }) => (
    <span className="my-6 block overflow-hidden rounded-[3px]">
      {/* Plain <img> on purpose: MDX authors write markdown images with no
          dimensions, which next/image requires. eslint-disable-next-line
          @next/next/no-img-element */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ''}
        width={width}
        height={height}
        loading="lazy"
        className="w-full h-auto"
        {...props}
      />
    </span>
  ),

  a: ({ href, children, ...props }) => (
    <Link
      href={href ?? '#'}
      className="text-blue-600 hover:text-blue-700 underline
        underline-offset-2 font-medium transition-colors duration-150"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </Link>
  ),

  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-gray-200">
      <table className="min-w-full" {...props}>{children}</table>
    </div>
  ),
  th: (props) => (
    <th className="px-4 py-2.5 bg-gray-50 text-left text-[11px] font-bold
      text-gray-600 uppercase tracking-wider border-b border-gray-200"
      {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100"
      {...props} />
  ),
};

/* ─────────────────────────────────────────────
   Static Params
───────────────────────────────────────────── */
export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

/* ─────────────────────────────────────────────
   SEO Metadata
───────────────────────────────────────────── */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | RN All Steel Blog',
      description: 'The requested article could not be found.',
      robots: { index: false, follow: false },
    };
  }

  const url = `https://rnallsteelfabrication.com/blog/${slug}`;
  const ogImage = post.coverImage
    ? [
        {
          url: `https://rnallsteelfabrication.com${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ]
    : [
        {
          url: 'https://rnallsteelfabrication.com/og-default.webp',
          width: 1200,
          height: 630,
          alt: 'RN All Steel Fabrication Blog',
        },
      ];

  const keywordList = [
    post.category,
    ...(post.tags || []),
    'steel fabrication blog',
    'steel fabrication Mumbai',
    'steel fabrication Thane',
  ].filter(Boolean);

  return {
    title: post.title,
    description: post.description,
    keywords: keywordList,
    authors: [{ name: post.author || 'RN All Steel Fabrication' }],
    creator: 'RN All Steel Fabrication',
    publisher: 'RN All Steel Fabrication',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      siteName: 'RN All Steel Fabrication',
      locale: 'en_IN',
      images: ogImage,
      publishedTime: post.date || undefined,
      modifiedTime: post.updatedDate || post.date || undefined,
      authors: [post.author || 'RN All Steel Fabrication'],
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ogImage.map((i) => i.url),
    },
  };
}

/* ─────────────────────────────────────────────
   JSON-LD Schema
───────────────────────────────────────────── */
function ArticleSchema({ post, slug }) {
  const base = 'https://rnallsteelfabrication.com';
  const url = `${base}/blog/${slug}`;

  const wordCount = post.content
    ? post.content.replace(/[#_*`>\-\n]/g, ' ').split(/\s+/).filter(Boolean).length
    : undefined;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      headline: post.title,
      description: post.description,
      ...(post.coverImage && {
        image: {
          '@type': 'ImageObject',
          url: `${base}${post.coverImage}`,
        },
      }),
      datePublished: post.date || undefined,
      dateModified: post.updatedDate || post.date || undefined,
      author: {
        '@type': 'Organization',
        name: post.author || 'RN All Steel Fabrication',
        url: base,
      },
      publisher: {
        '@type': 'Organization',
        name: 'RN All Steel Fabrication',
        url: base,
        logo: {
          '@type': 'ImageObject',
          url: `${base}/images/logo.jpg`,
        },
      },
      articleSection: post.category || 'Steel Fabrication',
      keywords: post.tags?.join(', '),
      inLanguage: 'en-IN',
      wordCount,
      isPartOf: {
        '@type': 'Blog',
        '@id': `${base}/blog#blog`,
        name: 'RN All Steel Fabrication Blog',
        url: `${base}/blog`,
      },
      about: [
        { '@type': 'Thing', name: 'Steel Fabrication' },
        { '@type': 'Place', name: 'Mumbai' },
        { '@type': 'Place', name: 'Thane' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: base },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${base}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
    ...(post.faq?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faq.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   Sub-components (unchanged — kept as-is)
───────────────────────────────────────────── */
function Breadcrumb({ category, title }) {
  return (
    <nav aria-label="Breadcrumb" className="py-5">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]
        font-medium uppercase tracking-[0.12em] text-slate-400">
        {[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { href: `/blog?category=${encodeURIComponent(category)}`, label: category },
        ].map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <Link href={crumb.href}
              className="transition-colors duration-150 hover:text-blue-600">
              {crumb.label}
            </Link>
            <FaChevronRight className="text-[7px] text-slate-300" />
          </li>
        ))}
        <li>
          <span aria-current="page" className="line-clamp-1 max-w-[220px] text-slate-700">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function MetaPill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12.5px] text-slate-500">
      {Icon && <Icon className="text-[10px] text-blue-600" />}
      {children}
    </span>
  );
}

function SidebarLabel({ children }) {
  return (
    <p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold
      uppercase tracking-[0.2em] text-slate-400">
      <span className="inline-block h-px w-4 bg-blue-600" />
      {children}
    </p>
  );
}

function SidebarCard({ children, className = '' }) {
  return (
    <div className={`border border-gray-200 bg-white ${className}`}>
      {children}
    </div>
  );
}

function RelatedPostCard({ post }) {
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;
  return (
    <Link href={`/blog/${post.slug}`}
      className="group -mx-2 flex gap-3.5 px-2 py-3 transition-colors duration-150
        hover:bg-slate-50">
      {post.coverImage ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[2px]
          bg-slate-200">
          <Image src={post.coverImage} alt="" fill sizes="56px"
            className="object-cover transition-transform duration-300
              group-hover:scale-105" />
        </div>
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center
          rounded-[2px] bg-slate-100 text-[10px] font-semibold uppercase
          tracking-[0.1em] text-slate-400">
          {post.category?.slice(0, 3)}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[13px] font-semibold leading-snug
          text-slate-800 transition-colors duration-150 group-hover:text-blue-700">
          {post.title}
        </p>
        {dateStr && <p className="mt-1 text-[11px] text-slate-400">{dateStr}</p>}
      </div>
    </Link>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-white px-4 py-20">
      <div className="w-full max-w-md border border-gray-200 bg-white p-10 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">
          404
        </p>
        <p className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-slate-900">
          Article not found
        </p>
        <p className="mx-auto mt-3 max-w-xs text-[14px] leading-relaxed text-slate-500">
          This guide may have been moved or renamed. Browse all our steel
          fabrication guides instead.
        </p>
        <Link href="/blog"
          className="mt-7 inline-flex items-center gap-2.5 rounded-[2px] bg-blue-600
            px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em]
            text-white transition-colors duration-200 hover:bg-blue-700">
          <FaArrowLeft className="text-[10px]" /> Back to blog
        </Link>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────
   PAGE  (main export)
───────────────────────────────────────────── */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  // metadata + extractHeadings ke liye
  const post = getPostBySlug(slug);
  if (!post) return <NotFound />;

  // MDXRemote ke liye full raw source (frontmatter included — MDXRemote strips it)
  const rawSource = getRawPostSource(slug);  // ← THE FIX

  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null;

  const headings     = extractHeadings(post.content);
  const allPosts     = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const postUrl   = `https://rnallsteelfabrication.com/blog/${slug}`;
  const shareText = encodeURIComponent(`${post.title} — ${postUrl}`);

  return (
    <main className="min-h-screen bg-slate-50">
      <ArticleSchema post={post} slug={slug} />

      {/* ═══ HERO ═══ */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb category={post.category} title={post.title} />

          <div className="max-w-3xl pb-12 sm:pb-14">
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-600 transition-colors
                duration-150 hover:text-blue-700"
            >
              <span className="h-px w-8 bg-blue-600" />
              {post.category}
            </Link>

            <h1 className="mt-6 text-[1.9rem] font-semibold leading-[1.14]
              tracking-[-0.025em] text-slate-900 sm:text-[2.5rem] lg:text-[2.75rem]">
              {post.title}
            </h1>

            {post.description && (
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-slate-600
                sm:text-[17px]">
                {post.description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2
              border-t border-gray-200 pt-6">
              <MetaPill icon={FaUser}>{post.author}</MetaPill>
              {dateStr && (
                <MetaPill icon={FaCalendarAlt}>
                  <time dateTime={post.date ?? undefined}>{dateStr}</time>
                </MetaPill>
              )}
              <MetaPill icon={FaClock}>{post.readingTime}</MetaPill>
            </div>

            {post.tags?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Article tags">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 border border-gray-200
                      bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                  >
                    <FaTag className="text-[8px] text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="w-full border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[15/9] w-full overflow-hidden
              rounded-[3px] bg-slate-200 sm:aspect-[21/9]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width:1280px) 100vw, 1280px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══ 3-COLUMN LAYOUT ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr_288px]
          lg:grid-cols-[1fr_288px] gap-8 xl:gap-10 items-start">

          {/* LEFT SIDEBAR */}
          <aside className="hidden xl:flex flex-col gap-4 sticky top-24"
            aria-label="Article navigation">
            {headings.length > 2 && (
              <SidebarCard>
                <div className="px-5 pt-5 pb-2"><SidebarLabel>On This Page</SidebarLabel></div>
                <div className="px-3 pb-4"><TableOfContents headings={headings} /></div>
              </SidebarCard>
            )}
            <SidebarCard>
              <div className="p-5">
                <SidebarLabel>Article Info</SidebarLabel>
                <div className="space-y-3.5">
                  {[
                    { icon: FaCalendarAlt, label: 'Published', value: dateStr },
                    { icon: FaClock,       label: 'Read Time', value: post.readingTime },
                    { icon: FaTag,         label: 'Category',  value: post.category },
                    { icon: FaUser,        label: 'Author',    value: post.author },
                  ].filter((r) => r.value).map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-gray-50 border border-gray-200/80
                        rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="text-[10px] text-gray-400" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
                        <p className="text-xs font-semibold text-gray-700">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SidebarCard>
            <SidebarCard>
              <div className="p-5">
                <SidebarLabel>Share Article</SidebarLabel>
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/?text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 border border-gray-200 px-3.5
                      py-2.5 transition-colors duration-150 hover:border-emerald-500"
                  >
                    <FaWhatsapp className="shrink-0 text-sm text-emerald-500" />
                    <span className="text-[12px] font-semibold text-slate-700">
                      WhatsApp
                    </span>
                  </a>
                  {[
                    {
                      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`,
                      label: 'Twitter / X',
                    },
                    {
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
                      label: 'Facebook',
                    },
                  ].map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 border border-gray-200 px-3.5
                        py-2.5 transition-colors duration-150 hover:border-blue-600"
                    >
                      <HiShare className="shrink-0 text-sm text-blue-600" />
                      <span className="text-[12px] font-semibold text-slate-700">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </SidebarCard>
          </aside>

          {/* MAIN ARTICLE */}
          <article itemScope itemType="https://schema.org/Article" className="min-w-0">

            {/* Mobile TOC */}
            {headings.length > 2 && (
              <details className="group mb-8 border border-gray-200 bg-white p-5 xl:hidden">
                <summary className="flex cursor-pointer select-none items-center
                  justify-between text-[11px] font-semibold uppercase
                  tracking-[0.2em] text-slate-500 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2.5">
                    <span className="inline-block h-px w-4 bg-blue-600" />
                    On this page
                  </span>
                  <span className="text-base leading-none text-slate-400
                    transition-transform duration-200 group-open:rotate-180">▾</span>
                </summary>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <TableOfContents headings={headings} mobile />
                </div>
              </details>
            )}

            {/* ── MDX Content — uses rawSource, NOT post.content ── */}
            <div className="border border-gray-200 bg-white px-6 py-8 sm:px-8
              sm:py-10 lg:px-10">
              <div className="blog-content" itemProp="articleBody">
                <MDXRemote
                  source={rawSource}
                  components={MDX_COMPONENTS}
                  options={{ parseFrontmatter: true }}
                />
              </div>
            </div>

            {/* Tags footer */}
            {post.tags?.length > 0 && (
              <div className="mt-6 border border-gray-200 bg-white px-6 py-5">
                <p className="mb-3.5 flex items-center gap-2.5 text-[10px]
                  font-semibold uppercase tracking-[0.2em] text-slate-400">
                  <span className="inline-block h-px w-4 bg-blue-600" />
                  Tagged
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?search=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1.5 border border-gray-200
                        bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600
                        transition-colors duration-150 hover:border-blue-600
                        hover:text-blue-700"
                    >
                      <FaTag className="text-[8px] text-slate-400" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author strip */}
            <div className="mt-6 border border-gray-200 bg-white px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-[2px] bg-blue-600">
                  <span className="text-[13px] font-semibold tracking-tight text-white">
                    RN
                  </span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-slate-900" itemProp="author">
                    {post.author}
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-slate-500">
                    Steel fabricators — Mumbai &amp; Thane since 2010
                  </p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <a
                    href="https://wa.me/919665181246"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-200
                      px-4 py-2.5 text-[11px] font-semibold uppercase
                      tracking-[0.12em] text-slate-700 transition-colors duration-150
                      hover:border-emerald-500 hover:text-emerald-700"
                  >
                    <FaWhatsapp className="text-sm text-emerald-500" /> Ask a question
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 bg-slate-950 p-7 xl:hidden">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]
                text-blue-400">
                Free quote
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug text-white">
                Need steel work done?
              </p>
              <p className="mt-2 text-[13px] text-slate-400">
                Free site visit across Mumbai &amp; Thane. No obligation.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href="https://wa.me/919665181246"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2.5
                    rounded-[2px] bg-blue-600 px-4 py-3.5 text-[11px] font-semibold
                    uppercase tracking-[0.14em] text-white transition-colors
                    duration-200 hover:bg-blue-700"
                >
                  <FaWhatsapp className="text-sm" /> WhatsApp now
                </a>
                <a
                  href="tel:+919665181246"
                  className="inline-flex flex-1 items-center justify-center gap-2.5
                    rounded-[2px] border border-white/20 px-4 py-3.5 text-[11px]
                    font-semibold uppercase tracking-[0.14em] text-white
                    transition-colors duration-200 hover:border-white/50"
                >
                  <FaPhone className="text-[10px]" /> Call now
                </a>
              </div>
            </div>

            {/* Related — mobile */}
            {relatedPosts.length > 0 && (
              <div className="mt-6 border border-gray-200 bg-white p-6 xl:hidden">
                <p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold
                  uppercase tracking-[0.2em] text-slate-400">
                  <span className="inline-block h-px w-4 bg-blue-600" />
                  Related articles
                </p>
                <div className="divide-y divide-gray-200">
                  {relatedPosts.map((p) => <RelatedPostCard key={p.slug} post={p} />)}
                </div>
              </div>
            )}
          </article>

          {/* RIGHT SIDEBAR — (same as original, no changes needed) */}
          <aside className="hidden lg:flex flex-col gap-4 sticky top-24" aria-label="Page sidebar">
            {headings.length > 2 && (
              <SidebarCard className="xl:hidden">
                <div className="px-5 pt-5 pb-2"><SidebarLabel>On This Page</SidebarLabel></div>
                <div className="px-3 pb-4"><TableOfContents headings={headings} /></div>
              </SidebarCard>
            )}
            <div className="bg-slate-950 p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]
                text-blue-400">
                Free quote
              </p>
              <h2 className="mt-3 text-[1.05rem] font-semibold leading-snug text-white">
                Need steel work done?
              </h2>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate-400">
                Free site visit across Mumbai &amp; Thane — no obligation, just
                honest advice.
              </p>
              <div className="mt-6 space-y-2">
                <a
                  href="https://wa.me/919665181246"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5
                    rounded-[2px] bg-blue-600 px-4 py-3 text-[11px] font-semibold
                    uppercase tracking-[0.14em] text-white transition-colors
                    duration-200 hover:bg-blue-700"
                >
                  <FaWhatsapp className="text-sm" /> WhatsApp now
                </a>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2
                    rounded-[2px] border border-white/20 px-4 py-3 text-[11px]
                    font-semibold uppercase tracking-[0.14em] text-white
                    transition-colors duration-200 hover:border-white/50"
                >
                  Get free quote
                </Link>
                <a
                  href="tel:+919665181246"
                  className="inline-flex w-full items-center justify-center gap-2 pt-2
                    text-[11px] font-semibold text-slate-400 transition-colors
                    duration-150 hover:text-white"
                >
                  <FaPhone className="text-[9px]" /> +91 96651 81246
                </a>
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <SidebarCard>
                <div className="p-5">
                  <SidebarLabel>Related articles</SidebarLabel>
                  <div className="divide-y divide-gray-200">
                    {relatedPosts.map((p) => <RelatedPostCard key={p.slug} post={p} />)}
                  </div>
                  <Link
                    href="/blog"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2
                      border border-gray-200 px-4 py-3 text-[11px] font-semibold
                      uppercase tracking-[0.12em] text-blue-600 transition-colors
                      duration-150 hover:border-blue-600"
                  >
                    All articles <HiArrowUpRight className="text-xs" />
                  </Link>
                </div>
              </SidebarCard>
            )}

            <SidebarCard>
              <div className="p-5">
                <SidebarLabel>Explore more</SidebarLabel>
                <nav aria-label="Site sections" className="divide-y divide-gray-200">
                  {[
                    { href: '/services', label: 'All services', sub: 'Railings, gates, grills & more' },
                    { href: '/projects', label: 'Project gallery', sub: '500+ completed projects' },
                    { href: '/locations', label: 'Service areas', sub: 'Across Maharashtra' },
                    { href: '/contact', label: 'Get a free quote', sub: 'Free site visit, no obligation' },
                  ].map(({ href, label, sub }) => (
                    <Link
                      key={href}
                      href={href}
                      className="group flex items-center gap-3 py-3 transition-colors
                        duration-150"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-slate-800
                          transition-colors duration-150 group-hover:text-blue-700">
                          {label}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-slate-400">{sub}</p>
                      </div>
                      <HiArrowUpRight className="shrink-0 text-xs text-slate-300
                        transition-colors duration-150 group-hover:text-blue-600" />
                    </Link>
                  ))}
                </nav>
              </div>
            </SidebarCard>

            <SidebarCard>
              <div className="p-5">
                <SidebarLabel>Why choose us</SidebarLabel>
                <ul className="space-y-3">
                  {[
                    '15+ years of experience',
                    'Own workshop in Mumbra, Thane',
                    'SS 304 / MS grade materials',
                    '500+ completed projects',
                    'Free on-site visit & measurement',
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-blue-600" />
                      <span className="text-[12.5px] leading-snug text-slate-700">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SidebarCard>
            <SidebarCard className="xl:hidden">
              <div className="p-5">
                <SidebarLabel>Article Info</SidebarLabel>
                <div className="space-y-3">
                  {[
                    { icon: FaCalendarAlt, label: 'Published', value: dateStr },
                    { icon: FaClock,       label: 'Read Time', value: post.readingTime },
                    { icon: FaTag,         label: 'Category',  value: post.category },
                  ].filter((r) => r.value).map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon className="text-[10px] text-gray-400 flex-shrink-0" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider w-16 flex-shrink-0">{label}</span>
                      <span className="text-xs font-semibold text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SidebarCard>
          </aside>

        </div>
      </section>
    </main>
  );
}