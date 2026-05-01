import { getAllPosts } from '@/lib/blog';

const SITE_URL = 'https://rnallsteelfabrication.com';

export default async function sitemap() {
  const staticRoutes = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ];

  let blogPostRoutes = [];

  try {
    const posts = getAllPosts();
    blogPostRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedDate
        ? new Date(post.updatedDate)
        : post.date
        ? new Date(post.date)
        : new Date('2026-05-02'),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch {
    blogPostRoutes = [];
  }

  return [...staticRoutes, ...blogPostRoutes];
}