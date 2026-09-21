import { getAllPosts } from '@/lib/blog';
import { SERVICES } from '@/data/services';
import { PAGE_LOCATIONS } from '@/data/locations';
import { PROJECT_CATEGORIES, projectsIn } from '@/data/projects';
import { allServiceCityPairs, SITE_URL } from '@/lib/seo';

/* Google caps a single sitemap at 50,000 URLs. We are well under that,
   but if the city × service matrix ever grows past it, split this into
   a sitemap index. */

const NOW = new Date();

export default async function sitemap() {
  const staticRoutes = [
    { url: `${SITE_URL}/`,          priority: 1.0,  changeFrequency: 'weekly'  },
    { url: `${SITE_URL}/services`,  priority: 0.95, changeFrequency: 'weekly'  },
    { url: `${SITE_URL}/locations`, priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${SITE_URL}/projects`,  priority: 0.85, changeFrequency: 'weekly'  },
    { url: `${SITE_URL}/blog`,      priority: 0.85, changeFrequency: 'weekly'  },
    { url: `${SITE_URL}/about`,     priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${SITE_URL}/contact`,   priority: 0.75, changeFrequency: 'monthly' },
  ].map((r) => ({ ...r, lastModified: NOW }));

  /* Service pages — the primary ranking assets. */
  const serviceRoutes = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  /* Project category galleries — these target "<thing> design" and
     "<thing> photos" searches, which convert well. */
  const projectCategoryRoutes = PROJECT_CATEGORIES.filter(
    (c) => projectsIn(c.slug).length > 0
  ).map((c) => ({
    url: `${SITE_URL}/projects/${c.slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  /* City hubs. Core cities rank higher than project-basis cities. */
  const locationRoutes = PAGE_LOCATIONS.map((l) => ({
    url: `${SITE_URL}/locations/${l.slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: l.tier === 'core' ? 0.85 : 0.6,
  }));

  /* Service × city pages. */
  const serviceCityRoutes = allServiceCityPairs().map(({ service, city }) => {
    const location = PAGE_LOCATIONS.find((l) => l.slug === city);
    return {
      url: `${SITE_URL}/services/${service}/${city}`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: location?.tier === 'core' ? 0.75 : 0.5,
    };
  });

  let blogPostRoutes = [];
  try {
    const posts = getAllPosts();
    blogPostRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedDate
        ? new Date(post.updatedDate)
        : post.date
        ? new Date(post.date)
        : NOW,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch {
    blogPostRoutes = [];
  }

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectCategoryRoutes,
    ...locationRoutes,
    ...blogPostRoutes,
    ...serviceCityRoutes,
  ];
}
