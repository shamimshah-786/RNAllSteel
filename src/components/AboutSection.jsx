import Link from "next/link";
import {
  FaAward,
  FaUsers,
  FaStar,
  FaShieldAlt,
  FaPhone,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const stats = [
  { value: "15+",  label: "Years of Experience",   sub: "Since 2010" },
  { value: "500+", label: "Projects Completed",     sub: "Mumbai & Thane" },
  { value: "5.0",  label: "Google Rating",          sub: "41 Reviews" },
  { value: "100%", label: "Client Satisfaction",    sub: "Every Project" },
];

const features = [
  "Precision Engineering",
  "Quality Certified Materials",
  "Timely Project Completion",
  "Competitive Pricing",
  "Custom Design Solutions",
  "After-Sales Support",
];

export default function AboutSection() {
  return (
    <section className="bg-white overflow-hidden">

      {/* ── TOP BAND — Dark editorial strip with large numbers ── */}
      <div className="bg-slate-900 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-slate-700">
            {stats.map((s, i) => (
              <div
                key={i}
                className="px-6 sm:px-8 lg:px-10 py-2 first:pl-0 last:pr-0"
              >
                <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tabular-nums leading-none mb-1">
                  {s.value}
                </p>
                <p className="text-sm font-semibold text-slate-300 leading-tight">
                  {s.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-stretch">

          {/* LEFT — Brand Story */}
          <div className="lg:col-span-5 lg:pr-12 xl:pr-16 lg:border-r lg:border-gray-100 flex flex-col justify-between gap-10">

            {/* Label + Heading */}
            <div>
              <span className="inline-flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-5">
                <span className="w-6 h-px bg-blue-600 inline-block" />
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Mumbai's Most{" "}
                <span className="text-blue-600">Trusted</span>{" "}
                Steel Fabricators
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="space-y-5 text-gray-600 text-base leading-relaxed">
              <p>
                <strong className="text-gray-900 font-semibold">
                  RN All Steel Fabrication
                </strong>{" "}
                has been crafting precision steel structures across Mumbai and
                Thane since 2010 — earning a reputation built not on promises,
                but on work that speaks for itself.
              </p>
              <p>
                From sleek{" "}
                <strong className="text-gray-900 font-semibold">
                  glass railings and security doors
                </strong>{" "}
                to heavy-duty industrial frameworks, we handle every project
                with the same obsessive attention to detail — whether it's a
                single home gate or a full commercial buildout.
              </p>
              <p>
                Every weld, every finish, every delivery date is a commitment
                we take personally. That's why{" "}
                <strong className="text-gray-900 font-semibold">
                  500+ clients
                </strong>{" "}
                across the region trust us with their most important spaces.
              </p>
            </div>

            {/* Google Review Callout */}
            <div className="flex items-start gap-4 bg-slate-50 border border-gray-100 rounded-2xl p-5">
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-2xl font-bold text-gray-900 tabular-nums leading-none">
                  5.0
                </p>
                <p className="text-xs text-gray-400 mt-0.5">41 reviews</p>
              </div>
              <div className="w-px self-stretch bg-gray-200" />
              <div>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "Good People, Good Service & Good Work as expected"
                </p>
                <p className="text-xs text-blue-600 font-semibold mt-2">
                  — Verified Google Customer
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT — Features + CTA */}
          <div className="lg:col-span-7 lg:pl-12 xl:pl-16 flex flex-col justify-between gap-10">

            {/* What We Deliver */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-6 h-px bg-gray-300 inline-block" />
                What We Deliver
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 py-4 border-b border-gray-100 group ${
                      i >= features.length - 2 ? "border-b-0" : ""
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-200">
                      <FaCheckCircle className="text-blue-500 text-[9px] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps — horizontal */}
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
                Our Process
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {[
                  { step: "01", title: "Site Visit", desc: "Free consultation & measurements" },
                  { step: "02", title: "Design & Quote", desc: "Custom plan with transparent pricing" },
                  { step: "03", title: "Fabricate & Install", desc: "Precision build, on-time delivery" },
                ].map((p) => (
                  <div key={p.step} className="text-center sm:text-left">
                    <p className="text-3xl sm:text-4xl font-bold text-blue-500 tabular-nums leading-none mb-2">
                      {p.step}
                    </p>
                    <p className="text-white font-semibold text-sm mb-1">
                      {p.title}
                    </p>
                    <p className="text-slate-400 text-xs leading-snug hidden sm:block">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="tel:+919665181246"
                className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <FaPhone className="text-xs" />
                Call for Free Site Visit
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold text-sm transition-colors duration-200 group"
              >
                Learn More About Us
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}