import Link from 'next/link';
import Image from 'next/image';
import {
  FaArrowRight,
  FaCheck,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaWhatsapp,
} from 'react-icons/fa';
import { TOP_SERVICES, SERVICES } from '@/data/services';
import { CORE_LOCATIONS } from '@/data/locations';
import {
  BUSINESS,
  SITE_URL,
  buildMetadata,
  breadcrumbSchema,
  jsonLd,
} from '@/lib/seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CtaBand from '@/components/seo/CtaBand';

export const metadata = buildMetadata({
  title: 'About RN All Steel Fabrication | Steel Fabricators in Thane',
  description:
    'Steel fabricators in Mumbra, Thane since 2010 — SS railings, gates, grills, safety doors and custom metalwork for Mumbai, Thane and the wider MMR.',
  path: '/about',
  keywords: [
    'about RN All Steel Fabrication',
    'steel fabrication company Thane',
    'steel fabricator Mumbai',
    'steel fabrication company Mumbra',
    'experienced steel fabricators Thane',
  ],
});

const STATS = [
  { value: '15+', label: 'Years of Experience', note: 'Established 2010' },
  { value: '500+', label: 'Projects Delivered', note: 'Mumbai & Thane' },
  { value: '5.0', label: 'Google Rating', note: '41 verified reviews' },
  { value: '2 Yr', label: 'Workmanship Warranty', note: 'On every project' },
];

const VALUES = [
  {
    title: 'We measure before we quote',
    desc: 'Every quotation follows a site visit, not a phone estimate. Openings are rarely square and levels are rarely true — measuring first is what stops a gate arriving 20mm too wide.',
  },
  {
    title: 'We fabricate what we sell',
    desc: 'Everything is built in our own Mumbra workshop. Nothing is bought in and rebadged, which means we can answer for the weld, the grade of steel and the finish.',
  },
  {
    title: 'Our own team installs',
    desc: 'The fitters on your site are our fitters. Installation is where most fabrication jobs go wrong, and it is the part we refuse to sub-contract.',
  },
  {
    title: 'The price on the quote is the price',
    desc: 'Itemised quotations, agreed before work starts. If the scope changes we tell you before we build, not on the final bill.',
  },
];

const TIMELINE = [
  {
    year: '2010',
    title: 'Founded in Mumbra',
    desc: 'Started as a small residential fabrication shop building grills, gates and railings for the neighbourhood.',
  },
  {
    year: '2015',
    title: 'Expanded into structures',
    desc: 'Added industrial fabrication — mezzanine floors, staircases, access platforms and commercial contracts across Thane district.',
  },
  {
    year: '2019',
    title: '500 projects completed',
    desc: 'Crossed 500 finished jobs, with a large share coming from repeat clients and their referrals.',
  },
  {
    year: '2023',
    title: 'Process standardisation',
    desc: 'Formalised measurement, drawing approval and quality-check stages so every job runs to the same sequence.',
  },
];

const TEAM = [
  { name: 'Mohammad Naseem', role: 'Founder & Master Fabricator', img: '/images/profile.svg' },
  { name: 'Mohammad Shamim', role: 'Co-Founder & Operations', img: '/images/team-shamim.jpg' },
];

