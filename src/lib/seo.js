/* ═══════════════════════════════════════════════════════════════
   SEO helpers — one place that decides which pages exist, what
   their titles say, and what structured data they emit.
═══════════════════════════════════════════════════════════════ */

import { SERVICES, EXTENDED_CITY_SERVICES, getService } from '@/data/services';
import { PAGE_LOCATIONS, getLocation, WORKSHOP } from '@/data/locations';

export const SITE_URL = 'https://rnallsteelfabrication.com';

export const BUSINESS = {
  name: 'RN All Steel Fabrication Work',
  phone: '+91-9665181246',
  phoneDisplay: '+91 96651 81246',
  phoneHref: 'tel:+919665181246',
  whatsapp: 'https://wa.me/919665181246',
  email: 'rnallsteelfabrication@gmail.com',
  street:
    'Khot Bunglow, Mumbra-Panvel Highway, near International Kata, Mokashi Pada Road',
  locality: 'Thane',
  region: 'Maharashtra',
  postalCode: '400612',
  country: 'IN',
  lat: 19.1649,
  lng: 73.0236,
  ratingValue: '5.0',
  reviewCount: '41',
  foundingYear: '2010',
  /* Single source of truth for opening hours — this must match the
     openingHoursSpecification in src/app/layout.js and the Google
     Business Profile, or the pages contradict the structured data. */
  hoursShort: 'Open daily · 9:30 AM – 9:15 PM',
  hoursLong: 'Monday to Sunday, 9:30 AM – 9:15 PM',
  mapsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=R+N+ALL+STEEL+FABRICATION+WORK',
};

/* ───────────────────────── PAGE MATRIX ───────────────────────── */

/** Which services get a page in this city. */
export function servicesForLocation(location) {
  if (!location) return [];
  if (location.tier === 'core') return SERVICES;
  if (location.tier === 'extended') return EXTENDED_CITY_SERVICES;
  return [];
}

/** Which cities get a page for this service. */
export function locationsForService(service) {
  if (!service) return [];
  return PAGE_LOCATIONS.filter((l) =>
    servicesForLocation(l).some((s) => s.slug === service.slug)
  );
}

/** Every /services/<service>/<city> route that should exist. */
export function allServiceCityPairs() {
  const pairs = [];
  for (const location of PAGE_LOCATIONS) {
    for (const service of servicesForLocation(location)) {
      pairs.push({ service: service.slug, city: location.slug });
    }
  }
  return pairs;
}

/**
 * Does /services/<service>/<city> exist?
 * Always check before rendering a link to a city variant — extended-tier
 * cities only carry the priority services, so "related service in this
 * city" and "nearby city" links can otherwise point at a 404.
 */
export function hasServiceCityPage(service, location) {
  if (!service || !location) return false;
  return servicesForLocation(location).some((s) => s.slug === service.slug);
}

/** Guards a /services/<service>/<city> route against invalid combos. */
export function resolveServiceCity(serviceSlug, citySlug) {
  const service = getService(serviceSlug);
  const location = getLocation(citySlug);
  if (!service || !location) return null;
  const allowed = servicesForLocation(location).some((s) => s.slug === service.slug);
  return allowed ? { service, location } : null;
}

/* ───────────────────────── METADATA ───────────────────────── */

/** Trims to a length Google will actually show, on a word boundary. */
export function clamp(text, max) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s—·,.:;-]+$/, '') + '…';
}

/**
 * Builds a complete Next.js metadata object.
 * `path` must start with a slash and must not include the origin.
 *
 * The title is set as `absolute` on purpose: the root layout defines a
 * `%s | RN All Steel Fabrication` template, and letting it apply here
 * would append the brand a second time on every generated page.
 * Keep titles under ~60 characters — that is what Google displays.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = '/images/banner.jpg',
  keywords = [],
  imageAlt,
}) {
  const url = `${SITE_URL}${path}`;
  const desc = clamp(description, 158);
  return {
    title: { absolute: title },
    description: desc,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      siteName: BUSINESS.name,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/** e.g. "SS Railings in Thane | RN All Steel" — 35 chars. */
export function serviceCityTitle(service, location) {
  return clamp(`${service.short} in ${location.name} | RN All Steel`, 62);
}

/** The lead clause of a summary — everything before the em dash.
 *  Cutting here reads like a sentence; a hard character cut does not. */
const leadClause = (text) => text.split('—')[0].replace(/[\s,.]+$/, '');

export function serviceCityDescription(service, location) {
  const local = location.tier === 'core';
  const tail = local
    ? `Free site visit in ${location.name}. 5.0★ on Google.`
    : `Project enquiries welcome. Built at our Mumbra workshop.`;
  /* Reserve room for the tail so the useful part is never the bit cut. */
  const lead = clamp(
    `${service.short} in ${location.name}, Maharashtra. ${leadClause(service.summary)}.`,
    156 - tail.length
  );
  return `${lead} ${tail}`;
}

export { leadClause };

/* ───────────────────────── SCHEMA ───────────────────────── */

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/**
 * Service schema. When `location` is given the areaServed narrows to
 * that city; the provider is always the single Mumbra workshop —
 * inventing a local address per city would be false.
 */
export function serviceSchema(service, location = null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.slug}${location ? `/${location.slug}` : ''}#service`,
    name: location ? `${service.name} in ${location.name}` : service.name,
    description: service.summary,
    serviceType: service.name,
    category: service.category,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.street,
        addressLocality: BUSINESS.locality,
        addressRegion: BUSINESS.region,
        postalCode: BUSINESS.postalCode,
        addressCountry: BUSINESS.country,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: BUSINESS.ratingValue,
        reviewCount: BUSINESS.reviewCount,
      },
    },
    areaServed: location
      ? [{ '@type': 'City', name: location.name, containedInPlace: { '@type': 'State', name: 'Maharashtra' } }]
      : [{ '@type': 'State', name: 'Maharashtra' }],
    url: `${SITE_URL}/services/${service.slug}${location ? `/${location.slug}` : ''}`,
    image: `${SITE_URL}${service.image}`,
  };
}

/** LocalBusiness schema for a city page. */
export function cityBusinessSchema(location) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/locations/${location.slug}#business`,
    name: BUSINESS.name,
    description: `Steel fabrication services in ${location.name}, Maharashtra — railings, gates, grills, safety doors, windows and custom metal fabrication.`,
    url: `${SITE_URL}/locations/${location.slug}`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: '₹₹',
    image: `${SITE_URL}/images/banner.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.lat, longitude: BUSINESS.lng },
    areaServed: {
      '@type': 'City',
      name: location.name,
      containedInPlace: { '@type': 'State', name: 'Maharashtra' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS.ratingValue,
      reviewCount: BUSINESS.reviewCount,
    },
  };
}

/** Small helper for rendering a JSON-LD <script> without repetition. */
export function jsonLd(schema) {
  return { __html: JSON.stringify(schema) };
}

export { WORKSHOP };
