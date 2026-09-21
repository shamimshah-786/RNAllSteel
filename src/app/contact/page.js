import Link from 'next/link';
import {
  FaArrowRight,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
} from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import { servicesByCategory } from '@/data/services';
import { CORE_LOCATIONS } from '@/data/locations';
import {
  BUSINESS,
  SITE_URL,
  buildMetadata,
  breadcrumbSchema,
  jsonLd,
} from '@/lib/seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = buildMetadata({
  title: 'Contact RN All Steel Fabrication | Mumbra, Thane',
  description:
    'Call, WhatsApp or send an enquiry for steel fabrication in Mumbai, Thane & Mumbra. Free site visit and measurement, itemised quote within 24 hours.',
  path: '/contact',
  keywords: [
    'contact steel fabricator Thane',
    'steel fabrication quote Mumbai',
    'steel fabricator near me Mumbra',
    'free site visit steel fabrication',
  ],
});

const INFO = [
  {
    icon: FaPhone,
    label: 'Call us',
    value: BUSINESS.phoneDisplay,
    note: 'Fastest way to reach us',
    href: BUSINESS.phoneHref,
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: 'Send photos & sizes',
    note: 'Quick replies during working hours',
    href: BUSINESS.whatsapp,
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: BUSINESS.email,
    note: 'For drawings and detailed scopes',
    href: `mailto:${BUSINESS.email}`,
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Workshop',
    value: 'Mokashi Pada Road, Mumbra',
    note: 'Khot Bunglow, near International Kata, Thane 400612',
    href: BUSINESS.mapsUrl,
  },
  {
    icon: FaClock,
    label: 'Working hours',
    value: BUSINESS.hoursLong,
    note: 'Site visits by appointment',
    href: null,
  },
];

