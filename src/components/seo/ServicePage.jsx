import Link from 'next/link';
import Image from 'next/image';
import {
  FaArrowRight,
  FaCheck,
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { getService } from '@/data/services';
import { getLocation } from '@/data/locations';
import { BUSINESS, locationsForService, hasServiceCityPage } from '@/lib/seo';
import Breadcrumbs from './Breadcrumbs';
import FaqList from './FaqList';
import CtaBand from './CtaBand';

/**
 * Renders both the plain service page and the service-in-a-city page.
 * Pass `location` to get the city variant — the extra city sections
 * are what keep those pages from duplicating each other.
 */
export default function ServicePage({ service, location = null }) {
  const isCity = Boolean(location);
  const isLocal = location?.tier === 'core';
  const related = (service.related || []).map(getService).filter(Boolean);
  const otherCities = locationsForService(service)
    .filter((l) => l.slug !== location?.slug)
    .slice(0, 18);
  /* Only nearby cities that actually have a page for THIS service. */
  const nearby = (location?.nearby || [])
    .map(getLocation)
    .filter((l) => hasServiceCityPage(service, l));

  const heading = isCity ? `${service.name} in ${location.name}` : service.name;

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.short, path: `/services/${service.slug}` },
    ...(isCity ? [{ name: location.name, path: `/services/${service.slug}/${location.slug}` }] : []),
  ];

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />

          <div className="grid grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-12 lg:gap-14 lg:pb-20">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-600">
                <span className="h-px w-8 bg-blue-600" />
                {isCity ? `${service.category} · ${location.district} District` : service.category}
              </p>

              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.12]
                tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.9rem]">
                {heading}
              </h1>

              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
                {service.summary}
              </p>

              {isCity && (
                <p className="mt-5 max-w-xl border-l-2 border-blue-600 pl-5 text-[15px]
                  leading-relaxed text-slate-700">
                  {location.note}
                </p>
              )}

              {/* Quick facts */}
              <dl className="mt-9 grid max-w-lg grid-cols-2 border-t border-gray-200
                sm:grid-cols-3">
                {[
                  { k: 'Experience', v: '15+ Years' },
                  { k: 'Google Rating', v: '5.0 ★' },
                  {
                    k: isLocal ? 'Site Visit' : 'Enquiries',
                    v: isLocal ? 'Free' : 'Project basis',
                  },
                ].map((f) => (
                  <div key={f.k} className="border-b border-gray-200 py-4 pr-4">
                    <dd className="text-lg font-semibold tracking-[-0.01em] text-slate-900">
                      {f.v}
                    </dd>
                    <dt className="mt-1 text-[10px] font-semibold uppercase
                      tracking-[0.16em] text-slate-400">
                      {f.k}
                    </dt>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-[2px]
                    bg-blue-600 px-7 py-4 text-[12px] font-semibold uppercase
                    tracking-[0.14em] text-white transition-colors duration-200
                    hover:bg-blue-700"
                >
                  <FaWhatsapp className="text-sm" />
                  Get a Free Quote
                </a>
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center justify-center gap-3 rounded-[2px]
                    border border-slate-300 px-7 py-4 text-[12px] font-semibold
                    uppercase tracking-[0.14em] text-slate-800 transition-colors
                    duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  <FaPhone className="text-[11px]" />
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[3px] bg-slate-200">
                <div className="relative w-full pt-[78%]">
                  <Image
                    src={service.image}
                    alt={
                      isCity
                        ? `${service.name} fabricated and installed in ${location.name}, Maharashtra`
                        : `${service.name} by RN All Steel Fabrication`
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65
                  to-transparent" />
                <p className="absolute bottom-4 left-5 right-5 text-[11px] font-semibold
                  uppercase tracking-[0.16em] text-white/90">
                  {service.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ BODY + FEATURES ══════════ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900
                sm:text-3xl">
                {isCity
                  ? `${service.short} for homes and businesses in ${location.name}`
                  : `What you get with our ${service.short.toLowerCase()}`}
              </h2>

              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-slate-600">
                {service.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {isCity && isLocal && (
                  <p>
                    In {location.name} we cover {location.areas.slice(0, -1).join(', ')} and{' '}
                    {location.areas[location.areas.length - 1]}, with a free measurement
                    visit before any quotation. Fabrication happens at our workshop in{' '}
                    {BUSINESS.locality} district and installation is done by our own
                    team — we do not sub-contract the fitting.
                  </p>
                )}

                {isCity && !isLocal && (
                  <p>
                    For {location.name} we work on a project basis: a measurement visit
                    and drawing approval first, then fabrication at our Mumbra workshop,
                    then a single mobilisation for delivery and installation. It suits
                    complete scopes — a full house package, a bungalow gate set, or a
                    commercial or industrial contract — rather than one small item.
                  </p>
                )}
              </div>

              {/* Use cases */}
              <div className="mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
                  text-slate-400">
                  Commonly used for
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.useCases.map((u) => (
                    <span
                      key={u}
                      className="border border-gray-200 bg-slate-50 px-3.5 py-2
                        text-[13px] font-medium text-slate-700"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Features + specs */}
            <div className="lg:col-span-5">
              <div className="border border-gray-200 bg-slate-50 p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
                  text-slate-400">
                  Included as standard
                </p>
                <ul className="mt-5 space-y-3.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14px]
                      leading-snug text-slate-700">
                      <FaCheck className="mt-1 shrink-0 text-[10px] text-blue-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-px border border-gray-200 bg-gray-200">
                {service.specs.map((s) => (
                  <div key={s.k} className="bg-white px-4 py-4">
                    <dt className="text-[10px] font-semibold uppercase
                      tracking-[0.14em] text-slate-400">
                      {s.k}
                    </dt>
                    <dd className="mt-1.5 text-[13.5px] font-semibold text-slate-900">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CITY COVERAGE ══════════ */}
      {isCity && (location.areas.length > 0 || nearby.length > 0) && (
        <section className="border-y border-gray-200 bg-slate-50 py-14 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              {location.areas.length > 0 && (
                <div className="lg:col-span-7">
                  <h2 className="text-xl font-semibold tracking-[-0.01em] text-slate-900
                    sm:text-2xl">
                    {service.short} across {location.name}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                    Areas we regularly work in for {service.short.toLowerCase()}:
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {location.areas.map((a) => (
                      <li
                        key={a}
                        className="inline-flex items-center gap-2 border border-gray-200
                          bg-white px-3.5 py-2 text-[13px] text-slate-700"
                      >
                        <FaMapMarkerAlt className="text-[10px] text-blue-600" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {nearby.length > 0 && (
                <div className="lg:col-span-5">
                  <h2 className="text-xl font-semibold tracking-[-0.01em] text-slate-900
                    sm:text-2xl">
                    Nearby areas
                  </h2>
                  <ul className="mt-5 divide-y divide-gray-200 border-y border-gray-200">
                    {nearby.map((n) => (
                      <li key={n.slug}>
                        <Link
                          href={`/services/${service.slug}/${n.slug}`}
                          className="group flex items-center justify-between py-3.5
                            text-[14px] font-medium text-slate-700 transition-colors
                            duration-150 hover:text-blue-700"
                        >
                          {service.short} in {n.name}
                          <FaArrowRight className="text-[10px] text-slate-300
                            transition-all duration-150 group-hover:translate-x-1
                            group-hover:text-blue-600" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ FAQ ══════════ */}
      <FaqList
        faqs={service.faqs}
        heading={
          isCity
            ? `${service.short} in ${location.name} — common questions`
            : `${service.short} — common questions`
        }
      />

      {/* ══════════ RELATED SERVICES ══════════ */}
      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em]
              text-blue-600">
              Related services
            </p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em]
              text-slate-900 sm:text-3xl">
              Often ordered together
            </h2>

            <div className="mt-9 grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-2
              lg:grid-cols-4">
              {related.map((r) => {
                /* Extended-tier cities do not carry every service — fall back
                   to the plain service page rather than linking to a 404. */
                const inCity = isCity && hasServiceCityPage(r, location);
                return (
                <Link
                  key={r.slug}
                  href={inCity ? `/services/${r.slug}/${location.slug}` : `/services/${r.slug}`}
                  className="group flex flex-col bg-white p-6 transition-colors
                    duration-200 hover:bg-slate-50"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em]
                    text-slate-400">
                    {r.category}
                  </p>
                  <p className="mt-3 text-[15px] font-semibold text-slate-900
                    transition-colors duration-200 group-hover:text-blue-700">
                    {inCity ? `${r.short} in ${location.name}` : r.name}
                  </p>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500">
                    {r.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px]
                    font-semibold uppercase tracking-[0.14em] text-blue-600">
                    View
                    <FaArrowRight className="text-[10px] transition-transform
                      duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ SERVICE AREA LINKS ══════════ */}
      {otherCities.length > 0 && (
        <section className="border-t border-gray-200 bg-slate-50 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em]
              text-blue-600">
              Service area
            </p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em]
              text-slate-900 sm:text-3xl">
              {service.short} elsewhere in Maharashtra
            </h2>
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-600">
              Our workshop is in Mumbra, Thane. Cities in the Mumbai Metropolitan
              Region get a free site visit; other cities are served on a project basis.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-4">
              {otherCities.map((c) => (
                <li key={c.slug} className="border-b border-gray-200">
                  <Link
                    href={`/services/${service.slug}/${c.slug}`}
                    className="group flex items-center justify-between py-3 text-[13.5px]
                      text-slate-600 transition-colors duration-150 hover:text-blue-700"
                  >
                    <span>
                      {service.short} in{' '}
                      <span className="font-medium text-slate-800
                        group-hover:text-blue-700">{c.name}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/locations"
              className="mt-9 inline-flex items-center gap-3 rounded-[2px] border
                border-slate-300 px-6 py-3.5 text-[11px] font-semibold uppercase
                tracking-[0.14em] text-slate-800 transition-colors duration-200
                hover:border-slate-900"
            >
              All service areas
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </section>
      )}

      <CtaBand
        title={
          isCity
            ? `Need ${service.short.toLowerCase()} in ${location.name}?`
            : `Need ${service.short.toLowerCase()}?`
        }
        subtitle={
          isLocal
            ? 'Free site visit and measurement. Itemised quotation within 24 hours.'
            : 'Send us the drawing or measurements and we will come back with a quotation.'
        }
      />
    </>
  );
}
