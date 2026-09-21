import Link from 'next/link';
import { FaArrowRight, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import { PROJECTS, projectGroups } from '@/data/projects';
import { withLinks } from '@/lib/projects';
import ProjectGallery from '@/components/projects/ProjectGallery';

/* Homepage strip: the featured project from each category, so the
   visitor sees the range of work rather than eight variations of the
   same railing. The full gallery lives at /projects. */
export default function ProjectsSection() {
  const groups = projectGroups();

  /* One featured shot per category, then top up to 8 from the rest. */
  const leads = groups
    .map((g) => g.projects.find((p) => p.featured) || g.projects[0])
    .filter(Boolean);
  const extras = PROJECTS.filter(
    (p) => p.featured && !leads.some((l) => l.slug === p.slug)
  );
  const showcase = withLinks([...leads, ...extras].slice(0, 8));

  return (
    <section id="projects" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════ HEADER ══════════ */}
        <div className="flex flex-col gap-8 border-b border-gray-200 pb-12
          lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              Our work
            </p>
            <h2 className="mt-6 text-3xl font-semibold leading-[1.14]
              tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Find a design<br />
              <span className="text-blue-600">you like.</span>
            </h2>
            <p className="mt-5 text-[15px] text-slate-600">
              Tap any photo to see the material, finish and reference number.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-3 rounded-[2px]
              bg-slate-900 px-7 py-4 text-[12px] font-semibold uppercase
              tracking-[0.14em] text-white transition-colors duration-200
              hover:bg-slate-800"
          >
            Browse all {PROJECTS.length} designs
            <HiArrowUpRight className="text-sm transition-transform duration-200
              group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ══════════ CATEGORY RAIL ══════════ */}
        <nav aria-label="Project categories" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/projects/${g.slug}`}
                  /* The visual gap comes from flex; spell it out for
                     screen readers so this is not read as "Main Gates07". */
                  aria-label={`${g.name} — ${g.projects.length} projects`}
                  className="group inline-flex items-baseline gap-2 border
                    border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium
                    text-slate-700 transition-colors duration-150
                    hover:border-blue-600 hover:text-blue-700"
                >
                  {g.name}
                  <span className="text-[11px] tabular-nums text-slate-400
                    group-hover:text-blue-500">
                    {String(g.projects.length).padStart(2, '0')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ══════════ GALLERY ══════════ */}
        <div className="mt-6">
          <ProjectGallery projects={showcase} priority />
        </div>

        {/* ══════════ CTA ══════════ */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6
          bg-slate-950 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em]
              text-blue-400">
              Start your project
            </p>
            <p className="mt-4 max-w-md text-xl font-semibold leading-snug
              tracking-[-0.01em] text-white sm:text-2xl">
              Want work like this at your home or office?
            </p>
            <p className="mt-3 text-[13px] text-slate-400">
              Free site visit · Transparent pricing · Mumbai, Thane &amp; Mumbra
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="https://wa.me/919665181246"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-[2px]
                bg-blue-600 px-6 py-3.5 text-[11px] font-semibold uppercase
                tracking-[0.14em] text-white transition-colors duration-200
                hover:bg-blue-700"
            >
              <FaWhatsapp className="text-sm" />
              WhatsApp Now
            </a>
            <a
              href="tel:+919665181246"
              className="inline-flex items-center justify-center gap-2.5 rounded-[2px]
                border border-white/20 px-6 py-3.5 text-[11px] font-semibold uppercase
                tracking-[0.14em] text-white transition-colors duration-200
                hover:border-white/50"
            >
              <FaPhone className="text-[10px]" />
              Call Direct
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