export default function ContactPage() {
  const serviceGroups = servicesByCategory().map((g) => ({
    category: g.category,
    items: g.items.map((s) => s.name),
  }));

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  const schemas = [
    breadcrumbSchema(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact RN All Steel Fabrication Work',
      url: `${SITE_URL}/contact`,
      mainEntity: {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: BUSINESS.name,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        url: SITE_URL,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS.street,
          addressLocality: BUSINESS.locality,
          addressRegion: BUSINESS.region,
          postalCode: BUSINESS.postalCode,
          addressCountry: BUSINESS.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: BUSINESS.lat,
          longitude: BUSINESS.lng,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: BUSINESS.phone,
          contactType: 'Customer Service',
          areaServed: 'IN-MH',
          availableLanguage: ['en', 'hi', 'mr'],
        },
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

          <div className="grid grid-cols-1 items-end gap-10 pb-14 lg:grid-cols-12 lg:pb-16">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-600">
                <span className="h-px w-8 bg-blue-600" />
                Free consultation
              </p>
              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.12]
                tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.9rem]">
                Let&rsquo;s build{' '}
                <span className="text-blue-600">something together</span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-600
                sm:text-base">
                Tell us what you need and we will visit your site, measure it, and come
                back with a drawing and an itemised price — at no cost and with no
                obligation to proceed.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex w-full items-center justify-center gap-3
                  rounded-[2px] bg-slate-900 px-6 py-4 text-[12px] font-semibold
                  uppercase tracking-[0.14em] text-white transition-colors
                  duration-200 hover:bg-slate-800 sm:w-auto"
              >
                <FaPhone className="text-[11px]" />
                {BUSINESS.phoneDisplay}
              </a>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3
                  rounded-[2px] bg-blue-600 px-6 py-4 text-[12px] font-semibold
                  uppercase tracking-[0.14em] text-white transition-colors
                  duration-200 hover:bg-blue-700 sm:w-auto"
              >
                <FaWhatsapp className="text-sm" />
                WhatsApp for a quick reply
              </a>
              <p className="text-[12px] text-slate-400 lg:text-right">
                {BUSINESS.hoursShort} · Free site visits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FORM + INFO ══════════ */}
      <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Info */}
            <aside className="lg:col-span-4">
              <div className="border border-gray-200 bg-white">
                <p className="border-b border-gray-200 px-6 py-5 text-[11px]
                  font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Contact details
                </p>
                <ul className="divide-y divide-gray-200">
                  {INFO.map(({ icon: Icon, label, value, note, href }) => {
                    const inner = (
                      <span className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center
                          justify-center rounded-[2px] border border-gray-200
                          text-blue-600">
                          <Icon className="text-sm" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-semibold uppercase
                            tracking-[0.14em] text-slate-400">
                            {label}
                          </span>
                          <span className="mt-1 block break-words text-[14px]
                            font-semibold text-slate-900">
                            {value}
                          </span>
                          <span className="mt-1 block text-[12px] leading-snug
                            text-slate-500">
                            {note}
                          </span>
                        </span>
                      </span>
                    );
                    return (
                      <li key={label}>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="block px-6 py-5 transition-colors duration-150
                              hover:bg-slate-50"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div className="px-6 py-5">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Trust strip */}
              <dl className="mt-4 grid grid-cols-3 gap-px border border-gray-200
                bg-gray-200">
                {[
                  { v: '15+', k: 'Years' },
                  { v: '500+', k: 'Projects' },
                  { v: '5.0', k: 'Rating' },
                ].map((s) => (
                  <div key={s.k} className="bg-white px-3 py-5 text-center">
                    <dd className="text-xl font-semibold leading-none tabular-nums
                      text-slate-900">
                      {s.v}
                    </dd>
                    <dt className="mt-2 text-[10px] font-semibold uppercase
                      tracking-[0.14em] text-slate-400">
                      {s.k}
                    </dt>
                  </div>
                ))}
              </dl>

              {/* Onsite repairs */}
              <div className="mt-4 bg-slate-950 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]
                  text-blue-400">
                  Repairs &amp; onsite welding
                </p>
                <p className="mt-3 text-[15px] font-semibold leading-snug text-white">
                  Something broken or sagging?
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                  We take repair and modification work on existing gates, railings and
                  grills — including onsite welding where the piece cannot be moved.
                </p>
                <a
                  href={BUSINESS.phoneHref}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2.5
                    rounded-[2px] border border-white/20 px-4 py-3 text-[11px]
                    font-semibold uppercase tracking-[0.14em] text-white
                    transition-colors duration-200 hover:border-white/50"
                >
                  <FaPhone className="text-[10px]" />
                  Call about a repair
                </a>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-8">
              <ContactForm services={serviceGroups} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MAP ══════════ */}
      <section className="border-t border-gray-200 bg-white py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4
              border-b border-gray-200 px-6 py-5">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-[2px] border border-gray-200 text-blue-600">
                  <FaMapMarkerAlt className="text-sm" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-slate-900">
                    R N All Steel Fabrication Work
                  </p>
                  <p className="mt-0.5 text-[12px] text-slate-500">
                    Mokashi Pada Road, Mumbra, Thane 400612
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[2px] bg-blue-600
                    px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em]
                    text-white transition-colors duration-200 hover:bg-blue-700"
                >
                  Get directions
                  <HiArrowUpRight className="text-xs" />
                </a>
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center gap-2 rounded-[2px] border
                    border-gray-300 px-5 py-3 text-[11px] font-semibold uppercase
                    tracking-[0.14em] text-slate-700 transition-colors duration-200
                    hover:border-slate-900"
                >
                  <FaPhone className="text-[10px]" />
                  Call
                </a>
              </div>
            </div>

            <div className="aspect-[16/7] min-h-[260px] w-full">
              <iframe
                title="RN All Steel Fabrication Work — workshop location in Mumbra, Thane"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.5977662075215!2d73.0530383752066!3d19.12529398208948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c11ef7e7c55b%3A0x3dd724fa7f889349!2sR%20N%20ALL%20STEEL%20FABRICATION%20WORK!5e0!3m2!1sen!2sin!4v1762280155663!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Service areas */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
              text-slate-400">
              Free site visits across
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
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
        </div>
      </section>
    </>
  );
}
