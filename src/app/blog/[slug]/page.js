import { getAllPosts, getPostBySlug, extractHeadings } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaClock, FaArrowLeft, FaWhatsapp,
  FaPhone, FaCalendarAlt, FaTag, FaUser,
} from 'react-icons/fa';
import { HiArrowUpRight, HiShare } from 'react-icons/hi2';
import '@/styles/blog-content.css';
import TableOfContents from '@/components/blog/TableOfContents';

/* ─────────────────────────────────────────────
   MDX Components
───────────────────────────────────────────── */
function Callout({ type = 'info', icon, children }) {
  const styles = {
    info: { wrap: 'bg-blue-50 border-blue-200 text-blue-900',   icon: 'ℹ️' },
    tip:  { wrap: 'bg-emerald-50 border-emerald-200 text-emerald-900', icon: '💡' },
    warn: { wrap: 'bg-amber-50 border-amber-200 text-amber-900', icon: '⚠️' },
  };
  const s = styles[type] ?? styles.info;
  return (
    <div className={`callout ${s.wrap} border rounded-xl p-4 my-6 flex gap-3 text-sm leading-relaxed`}>
      <span className="text-base flex-shrink-0 mt-0.5">{icon ?? s.icon}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

const MDX_COMPONENTS = { Callout };

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
  if (!post) return { title: 'Post Not Found | RN All Steel Blog' };

  const url     = `https://rnallsteelfabrication.com/blog/${slug}`;
  const ogImage = post.coverImage
    ? [{ url: `https://rnallsteelfabrication.com${post.coverImage}`, width: 1200, height: 630, alt: post.title }]
    : [{ url: 'https://rnallsteelfabrication.com/og-default.webp',   width: 1200, height: 630, alt: 'RN All Steel Fabrication' }];

  return {
    title:       `${post.title} | RN All Steel Blog`,
    description: post.description,
    keywords:    post.tags?.join(', '),
    authors:     [{ name: post.author }],
    robots:      { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    alternates:  { canonical: url },
    openGraph: {
      type: 'article', title: post.title, description: post.description,
      url, siteName: 'RN All Steel Fabrication', images: ogImage,
      publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
      authors: [post.author], tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image', title: post.title,
      description: post.description, images: ogImage.map((i) => i.url),
    },
  };
}

/* ─────────────────────────────────────────────
   JSON-LD Schema
───────────────────────────────────────────── */
function ArticleSchema({ post, slug }) {
  const base = 'https://rnallsteelfabrication.com';
  const url  = `${base}/blog/${slug}`;
  const iso  = post.date ? new Date(post.date).toISOString() : undefined;

  const schemas = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: post.title, description: post.description,
      ...(post.coverImage && { image: `${base}${post.coverImage}` }),
      datePublished: iso, dateModified: iso,
      author:    { '@type': 'Organization', name: post.author, url: base },
      publisher: { '@type': 'Organization', name: 'RN All Steel Fabrication', url: base,
                   logo: { '@type': 'ImageObject', url: `${base}/logo.png` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      keywords: post.tags?.join(', '), articleSection: post.category,
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: base },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${base}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
    ...(post.faq?.length ? [{
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: post.faq.map((f) => ({
        '@type': 'Question', name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    }] : []),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function Breadcrumb({ category, title }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400 font-medium mb-8">
        {[
          { href: '/',                                               label: 'Home' },
          { href: '/blog',                                           label: 'Blog' },
          { href: `/blog?category=${encodeURIComponent(category)}`, label: category },
        ].map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-gray-200 select-none">/</span>}
            <Link href={crumb.href}
              className="hover:text-blue-600 transition-colors duration-150">
              {crumb.label}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <span className="text-gray-200 select-none">/</span>
          <span className="text-gray-500 line-clamp-1 max-w-[180px]">{title}</span>
        </li>
      </ol>
    </nav>
  );
}

function MetaPill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium">
      {Icon && <Icon className="text-[10px] text-gray-400" />}
      {children}
    </span>
  );
}

function SidebarLabel({ children }) {
  return (
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.22em] mb-4 flex items-center gap-2">
      <span className="inline-block w-3 h-0.5 bg-blue-500 rounded-full" />
      {children}
    </p>
  );
}

function SidebarCard({ children, className = '' }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden ${className}`}>
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
      className="flex gap-3 p-3 rounded-xl hover:bg-gray-50
        border border-transparent hover:border-gray-200
        transition-all duration-150 group -mx-1">
      {post.coverImage ? (
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <Image src={post.coverImage} alt={post.title} fill
            sizes="56px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      ) : (
        <div className="w-14 h-14 rounded-lg flex-shrink-0 bg-gradient-to-br
          from-blue-100 to-blue-50 flex items-center justify-center">
          <span className="text-blue-400 text-lg">🔩</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-800 group-hover:text-blue-700
          transition-colors duration-150 line-clamp-2 leading-snug mb-1">
          {post.title}
        </p>
        {dateStr && <p className="text-[10px] text-gray-400">{dateStr}</p>}
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   404 Page
───────────────────────────────────────────── */
function NotFound() {
  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="text-center bg-white border border-gray-100 rounded-3xl
        p-12 shadow-sm max-w-sm w-full">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center
          mx-auto mb-5">
          <span className="text-3xl">🔧</span>
        </div>
        <p className="text-5xl font-black text-gray-100 mb-1 leading-none">404</p>
        <p className="font-bold text-gray-900 text-xl mb-2">Article Not Found</p>
        <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
          This article may have been moved or removed. Browse all our steel fabrication guides below.
        </p>
        <Link href="/blog"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
            text-white px-5 py-2.5 rounded-xl font-bold text-sm
            transition-colors duration-200">
          <FaArrowLeft className="text-xs" /> Back to Blog
        </Link>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default async function BlogPostPage({ params }) {
  const { slug }  = await params;
  const post      = getPostBySlug(slug);
  if (!post) return <NotFound />;

  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const headings     = extractHeadings(post.content);
  const allPosts     = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const postUrl = `https://rnallsteelfabrication.com/blog/${slug}`;
  const shareText = encodeURIComponent(`${post.title} — ${postUrl}`);

  /* ── Render ── */
  return (
    <main className="bg-[#f8f8f6] min-h-screen">
      <ArticleSchema post={post} slug={slug} />

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-12 sm:pb-16">
          <Breadcrumb category={post.category} title={post.title} />

          <div className="max-w-3xl">
            {/* Category badge */}
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase
                tracking-[0.22em] px-3 py-1.5 rounded-full mb-5
                bg-blue-600 text-white hover:bg-blue-700
                transition-colors duration-150 shadow-sm shadow-blue-200">
              {post.category}
            </Link>

            {/* H1 */}
            <h1 className="text-2xl sm:text-3xl sm:text-[2.5rem] lg:text-[2.75rem] font-black text-gray-950
              leading-[1.08] tracking-tight mb-5">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mb-6">
                {post.description}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5
              pt-5 border-t border-gray-100">
              <MetaPill icon={FaUser}>{post.author}</MetaPill>
              {dateStr && (
                <MetaPill icon={FaCalendarAlt}>
                  <time dateTime={post.date}>{dateStr}</time>
                </MetaPill>
              )}
              <MetaPill icon={FaClock}>{post.readingTime}</MetaPill>
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2" aria-label="Article tags">
                {post.tags.map((tag) => (
                  <span key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold
                      text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md
                      border border-gray-200/80">
                    <FaTag className="text-[8px] opacity-50" />
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
        <div className="w-full bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-full aspect-[15/9] sm:aspect-[21/9] bg-gray-100 overflow-hidden
              shadow-md border-x border-gray-100">
              <Image src={post.coverImage} alt={post.title} fill
                sizes="(max-width:1280px) 100vw, 1280px"
                className="object-cover" priority />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24
                bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          3-COLUMN LAYOUT
      ═══════════════════════════════════════ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr_288px]
          lg:grid-cols-[1fr_288px] gap-8 xl:gap-10 items-start">

          {/* ═══ LEFT SIDEBAR (xl only) ═══ */}
          <aside className="hidden xl:flex flex-col gap-4 sticky top-24"
            aria-label="Article navigation">

            {/* On This Page */}
            {headings.length > 2 && (
              <SidebarCard>
                <div className="px-5 pt-5 pb-2">
                  <SidebarLabel>On This Page</SidebarLabel>
                </div>
                <div className="px-3 pb-4">
                  <TableOfContents headings={headings} />
                </div>
              </SidebarCard>
            )}

            {/* Article Info */}
            <SidebarCard>
              <div className="p-5">
                <SidebarLabel>Article Info</SidebarLabel>
                <div className="space-y-3.5">
                  {[
                    { icon: FaCalendarAlt, label: 'Published',   value: dateStr },
                    { icon: FaClock,       label: 'Read Time',   value: post.readingTime },
                    { icon: FaTag,         label: 'Category',    value: post.category },
                    { icon: FaUser,        label: 'Author',      value: post.author },
                  ].filter(r => r.value).map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-gray-50 border border-gray-200/80
                        rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="text-[10px] text-gray-400" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase
                          tracking-widest mb-0.5">
                          {label}
                        </p>
                        <p className="text-xs font-semibold text-gray-700">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SidebarCard>

            {/* Share */}
            <SidebarCard>
              <div className="p-5">
                <SidebarLabel>Share Article</SidebarLabel>
                <div className="space-y-2">
                  <a href={`https://wa.me/?text=${shareText}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                      bg-[#e9f7ef] border border-[#c6e8d3] hover:bg-[#d4f1e1]
                      transition-colors duration-150 group">
                    <FaWhatsapp className="text-[#25D366] text-sm flex-shrink-0" />
                    <span className="text-xs font-semibold text-[#1a7a3b]">WhatsApp</span>
                  </a>
                  {[
                    {
                      href:  `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`,
                      label: 'Twitter / X',
                      cls:   'bg-sky-50 border-sky-100 hover:bg-sky-100 text-sky-800',
                    },
                    {
                      href:  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
                      label: 'Facebook',
                      cls:   'bg-blue-50 border-blue-100 hover:bg-blue-100 text-blue-800',
                    },
                  ].map(({ href, label, cls }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                        border transition-colors duration-150 ${cls}`}>
                      <HiShare className="text-sm flex-shrink-0" />
                      <span className="text-xs font-semibold">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </SidebarCard>

          </aside>

          {/* ═══ MAIN ARTICLE ═══ */}
          <article itemScope itemType="https://schema.org/Article"
            className="min-w-0">

            {/* Mobile TOC (below lg) */}
            {headings.length > 2 && (
              <details className="xl:hidden bg-white border border-gray-200 rounded-2xl
                p-4 mb-8 shadow-sm group open:shadow-md transition-shadow duration-200">
                <summary className="flex items-center justify-between cursor-pointer
                  text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]
                  list-none select-none">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-0.5 bg-blue-500 rounded-full inline-block" />
                    On This Page
                  </span>
                  <span className="text-gray-400 transition-transform duration-200
                    group-open:rotate-180 text-base leading-none">
                    ▾
                  </span>
                </summary>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <TableOfContents headings={headings} mobile />
                </div>
              </details>
            )}

            {/* ── MDX Content ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm
              px-6 sm:px-8 lg:px-10 py-8 sm:py-10">
              <div className="blog-content" itemProp="articleBody">
                <MDXRemote source={post.content} components={MDX_COMPONENTS} />
              </div>
            </div>

            {/* Tags footer */}
            {post.tags?.length > 0 && (
              <div className="mt-6 bg-white border border-gray-100 rounded-2xl
                px-6 py-5 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase
                  tracking-[0.22em] mb-3 flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-blue-500 rounded-full inline-block" />
                  Tagged
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag}
                      href={`/blog?search=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold
                        text-gray-500 bg-gray-50 hover:bg-blue-50 hover:text-blue-700
                        px-3 py-1.5 rounded-lg border border-gray-200
                        hover:border-blue-200 transition-colors duration-150">
                      <FaTag className="text-[8px] opacity-50" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author strip */}
            <div className="mt-6 bg-white border border-gray-100 rounded-2xl
              px-6 py-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br
                  from-blue-600 to-blue-800 flex items-center justify-center
                  flex-shrink-0 shadow-sm shadow-blue-200">
                  <span className="text-white font-black text-sm tracking-tight">RN</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm" itemProp="author">
                    {post.author}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Steel fabrication experts — Mumbai &amp; Thane since 2010
                  </p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <a href="https://wa.me/919665181246" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold
                      text-green-700 bg-green-50 hover:bg-green-100 border border-green-200
                      px-3 py-1.5 rounded-lg transition-colors duration-150">
                    <FaWhatsapp className="text-[#25D366]" />
                    Ask a question
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="xl:hidden mt-6 rounded-2xl overflow-hidden
              bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950
              border border-gray-800 shadow-lg">
              <div className="p-6">
                <p className="text-[10px] font-black text-blue-400 uppercase
                  tracking-[0.22em] mb-2">
                  Free Quote
                </p>
                <p className="font-black text-white text-lg leading-tight mb-1">
                  Need Steel Work Done?
                </p>
                <p className="text-sm text-gray-400 mb-5">
                  Free site visit — Mumbai &amp; Thane. No obligations.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a href="https://wa.me/919665181246" target="_blank" rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2
                      bg-blue-600 hover:bg-blue-500 text-white px-4 py-3
                      rounded-xl font-bold text-sm transition-colors duration-200
                      shadow-sm shadow-blue-900">
                    <FaWhatsapp className="text-[#86efac]" /> WhatsApp Now
                  </a>
                  <a href="tel:+919665181246"
                    className="flex-1 inline-flex items-center justify-center gap-2
                      bg-white/10 hover:bg-white/15 border border-white/20
                      text-white px-4 py-3 rounded-xl font-bold text-sm
                      transition-colors duration-200">
                    <FaPhone className="text-xs" /> Call Now
                  </a>
                </div>
              </div>
            </div>

            {/* Related posts — mobile */}
            {relatedPosts.length > 0 && (
              <div className="xl:hidden mt-6 bg-white border border-gray-100
                rounded-2xl p-5 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase
                  tracking-[0.22em] mb-4 flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-blue-500 rounded-full inline-block" />
                  Related Articles
                </p>
                <div className="space-y-1">
                  {relatedPosts.map((p) => <RelatedPostCard key={p.slug} post={p} />)}
                </div>
              </div>
            )}
          </article>

          {/* ═══ RIGHT SIDEBAR ═══ */}
          <aside className="hidden lg:flex flex-col gap-4 sticky top-24"
            aria-label="Page sidebar">

            {/* On This Page — only on lg (not xl, xl uses left sidebar) */}
            {headings.length > 2 && (
              <SidebarCard className="xl:hidden">
                <div className="px-5 pt-5 pb-2">
                  <SidebarLabel>On This Page</SidebarLabel>
                </div>
                <div className="px-3 pb-4">
                  <TableOfContents headings={headings} />
                </div>
              </SidebarCard>
            )}

            {/* CTA Card */}
            <div className="rounded-2xl overflow-hidden
              bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950
              border border-gray-800 shadow-lg">
              {/* Top accent strip */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400" />
              <div className="p-5">
                <p className="text-[10px] font-black text-blue-400 uppercase
                  tracking-[0.22em] mb-3">
                  Free Quote
                </p>
                <h2 className="font-black text-white text-[1.05rem] leading-tight mb-2">
                  Need Steel Work Done?
                </h2>
                <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                  Free site visit across Mumbai &amp; Thane — no obligations, just honest advice.
                </p>
                <div className="space-y-2">
                  <a href="https://wa.me/919665181246" target="_blank" rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2
                      bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5
                      rounded-xl font-bold text-sm transition-colors duration-200
                      shadow-sm shadow-blue-900/50">
                    <FaWhatsapp className="text-[#86efac]" />
                    WhatsApp Now
                  </a>
                  <Link href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2
                      bg-white/8 hover:bg-white/14 border border-white/15
                      text-white px-4 py-2.5 rounded-xl font-bold text-sm
                      transition-colors duration-200">
                    Get Free Quote
                  </Link>
                  <a href="tel:+919665181246"
                    className="w-full inline-flex items-center justify-center gap-2
                      text-gray-500 hover:text-gray-300 text-[11px] font-semibold
                      transition-colors duration-150 pt-1">
                    <FaPhone className="text-[9px]" />
                    +91 96651 81246
                  </a>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <SidebarCard>
                <div className="p-5">
                  <SidebarLabel>Related Articles</SidebarLabel>
                  <div className="space-y-1">
                    {relatedPosts.map((p) => <RelatedPostCard key={p.slug} post={p} />)}
                  </div>
                  <Link href="/blog"
                    className="mt-4 w-full inline-flex items-center justify-center gap-1.5
                      text-xs font-bold text-blue-600 hover:text-blue-700
                      bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl
                      border border-blue-100 hover:border-blue-200
                      transition-colors duration-150">
                    View All Articles
                    <HiArrowUpRight className="text-sm" />
                  </Link>
                </div>
              </SidebarCard>
            )}

            {/* Explore More */}
            <SidebarCard>
              <div className="p-5">
                <SidebarLabel>Explore More</SidebarLabel>
                <nav aria-label="Site sections" className="space-y-1.5">
                  {[
                    { href: '/services', label: 'All Services',     sub: 'Railings, gates, grills & more', emoji: '🔩' },
                    { href: '/projects', label: 'Project Portfolio', sub: '500+ completed projects',        emoji: '📸' },
                    { href: '/contact',  label: 'Get Free Quote',    sub: 'Free site visit — no obligation', emoji: '📞' },
                  ].map(({ href, label, sub, emoji }) => (
                    <Link key={href} href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                        hover:bg-gray-50 border border-transparent
                        hover:border-gray-200 transition-all duration-150 group">
                      <span className="text-base flex-shrink-0">{emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800
                          group-hover:text-blue-700 transition-colors duration-150">
                          {label}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate">{sub}</p>
                      </div>
                      <HiArrowUpRight className="text-gray-300 group-hover:text-blue-500
                        text-sm flex-shrink-0 transition-colors duration-150
                        group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                        transition-transform duration-150" />
                    </Link>
                  ))}
                </nav>
              </div>
            </SidebarCard>

            {/* Trust Signals */}
            <SidebarCard>
              <div className="p-5">
                <SidebarLabel>Why Choose Us</SidebarLabel>
                <ul className="space-y-2.5">
                  {[
                    { icon: '✅', text: '15+ Years Experience' },
                    { icon: '📍', text: 'Based in Mumbai & Thane' },
                    { icon: '🔩', text: 'SS 304 / 316 Certified Work' },
                    { icon: '⭐', text: '500+ Happy Clients' },
                    { icon: '🚗', text: 'Free On-Site Visit' },
                  ].map(({ icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5">
                      <span className="text-sm flex-shrink-0" aria-hidden="true">{icon}</span>
                      <span className="text-xs font-semibold text-gray-700">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SidebarCard>

            {/* Article Info — right sidebar only shows on lg-xl range */}
            <SidebarCard className="xl:hidden">
              <div className="p-5">
                <SidebarLabel>Article Info</SidebarLabel>
                <div className="space-y-3">
                  {[
                    { icon: FaCalendarAlt, label: 'Published', value: dateStr },
                    { icon: FaClock,       label: 'Read Time', value: post.readingTime },
                    { icon: FaTag,         label: 'Category',  value: post.category },
                  ].filter(r => r.value).map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon className="text-[10px] text-gray-400 flex-shrink-0" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase
                        tracking-wider w-16 flex-shrink-0">
                        {label}
                      </span>
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