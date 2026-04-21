'use client';

import Image from 'next/image';
import { useId } from 'react';
import { FaAward, FaUsers, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

/**
 * Professional About page component (Next.js App Router client component)
 * - Tailwind CSS utilities
 * - Accessible headings, landmarks, and semantic structure
 * - Responsive layout with hero, values/stats, timeline, team, and CTA
 * - Uses next/image (replace image paths in /public as needed)
 *
 * Drop this file at: app/components/About.jsx
 */

export default function About() {
  const id = useId();

  const stats = [
    { Icon: FaAward, value: '15+', label: 'Years Experience', note: 'Trusted since 2010' },
    { Icon: FaUsers, value: '500+', label: 'Projects Completed', note: 'Across Mumbai & Thane' },
    { Icon: FaMapMarkerAlt, value: '100%', label: 'Area Coverage', note: 'Mumbai & Thane Region' },
    { Icon: FaShieldAlt, value: 'ISO', label: 'Quality Certified', note: 'Premium Standards' },
  ];

  const timeline = [
    { year: '2010', title: 'Founded', desc: 'Started as a small fabrication shop in Thane, focusing on residential grills & gates.' },
    { year: '2015', title: 'Expanded Services', desc: 'Added industrial structures, staircases and commercial contracts.' },
    { year: '2019', title: '500+ Projects', desc: 'Crossed 500 projects milestone with repeat clients and bulk contracts.' },
    { year: '2023', title: 'ISO Certification', desc: 'Achieved ISO-compliant quality processes & advanced fabrication standards.' },
  ];

  const team = [
    { name: 'Mohammad Shamim', role: 'Co-Founder', img: '/images/team-shamim.jpg' },
    { name: 'Mohammad Naseem', role: 'Founder', img: '/images/profile.svg' },
  ];

  return (
    <main className="bg-white text-slate-800">
      {/* Hero */}
      <section aria-labelledby={`hero-${id}`} className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 mb-4">
                <FaAward className="h-4 w-4 text-blue-600" /> Trusted Since 2010
              </p>

              <h1 id={`hero-${id}`} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                RN All Steel Fabrication
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-600">
                  Experts in Custom Steel Work — Mumbai & Thane
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-600 max-w-2xl">
                We deliver precision-engineered steel fabrication solutions — from decorative gates and railings to heavy industrial structures. 
                Built on a foundation of craftsmanship, safety, and timely delivery.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow hover:from-blue-700 hover:to-sky-700 transition"
                >
                  Request a Quote
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition"
                >
                  View Projects
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map(({ Icon, value, label }, i) => (
                  <div key={i} className="flex flex-col items-start gap-1">
                    <div className="text-2xl font-extrabold text-slate-900">{value}</div>
                    <div className="text-sm text-slate-600 font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-100">
                <Image
                  src="/projects/main-doors/ss-designer-main-door.webp"
                  alt="Steel fabrication sample"
                  width={720}
                  height={540}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -left-6 -bottom-6 w-40 h-40 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Values & Stats */}
      <section aria-labelledby={`values-${id}`} className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 id={`values-${id}`} className="text-2xl md:text-3xl font-bold text-slate-900">Our Values</h2>
            <p className="mt-3 text-slate-600 max-w-3xl">
              We combine modern fabrication techniques with hands-on craftsmanship. Safety, durability and elegant design are at the core of everything we build.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <FaAward />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Precision Engineering</h4>
                  <p className="text-sm text-slate-600">CAD-led design & accurate execution.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Quality Materials</h4>
                  <p className="text-sm text-slate-600">Grade-tested materials & finish options.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <FaUsers />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Client Focus</h4>
                  <p className="text-sm text-slate-600">Transparent timelines & regular updates.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Local Service</h4>
                  <p className="text-sm text-slate-600">Fast site visits across Mumbai & Thane.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">Snapshot</h3>
            <dl className="grid gap-y-4">
              {stats.map(({ Icon, value, label }, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{label}</div>
                      <div className="text-xs text-slate-500">{value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section aria-labelledby={`timeline-${id}`} className="bg-slate-50 py-10 md:py-14">
        <div className="container mx-auto px-4">
          <h2 id={`timeline-${id}`} className="text-2xl font-bold text-slate-900">Our Journey</h2>
          <ol className="mt-6 space-y-6">
            {timeline.map((item, idx) => (
              <li key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="min-h-[45px] w-[45px] flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-sm font-semibold text-slate-800">{item.year}</div>
                  {idx !== timeline.length - 1 && <div className="min-h-full w-px bg-slate-200 mt-4" />}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-2xl">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section aria-labelledby={`team-${id}`} className="container mx-auto px-4 py-10 md:py-14">
        <h2 id={`team-${id}`} className="text-2xl font-bold text-slate-900">Leadership & Team</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">A small highly skilled team backed by experienced field engineers.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm items-center">
              <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image src={member.img} alt={member.name} fill className="object-cover" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">{member.name}</div>
                <div className="text-sm text-slate-600">{member.role}</div>
                <div className="mt-3">
                  <a href="/contact" className="text-sm text-blue-600 font-medium hover:underline">Contact</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-10 md:py-14">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold">Ready to start your next project?</h3>
            <p className="mt-2 text-sm opacity-90">Free site visits & custom quotes across Mumbai & Thane.</p>
          </div>
          <div className="flex gap-3">
            <a href="/contact" className="rounded-md bg-white/10 px-5 py-3 font-semibold hover:bg-white/20">Request Consultation</a>
            <a href="tel:+919665181246" className="rounded-md bg-white px-5 py-3 text-blue-700 font-semibold">Call Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}