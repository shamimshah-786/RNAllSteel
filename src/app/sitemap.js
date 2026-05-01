// ─────────────────────────────────────────────────────────────────
//  app/sitemap.js  —  Dynamic sitemap (Next.js App Router)
//  Served at: https://rnallsteelfabrication.com/sitemap.xml
// ─────────────────────────────────────────────────────────────────
import { getAllPosts } from '@/lib/blog';

const SITE_URL = 'https://rnallsteelfabrication.com';

// How often does each section realistically change?
// home/projects/blog-listing → weekly (new content added)
// about/services/contact     → monthly (rarely changes)
// individual blog posts      → monthly after publish
// blog category filters      → weekly (new posts appear)

export default async function sitemap() {
  const now = new Date().toISOString();

  /* ── 1. Static core pages ──────────────────────────────────── */
  const staticRoutes = [
    {
      url:             `${SITE_URL}/`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        1.0,
    },
    {
      url:             `${SITE_URL}/about`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${SITE_URL}/services`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.9,
    },
    {
      url:             `${SITE_URL}/projects`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        0.85,
    },
    {
      url:             `${SITE_URL}/blog`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        0.85,
    },
    {
      url:             `${SITE_URL}/contact`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.75,
    },
  ];

  /* ── 2. Service section anchors (helps Google index deep pages) */
  const serviceAnchors = [
    'main-gates',
    'railings',
    'window-grills',
    'collapsible-gates',
    'main-doors',
    'street-stalls',
    'custom',
  ].map((slug) => ({
    url:             `${SITE_URL}/services#${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.65,
  }));

  /* ── 3. Blog category filter pages ───────────────────────────
     These are URL params (not segments), but submitting them to
     Google Search Console helps surface category landing content. */
  const blogCategories = [
    'Railings',
    'Main+Gates',
    'Window+Grills',
    'Tips+%26+Care',
    'General',
  ].map((cat) => ({
    url:             `${SITE_URL}/blog?category=${cat}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.6,
  }));

  /* ── 4. Dynamic blog post pages ──────────────────────────────
     getAllPosts() returns your MDX/JSON post list synchronously.
     Each post should have: { slug, date, title }              */
  let blogPostRoutes = [];
  try {
    const posts = getAllPosts();
    blogPostRoutes = posts.map((post) => ({
      url:             `${SITE_URL}/blog/${post.slug}`,
      // Use the post's publish date if available, else today
      lastModified:    post.date
        ? new Date(post.date).toISOString()
        : now,
      changeFrequency: 'monthly',
      priority:        0.7,
    }));
  } catch {
    // getAllPosts unavailable at build time — skip gracefully
  }

  /* ── Merge all routes ─────────────────────────────────────── */
  return [
    ...staticRoutes,
    ...serviceAnchors,
    ...blogCategories,
    ...blogPostRoutes,
  ];
}