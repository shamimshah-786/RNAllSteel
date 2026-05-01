// ─────────────────────────────────────────────────────
//  ServicesPageClient.jsx  —  Full redesign
// ─────────────────────────────────────────────────────
'use client';

import React, { useId, useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaWhatsapp, FaPhone, FaArrowRight, FaCheckCircle,
  FaTimesCircle, FaTimes, FaChevronRight,
} from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';

/* ═══════════════ DATA ═══════════════ */
const SERVICES = [
  {
    id: 'railings',
    title: 'SS / MS Railings',
    category: 'Residential',
    short: 'Staircases, balconies & terraces',
    description:
      'Custom stainless steel and mild steel railings engineered for safety and style — indoor, outdoor, modern or classic.',
    features: ['Custom designs', 'Powder coating', 'Indoor & outdoor', 'Durable finish'],
    image: '/projects/railings/stainless-steel-staircase-railing.webp',
  },
  {
    id: 'security-gates',
    title: 'Security Doors & Gates',
    category: 'Security',
    short: 'Reinforced frames, multi-point locking',
    description:
      'Robust security doors and main gates with reinforced frames and multi-point locking for maximum protection.',
    features: ['Burglar-proof', 'Multi-lock systems', 'Custom sizes', 'Decorative options'],
    image: '/projects/main-gates/stainless-steel-main-gate-house.webp',
  },
  {
    id: 'window-grills',
    title: 'Balcony & Window Grills',
    category: 'Residential',
    short: 'Anti-climb, weather-resistant designs',
    description:
      'Aesthetic grills with anti-climb, weather-resistant steel — excellent ventilation without compromising security.',
    features: ['Pattern variety', 'Anti-climb', 'Weather resistant', 'Low maintenance'],
    image: '/projects/window-grills/stainless-steel-window-grill-modern.webp',
  },
  {
    id: 'kitchen',
    title: 'Kitchen Trolleys & Counters',
    category: 'Commercial',
    short: 'Hygienic, modular, food-grade steel',
    description:
      'Stainless-steel trolleys and counters for commercial kitchens — modular, hygienic, and easy to sanitize.',
    features: ['Food-grade steel', 'Modular', 'Easy cleaning', 'Space saving'],
    image: '/projects/street-stalls/stainless-steel-food-cart-stall.webp',
  },
  {
    id: 'structures',
    title: 'Industrial Structures',
    category: 'Commercial',
    short: 'Warehouses, sheds, heavy-duty frames',
    description:
      'Structural-grade fabrication for warehouses, sheds, and industrial projects — built to specification and compliance.',
    features: ['Engineered', 'Heavy-duty', 'Custom specs', 'Compliance ready'],
    image: '/projects/main-gates/laser-cut-steel-main-gate.webp',
  },
  {
    id: 'custom-fab',
    title: 'Custom Metal Fabrication',
    category: 'Custom',
    short: 'Furniture, fixtures, specialty parts',
    description:
      'Bespoke metalwork from concept to finished product — furniture, fixtures, and specialty parts for any requirement.',
    features: ['Design consult', 'Precision cut', 'Multiple metals', 'QA checked'],
    image: '/projects/main-doors/ss-designer-main-door.webp',
  },
  {
    id: 'welding',
    title: 'Onsite Welding & Repairs',
    category: 'Service',
    short: 'Emergency support, all weld types',
    description:
      'Fast, high-quality onsite welding and structural repairs with emergency support options and maintenance plans.',
    features: ['Emergency 24/7', 'All weld types', 'Structural repair', 'Maintenance plans'],
    image: '/projects/collapsible-gates/collapsible-steel-gate.webp',
  },
];

