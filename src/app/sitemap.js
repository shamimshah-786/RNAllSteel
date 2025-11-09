// Dynamic sitemap for Next.js App Router
// Place this file at app/sitemap.js (or app/sitemap.ts) — Next.js will serve it at /sitemap.xml
// Make sure to set SITE_URL environment variable to your production site (e.g. https://rnallsteelfabrication.com)

const SITE_URL = 'https://rnallsteelfabrication.com';

export default async function sitemap() {
  const now = new Date().toISOString();

  const staticRoutes = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/about`, lastModified: now },
    { url: `${SITE_URL}/services`, lastModified: now },
    { url: `${SITE_URL}/projects`, lastModified: now },
    { url: `${SITE_URL}/contact`, lastModified: now },
  ];

  // If you have dynamic project pages or CMS-driven pages, fetch them here and append.
  // Example:
  // const projects = await fetchProjects(); // return [{ slug: 'my-project' , updatedAt }]
  // projects.forEach(p => staticRoutes.push({ url: `${SITE_URL}/projects/${p.slug}`, lastModified: p.updatedAt }));

  return staticRoutes;
}