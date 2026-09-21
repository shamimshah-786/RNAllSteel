import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { SERVICES, servicesByCategory } from '@/data/services';
import { CORE_LOCATIONS } from '@/data/locations';
import { buildMetadata, breadcrumbSchema, jsonLd, SITE_URL } from '@/lib/seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CtaBand from '@/components/seo/CtaBand';

export const metadata = buildMetadata({
  title: 'Steel Fabrication Services in Mumbai & Thane | RN All Steel',
  description:
    'SS & MS railings, glass railings, main gates, laser-cut gates, safety doors, window grills, canopies, UPVC windows, glass partitions & custom fabrication.',
  path: '/services',
  image: '/projects/railings/ss-mezzanine-railing-metal-stairs.webp',
  keywords: [
    'steel fabrication services',
    'steel fabrication services Mumbai',
    'steel fabrication services Thane',
    'SS railing fabrication',
    'main gate fabrication',
    'window grill fabrication',
    'glass railing fabrication',
    'custom steel fabrication Maharashtra',
  ],
});

const PROCESS = [
  { n: '01', title: 'Site visit', desc: 'Free consultation and measurement at your location.' },
  { n: '02', title: 'Design & quote', desc: 'A drawing and an itemised quotation for approval.' },
  { n: '03', title: 'Fabrication', desc: 'Built in our Mumbra workshop with quality checks.' },
  { n: '04', title: 'Install & aftercare', desc: 'Fitted by our own team, with 2-year workmanship cover.' },
];

export default function ServicesPage() {
  const groups = servicesByCategory();

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Steel fabrication services by RN All Steel Fabrication',
      numberOfItems: SERVICES.length,
      itemListElement: SERVICES.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.name,
        url: `${SITE_URL}/services/${s.slug}`,
      })),
    },
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
              { name: 'Services', path: '/services' },
            ]}
          />
          <div className="grid grid-cols-1 items-end gap-10 pb-16 lg:grid-cols-12 lg:pb-20">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-600">
                <span className="h-px w-8 bg-blue-600" />
                What we build
              </p>
              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.12]
                tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.9rem]">
                Steel fabrication <span className="text-blue-600">services</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-slate-600
                sm:text-base">
                {SERVICES.length} services, all fabricated in our own Mumbra workshop
                and installed by our own team — from a single window grill to a
                complete industrial structure. Free site visit across Mumbai, Thane
                and the wider MMR; project work across Maharashtra.
              </p>
            </div>
            <div className="lg:col-span-4">
              <dl className="grid grid-cols-3 border-t border-gray-200 lg:border-t-0">
                {[
                  { v: `${SERVICES.length}`, k: 'Services' },
                  { v: '15+', k: 'Years' },
                  { v: '500+', k: 'Projects' },
                ].map((s) => (
                  <div key={s.k} className="border-b border-gray-200 py-4 lg:border-b-0">
                    <dd className="text-2xl font-semibold tabular-nums text-slate-900">
                      {s.v}
                    </dd>
                    <dt className="mt-1 text-[10px] font-semibold uppercase
                      tracking-[0.14em] text-slate-400">
                      {s.k}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES BY CATEGORY ══════════ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
          {groups.map((group) => (
            <div key={group.category} id={group.category.toLowerCase().replace(/[^a-z]+/g, '-')}>
              <div className="flex items-end justify-between gap-6 border-b
                border-gray-200 pb-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-slate-900
                  sm:text-2xl">
                  {group.category}
                </h2>
                <span className="text-[11px] font-semibold uppercase
                  tracking-[0.14em] text-slate-400">
                  {group.items.length} services
                </span>
              </div>

              <div className="mt-px grid grid-cols-1 gap-px bg-gray-200
                sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex flex-col bg-white transition-colors
                      duration-200 hover:bg-slate-50"
                  >
                    <div className="relative overflow-hidden bg-slate-200">
                      <div className="relative w-full pt-[60%]">
                        <Image
                          src={s.image}
                          alt={`${s.name} — RN All Steel Fabrication, Mumbai & Thane`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700
                            group-hover:scale-[1.05]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-[16px] font-semibold leading-snug
                        text-slate-900 transition-colors duration-200
                        group-hover:text-blue-700">
                        {s.name}
                      </h3>
                      <p className="mt-1.5 text-[11px] font-semibold uppercase
                        tracking-[0.14em] text-slate-400">
                        {s.tagline}
                      </p>
                      <p className="mt-4 flex-1 text-[13.5px] leading-relaxed
                        text-slate-600">
                        {s.summary}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 border-t
                        border-gray-200 pt-4 text-[11px] font-semibold uppercase
                        tracking-[0.14em] text-blue-600">
                        View details
                        <FaArrowRight className="text-[10px] transition-transform
                          duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <section className="border-t border-gray-200 bg-slate-950 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em]
            text-blue-400">
            How we work
          </p>
          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-white
            sm:text-3xl">
            The same process on every job
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2
            lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.n} className="bg-slate-950 p-6 sm:p-7">
                <p className="text-3xl font-semibold tabular-nums text-blue-500">{p.n}</p>
                <p className="mt-4 text-[15px] font-semibold text-white">{p.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SERVICE AREAS ══════════ */}
      <section className="border-t border-gray-200 bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold
            uppercase tracking-[0.24em] text-blue-600">
            <span className="h-px w-8 bg-blue-600" />
            Where we work
          </p>
          <h2 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-slate-900
            sm:text-3xl">
            Every service, in your city
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            These cities are inside our daily service area, with a free site visit
            for any service on this page.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
            {CORE_LOCATIONS.map((c) => (
              <li key={c.slug} className="border-b border-gray-200">
                <Link
                  href={`/locations/${c.slug}`}
                  className="group flex items-center gap-2 py-3 text-[13.5px]
                    text-slate-600 transition-colors duration-150 hover:text-blue-700"
                >
                  <FaMapMarkerAlt className="text-[10px] text-blue-600" />
                  {c.name}
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
            All service areas across Maharashtra
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </section>

      <CtaBand
        title="Tell us what you need built"
        subtitle="Send measurements or a reference photo on WhatsApp and we will come back with a drawing and a price."
      />
    </>
  );
}
