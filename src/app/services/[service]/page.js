import { notFound } from 'next/navigation';
import { SERVICES, getService } from '@/data/services';
import {
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  leadClause,
  jsonLd,
} from '@/lib/seo';
import ServicePage from '@/components/seo/ServicePage';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.short} in Mumbai & Thane | RN All Steel`,
    description: `${leadClause(service.summary)}. Free site visit across Mumbai, Thane & Mumbra. 15+ yrs, 500+ projects, 5.0★ Google.`,
    path: `/services/${service.slug}`,
    image: service.image,
    imageAlt: `${service.name} by RN All Steel Fabrication`,
    keywords: [
      ...service.keywords,
      `${service.short} Mumbai`,
      `${service.short} Thane`,
      `${service.short} Maharashtra`,
      `${service.short} near me`,
    ],
  });
}

export default async function Page({ params }) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const schemas = [
    serviceSchema(service),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.short, path: `/services/${service.slug}` },
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
      <ServicePage service={service} />
    </>
  );
}
