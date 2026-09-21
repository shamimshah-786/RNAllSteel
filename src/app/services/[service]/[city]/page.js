import { notFound } from 'next/navigation';
import {
  allServiceCityPairs,
  resolveServiceCity,
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  serviceCityTitle,
  serviceCityDescription,
  jsonLd,
} from '@/lib/seo';
import ServicePage from '@/components/seo/ServicePage';

/* Only the service × city combinations defined in src/data/locations.js
   exist. Anything else is a 404 rather than a thin auto-generated page. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allServiceCityPairs();
}

export async function generateMetadata({ params }) {
  const { service: serviceSlug, city: citySlug } = await params;
  const resolved = resolveServiceCity(serviceSlug, citySlug);
  if (!resolved) return {};
  const { service, location } = resolved;

  return buildMetadata({
    title: serviceCityTitle(service, location),
    description: serviceCityDescription(service, location),
    path: `/services/${service.slug}/${location.slug}`,
    image: service.image,
    imageAlt: `${service.name} in ${location.name}, Maharashtra`,
    keywords: [
      ...service.keywords.map((k) => `${k} ${location.name}`),
      `${service.short} in ${location.name}`,
      `${service.short} ${location.name} price`,
      `steel fabrication ${location.name}`,
      `${service.short} near me ${location.name}`,
    ],
  });
}

export default async function Page({ params }) {
  const { service: serviceSlug, city: citySlug } = await params;
  const resolved = resolveServiceCity(serviceSlug, citySlug);
  if (!resolved) notFound();
  const { service, location } = resolved;

  const schemas = [
    serviceSchema(service, location),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.short, path: `/services/${service.slug}` },
      { name: location.name, path: `/services/${service.slug}/${location.slug}` },
    ]),
    faqSchema(service.faqs),
  ].filter(Boolean);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(schema)}
        />
      ))}
      <ServicePage service={service} location={location} />
    </>
  );
}
