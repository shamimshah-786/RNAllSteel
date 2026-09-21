import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { SERVICE_CATEGORIES } from '@/data/services';
import { getLocation } from '@/data/locations';
import { BUSINESS, servicesForLocation } from '@/lib/seo';
import Breadcrumbs from './Breadcrumbs';
import FaqList from './FaqList';
import CtaBand from './CtaBand';

/** City-specific FAQs — generated from the city's own data so no two
 *  city pages carry the same answers. */
function cityFaqs(location) {
  const local = location.tier === 'core';
  const areaList = location.areas.length
    ? `${location.areas.slice(0, 3).join(', ')} and the rest of ${location.name}`
    : location.name;

  return [
    {
      q: `Do you charge for a site visit in ${location.name}?`,
      a: local
        ? `No. Site visits and measurements in ${location.name} are free, including ${areaList}. You only pay once you approve the quotation.`
        : `${location.name} is outside our daily service area, so visits are scheduled as part of a project enquiry rather than as a free call-out. For a confirmed project scope, the visit is included in the quotation.`,
    },
    {
      q: `How long does a job in ${location.name} take?`,
      a: local
        ? `Most residential work runs 15–20 days from approved measurement to installation, and installation itself is usually a single day. Larger packages are scheduled in phases.`
        : `Fabrication takes the usual 15–25 days at our Mumbra workshop, plus scheduling for delivery and installation in ${location.name}. We confirm dates once the drawing is approved.`,
    },
    {
      q: `Where is your workshop, and does that matter for ${location.name}?`,
      a: `Our workshop is in Mumbra, Thane district — everything is fabricated there rather than bought in. ${
        local
          ? `${location.name} is close enough that we can get back to site quickly for adjustments or servicing after handover.`
          : `For ${location.name} it means the work is built to a confirmed drawing before it travels, so site measurement accuracy matters more than it would locally.`
      }`,
    },
    {
      q: `Can you match a design my society or builder has approved in ${location.name}?`,
      a: `Yes. Send the approved drawing or a photograph on WhatsApp and we will fabricate to that specification, matching pipe sizes, pattern and finish so the new work sits alongside the existing installations.`,
    },
  ];
}

export default function CityPage({ location }) {
  const services = servicesForLocation(location);
  const local = location.tier === 'core';
  /* 'listed' cities have no page — never link to them. */
  const nearby = (location.nearby || [])
    .map(getLocation)
    .filter((l) => l && l.tier !== 'listed');

  const grouped = SERVICE_CATEGORIES.map((category) => ({
    category,
    items: services.filter((s) => s.category === category),
  })).filter((g) => g.items.length > 0);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/locations' },
    { name: location.name, path: `/locations/${location.slug}` },
  ];

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />

          <div className="grid grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-12
            lg:gap-14 lg:pb-20">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-600">
                <span className="h-px w-8 bg-blue-600" />
                {location.district} District · Maharashtra
              </p>

              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.12]
                tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.9rem]">
                Steel Fabrication in{' '}
                <span className="text-blue-600">{location.name}</span>
              </h1>

              <p className="mt-6 max-w-xl border-l-2 border-blue-600 pl-5 text-[15px]
                leading-relaxed text-slate-700">
                {location.note}
              </p>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-600">
                {local
                  ? `${location.name} is inside our daily service area, so site visits and measurements are free and our installation team can be back on site quickly if anything needs adjusting.`
                  : `We take ${location.name} work on a project basis from our Mumbra workshop — best suited to complete scopes where one measurement visit and one delivery covers the job.`}{' '}
                Everything is fabricated in-house and installed by our own team.
              </p>

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
                  {local ? 'Book a Free Site Visit' : 'Send a Project Enquiry'}
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
                    src="/images/banner.jpg"
                    alt={`Steel fabrication work by RN All Steel for clients in ${location.name}, Maharashtra`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70
                  to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em]
                    text-blue-300">
                    Serving {location.name}
                  </p>
                  <p className="mt-1.5 text-base font-semibold text-white">
                    {services.length} services available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ AREAS ══════════ */}
      {location.areas.length > 0 && (
        <section className="border-b border-gray-200 bg-slate-50 py-12 sm:py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
              text-slate-400">
              Areas covered in {location.name}
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
        </section>
      )}

      {/* ══════════ SERVICES IN THIS CITY ══════════ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              What we build
            </p>
            <h2 className="mt-6 text-2xl font-semibold leading-tight
              tracking-[-0.02em] text-slate-900 sm:text-3xl lg:text-4xl">
              Our services in {location.name}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
              {local
                ? `Every service below is available in ${location.name} with a free measurement visit.`
                : `The services below are available in ${location.name} as project work. For anything not listed, ask us — custom fabrication covers most of it.`}
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {grouped.map((group) => (
              <div key={group.category}>
                <p className="border-b border-gray-200 pb-3 text-[11px] font-semibold
                  uppercase tracking-[0.2em] text-slate-400">
                  {group.category}
                </p>
                <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((s) => (
                    <li key={s.slug} className="border-b border-gray-200">
                      <Link
                        href={`/services/${s.slug}/${location.slug}`}
                        className="group flex items-start justify-between gap-4 py-5"
                      >
                        <span>
                          <span className="block text-[15px] font-semibold text-slate-900
                            transition-colors duration-200 group-hover:text-blue-700">
                            {s.short} in {location.name}
                          </span>
                          <span className="mt-1.5 block text-[13px] leading-relaxed
                            text-slate-500">
                            {s.tagline}
                          </span>
                        </span>
                        <FaArrowRight className="mt-1.5 shrink-0 text-[11px]
                          text-slate-300 transition-all duration-200
                          group-hover:translate-x-1 group-hover:text-blue-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NEARBY ══════════ */}
      {nearby.length > 0 && (
        <section className="border-y border-gray-200 bg-slate-50 py-14 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
              text-slate-400">
              We also work in
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/locations/${n.slug}`}
                    className="group inline-flex items-center gap-2.5 border
                      border-gray-200 bg-white px-5 py-3 text-[13.5px] font-medium
                      text-slate-700 transition-colors duration-150
                      hover:border-blue-600 hover:text-blue-700"
                  >
                    <FaMapMarkerAlt className="text-[10px] text-blue-600" />
                    Steel fabrication in {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FaqList
        faqs={cityFaqs(location)}
        heading={`Working with us in ${location.name}`}
      />

      <CtaBand
        title={`Steel fabrication in ${location.name}`}
        subtitle={
          local
            ? `Free site visit anywhere in ${location.name}. Itemised quotation within 24 hours.`
            : `Send us the scope for your ${location.name} project and we will come back with a drawing and a price.`
        }
      />
    </>
  );
}
