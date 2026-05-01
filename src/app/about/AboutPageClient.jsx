// AboutPageClient.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId } from 'react';
import {
  FaAward, FaUsers, FaMapMarkerAlt, FaShieldAlt,
  FaWhatsapp, FaPhone, FaArrowRight, FaCheckCircle,
} from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';

/* ── DATA ── */
const STATS = [
  { value: '15+',  label: 'Years Experience', note: 'Trusted since 2010' },
  { value: '500+', label: 'Projects Done',    note: 'Mumbai & Thane' },
  { value: '5.0★', label: 'Google Rating',    note: '41 reviews' },
  { value: '2 Yr', label: 'Warranty',         note: 'Every project' },
];
/* Section eyebrow */
function Eyebrow({ text }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-blue-600 text-xs font-extrabold uppercase tracking-[0.22em] mb-5">
      <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
      {text}
    </span>
  );
}

const VALUES = [
  { Icon: FaAward,         color: 'bg-blue-50 text-blue-600',    title: 'Precision Engineering',  desc: 'CAD-led design with accurate, clean execution every time.' },
  { Icon: FaShieldAlt,     color: 'bg-emerald-50 text-emerald-600', title: 'Grade-A Materials',  desc: 'SS 304 & premium MS — tested, certified, built to last.' },
  { Icon: FaUsers,         color: 'bg-violet-50 text-violet-600',  title: 'Client-First Process', desc: 'Transparent timelines, regular updates, zero surprises.' },
  { Icon: FaMapMarkerAlt,  color: 'bg-amber-50 text-amber-600',    title: 'Local & Fast',         desc: 'Free site visits across all of Mumbai & Thane.' },
];

const TIMELINE = [
  { year: '2010', title: 'Founded in Thane',       desc: 'Started as a small residential fabrication shop — grills, gates, and railings.' },
  { year: '2015', title: 'Expanded Services',      desc: 'Added industrial structures, mezzanine floors, staircases, and commercial contracts.' },
  { year: '2019', title: '500+ Projects Milestone',desc: 'Crossed 500 completed projects with strong repeat clientele across the region.' },
  { year: '2023', title: 'Quality Certification',  desc: 'Achieved ISO-compliant processes and advanced fabrication standards.' },
];

const TEAM = [
  { name: 'Mohammad Naseem',  role: 'Founder & Master Fabricator', img: '/images/profile.svg',      initial: 'N' },
  { name: 'Mohammad Shamim',  role: 'Co-Founder & Operations',     img: '/images/team-shamim.jpg',  initial: 'S' },
];

const SERVICES_QUICK = [
  'Main Gates & Entry Doors', 'SS & MS Railings',
  'Window Grills', 'Collapsible Gates',
  'Staircases & Mezzanines', 'Industrial Structures',
];

/* ── SMALL COMPONENTS ── */
function SectionEyebrow({ label }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-blue-600 text-xs font-extrabold uppercase tracking-[0.22em] mb-5">
      <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
      {label}
    </span>
  );
}

