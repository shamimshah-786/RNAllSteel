// ─────────────────────────────────────────────────────────────────
//  Contact.jsx  —  Full redesign
// ─────────────────────────────────────────────────────────────────
'use client';

import { useId, useRef, useState, useEffect } from 'react';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaWhatsapp, FaTools, FaCheckCircle,
  FaTimesCircle, FaArrowRight,
} from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';

/* ═══════════════ FIELD COMPONENT ═══════════════ */
function Field({ label, required, error, errorId, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-blue-600 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <FaTimesCircle className="text-[10px] flex-shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

/* ═══════════════ INPUT CLASSES ═══════════════ */
const baseInput = `w-full border rounded-xl px-4 py-3 text-sm text-gray-900
  placeholder-gray-400 bg-gray-50 hover:border-gray-300
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  focus:bg-white disabled:opacity-50 transition-all duration-150`;
const errInput  = 'border-red-400 bg-red-50 focus:ring-red-400';
const okInput   = 'border-gray-200';

/* ═══════════════ CONTACT INFO ITEMS ═══════════════ */
const INFO_ITEMS = [
  {
    icon: FaPhone,
    label: 'Call Us',
    value: '+91 96651 81246',
    href: 'tel:+919665181246',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: 'Quick replies available',
    href: 'https://wa.me/919665181246',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'rnallsteelfabrication@gmail.com',
    href: 'mailto:rnallsteelfabrication@gmail.com',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Service Area',
    value: 'Mumbai & Thane — Free site visits',
    href: null,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: FaClock,
    label: 'Working Hours',
    value: 'Mon–Sat: 9 AM – 7 PM',
    href: null,
    color: 'bg-gray-100 text-gray-600',
  },
];

const SERVICES = [
  'Steel Railings',
  'Security Doors & Gates',
  'Window & Balcony Grills',
  'Kitchen Trolleys & Counters',
  'Industrial Structures',
  'Custom Fabrication',
  'Onsite Welding & Repairs',
];

/* ═══════════════ MAIN EXPORT ═══════════════ */
export default function Contact() {
  const id          = useId();
  const firstRef    = useRef(null);
  const resultRef   = useRef(null);

  const [form, setForm]           = useState({ name: '', email: '', phone: '', service: '', message: '', website: '' });
  const [errors, setErrors]       = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult]       = useState(null); // {ok, msg}

  useEffect(() => { firstRef.current?.focus(); }, []);

  const validate = (d) => {
    const e = {};
    if (!d.name.trim())    e.name    = 'Please enter your full name';
    if (!d.phone.trim())   e.phone   = 'Phone number is required';
    else if (!/^[+\d\s()-]{6,20}$/.test(d.phone.trim())) e.phone = 'Enter a valid phone number';
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Enter a valid email address';
    if (!d.service)        e.service = 'Please select a service';
    if (!d.message.trim()) e.message = 'Please describe your project';
    if (d.website?.trim()) e.website = 'Spam detected';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      document.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed to send message');
      setResult({ ok: true, msg: json?.message || 'Message sent — we will contact you soon!' });
      setForm({ name: '', email: '', phone: '', service: '', message: '', website: '' });
      setTimeout(() => resultRef.current?.focus(), 60);
    } catch (err) {
      setResult({ ok: false, msg: err.message || 'Unable to send. Please call or WhatsApp us directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ═══ HERO ═══ */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2.5 text-blue-600
                text-xs font-extrabold uppercase tracking-[0.22em] mb-5">
                <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
                Free Consultation
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08]">
                Let's Build
                <br />
                <span className="text-blue-600">Something</span>
                <br />
                Together.
              </h1>
              <p className="mt-5 text-gray-500 text-base leading-relaxed">
                Free site visit, detailed estimate, and transparent timelines —
                we handle end-to-end steel fabrication across Mumbai &amp; Thane.
              </p>
            </div>

            {/* Quick-action pills */}
            <div className="flex flex-col gap-3 lg:items-end">
              <a href="tel:+919665181246"
                className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800
                  text-white px-5 py-3 rounded-xl font-bold text-sm
                  transition-colors duration-200 shadow-md">
                <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                  <FaPhone className="text-xs" />
                </div>
                +91 96651 81246
              </a>
              <a href="https://wa.me/919665181246" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700
                  text-white px-5 py-3 rounded-xl font-bold text-sm
                  transition-colors duration-200 shadow-md">
                <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                  <FaWhatsapp className="text-sm" />
                </div>
                WhatsApp for Quick Reply
              </a>
              <p className="text-xs text-gray-400 font-semibold lg:text-right">
                Mon–Sat · 9 AM – 7 PM · Free site visits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">

          {/* ── LEFT — Contact Info ── */}
          <aside className="space-y-4">

            {/* Info card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.22em] mb-5">
                Contact Details
              </p>
              <ul className="space-y-4">
                {INFO_ITEMS.map((item) => {
                  const Icon    = item.icon;
                  const content = (
                    <li key={item.label} className="flex items-start gap-4">
                      <div className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center ${item.color}`}>
                        <Icon className="text-sm" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 leading-snug">
                          {item.value}
                        </p>
                      </div>
                    </li>
                  );
                  return item.href ? (
                    <a key={item.label} href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block group hover:bg-gray-50 -mx-2 px-2 rounded-xl
                        transition-colors duration-150">
                      {content}
                    </a>
                  ) : content;
                })}
              </ul>
            </div>

            {/* Emergency card */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
              <div className="absolute -bottom-4 left-8 w-16 h-16 rounded-full bg-blue-600/20" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaTools className="text-sm text-blue-400" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Emergency Services</p>
                    <p className="text-xs text-gray-400">24/7 welding &amp; onsite repair</p>
                  </div>
                </div>
                <a href="tel:+919665181246"
                  className="w-full inline-flex items-center justify-center gap-2
                    bg-white/10 hover:bg-white/20 border border-white/20
                    text-white px-4 py-2.5 rounded-xl font-bold text-sm
                    transition-colors duration-200">
                  <FaPhone className="text-xs" />
                  Call for Emergency
                </a>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: '15+',  l: 'Years' },
                { v: '500+', l: 'Projects' },
                { v: '5★',   l: 'Rating' },
              ].map((s) => (
                <div key={s.l}
                  className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                  <p className="text-lg font-black text-gray-900 tabular-nums leading-none">{s.v}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </aside>

          {/* ── RIGHT — Form ── */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

            {/* Form header */}
            <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-[0.22em] block mb-2">
                    Free Quote
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 leading-snug">
                    Describe Your Project
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    We respond within 24 hours · No obligations
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0 pt-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Prefer to call?
                  </p>
                  <a href="tel:+919665181246"
                    className="text-sm font-bold text-gray-900 hover:text-blue-600
                      flex items-center gap-1.5 transition-colors duration-150">
                    <FaPhone className="text-xs text-blue-600" />
                    +91 96651 81246
                  </a>
                </div>
              </div>
            </div>

            {/* Result banner */}
            {result && (
              <div
                ref={resultRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className={`mx-6 sm:mx-8 mt-6 rounded-xl p-4 text-sm flex items-start gap-3
                  ${result.ok
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'}`}
              >
                {result.ok
                  ? <FaCheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  : <FaTimesCircle className="text-red-500 flex-shrink-0 mt-0.5" />}
                <p>{result.msg}</p>
              </div>
            )}

            {/* Form body */}
            <form onSubmit={handleSubmit} noValidate className="px-6 sm:px-8 py-7 space-y-5">
              {/* Honeypot */}
              <input type="text" name="website" value={form.website}
                onChange={handleChange} autoComplete="off"
                tabIndex={-1} className="hidden" aria-hidden="true" />

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required error={errors.name} errorId={`err-name-${id}`}>
                  <input
                    ref={firstRef} id={`name-${id}`} name="name" type="text"
                    value={form.name} onChange={handleChange} disabled={submitting}
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? `err-name-${id}` : undefined}
                    placeholder="e.g. Rahul Sharma"
                    className={`${baseInput} ${errors.name ? errInput : okInput}`}
                  />
                </Field>
                <Field label="Phone Number" required error={errors.phone} errorId={`err-phone-${id}`}>
                  <input
                    id={`phone-${id}`} name="phone" type="tel"
                    value={form.phone} onChange={handleChange} disabled={submitting}
                    aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `err-phone-${id}` : undefined}
                    placeholder="+91 98765 43210"
                    className={`${baseInput} ${errors.phone ? errInput : okInput}`}
                  />
                </Field>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email Address" error={errors.email} errorId={`err-email-${id}`}>
                  <input
                    id={`email-${id}`} name="email" type="email"
                    value={form.email} onChange={handleChange} disabled={submitting}
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? `err-email-${id}` : undefined}
                    placeholder="you@example.com"
                    className={`${baseInput} ${errors.email ? errInput : okInput}`}
                  />
                </Field>
                <Field label="Service Required" required error={errors.service} errorId={`err-service-${id}`}>
                  <select
                    id={`service-${id}`} name="service"
                    value={form.service} onChange={handleChange} disabled={submitting}
                    aria-invalid={!!errors.service} aria-describedby={errors.service ? `err-service-${id}` : undefined}
                    className={`${baseInput} cursor-pointer ${errors.service ? errInput : okInput}`}
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              </div>

              {/* Message */}
              <Field label="Project Details" required error={errors.message} errorId={`err-message-${id}`}>
                <textarea
                  id={`message-${id}`} name="message" rows={5}
                  value={form.message} onChange={handleChange} disabled={submitting}
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? `err-message-${id}` : undefined}
                  placeholder="Describe your project — dimensions, location, material preference, timeline..."
                  className={`${baseInput} resize-none ${errors.message ? errInput : okInput}`}
                />
              </Field>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <button type="submit" disabled={submitting}
                  className="inline-flex items-center justify-center gap-2.5
                    bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                    text-white px-6 py-3 rounded-xl font-bold text-sm
                    transition-colors duration-200 shadow-md flex-1 sm:flex-none">
                  {submitting ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...</>
                  ) : (
                    <><FaArrowRight className="text-xs" />Send & Get Free Quote</>
                  )}
                </button>

                <a href="tel:+919665181246"
                  className="inline-flex items-center justify-center gap-2
                    border border-gray-200 hover:border-gray-300 hover:bg-gray-50
                    text-gray-700 px-4 py-3 rounded-xl font-semibold text-sm
                    transition-colors duration-200">
                  <FaPhone className="text-xs text-blue-600" />
                  Call Now
                </a>

                <a href="https://wa.me/919665181246" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2
                    border border-emerald-200 bg-emerald-50 hover:bg-emerald-100
                    text-emerald-700 px-4 py-3 rounded-xl font-semibold text-sm
                    transition-colors duration-200">
                  <FaWhatsapp className="text-base" />
                  WhatsApp
                </a>
              </div>

              {/* Privacy note */}
              <p className="text-center text-xs text-gray-400 pt-1">
                🔒 Your information is safe — never shared with third parties.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ═══ MAP SECTION ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

          {/* Map header */}
          <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center
            justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center
                justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-blue-600 text-sm" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-none mb-0.5">
                  R N All Steel Fabrication Work
                </p>
                <p className="text-xs text-gray-500">Mumbra, Thane, Maharashtra</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://www.google.com/maps/dir/?api=1&destination=R+N+ALL+STEEL+FABRICATION+WORK"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                  text-white px-4 py-2 rounded-xl font-bold text-xs
                  transition-colors duration-200 shadow-sm">
                <HiArrowUpRight className="text-sm" />
                Get Directions
              </a>
              <a href="tel:+919665181246"
                className="inline-flex items-center gap-2 border border-gray-200
                  hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl
                  font-bold text-xs transition-colors duration-200">
                <FaPhone className="text-[10px] text-blue-600" />
                Call
              </a>
            </div>
          </div>

          {/* Map embed */}
          <div className="w-full aspect-[16/7] min-h-[240px]">
            <iframe
              title="RN All Steel Fabrication — Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.5977662075215!2d73.0530383752066!3d19.12529398208948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c11ef7e7c55b%3A0x3dd724fa7f889349!2sR%20N%20ALL%20STEEL%20FABRICATION%20WORK!5e0!3m2!1sen!2sin!4v1762280155663!5m2!1sen!2sin"
              width="100%" height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </main>
  );
}