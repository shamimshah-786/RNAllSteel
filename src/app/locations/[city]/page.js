import { notFound } from 'next/navigation';
import { PAGE_LOCATIONS, getLocation } from '@/data/locations';
import {
  buildMetadata,
  breadcrumbSchema,
  cityBusinessSchema,
  servicesForLocation,
  jsonLd,
} from '@/lib/seo';
import CityPage from '@/components/seo/CityPage';

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGE_LOCATIONS.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }) {
  const { city: slug } = await params;
  const location = getLocation(slug);
  if (!location || location.tier === 'listed') return {};

  const services = servicesForLocation(location);
  const local = location.tier === 'core';

  return buildMetadata({
    title: `Steel Fabrication in ${location.name} | RN All Steel`,
    description: `SS railings, main gates, window grills, safety doors & custom steel fabrication in ${location.name}. ${
      local ? 'Free site visit.' : 'Project enquiries welcome.'
    } 15+ yrs, 5.0★ Google.`,
    path: `/locations/${location.slug}`,
    keywords: [
      `steel fabrication ${location.name}`,
      `steel fabricator ${location.name}`,
      `SS railing ${location.name}`,
      `main gate ${location.name}`,
      `window grill ${location.name}`,
      `fabrication work near me ${location.name}`,
      ...services.slice(0, 6).map((s) => `${s.short} ${location.name}`),
    ],
  });
}

export default async function Page({ params }) {
  const { city: slug } = await params;
  const location = getLocation(slug);
  if (!location || location.tier === 'listed') notFound();

  const schemas = [
    cityBusinessSchema(location),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Service Areas', path: '/locations' },
      { name: location.name, path: `/locations/${location.slug}` },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(schema)}
        />
      ))}
      <CityPage location={location} />
    </>
  );
}
