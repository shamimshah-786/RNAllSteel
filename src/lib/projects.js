/* ═══════════════════════════════════════════════════════════════
   Project helpers — resolve the service/category a project belongs
   to on the SERVER, so src/data/services.js (with all its body
   copy) never ends up in the client bundle.
═══════════════════════════════════════════════════════════════ */

import { getService } from '@/data/services';
import { CATEGORY_MAP, categoryName, projectsIn, PROJECTS } from '@/data/projects';
import { BUSINESS, SITE_URL } from '@/lib/seo';

/**
 * A short reference a client can quote back to us — "RN-MG-12".
 * Purely a lookup handle for enquiries, printed on the card and sent
 * with the WhatsApp message so we know exactly which photo they mean.
 */
export function designCode(project) {
  const code = CATEGORY_MAP[project.category]?.code ?? 'RN';
  return `RN-${code}-${String(project.id).padStart(2, '0')}`;
}

/**
 * WhatsApp link with the design already named, so browsing turns into
 * an enquiry in one tap instead of the client having to describe which
 * photo they liked.
 */
export function enquiryHref(project) {
  const text =
    `Hi RN All Steel, I like this design: ${project.title} ` +
    `(ref ${designCode(project)}). Can you quote it for my measurements?`;
  return `${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Adds display + linking fields to each project. */
export function withLinks(projects) {
  return projects.map((p) => {
    const service = getService(p.service);
    return {
      ...p,
      code: designCode(p),
      enquiryHref: enquiryHref(p),
      categoryName: categoryName(p.category),
      serviceName: service ? service.name : null,
      serviceHref: service ? `/services/${service.slug}` : null,
    };
  });
}

export const linkedProjectsIn = (categorySlug) => withLinks(projectsIn(categorySlug));

/** ImageObject list — helps these photos surface in Google Images. */
export function imageGallerySchema({ projects, name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name,
    description,
    url: `${SITE_URL}${path}`,
    numberOfItems: projects.length,
    associatedMedia: projects.map((p) => ({
      '@type': 'ImageObject',
      contentUrl: `${SITE_URL}${p.src}`,
      name: p.title,
      description: p.alt,
      representativeOfPage: false,
      creditText: 'RN All Steel Fabrication Work',
      creator: { '@type': 'Organization', name: 'RN All Steel Fabrication Work' },
    })),
  };
}

export const ALL_PROJECTS_COUNT = PROJECTS.length;
