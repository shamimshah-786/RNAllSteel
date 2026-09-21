import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { SERVICES, TOP_SERVICES } from "@/data/services";
import { CORE_LOCATIONS } from "@/data/locations";

/* The homepage shows the top services only. The full list lives on
   /services — see src/data/services.js to change which are "top". */
export default function Services() {
  const featured = TOP_SERVICES.slice(0, 9);
  const cities = CORE_LOCATIONS.slice(0, 10);

  return (
    <section id="services" className="bg-slate-50 py-20 sm:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════ HEADER ══════════ */}
        <div className="flex flex-col gap-8 border-b border-gray-200 pb-12
          lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              What we build
            </p>
            <h2 className="mt-6 text-3xl font-semibold leading-[1.14]
              tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Top steel fabrication{" "}
              <span className="text-blue-600">services</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600">
              Our most-requested work. All {SERVICES.length} services — railings,
              gates, grills, doors, windows, sheds and custom fabrication — are on
              the services page.
            </p>
          </div>

          <a
            href="https://wa.me/919665181246"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-3
              rounded-[2px] bg-blue-600 px-7 py-4 text-[12px] font-semibold
              uppercase tracking-[0.14em] text-white transition-colors
              duration-200 hover:bg-blue-700"
          >
            <FaWhatsapp className="text-sm" />
            Get a Free Quote
          </a>
        </div>

        {/* ══════════ GRID ══════════ */}
        <div className="mt-px grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-2
          lg:grid-cols-3">
          {featured.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col bg-white transition-colors duration-300
                hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-inset focus-visible:ring-blue-600"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-slate-200">
                <div className="relative w-full pt-[64%]">
                  <Image
                    src={s.image}
                    alt={`${s.name} — RN All Steel Fabrication, Mumbai & Thane`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700
                      group-hover:scale-[1.05]"
                  />
                </div>
                <div className="absolute inset-0 bg-slate-950/10 transition-opacity
                  duration-300 group-hover:opacity-0" />
                <span className="absolute left-0 top-0 bg-white px-3 py-2
                  text-[11px] font-semibold tabular-nums tracking-[0.1em]
                  text-slate-900">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-slate-900
                  transition-colors duration-200 group-hover:text-blue-700">
                  {s.name}
                </h3>
                <p className="mt-1.5 text-[11px] font-semibold uppercase
                  tracking-[0.14em] text-slate-400">
                  {s.tagline}
                </p>

                <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-slate-600">
                  {s.summary}
                </p>

                <ul className="mt-5 space-y-2">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px]
                      leading-snug text-slate-600">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-blue-600" />
                      {f}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-2 border-t
                  border-gray-200 pt-5 text-[11px] font-semibold uppercase
                  tracking-[0.14em] text-blue-600">
                  View details
                  <FaArrowRight className="text-[10px] transition-transform
                    duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ══════════ ALL SERVICES LINK ══════════ */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6
          border border-gray-200 bg-white p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-xl font-semibold tracking-[-0.01em] text-slate-900
              sm:text-2xl">
              {SERVICES.length} services under one roof
            </p>
            <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-slate-600">
              Aluminium and frameless glass railings, sliding and swing gates,
              canopies, parking sheds, UPVC and aluminium windows, glass partitions,
              and custom fabrication for anything not on the list.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-3 rounded-[2px]
              bg-slate-900 px-7 py-4 text-[12px] font-semibold uppercase
              tracking-[0.14em] text-white transition-colors duration-200
              hover:bg-slate-800"
          >
            View All Services
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        {/* ══════════ SERVICE AREA ══════════ */}
        <div className="mt-10 border-t border-gray-200 pt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
            text-slate-400">
            Free site visit across the Mumbai Metropolitan Region
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {cities.map((c) => (
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
  );
}
