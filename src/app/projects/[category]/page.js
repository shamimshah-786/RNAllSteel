import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaArrowRight, FaPhone, FaWhatsapp } from 'react-icons/fa';
import {
  PROJECT_CATEGORIES,
  getCategory,
  projectsIn,
  projectGroups,
} from '@/data/projects';
import { getService } from '@/data/services';
import { CORE_LOCATIONS } from '@/data/locations';
import { BUSINESS, buildMetadata, breadcrumbSchema, jsonLd } from '@/lib/seo';
import { linkedProjectsIn, imageGallerySchema } from '@/lib/projects';
import ProjectGallery from '@/components/projects/ProjectGallery';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_CATEGORIES.filter((c) => projectsIn(c.slug).length > 0).map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const count = projectsIn(slug).length;

  return buildMetadata({
    title: `${category.heading} — Photo Gallery | RN All Steel`,
    description: `${count} completed ${category.name.toLowerCase()} in Mumbai, Thane & Mumbra. ${category.summary}`,
    path: `/projects/${category.slug}`,
    image: projectsIn(slug)[0]?.src,
    imageAlt: `${category.heading} by RN All Steel Fabrication`,
    keywords: [
      ...category.keywords,
      `${category.name} Mumbai`,
      `${category.name} Thane`,
      `${category.name} photos`,
      `${category.name} gallery`,
    ],
  });
}

export default async function Page({ params }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  const projects = projectsIn(slug);
  if (!category || projects.length === 0) notFound();

  const linked = linkedProjectsIn(slug);
  const service = getService(category.service);
  const others = projectGroups().filter((g) => g.slug !== slug);

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: category.name, path: `/projects/${category.slug}` },
    ]),
    imageGallerySchema({
      projects,
      name: `${category.heading} — RN All Steel Fabrication`,
      description: category.summary,
      path: `/projects/${category.slug}`,
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
              { name: category.name, path: `/projects/${category.slug}` },
            ]}
          />
          <div className="flex flex-col gap-6 pb-10 sm:flex-row sm:items-end
            sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold
                uppercase tracking-[0.24em] text-blue-600">
                <span className="h-px w-8 bg-blue-600" />
                {projects.length} designs
              </p>
              <h1 className="mt-5 text-[2rem] font-semibold leading-[1.1]
                tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.9rem]">
                {category.heading}
              </h1>
              <p className="mt-4 max-w-lg text-[15px] text-slate-600">
                {category.summary}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
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
                Ask for a quote
              </a>
              {service && (
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center gap-3 rounded-[2px]
                    border border-slate-300 px-7 py-4 text-[12px] font-semibold
                    uppercase tracking-[0.14em] text-slate-800 transition-colors
                    duration-200 hover:border-slate-900"
                >
                  Sizes &amp; pricing
                  <FaArrowRight className="text-[10px]" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ GALLERY ══════════ */}
      <section className="bg-white pb-16 pt-8 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectGallery projects={linked} priority />
        </div>
      </section>

      {/* ══════════ OTHER GALLERIES — visual, not cards of copy ══════════ */}
      <section className="border-t border-gray-200 bg-slate-50 py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
            text-slate-400">
            More designs
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5
            sm:gap-4">
            {others.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/projects/${g.slug}`}
                  className="group relative block overflow-hidden rounded-[3px]
                    bg-slate-200"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={g.projects[0].src}
                      alt={`${g.heading} by RN All Steel Fabrication`}
                      fill
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700
                        group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t
                    from-slate-950/85 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-3.5">
                    <span className="block text-[13px] font-semibold leading-snug
                      text-white">
                      {g.name}
                    </span>
                    <span className="mt-0.5 block text-[10px] font-medium
                      tabular-nums uppercase tracking-[0.14em] text-white/60">
                      {String(g.projects.length).padStart(2, '0')} designs
                    </span>
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
                Like one of these {category.name.toLowerCase()}?
              </h2>
              <p className="mt-3 text-[15px] text-slate-400">
                Send us the reference number — we quote it for your opening size.
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

          {/* Quiet internal links for crawlers */}
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10
            pt-7">
            {CORE_LOCATIONS.slice(0, 12).map((c) => (
              <li key={c.slug}>
                <Link
                  href={service ? `/services/${service.slug}/${c.slug}` : `/locations/${c.slug}`}
                  className="text-[12px] text-slate-500 transition-colors duration-150
                    hover:text-white"
                >
                  {service ? service.short : category.name} in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
