import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaPhone, FaQuoteLeft, FaStar } from "react-icons/fa";

const DELIVERABLES = [
  { title: "Precision Engineering",    desc: "Measured on site, cut to the millimetre." },
  { title: "Certified Materials",      desc: "SS 304, MS and aluminium from trusted mills." },
  { title: "Timely Completion",        desc: "Agreed dates, held to — every project." },
  { title: "Transparent Pricing",      desc: "Itemised quotes with no hidden additions." },
  { title: "Custom Design Solutions",  desc: "Your drawing, or ours — built to fit." },
  { title: "After-Sales Support",      desc: "Servicing and repairs long after handover." },
];

const PROCESS = [
  { step: "01", title: "Site Visit",           desc: "Free consultation, measurement and material advice at your location." },
  { step: "02", title: "Design & Quote",       desc: "A drawing and an itemised quotation — approved before we cut a single bar." },
  { step: "03", title: "Fabricate & Install",  desc: "Built in our Mumbra workshop, installed and finished by our own team." },
];

export default function AboutSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════ INTRO ══════════ */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* LEFT — heading + story */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              About Us
            </p>

            <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.14]
              tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Mumbai&rsquo;s most <span className="text-blue-600">trusted</span>{" "}
              steel fabricators.
            </h2>

            <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed
              text-slate-600">
              <p>
                <strong className="font-semibold text-slate-900">
                  RN All Steel Fabrication
                </strong>{" "}
                has been crafting precision steel structures across Mumbai, Thane
                and Mumbra since 2010 — building a reputation not on promises, but
                on work that speaks for itself.
              </p>
              <p>
                From sleek{" "}
                <strong className="font-semibold text-slate-900">
                  glass railings and security doors
                </strong>{" "}
                to heavy-duty industrial frameworks, every project gets the same
                attention to detail — whether it is a single window grill or a full
                commercial buildout.
              </p>
              <p>
                Every weld, every finish and every delivery date is a commitment we
                take personally. That is why{" "}
                <strong className="font-semibold text-slate-900">500+ clients</strong>{" "}
                across the region trust us with their most important spaces.
              </p>
            </div>

            {/* CTA row */}
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <a
                href="tel:+919665181246"
                className="inline-flex items-center gap-3 rounded-[2px] bg-blue-600
                  px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.14em]
                  text-white transition-colors duration-200 hover:bg-blue-700"
              >
                <FaPhone className="text-[11px]" />
                Book a Free Site Visit
              </a>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-[12px]
                  font-semibold uppercase tracking-[0.14em] text-slate-700
                  transition-colors duration-200 hover:text-blue-700"
              >
                More about us
                <FaArrowRight className="text-[10px] transition-transform
                  duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT — image + review */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[3px] bg-slate-200">
              <div className="relative w-full pt-[80%]">
                <Image
                  src="/images/banner2.jpg"
                  alt="RN All Steel Fabrication team at work in Mumbra, Thane"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t
                from-slate-950/60 to-transparent" />
              <p className="absolute bottom-4 left-5 text-[11px] font-semibold
                uppercase tracking-[0.16em] text-white/90">
                On site · Mumbai, Thane &amp; Mumbra
              </p>
            </div>

            {/* Review callout */}
            <figure className="mt-6 border border-gray-200 bg-slate-50 p-6">
              <FaQuoteLeft className="text-base text-blue-600" />
              <blockquote className="mt-4 text-[15px] italic leading-relaxed text-slate-700">
                &ldquo;Good people, good service &amp; good work — exactly as
                promised.&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between
                border-t border-gray-200 pt-4">
                <span className="text-[11px] font-semibold uppercase
                  tracking-[0.14em] text-slate-500">
                  Verified Google customer
                </span>
                <span className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-[11px] text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-sm font-semibold tabular-nums
                    text-slate-900">5.0</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* ══════════ WHAT WE DELIVER ══════════ */}
        <div className="mt-20 border-t border-gray-200 pt-14 lg:mt-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em]
            text-slate-400">
            What we deliver
          </p>

          <div className="mt-8 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((d, i) => (
              <div
                key={d.title}
                className="group border-b border-gray-200 py-6"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[11px] font-semibold tabular-nums
                    text-blue-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-slate-900
                      transition-colors duration-200 group-hover:text-blue-700">
                      {d.title}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
                      {d.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ PROCESS ══════════ */}
        <div className="mt-16 bg-slate-950 p-8 sm:p-12 lg:p-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em]
                text-blue-400">
                How we work
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em]
                text-white sm:text-3xl">
                Three steps, start to finish.
              </h3>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed text-slate-400">
              No surprises, no revised bills at handover — you approve every stage
              before it begins.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
            {PROCESS.map((p) => (
              <div key={p.step} className="bg-slate-950 p-6 sm:p-7">
                <p className="text-4xl font-semibold leading-none tabular-nums
                  text-blue-500">
                  {p.step}
                </p>
                <p className="mt-5 text-base font-semibold text-white">{p.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
