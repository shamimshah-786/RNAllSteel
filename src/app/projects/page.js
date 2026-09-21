import Link from 'next/link';
import { FaArrowRight, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { PROJECTS, projectGroups } from '@/data/projects';
import { CORE_LOCATIONS } from '@/data/locations';
import { BUSINESS, buildMetadata, breadcrumbSchema, jsonLd } from '@/lib/seo';
import { withLinks, imageGallerySchema } from '@/lib/projects';
import ProjectGallery from '@/components/projects/ProjectGallery';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Steel Design Gallery — Gates, Railings & Grills | RN All Steel',
  description:
    'Browse completed steel designs in Mumbai, Thane & Mumbra — main gates, SS railings, window grills, safety doors and collapsible gates. Pick a design, we quote it.',
  path: '/projects',
  image: '/projects/main-gates/ss-swing-compound-main-gate.webp',
  imageAlt: 'Steel design gallery by RN All Steel Fabrication',
  keywords: [
    'steel design gallery',
    'main gate design photos',
    'SS railing design',
    'window grill design',
    'safety door design',
    'steel fabrication portfolio Thane',
  ],
});

export default function ProjectsPage() {
  const groups = projectGroups();
  const linked = withLinks(PROJECTS);
  const filters = groups.map((g) => ({
    slug: g.slug,
    name: g.name,
    count: g.projects.length,
  }));

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
    ]),
    imageGallerySchema({
      projects: PROJECTS,
      name: 'Steel design gallery — RN All Steel Fabrication',
      description:
        'Completed main gates, railings, window grills, safety doors and commercial steelwork across Mumbai, Thane and Mumbra.',
      path: '/projects',
    }),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      ))}

      {/* ══════════ HEADER ══════════ */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
            ]}
          />
          <div className="flex flex-col gap-6 pb-10 sm:flex-row sm:items-end
            sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-600">
                <span className="h-px w-8 bg-blue-600" />
                {PROJECTS.length} designs
              </p>
              <h1 className="mt-5 text-[2rem] font-semibold leading-[1.1]
                tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.9rem]">
                Find a design you like
              </h1>
              <p className="mt-4 max-w-lg text-[15px] text-slate-600">
                Real work from our workshop. Tap any photo, then send it to us —
                we quote it for your measurements.
              </p>
            </div>

            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-3
                rounded-[2px] bg-blue-600 px-7 py-4 text-[12px] font-semibold
                uppercase tracking-[0.14em] text-white transition-colors
                duration-200 hover:bg-blue-700"
            >
              <FaWhatsapp className="text-sm" />
              Ask for a quote
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ GALLERY ══════════ */}
      <section className="bg-white pb-16 pt-8 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectGallery projects={linked} filters={filters} priority />
        </div>
      </section>

      {/* ══════════ BROWSE BY TYPE ══════════ */}
      <section className="border-t border-gray-200 bg-slate-50 py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
            text-slate-400">
            Browse by type
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-px bg-gray-200 sm:grid-cols-3
            lg:grid-cols-6">
            {groups.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/projects/${g.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 bg-white
                    p-5 transition-colors duration-200 hover:bg-blue-50"
                >
                  <span className="text-[13.5px] font-semibold leading-snug
                    text-slate-900 transition-colors duration-200
                    group-hover:text-blue-700">
                    {g.heading}
                  </span>
                  <span className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tabular-nums
                      text-slate-400">
                      {String(g.projects.length).padStart(2, '0')}
                    </span>
                    <FaArrowRight className="text-[10px] text-slate-300
                      transition-all duration-200 group-hover:translate-x-1
                      group-hover:text-blue-600" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="bg-slate-950 py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6
            lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white
                sm:text-3xl">
                Seen one you like?
              </h2>
              <p className="mt-3 text-[15px] text-slate-400">
                Send us the photo — free site visit, quote in 24 hours.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
                WhatsApp us
              </a>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-[2px]
                  border border-white/20 px-7 py-4 text-[12px] font-semibold uppercase
                  tracking-[0.14em] text-white transition-colors duration-200
                  hover:border-white/50"
              >
                <FaPhone className="text-[11px]" />
                {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Quiet internal links — kept for crawlers, low visual weight */}
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10
            pt-7">
            {CORE_LOCATIONS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/locations/${c.slug}`}
                  className="text-[12px] text-slate-500 transition-colors duration-150
                    hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