const SNAPSHOT = [
  { label: 'Established', value: '2010 — Mumbra, Thane' },
  { label: 'Workshop', value: 'Mokashi Pada Road, Mumbra 400612' },
  { label: 'Specialisation', value: 'SS & MS custom fabrication' },
  { label: 'Service area', value: 'Mumbai, Thane, Mumbra & MMR' },
  { label: 'Typical lead time', value: '15–20 working days' },
  { label: 'Warranty', value: '2 years on workmanship' },
  { label: 'Hours', value: BUSINESS.hoursLong },
];

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const schemas = [
    breadcrumbSchema(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About RN All Steel Fabrication Work',
      url: `${SITE_URL}/about`,
      mainEntity: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#business`,
        name: BUSINESS.name,
        foundingDate: BUSINESS.foundingYear,
        url: SITE_URL,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS.street,
          addressLocality: BUSINESS.locality,
          addressRegion: BUSINESS.region,
          postalCode: BUSINESS.postalCode,
          addressCountry: BUSINESS.country,
        },
        employee: TEAM.map((t) => ({
          '@type': 'Person',
          name: t.name,
          jobTitle: t.role,
        })),
      },
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
          <Breadcrumbs items={crumbs} />

          <div className="grid grid-cols-1 items-center gap-12 pb-16 lg:grid-cols-12
            lg:gap-16 lg:pb-20">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-600">
                <span className="h-px w-8 bg-blue-600" />
                About us
              </p>

              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.12]
                tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.9rem]">
                Built on steel.<br />
                <span className="text-blue-600">Backed by 15 years.</span>
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-600
                sm:text-base">
                RN All Steel Fabrication has been building gates, railings, grills and
                structures out of one workshop in Mumbra since 2010. No showroom, no
                sales team — the people who quote your job are the people who fabricate
                and install it.
              </p>

              <ul className="mt-9 grid max-w-lg grid-cols-1 gap-x-8 border-t
                border-gray-200 sm:grid-cols-2">
                {TOP_SERVICES.slice(0, 6).map((s) => (
                  <li key={s.slug} className="border-b border-gray-200">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center gap-3 py-3.5 text-[13.5px]
                        font-medium text-slate-700 transition-colors duration-150
                        hover:text-blue-700"
                    >
                      <FaCheck className="shrink-0 text-[9px] text-blue-600" />
                      {s.short}
                    </Link>
                  </li>
                ))}
              </ul>

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
                  WhatsApp Us
                </a>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-3 rounded-[2px]
                    border border-slate-300 px-7 py-4 text-[12px] font-semibold
                    uppercase tracking-[0.14em] text-slate-800 transition-colors
                    duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  See Our Work
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -bottom-4 -right-4 hidden h-full w-full
                    border border-blue-600/25 sm:block"
                />
                <div className="relative overflow-hidden rounded-[3px] bg-slate-200">
                  <div className="relative w-full pt-[86%]">
                    <Image
                      src="/projects/main-doors/ss-designer-main-door.webp"
                      alt="Stainless steel designer main door fabricated by RN All Steel Fabrication in Mumbra, Thane"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65
                    to-transparent" />
                  <p className="absolute bottom-4 left-5 right-5 text-[11px]
                    font-semibold uppercase tracking-[0.16em] text-white/90">
                    Our workshop · Mumbra, Thane
                  </p>
                </div>

                <div className="absolute -left-4 top-8 hidden bg-white px-5 py-4
                  shadow-[0_16px_44px_-16px_rgba(15,23,42,0.45)] sm:block lg:-left-7">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-[11px] text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-2 text-2xl font-semibold leading-none tabular-nums
                    text-slate-900">
                    5.0
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase
                    tracking-[0.16em] text-slate-400">
                    41 Google Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="border-b border-gray-200 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`px-2 py-7 sm:px-6 lg:py-9
                  ${i % 2 === 1 ? 'border-l border-gray-200' : ''}
                  ${i > 1 ? 'border-t border-gray-200 lg:border-t-0' : ''}
                  ${i === 2 ? 'lg:border-l' : ''}`}
              >
                <dd className="text-3xl font-semibold leading-none tracking-[-0.02em]
                  tabular-nums text-slate-900 sm:text-4xl">
                  {s.value}
                </dd>
                <dt className="mt-3 text-[13px] font-semibold text-slate-800">
                  {s.label}
                </dt>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em]
                  text-slate-400">
                  {s.note}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════ STORY + SNAPSHOT ══════════ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-600">
                <span className="h-px w-8 bg-blue-600" />
                Our story
              </p>
              <h2 className="mt-6 text-2xl font-semibold leading-tight
                tracking-[-0.02em] text-slate-900 sm:text-3xl lg:text-4xl">
                One workshop. One standard. Fifteen years.
              </h2>

              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-slate-600">
                <p>
                  We started in 2010 with a single shop in Mumbra, making window grills
                  and compound gates for houses on the same few streets. The work grew
                  the way it does in this trade — one satisfied family telling the next.
                </p>
                <p>
                  Today we cover {SERVICES.length} services across the Mumbai
                  Metropolitan Region, from a single balcony railing in a Thane flat to
                  mezzanine platforms in a Bhiwandi warehouse. What has not changed is
                  where the work happens: everything is still fabricated at the Mumbra
                  workshop, by people we employ.
                </p>
                <p>
                  That matters more than it sounds. When a fabricator buys in finished
                  gates and only fits them, nobody can tell you the grade of the steel
                  or why a weld failed. We cut, weld, grind and polish it ourselves, so
                  we can answer for all of it — and we back that with a two-year
                  workmanship warranty.
                </p>
              </div>

              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center gap-3 rounded-[2px] bg-blue-600
                    px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.14em]
                    text-white transition-colors duration-200 hover:bg-blue-700"
                >
                  <FaPhone className="text-[11px]" />
                  Book a Free Site Visit
                </a>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 text-[12px]
                    font-semibold uppercase tracking-[0.14em] text-slate-700
                    transition-colors duration-200 hover:text-blue-700"
                >
                  All {SERVICES.length} services
                  <FaArrowRight className="text-[10px] transition-transform
                    duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Snapshot */}
            <div className="lg:col-span-5">
              <div className="border border-gray-200 bg-slate-50 p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
                  text-slate-400">
                  Company snapshot
                </p>
                <dl className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
                  {SNAPSHOT.map((row) => (
                    <div key={row.label} className="flex items-start justify-between
                      gap-6 py-3.5">
                      <dt className="shrink-0 text-[11px] font-semibold uppercase
                        tracking-[0.12em] text-slate-400">
                        {row.label}
                      </dt>
                      <dd className="text-right text-[13.5px] font-medium text-slate-800">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2.5
                    rounded-[2px] bg-slate-900 px-5 py-3.5 text-[12px] font-semibold
                    uppercase tracking-[0.14em] text-white transition-colors
                    duration-200 hover:bg-slate-800"
                >
                  <FaWhatsapp className="text-sm text-emerald-400" />
                  Get a Free Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ VALUES ══════════ */}
      <section className="border-y border-gray-200 bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              How we work
            </p>
            <h2 className="mt-6 text-2xl font-semibold leading-tight
              tracking-[-0.02em] text-slate-900 sm:text-3xl lg:text-4xl">
              Four things we do not compromise on
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <div key={v.title} className="border-b border-gray-200 py-7">
                <div className="flex items-baseline gap-4">
                  <span className="text-[11px] font-semibold tabular-nums text-blue-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold text-slate-900">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TIMELINE ══════════ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              Our journey
            </p>
            <h2 className="mt-6 text-2xl font-semibold leading-tight
              tracking-[-0.02em] text-slate-900 sm:text-3xl lg:text-4xl">
              From one shop in Mumbra
            </h2>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-2
            lg:grid-cols-4">
            {TIMELINE.map((item) => (
              <li key={item.year} className="bg-white p-6 sm:p-7">
                <p className="text-3xl font-semibold leading-none tabular-nums
                  text-blue-600">
                  {item.year}
                </p>
                <h3 className="mt-5 text-[15px] font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════════ TEAM ══════════ */}
      <section className="border-t border-gray-200 bg-slate-950 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-400">
                <span className="h-px w-8 bg-blue-500" />
                The team
              </p>
              <h2 className="mt-6 text-2xl font-semibold leading-tight
                tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
                The people behind every project
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-slate-400">
                A small, experienced team. The person who visits your site is the
                person accountable for the job — there is nobody to pass you along to.
              </p>
              <a
                href={BUSINESS.phoneHref}
                className="mt-8 inline-flex items-center gap-3 rounded-[2px] border
                  border-white/20 px-6 py-3.5 text-[11px] font-semibold uppercase
                  tracking-[0.14em] text-white transition-colors duration-200
                  hover:border-white/50"
              >
                <FaPhone className="text-[10px]" />
                {BUSINESS.phoneDisplay}
              </a>
            </div>

            <ul className="grid grid-cols-1 gap-px self-start bg-white/10
              sm:grid-cols-2 lg:col-span-7">
              {TEAM.map((member) => (
                <li key={member.name} className="bg-slate-950 p-7">
                  <div className="relative h-20 w-20 overflow-hidden rounded-[3px]
                    bg-slate-800 ring-1 ring-white/10">
                    <Image
                      src={member.img}
                      alt={`${member.name}, ${member.role} at RN All Steel Fabrication`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-5 text-[16px] font-semibold text-white">
                    {member.name}
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase
                    tracking-[0.14em] text-blue-400">
                    {member.role}
                  </p>
                  <Link
                    href="/contact"
                    className="group mt-6 inline-flex items-center gap-2 border-t
                      border-white/10 pt-5 text-[11px] font-semibold uppercase
                      tracking-[0.14em] text-slate-300 transition-colors duration-200
                      hover:text-white"
                  >
                    Get in touch
                    <FaArrowRight className="text-[10px] transition-transform
                      duration-200 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════ COVERAGE ══════════ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold
            uppercase tracking-[0.24em] text-blue-600">
            <span className="h-px w-8 bg-blue-600" />
            Where we work
          </p>
          <h2 className="mt-6 text-2xl font-semibold tracking-[-0.02em]
            text-slate-900 sm:text-3xl">
            Free site visits across the MMR
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {CORE_LOCATIONS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/locations/${c.slug}`}
                  className="inline-flex items-center gap-2 border border-gray-200
                    bg-white px-3.5 py-2 text-[13px] text-slate-700 transition-colors
                    duration-150 hover:border-blue-600 hover:text-blue-700"
                >
                  <FaMapMarkerAlt className="text-[10px] text-blue-600" />
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 border border-slate-900
                  bg-slate-900 px-3.5 py-2 text-[13px] font-medium text-white
                  transition-colors duration-150 hover:bg-slate-800"
              >
                All Maharashtra
                <FaArrowRight className="text-[9px]" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand
        title="Ready to build something that lasts?"
        subtitle="Free site visit, itemised quotation within 24 hours, and a two-year workmanship warranty."
      />
    </>
  );
}
