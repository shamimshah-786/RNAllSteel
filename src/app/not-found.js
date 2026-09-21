import Link from 'next/link';
import { FaArrowRight, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { TOP_SERVICES } from '@/data/services';
import { BUSINESS } from '@/lib/seo';

export const metadata = {
  title: { absolute: 'Page not found | RN All Steel Fabrication' },
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: '/services', label: 'All services', sub: 'Railings, gates, grills, doors & more' },
  { href: '/projects', label: 'Project gallery', sub: 'Photos of completed work' },
  { href: '/locations', label: 'Service areas', sub: 'Where we work across Maharashtra' },
  { href: '/blog', label: 'Guides', sub: 'Materials, designs and pricing explained' },
];

export default function NotFound() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              Error 404
            </p>

            <h1 className="mt-6 text-[2rem] font-semibold leading-[1.12]
              tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.9rem]">
              This page doesn&rsquo;t exist
            </h1>

            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-slate-600
              sm:text-base">
              The link may be out of date, or the page may have been renamed. Everything
              we build is still here — pick a section below, or just call us and tell us
              what you need.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 rounded-[2px]
                  bg-blue-600 px-7 py-4 text-[12px] font-semibold uppercase
                  tracking-[0.14em] text-white transition-colors duration-200
                  hover:bg-blue-700"
              >
                Back to home
                <FaArrowRight className="text-[10px]" />
              </Link>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-[2px]
                  border border-slate-300 px-7 py-4 text-[12px] font-semibold uppercase
                  tracking-[0.14em] text-slate-800 transition-colors duration-200
                  hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                <FaPhone className="text-[11px]" />
                {BUSINESS.phoneDisplay}
              </a>
            </div>

            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 text-[13px]
                font-semibold text-slate-600 transition-colors duration-150
                hover:text-emerald-700"
            >
              <FaWhatsapp className="text-base text-emerald-500" />
              Or send us a message on WhatsApp
            </a>
          </div>

          {/* Wayfinding */}
          <div className="lg:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
              text-slate-400">
              Where to next
            </p>
            <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span>
                      <span className="block text-[15px] font-semibold text-slate-900
                        transition-colors duration-200 group-hover:text-blue-700">
                        {l.label}
                      </span>
                      <span className="mt-1 block text-[13px] text-slate-500">
                        {l.sub}
                      </span>
                    </span>
                    <FaArrowRight className="shrink-0 text-[11px] text-slate-300
                      transition-all duration-200 group-hover:translate-x-1
                      group-hover:text-blue-600" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em]
              text-slate-400">
              Popular services
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {TOP_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex border border-gray-200 bg-white px-3.5 py-2
                      text-[13px] text-slate-700 transition-colors duration-150
                      hover:border-blue-600 hover:text-blue-700"
                  >
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