const PROCESS_STEPS = [
  { n: '01', title: 'Consultation',           desc: 'Understand requirements, site constraints and desired finishes.' },
  { n: '02', title: 'Measurement & Quote',    desc: 'Free on-site measurements and a detailed written estimate.' },
  { n: '03', title: 'Design & Approval',      desc: 'Drawings and finish options submitted for client sign-off.' },
  { n: '04', title: 'Fabrication',            desc: 'Precision fabrication in our facility with quality checks.' },
  { n: '05', title: 'Installation',           desc: 'Onsite installation by experienced teams with safety controls.' },
  { n: '06', title: 'Aftercare',              desc: 'Warranty services and optional maintenance contracts.' },
];

const CATEGORY_COLORS = {
  Residential: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Security:    'bg-red-50 text-red-700 border-red-200',
  Commercial:  'bg-violet-50 text-violet-700 border-violet-200',
  Custom:      'bg-amber-50 text-amber-700 border-amber-200',
  Service:     'bg-blue-50 text-blue-700 border-blue-200',
};

/* ═══════════════ MODAL ═══════════════ */
function QuickQuoteModal({ open, service, onClose }) {
  const nameRef = useRef(null);
  const [form, setForm] = useState({ name: '', contact: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setShow(true));
      setTimeout(() => nameRef.current?.focus(), 80);
      setErrors({}); setStatus(null);
      setForm({ name: '', contact: '', message: '', website: '' });
    } else {
      setShow(false);
    }
  }, [open, service]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Please provide your name';
    if (!form.contact.trim()) e.contact = 'Phone or email required';
    if (!form.message.trim()) e.message = 'Brief project description needed';
    if (form.website.trim())  e.website = 'Spam detected';
    return e;
  };

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true); setStatus(null);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.contact.includes('@') ? form.contact : '',
          phone: !form.contact.includes('@') ? form.contact : '',
          service: service?.title ?? 'General Quote',
          message: form.message,
          website: form.website,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed');
      setStatus({ ok: true, msg: json?.message || 'Request sent — we will contact you soon.' });
      setForm({ name: '', contact: '', message: '', website: '' });
    } catch (err) {
      setStatus({ ok: false, msg: err.message || 'Unable to send. Try calling directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Quick quote"
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative z-10 w-full sm:max-w-lg sm:mx-4 bg-white sm:rounded-2xl overflow-hidden shadow-2xl
        transition-all duration-300 ${show ? 'translate-y-0 scale-100' : 'translate-y-6 sm:scale-95'}`}>

        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-gray-100 flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-[0.2em] block mb-1">
              Free Quote
            </span>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">
              {service ? service.title : 'Request a Quote'}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Free site visit · No obligations · Mumbai &amp; Thane
            </p>
          </div>
          <button onClick={onClose} aria-label="Close"
            className="flex-shrink-0 mt-0.5 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-150">
            <FaTimes className="text-gray-500 text-xs" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="qq-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Your Name
            </label>
            <input
              id="qq-name" ref={nameRef} name="name"
              value={form.name} onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150
                ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
            />
            {errors.name && <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1"><FaTimesCircle className="text-xs" />{errors.name}</p>}
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="qq-contact" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Phone or Email
            </label>
            <input
              id="qq-contact" name="contact"
              value={form.contact} onChange={handleChange}
              placeholder="+91 9xxxxxxxxx or email@domain.com"
              className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150
                ${errors.contact ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
            />
            {errors.contact && <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1"><FaTimesCircle className="text-xs" />{errors.contact}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="qq-msg" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Project Details
            </label>
            <textarea
              id="qq-msg" name="message" rows={3}
              value={form.message} onChange={handleChange}
              placeholder="Brief description, location, approximate size..."
              className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150
                ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
            />
            {errors.message && <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1"><FaTimesCircle className="text-xs" />{errors.message}</p>}
          </div>

          {/* Honeypot */}
          <input name="website" value={form.website} onChange={handleChange}
            className="hidden" tabIndex="-1" autoComplete="off" />

          {/* Status */}
          {status && (
            <div className={`rounded-xl p-4 text-sm flex items-start gap-3
              ${status.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {status.ok
                ? <FaCheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" />
                : <FaTimesCircle className="text-red-500 flex-shrink-0 mt-0.5" />}
              <p>{status.msg}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-gray-300 text-sm font-semibold transition-colors duration-150">
              Cancel
            </button>
            <button type="submit" disabled={submitting}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors duration-150 shadow-md">
              {submitting ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending...</>
              ) : (
                <><FaArrowRight className="text-xs" />Send Request</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════ SERVICE CARD ═══════════════ */
function ServiceCard({ service, onQuote }) {
  const catColor = CATEGORY_COLORS[service.category] ?? 'bg-gray-50 text-gray-600 border-gray-200';

  return (
    <article
      aria-labelledby={`svc-${service.id}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200
        hover:shadow-lg overflow-hidden transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full pt-[58%] overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Category chip */}
        <div className="absolute top-3 left-3">
          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${catColor}`}>
            {service.category}
          </span>
        </div>
        {/* Hover arrow */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm
          opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <HiArrowUpRight className="text-gray-900 text-xs" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 id={`svc-${service.id}`}
            className="text-lg font-bold text-gray-900 leading-snug">
            {service.title}
          </h3>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">{service.short}</p>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5">
          {service.features.map((f) => (
            <span key={f}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600
                bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              {f}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100 gap-3">
          <Link href={`/projects#${service.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600
              hover:text-blue-700 transition-colors duration-150 group/link">
            View Projects
            <FaChevronRight className="text-xs group-hover/link:translate-x-0.5 transition-transform duration-150" />
          </Link>
          <button onClick={() => onQuote(service)}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700
              text-white px-4 py-2 rounded-xl font-bold text-xs transition-colors duration-150 shadow-sm">
            Quick Quote
          </button>
        </div>
      </div>
    </article>
  );
}

/* ═══════════════ PROCESS ═══════════════ */
function ProcessSection() {
  return (
    <section aria-labelledby="process-heading" className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-2.5 text-blue-600 text-xs font-extrabold uppercase tracking-[0.22em] mb-3">
            <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
            How It Works
          </span>
          <h2 id="process-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
            From Inquiry to Installation
          </h2>
        </div>
        <p className="text-sm text-gray-500 max-w-xs">
          A simple, transparent 6-step process — no surprises, no delays.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROCESS_STEPS.map((step, i) => (
          <div key={i}
            className="group relative bg-gray-50 hover:bg-blue-50 border border-gray-100
              hover:border-blue-200 rounded-2xl p-5 transition-all duration-300">
            {/* Step number */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-black text-gray-100 group-hover:text-blue-100
                transition-colors duration-300 select-none leading-none tabular-nums">
                {step.n}
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold
                flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1.5">{step.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ STATS STRIP ═══════════════ */
function StatsStrip() {
  const stats = [
    { v: '15+',  l: 'Years Experience' },
    { v: '500+', l: 'Projects Completed' },
    { v: '5.0★', l: 'Google Rating' },
    { v: '100%', l: 'Client Satisfaction' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.l}
          className="bg-white border border-gray-100 rounded-2xl px-5 py-5 text-center shadow-sm">
          <p className="text-3xl font-black text-gray-900 tabular-nums leading-none">{s.v}</p>
          <p className="text-xs text-gray-500 mt-1.5 font-semibold">{s.l}</p>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════ FILTER BAR ═══════════════ */
function FilterBar({ categories, active, onChange, count }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((c) => (
        <button key={c} onClick={() => onChange(c)} aria-pressed={active === c}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200
            ${active === c
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'}`}>
          {c}
        </button>
      ))}
      <span className="ml-auto text-xs text-gray-400 font-semibold">
        {count} {count === 1 ? 'service' : 'services'}
      </span>
    </div>
  );
}

/* ═══════════════ MAIN EXPORT ═══════════════ */
export default function ServicesPageClient() {
  const id = useId();
  const [category, setCategory] = useState('All');
  const [activeService, setActiveService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = ['All', ...Array.from(new Set(SERVICES.map((s) => s.category)))];
  const filtered   = category === 'All' ? SERVICES : SERVICES.filter((s) => s.category === category);

  const openQuote  = useCallback((svc) => { setActiveService(svc); setModalOpen(true); }, []);
  const closeQuote = useCallback(() => { setActiveService(null); setModalOpen(false); }, []);

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ═══ HERO ═══ */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2.5 text-blue-600 text-xs font-extrabold uppercase tracking-[0.22em] mb-6">
                <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
                Trusted Fabrication Since 2010
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.06]">
                Precision Steel.
                <br />
                <span className="text-blue-600">Built to Last.</span>
                <br />
                Delivered on Time.
              </h1>
              <p className="mt-5 text-gray-500 text-base leading-relaxed max-w-lg">
                Residential, commercial and industrial metalworks — engineered,
                finished and installed across Mumbai &amp; Thane with unmatched
                attention to detail.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                    text-white px-6 py-3 rounded-xl font-bold text-sm
                    transition-colors duration-200 shadow-md group">
                  Free Consultation
                  <HiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Link>
                <button onClick={() => openQuote(null)}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200
                    hover:border-blue-400 hover:bg-blue-50 text-gray-800 hover:text-blue-700
                    px-6 py-3 rounded-xl font-bold text-sm transition-colors duration-200">
                  Request Quote
                </button>
                <a href="tel:+919665181246"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600
                    text-sm font-semibold transition-colors duration-150">
                  <div className="w-8 h-8 bg-gray-100 hover:bg-blue-50 rounded-full
                    flex items-center justify-center transition-colors duration-150">
                    <FaPhone className="text-xs text-gray-500" />
                  </div>
                  +91 96651 81246
                </a>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap items-center gap-2 mt-6">
                {['Free Site Visit', 'Transparent Pricing', 'Mumbai & Thane'].map((t) => (
                  <span key={t}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500
                      bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — hero image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-72 sm:h-96 lg:h-[480px]">
              <Image
                src="/projects/railings/ss-balcony-railing-curved-design.webp"
                alt="Steel fabrication — SS Balcony Railing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm
                rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-white text-xs" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Available Now</p>
                  <p className="text-[11px] text-gray-500">Call for free estimate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

        {/* Section header + filter */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <span className="inline-flex items-center gap-2.5 text-blue-600 text-xs font-extrabold uppercase tracking-[0.22em] mb-3">
              <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Our Services
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-sm">
            7 specialisations — all fabricated in-house and installed by our own team.
          </p>
        </div>

        <div className="mb-6">
          <FilterBar categories={categories} active={category} onChange={setCategory} count={filtered.length} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} onQuote={openQuote} />
          ))}
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16">
        <ProcessSection />
      </section>

      {/* ═══ STATS ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16">
        <StatsStrip />
      </section>

      {/* ═══ BOTTOM CTA BANNER ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="bg-gray-900 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row
          items-start md:items-center justify-between gap-6 overflow-hidden relative">
          {/* Decorative */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-blue-600/10" />
          <div className="absolute -bottom-8 left-16 w-32 h-32 rounded-full bg-white/5" />

          <div className="relative">
            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-[0.22em] block mb-3">
              Start Your Project
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Ready to build something
              <br className="hidden sm:block" /> that lasts?
            </h2>
            <p className="mt-2 text-gray-400 text-sm">
              Free site visit · Detailed estimate · End-to-end delivery
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="https://wa.me/919665181246" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500
                text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors duration-200 shadow-lg">
              <FaWhatsapp className="text-green-300 text-base" />
              WhatsApp Now
            </a>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20
                border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm
                transition-colors duration-200">
              Schedule Site Visit
            </Link>
            <a href="tel:+919665181246"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20
                border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm
                transition-colors duration-200">
              <FaPhone className="text-xs" />
              Call Direct
            </a>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <QuickQuoteModal open={modalOpen} service={activeService} onClose={closeQuote} />
    </main>
  );
}