function Avatar({ name, initial, img, size = 80 }) {
  const COLORS = ['bg-blue-600','bg-emerald-600','bg-rose-600','bg-indigo-600','bg-amber-600','bg-violet-600'];
  const color  = COLORS[(initial?.charCodeAt(0) || 65) % COLORS.length];
  return (
    <div style={{ width: size, height: size, minWidth: size }}
      className="relative rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
      {img && img !== '/images/team-shamim.jpg' ? (
        <Image src={img} alt={name} fill className="object-cover" />
      ) : (
        <div className={`w-full h-full ${color} flex items-center justify-center text-white font-bold`}
          style={{ fontSize: size * 0.38 }}>
          {initial}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════ MAIN EXPORT ══════════════════════ */
export default function AboutPageClient() {
  const id = useId();

  return (
    <main className="bg-gray-50 text-gray-800">

      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section
        aria-labelledby={`hero-${id}`}
        className="bg-gray-50 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28 overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <SectionEyebrow label="About Us" />
              <h1
                id={`hero-${id}`}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.06]"
              >
                Built on Steel.
                <br />
                <span className="text-blue-600">Backed by</span>
                <br />
                15 Years.
              </h1>
              <p className="mt-5 text-gray-500 text-base sm:text-lg leading-relaxed max-w-lg">
                R N All Steel Fabrication — precision-engineered gates, railings, grills, and
                structures built for homes and businesses across Mumbai &amp; Thane since 2010.
              </p>

              {/* Quick services list */}
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
                {SERVICES_QUICK.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCheckCircle className="text-blue-600 flex-shrink-0 text-xs" />
                    {s}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/919665181246"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-colors duration-200 shadow-md"
                >
                  <FaWhatsapp className="text-green-300 text-base" />
                  WhatsApp Us
                </a>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800 hover:text-blue-700 px-6 py-3.5 rounded-xl font-bold text-sm transition-colors duration-200"
                >
                  View Projects
                  <HiArrowUpRight className="text-sm" />
                </Link>
              </div>
            </div>

            {/* Right — image + floating badge */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100"
                style={{ aspectRatio: '4/3' }}>
                <Image
                  src="/projects/main-doors/ss-designer-main-door.webp"
                  alt="SS Designer Main Door — RN All Steel Fabrication"
                  fill className="object-cover" priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaAward className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 leading-none">500+</p>
                  <p className="text-xs text-gray-400 mt-0.5 font-semibold">Projects Completed</p>
                </div>
              </div>

              {/* Floating rating card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">5.0 Google Rating</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ 2. STATS STRIP ════════════════════════════════════ */}
      <div className="bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center py-7 px-4">
                <p className="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums leading-none">
                  {s.value}
                </p>
                <p className="text-sm font-semibold text-gray-700 mt-1.5">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 3. VALUES ═════════════════════════════════════════ */}
      <section
        aria-labelledby={`values-${id}`}
        className="py-16 sm:py-20 lg:py-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <SectionEyebrow label="Why Choose Us" />
              <h2 id={`values-${id}`}
                className="text-3xl sm:text-4xl font-bold text-gray-900 leading-[1.1]">
                What We Stand For
              </h2>
              <p className="mt-4 text-gray-500 text-base leading-relaxed max-w-md">
                15 years in the field has taught us one thing — quality and honesty always win.
                Here's what every project gets from us.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VALUES.map(({ Icon, color, title, desc }, i) => (
                  <div key={i} className="bg-white border border-gray-100 hover:border-blue-200 hover:shadow-sm rounded-2xl p-5 flex gap-4 transition-all duration-200 group">
                    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="text-base" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — snapshot card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col gap-6">
              <div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Company Snapshot
                </p>
                <div className="space-y-4">
                  {[
                    { label: 'Established',   value: '2010 — Thane, Maharashtra' },
                    { label: 'Specialisation', value: 'SS & MS Custom Fabrication' },
                    { label: 'Service Area',  value: 'Mumbai, Thane, Mumbra & nearby' },
                    { label: 'Lead Time',     value: '15–20 working days' },
                    { label: 'Warranty',      value: '2 Years on all projects' },
                    // { label: 'Materials',     value: 'SS 304 / Mild Steel (IS standard)' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex-shrink-0 w-28">{row.label}</p>
                      <p className="text-sm font-semibold text-gray-800 text-right">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/919665181246"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors duration-200"
              >
                <FaWhatsapp className="text-green-300 text-base" />
                Get a Free Quote
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ══ 4. TIMELINE ═══════════════════════════════════════ */}
      <section
        aria-labelledby={`timeline-${id}`}
        className="bg-white py-16 sm:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <SectionEyebrow label="Our Journey" />
            <h2 id={`timeline-${id}`}
              className="text-3xl sm:text-4xl font-bold text-gray-900 leading-[1.1]">
              15 Years. One Mission.
            </h2>
            <p className="mt-3 text-gray-500 text-base">
              From a single workshop in Thane to one of the most trusted steel fabrication names in the region.
            </p>
          </div>

          <ol className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gray-200 hidden sm:block" />

            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <li key={i} className="flex gap-6 sm:gap-8 relative">
                  {/* Year bubble */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center z-10 text-xs font-extrabold tabular-nums
                      ${i === TIMELINE.length - 1
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-200 text-gray-700 shadow-sm'}`}>
                      {item.year.slice(2)}
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 my-0 min-h-[40px] sm:hidden" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-10 ${i === TIMELINE.length - 1 ? 'pb-0' : ''}`}>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-xs font-bold text-blue-600 tabular-nums">{item.year}</span>
                      <span className="w-3 h-px bg-gray-300" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </li>
              ))}
            </div>
          </ol>
        </div>
      </section>

   
      {/* ════════════════════════════════ TEAM ═══ */}
      <section
        aria-labelledby={`team-${id}`}
        className="py-16 sm:py-20 lg:py-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-14">
            <Eyebrow text="The Team" />
            <h2
              id={`team-${id}`}
              className="text-3xl sm:text-4xl font-bold text-gray-900 leading-[1.1]"
            >
              The People Behind
              <br />
              <span className="text-blue-600">Every Project.</span>
            </h2>
            <p className="mt-4 text-gray-500 text-base max-w-lg">
              A lean, experienced team — every member takes personal ownership of quality and delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member) => (
              <div key={member.name}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg p-6 transition-all duration-300 flex flex-col gap-5">
                {/* Avatar + name */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                    <Image src={member.img} alt={member.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{member.name}</p>
                    <span className="inline-block text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full mt-1">
                      {member.role}
                    </span>
                  </div>
                </div>
                {/* Bio */}
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{member.bio}</p>
                {/* Footer */}
                <div className="pt-4 border-t border-gray-100">
                  <Link href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 group-hover:gap-2.5 transition-all duration-200">
                    Contact
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Hiring card */}
            <div className="bg-blue-600 rounded-2xl p-6 flex flex-col justify-between gap-5 min-h-[200px] relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -bottom-8 -left-4 w-16 h-16 bg-white/5 rounded-full" />
              <div className="relative">
                <p className="text-[10px] font-extrabold text-blue-200 uppercase tracking-[0.2em] mb-3">Join the Team</p>
                <p className="text-white font-bold text-lg leading-snug">
                  Skilled in steel fabrication?
                </p>
                <p className="text-blue-200 text-sm mt-1.5">
                  We're always looking for talented craftspeople.
                </p>
              </div>
              <a href="https://wa.me/919665181246" target="_blank" rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors duration-200 shadow-md self-start">
                <FaWhatsapp className="text-green-500" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ CTA BANNER ═══ */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-3xl px-8 sm:px-12 py-12 sm:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/20 rounded-full" />
            <div className="absolute -bottom-16 -left-8 w-36 h-36 bg-white/5 rounded-full" />

            <div className="relative max-w-xl">
              <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-extrabold uppercase tracking-[0.2em] mb-4">
                <span className="w-6 h-[2px] bg-blue-400 rounded-full" />
                Start Today
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Ready to build something
                <span className="text-blue-400"> extraordinary?</span>
              </h3>
              <p className="mt-3 text-gray-400 text-base">
                Free site visit · Transparent quote · Mumbai &amp; Thane coverage
              </p>
            </div>

            <div className="relative flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href="https://wa.me/919665181246" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-colors duration-200 shadow-lg">
                <FaWhatsapp className="text-green-300 text-base" />
                WhatsApp Now
              </a>
              <a href="tel:+919665181246"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-colors duration-200">
                <FaPhone className="text-xs" />
                Call Direct
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}