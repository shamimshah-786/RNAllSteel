import Link from 'next/link';
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import {
  CORE_LOCATIONS,
  EXTENDED_LOCATIONS,
  LISTED_LOCATIONS,
} from '@/data/locations';
import { buildMetadata, breadcrumbSchema, jsonLd, servicesForLocation } from '@/lib/seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CtaBand from '@/components/seo/CtaBand';

export const metadata = buildMetadata({
  title: 'Steel Fabrication Service Areas in Maharashtra | RN All Steel',
  description:
    'Steel fabrication across Maharashtra — Mumbai, Thane, Mumbra, Navi Mumbai, Kalyan, Dombivli, Panvel & more. Free site visits across the MMR, project work statewide.',
  path: '/locations',
  keywords: [
    'steel fabrication Maharashtra',
    'steel fabricator Mumbai Thane',
    'steel fabrication service areas',
    'railing fabricator near me',
  ],
});

function CityGrid({ cities, showServiceCount = false }) {
  return (
    <ul className="grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/locations/${c.slug}`}
            className="group flex h-full flex-col bg-white p-6 transition-colors
              duration-200 hover:bg-slate-50"
          >
            <span className="flex items-center gap-2 text-[10px] font-semibold
              uppercase tracking-[0.16em] text-slate-400">
              <FaMapMarkerAlt className="text-[10px] text-blue-600" />
              {c.district}
            </span>
            <span className="mt-3 text-[16px] font-semibold text-slate-900
              transition-colors duration-200 group-hover:text-blue-700">
              Steel Fabrication in {c.name}
            </span>
            {c.areas.length > 0 && (
              <span className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500">
                {c.areas.slice(0, 4).join(' · ')}
              </span>
            )}
            <span className="mt-5 inline-flex items-center gap-2 text-[11px]
              font-semibold uppercase tracking-[0.14em] text-blue-600">
              {showServiceCount
                ? `${servicesForLocation(c).length} services`
                : 'View services'}
              <FaArrowRight className="text-[10px] transition-transform duration-200
                group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function LocationsPage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Service Areas', path: '/locations' },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      ))}

      {/* ══════════ HERO ══════════ */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Service Areas', path: '/locations' },
            ]}
          />
          <div className="max-w-3xl pb-16 lg:pb-20">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              Service areas
            </p>
            <h1 className="mt-6 text-[2rem] font-semibold leading-[1.12]
              tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.9rem]">
              Steel fabrication across <span className="text-blue-600">Maharashtra</span>
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Our workshop is in Mumbra, Thane district. Cities across the Mumbai
              Metropolitan Region are our daily service area — free site visits,
              quick installation and easy after-sales support. Elsewhere in
              Maharashtra we take project work, fabricated in Mumbra and installed
              by our own team.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ CORE ══════════ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900
              sm:text-3xl">
              Daily service area
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Free site visit and measurement, every service available, and our team
              close enough to come back if anything needs adjusting after handover.
            </p>
          </div>
          <div className="mt-10">
            <CityGrid cities={CORE_LOCATIONS} showServiceCount />
          </div>
        </div>
      </section>

      {/* ══════════ EXTENDED ══════════ */}
      <section className="border-t border-gray-200 bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900
              sm:text-3xl">
              Project work across Maharashtra
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              We take complete scopes in these cities — a full home package, a
              bungalow gate set, or a commercial or industrial contract. Fabrication
              happens in Mumbra and travels as one consignment, so the drawing is
              approved before anything is cut.
            </p>
          </div>
          <div className="mt-10">
            <CityGrid cities={EXTENDED_LOCATIONS} showServiceCount />
          </div>
        </div>
      </section>

      {/* ══════════ LISTED ══════════ */}
      {LISTED_LOCATIONS.length > 0 && (
        <section className="border-t border-gray-200 bg-white py-14 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold tracking-[-0.01em] text-slate-900
              sm:text-2xl">
              Enquiries also welcome from
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-600">
              We do not run regular work in these districts, but we will quote a
              substantial project. Call us and we will tell you honestly whether it
              makes sense at that distance.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {LISTED_LOCATIONS.map((c) => (
                <li
                  key={c.slug}
                  className="border border-gray-200 bg-slate-50 px-3.5 py-2
                    text-[13px] text-slate-600"
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title="Not sure if we cover your area?"
        subtitle="Send us your location on WhatsApp and we will tell you straight away whether it is a free site visit or a project enquiry."
      />
    </>
  );
}
