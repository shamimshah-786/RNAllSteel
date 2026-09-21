import Link from "next/link";
import Image from "next/image";
import {
  FaArrowRight,
  FaPhone,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";

const CREDENTIALS = [
  { value: "15+",  label: "Years of Experience", sub: "Established 2010" },
  { value: "500+", label: "Projects Delivered",  sub: "Mumbai & Thane" },
  { value: "5.0",  label: "Google Rating",       sub: "41 Verified Reviews" },
  { value: "7",    label: "Days a Week",         sub: "9:30 AM – 9:15 PM" },
];

export default function Hero() {
  return (
    <section className="relative bg-white">
      {/* Very subtle blueprint grid — barely there, adds depth without noise */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">

          {/* ══════════ LEFT — copy ══════════ */}
          <div className="lg:col-span-6">
            {/* Eyebrow */}
            <p className="rise rise-1 inline-flex items-center gap-3 text-[11px]
              font-semibold uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              Steel Fabrication Since 2010
            </p>

            {/* Heading */}
            <h1 className="rise rise-2 mt-6 text-[2.15rem] font-semibold leading-[1.1]
              tracking-[-0.025em] text-slate-900 sm:text-5xl lg:text-[3.4rem]">
              Premium{" "}
              <span className="text-blue-600">Steel Fabrication</span>{" "}
              in Mumbai &amp; Thane
            </h1>

            {/* Sub-copy */}
            <p className="rise rise-3 mt-6 max-w-xl text-[15px] leading-relaxed
              text-slate-600 sm:text-base">
              SS railings, main gates, security doors, window grills and kitchen
              counters — designed, fabricated and installed by our own team.
              One workshop, one standard, no middlemen.
            </p>

            {/* Hairline feature list */}
            <ul className="rise rise-3 mt-8 grid max-w-lg grid-cols-1 gap-x-8
              border-t border-gray-200 sm:grid-cols-2">
              {[
                "Free site visit & measurement",
                "Transparent, itemised pricing",
                "SS 304 / MS grade materials",
                "On-time, on-budget delivery",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-gray-200 py-3.5
                    text-[13px] font-medium text-slate-700"
                >
                  <span className="h-1.5 w-1.5 shrink-0 bg-blue-600" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3
                  rounded-[2px] bg-blue-600 px-7 py-4 text-[12px] font-semibold
                  uppercase tracking-[0.14em] text-white transition-colors
                  duration-200 hover:bg-blue-700 active:bg-blue-800"
              >
                Get a Free Quote
                <FaArrowRight className="text-[10px] transition-transform
                  duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-3 rounded-[2px]
                  border border-slate-300 px-7 py-4 text-[12px] font-semibold
                  uppercase tracking-[0.14em] text-slate-800 transition-colors
                  duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                View Our Work
              </Link>
            </div>

            {/* Direct contact line */}
            <div className="rise rise-4 mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a
                href="tel:+919665181246"
                className="group inline-flex items-center gap-3 text-sm text-slate-600
                  transition-colors duration-150 hover:text-blue-700"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-[2px]
                  border border-gray-200 text-blue-600 transition-colors duration-150
                  group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                  <FaPhone className="text-[11px]" />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase
                    tracking-[0.18em] text-slate-400">
                    Call direct
                  </span>
                  <span className="block font-semibold text-slate-900">
                    +91 96651 81246
                  </span>
                </span>
              </a>

              <a
                href="https://wa.me/919665181246"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm text-slate-600
                  transition-colors duration-150 hover:text-emerald-700"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-[2px]
                  border border-gray-200 text-emerald-500 transition-colors duration-150
                  group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white">
                  <FaWhatsapp className="text-sm" />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase
                    tracking-[0.18em] text-slate-400">
                    WhatsApp
                  </span>
                  <span className="block font-semibold text-slate-900">
                    Instant quote
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* ══════════ RIGHT — image composition ══════════ */}
          <div className="rise rise-2 lg:col-span-6">
            <div className="relative">
              {/* Primary image — with an offset frame behind it,
                  a classic architectural detail */}
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -bottom-4 -right-4 hidden h-full w-full
                    border border-blue-600/25 sm:block"
                />
                <div className="relative overflow-hidden rounded-[3px] bg-slate-200">
                  <div className="relative w-full pt-[74%] lg:pt-[86%]">
                    <Image
                      src="/images/banner.jpg"
                      alt="RN All Steel Fabrication workshop — industrial steel fabrication in Mumbai and Thane"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t
                    from-slate-950/70 via-transparent to-transparent" />

                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[10px] font-semibold uppercase
                      tracking-[0.2em] text-blue-300">
                      In the workshop
                    </p>
                    <p className="mt-1.5 text-base font-semibold leading-snug
                      text-white sm:text-lg">
                      Precision welding &amp; mirror finishing
                    </p>
                  </div>
                </div>

                {/* Rating card — overlaps the image edge */}
                <div className="absolute -left-4 top-8 hidden bg-white px-5 py-4
                  shadow-[0_16px_44px_-16px_rgba(15,23,42,0.45)] sm:block lg:-left-7">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-[11px] text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-2 text-2xl font-semibold leading-none
                    tabular-nums text-slate-900">
                    5.0
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase
                    tracking-[0.16em] text-slate-400">
                    41 Google Reviews
                  </p>
                </div>
              </div>

              {/* Secondary images — thin strip below */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-9">
                {[
                  { src: "/images/glass.jpg", alt: "Glass railings Mumbai", label: "Glass Railings" },
                  { src: "/images/staircase-railing.jpg", alt: "Staircase steel railings Thane", label: "Staircase Railings" },
                ].map((img) => (
                  <div key={img.src} className="group relative overflow-hidden
                    rounded-[3px] bg-slate-200">
                    <div className="relative w-full pt-[62%]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700
                          group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t
                      from-slate-950/75 to-transparent" />
                    <p className="absolute bottom-3 left-3 text-[11px] font-semibold
                      uppercase tracking-[0.14em] text-white">
                      {img.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ CREDENTIAL BAR ══════════ */}
      <div className="relative border-y border-gray-200 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.map((c, i) => (
              <div
                key={c.label}
                className={`px-2 py-7 sm:px-6 lg:py-9
                  ${i % 2 === 1 ? "border-l border-gray-200" : ""}
                  ${i > 1 ? "border-t border-gray-200 lg:border-t-0" : ""}
                  ${i === 2 ? "lg:border-l" : ""}`}
              >
                <dd className="text-3xl font-semibold leading-none tracking-[-0.02em]
                  tabular-nums text-slate-900 sm:text-4xl">
                  {c.value}
                </dd>
                <dt className="mt-3 text-[13px] font-semibold text-slate-800">
                  {c.label}
                </dt>
                <p className="mt-1 text-[11px] font-medium uppercase
                  tracking-[0.12em] text-slate-400">
                  {c.sub}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
